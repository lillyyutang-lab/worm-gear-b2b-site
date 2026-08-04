const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const images = [
  { name: 'applications-new.webp', w: 663, h: 442 },
  { name: 'company-profile.webp', w: 693, h: 378 },
  { name: 'hypoid-gear-reducer.webp', w: 403, h: 403 },
  { name: 'worm-gear-reducer.webp', w: 403, h: 403 },
  { name: 'electric-motor.webp', w: 403, h: 403 },
  { name: 'gear-motor.webp', w: 403, h: 403 },
  { name: 'whatsapp-float.webp', w: 100, h: 100 }
];

const imgDir = 'assets/images/';

async function resize() {
  for (const img of images) {
    const input = path.join(imgDir, img.name);
    const output = path.join(imgDir, 'resized_' + img.name);
    
    if (fs.existsSync(input)) {
      try {
        await sharp(input)
          .resize(img.w, img.h, { fit: 'fill' }) // match exact dimensions from audit
          .toFile(output);
        
        fs.unlinkSync(input);
        fs.renameSync(output, input);
        console.log(`Resized ${img.name} to ${img.w}x${img.h}`);
      } catch (err) {
        console.error(`Error resizing ${img.name}:`, err);
      }
    } else {
      console.warn(`File not found: ${input}`);
    }
  }
}

resize();
