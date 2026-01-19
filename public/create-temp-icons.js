// Temporary icon creator for Chrome Extension
// Run this in a browser console or Node.js to create placeholder icons

// This creates simple colored squares as temporary icons
// Replace with proper icons later using icon.svg

const fs = require('fs');
const { createCanvas } = require('canvas');

const sizes = [16, 48, 128];
const color = '#3B82F6'; // Blue color

sizes.forEach(size => {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  
  // Fill background
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, size, size);
  
  // Add white border
  ctx.strokeStyle = 'white';
  ctx.lineWidth = size / 8;
  ctx.strokeRect(size / 8, size / 8, size - size / 4, size - size / 4);
  
  // Add checkmark
  ctx.strokeStyle = 'white';
  ctx.lineWidth = size / 10;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(size * 0.25, size * 0.5);
  ctx.lineTo(size * 0.4, size * 0.65);
  ctx.lineTo(size * 0.75, size * 0.35);
  ctx.stroke();
  
  // Save
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(`./public/icon${size}.png`, buffer);
  console.log(`Created icon${size}.png`);
});

console.log('Temporary icons created successfully!');
console.log('For better quality icons, use the icon.svg file with an image converter.');
