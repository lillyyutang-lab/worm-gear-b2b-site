const RECIPIENT = 'lillyyutang@gmail.com';
const EMAIL_DOMAIN = process.env.RESEND_EMAIL_DOMAIN || 'smktrans.com';
const FROM = 'SMK Transmission <inquiry@' + EMAIL_DOMAIN + '>';

function clean(value, maxLength) {
  return String(value || '').trim().slice(0, maxLength);
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, function (character) {
    return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[character];
  });
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not configured.');
    return res.status(503).json({ error: 'Email service is temporarily unavailable.' });
  }

  let payload = req.body;
  if (typeof payload === 'string') {
    try { payload = JSON.parse(payload); } catch (_) {
      return res.status(400).json({ error: 'Invalid request.' });
    }
  }

  payload = payload || {};
  if (clean(payload.website, 200)) {
    return res.status(200).json({ success: true });
  }

  const name = clean(payload.name, 120);
  const email = clean(payload.email, 254);
  const whatsapp = clean(payload.whatsapp, 80);
  const product = clean(payload.product, 120);
  const model = clean(payload.model, 120);
  const ratio = clean(payload.ratio, 60);
  const motorPower = clean(payload.motorPower, 60);
  const quantity = clean(payload.quantity, 20);
  const message = clean(payload.message, 5000);
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || !emailPattern.test(email) || !product || !quantity || !/^\d+$/.test(quantity) || Number(quantity) < 1 || !message) {
    return res.status(400).json({ error: 'Please complete all required fields with a valid email address.' });
  }

  const safe = {
    name: escapeHtml(name),
    email: escapeHtml(email),
    whatsapp: escapeHtml(whatsapp || 'Not provided'),
    product: escapeHtml(product),
    model: escapeHtml(model || 'Not specified'),
    ratio: escapeHtml(ratio || 'Not specified'),
    motorPower: escapeHtml(motorPower || 'Not specified'),
    quantity: escapeHtml(quantity),
    message: escapeHtml(message).replace(/\n/g, '<br>')
  };
  const subject = 'SMK Product Inquiry - ' + product;
  const text = [
    'New inquiry from the SMK Transmission website',
    '',
    'Name: ' + name,
    'Email: ' + email,
    'WhatsApp: ' + (whatsapp || 'Not provided'),
    'Product: ' + product,
    'Product Model: ' + (model || 'Not specified'),
    'Ratio: ' + (ratio || 'Not specified'),
    'Motor Power: ' + (motorPower || 'Not specified'),
    'Quantity: ' + quantity,
    '',
    'Requirements:',
    message
  ].join('\n');

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + process.env.RESEND_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: FROM,
        to: [RECIPIENT],
        reply_to: email,
        subject: subject,
        text: text,
        html: '<h2>New SMK website inquiry</h2>' +
          '<p><strong>Name:</strong> ' + safe.name + '</p>' +
          '<p><strong>Email:</strong> ' + safe.email + '</p>' +
          '<p><strong>WhatsApp:</strong> ' + safe.whatsapp + '</p>' +
          '<p><strong>Product:</strong> ' + safe.product + '</p>' +
          '<p><strong>Product Model:</strong> ' + safe.model + '</p>' +
          '<p><strong>Ratio:</strong> ' + safe.ratio + '</p>' +
          '<p><strong>Motor Power:</strong> ' + safe.motorPower + '</p>' +
          '<p><strong>Quantity:</strong> ' + safe.quantity + '</p>' +
          '<p><strong>Requirements:</strong><br>' + safe.message + '</p>'
      })
    });

    const result = await response.json().catch(function () { return {}; });
    if (!response.ok) {
      console.error('Resend error:', response.status, result);
      return res.status(502).json({ error: 'The message could not be sent. Please try again.' });
    }
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Email request failed:', error);
    return res.status(502).json({ error: 'The message could not be sent. Please try again.' });
  }
};
