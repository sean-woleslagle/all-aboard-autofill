import { writeFileSync } from 'fs';

// Simple colored PNG generation (minimal valid PNG)
function createSimplePng(size, r, g, b) {
  // PNG header
  const signature = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
  
  // IHDR chunk
  const ihdrData = [
    (size >> 24) & 0xff, (size >> 16) & 0xff, (size >> 8) & 0xff, size & 0xff, // width
    (size >> 24) & 0xff, (size >> 16) & 0xff, (size >> 8) & 0xff, size & 0xff, // height
    8, // bit depth
    2, // color type (RGB)
    0, // compression
    0, // filter
    0  // interlace
  ];
  
  // Raw image data (uncompressed for simplicity)
  const rawData = [];
  for (let y = 0; y < size; y++) {
    rawData.push(0); // filter byte
    for (let x = 0; x < size; x++) {
      rawData.push(r, g, b);
    }
  }
  
  return Buffer.from(signature);
}

// Use ImageMagick or a simple approach
import { execSync } from 'child_process';

const sizes = [16, 48, 128];
const color = '#3B82F6';

// Check if ImageMagick is available
try {
  sizes.forEach(size => {
    execSync(`convert -size ${size}x${size} xc:"${color}" icon${size}.png`);
    console.log(`Created icon${size}.png`);
  });
  console.log('Icons created with ImageMagick');
} catch (e) {
  // Fallback: create minimal 1-color PPM and convert
  console.log('ImageMagick not available, trying sips...');
  sizes.forEach(size => {
    // Create a simple PPM file (Portable Pixmap)
    const header = `P6\n${size} ${size}\n255\n`;
    const pixels = Buffer.alloc(size * size * 3, 0);
    // Fill with blue (#3B82F6)
    for (let i = 0; i < size * size; i++) {
      pixels[i * 3] = 0x3B;     // R
      pixels[i * 3 + 1] = 0x82; // G
      pixels[i * 3 + 2] = 0xF6; // B
    }
    writeFileSync(`icon${size}.ppm`, Buffer.concat([Buffer.from(header), pixels]));
    try {
      execSync(`sips -s format png icon${size}.ppm --out icon${size}.png 2>/dev/null`);
      execSync(`rm icon${size}.ppm`);
      console.log(`Created icon${size}.png`);
    } catch (e2) {
      console.log(`Could not convert icon${size}.ppm`);
    }
  });
}
