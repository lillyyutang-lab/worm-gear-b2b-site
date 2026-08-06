const sharp = require('sharp');
const path = require('path');

const imgPath = 'assets/images/testimonials.webp';

async function checkImage() {
  try {
    const metadata = await sharp(imgPath).metadata();
    console.log(`Filename: ${path.basename(imgPath)}`);
    console.log(`Width: ${metadata.width}px`);
    console.log(`Height: ${metadata.height}px`);
  } catch (err) {
    console.error(`Error reading ${imgPath}:`, err.message);
  }
}

checkImage();
