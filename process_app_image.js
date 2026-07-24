const sharp = require('sharp');
const fs = require('fs');

async function processImage() {
  try {
    await sharp('assets/images/temp_app.jpg')
      .webp({ quality: 80 })
      .toFile('assets/images/applications-new.webp');
    
    console.log('Conversion successful');
    if (fs.existsSync('assets/images/temp_app.jpg')) {
        fs.unlinkSync('assets/images/temp_app.jpg');
    }
  } catch (err) {
    console.error('Conversion failed:', err);
  }
}

processImage();
