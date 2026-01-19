// This file provides instructions for creating icons
// You can use any image editor or online tool to create these icons

/*
ICON REQUIREMENTS:
- Create PNG files with the following sizes:
  - icon16.png (16x16 pixels)
  - icon48.png (48x48 pixels)
  - icon128.png (128x128 pixels)

- Suggested design:
  - Blue background (#3B82F6)
  - White document/form icon with horizontal lines
  - Green checkmark in top-right corner

- Place all three files in the /public/ folder

QUICK METHOD:
1. Open /public/icon.svg in any browser
2. Take a screenshot
3. Resize to 128x128, 48x48, and 16x16
4. Save as icon128.png, icon48.png, icon16.png in /public/

OR use an online tool:
- Go to: https://redketchup.io/icon-converter
- Upload the icon.svg file
- Generate PNG files at 16, 48, and 128 pixels
- Download and place in /public/

OR use ImageMagick (if installed):
  convert icon.svg -resize 16x16 icon16.png
  convert icon.svg -resize 48x48 icon48.png
  convert icon.svg -resize 128x128 icon128.png
*/

console.log(`
To create extension icons:

1. Option A - Use the HTML generator:
   - Open /public/generate-icons.html in a browser
   - Click "Generate Icons"
   - Move downloaded files to /public/

2. Option B - Use an online converter:
   - Visit https://redketchup.io/icon-converter
   - Upload /public/icon.svg
   - Generate 16x16, 48x48, 128x128 PNG files
   - Save to /public/ folder

3. Option C - Use any image editor:
   - Open /public/icon.svg
   - Export as PNG at 16, 48, and 128 pixels
   - Save as icon16.png, icon48.png, icon128.png
`);
