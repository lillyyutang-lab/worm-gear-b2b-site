const sharp = require('sharp');
const fs = require('fs');

async function processContactBanner() {
  try {
    const input = 'assets/images/temp_contact_final.jpg';
    const output = 'assets/images/contact-banner-final.webp';
    
    await sharp(input)
      .webp({ quality: 80 })
      .toFile(output);
    
    console.log('Contact banner final conversion successful');
    if (fs.existsSync(input)) {
        fs.unlinkSync(input);
    }
  } catch (err) {
    console.error('Conversion failed:', err);
  }
}

processContactBanner();
