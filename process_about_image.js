const sharp = require('sharp');
const fs = require('fs');

async function processAboutImage() {
  try {
    await sharp('assets/images/temp_about.jpg')
      .webp({ quality: 80 })
      .toFile('assets/images/about-us-new.webp');
    
    console.log('Conversion successful');
    if (fs.existsSync('assets/images/temp_about.jpg')) {
        fs.unlinkSync('assets/images/temp_about.jpg');
    }
  } catch (err) {
    console.error('Conversion failed:', err);
  }
}

processAboutImage();
