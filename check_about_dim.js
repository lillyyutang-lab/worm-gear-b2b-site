const sharp = require('sharp');
const path = require('path');

const img = 'assets/images/about-us-new.webp';

async function check() {
    try {
      const metadata = await sharp(img).metadata();
      console.log(`${path.basename(img)}, ${metadata.width}, ${metadata.height}`);
    } catch (err) {
      console.log(`${path.basename(img)}, Error, ${err.message}`);
    }
}

check();
