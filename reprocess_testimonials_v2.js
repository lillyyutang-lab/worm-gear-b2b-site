const sharp = require('sharp');
const fs = require('fs');

async function processTestimonials() {
  const input = 'assets/images/testimonials-raw.jpg';
  const output = 'assets/images/testimonials.webp';
  try {
    const info = await sharp(input)
      .resize(1400)
      .webp({ quality: 85 })
      .toFile(output + '.tmp');
    
    if (fs.existsSync(output)) fs.unlinkSync(output);
    fs.renameSync(output + '.tmp', output);
    if (fs.existsSync(input)) fs.unlinkSync(input);
    
    console.log(`Success: 1400x${info.height}, Size: ${(info.size/1024).toFixed(2)} KB`);
  } catch (err) {
    console.error('Processing failed:', err);
  }
}

processTestimonials();
