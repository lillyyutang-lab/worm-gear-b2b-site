const sharp = require('sharp');
const fs = require('fs');

async function processImage() {
  try {
    await sharp('assets/images/testimonials-orig.jpg')
      .resize(1400)
      .webp({ quality: 85 })
      .toFile('assets/images/testimonials.webp');
    console.log('Successfully resized and converted testimonials image.');
    if (fs.existsSync('assets/images/testimonials-orig.jpg')) {
      fs.unlinkSync('assets/images/testimonials-orig.jpg');
    }
  } catch (err) {
    console.error('Error processing image:', err);
  }
}

processImage();
