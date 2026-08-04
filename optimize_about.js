const sharp = require('sharp');
const fs = require('fs');

async function optimizeAbout() {
  const input = 'assets/images/about-us-new.webp';
  const output = 'assets/images/about-us-new-opt.webp';
  try {
    await sharp(input)
      .resize(1400)
      .webp({ quality: 85 })
      .toFile(output);
    console.log('Optimization successful');
  } catch (err) {
    console.error('Optimization failed:', err);
  }
}

optimizeAbout();
