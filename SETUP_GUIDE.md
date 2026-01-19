# Chrome Extension Setup Guide

This guide will help you build and install the Job Application Auto-Filler Chrome extension.

## Prerequisites

- Node.js installed (version 16 or higher)
- Google Chrome browser
- Basic command line knowledge

## Step 1: Install Dependencies

Open a terminal in the project directory and run:

```bash
npm install
```

## Step 2: Create Extension Icons

The extension needs three icon sizes: 16x16, 48x48, and 128x128 pixels.

### Option A: Use an Online Tool (Easiest)

1. Go to https://redketchup.io/icon-converter or similar
2. Upload the `/public/icon.svg` file
3. Generate PNG files at sizes: 16, 48, and 128 pixels
4. Download and rename them to:
   - `icon16.png`
   - `icon48.png`
   - `icon128.png`
5. Place all three files in the `/public/` folder

### Option B: Use the Built-in Generator

1. Build the project first (see Step 3)
2. Open `dist/generate-icons.html` in Chrome
3. Click "Generate Icons"
4. Move the downloaded PNG files to `/public/`
5. Rebuild the project

### Option C: Use Any Image Editor

1. Open `/public/icon.svg` in your preferred image editor
2. Export as PNG at 16x16, 48x48, and 128x128 pixels
3. Save as `icon16.png`, `icon48.png`, `icon128.png` in `/public/`

## Step 3: Build the Extension

Run the build command:

```bash
npm run build
```

This creates a `dist` folder with all the extension files.

## Step 4: Load Extension in Chrome

1. Open Google Chrome
2. Navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top-right corner)
4. Click "Load unpacked"
5. Select the `dist` folder from this project
6. The extension should now appear in your extensions list

## Step 5: Pin the Extension (Optional)

1. Click the puzzle piece icon in Chrome's toolbar
2. Find "Job Application Auto-Filler"
3. Click the pin icon to keep it visible

## Step 6: Configure Your Information

1. Click the extension icon in your toolbar
2. Fill in your information across all tabs
3. Click "Save Settings"

## Using the Extension

### Manual Auto-Fill

1. Navigate to any job application page
2. Click the extension icon
3. Click "Auto-Fill Current Page"

### Automatic Auto-Fill

1. Enable "Auto-fill on page load" in settings
2. Forms will be filled automatically when you visit job sites

## Troubleshooting

### Extension won't load
- Make sure you selected the `dist` folder, not the project root
- Check that all icon files exist in `/public/`
- Try rebuilding with `npm run build`

### Icons missing
- Follow Step 2 to create the icon files
- Rebuild after adding icons
- Reload the extension in Chrome

### Auto-fill not working
- Make sure you've saved your settings
- Try manual fill first
- Check browser console for errors (F12)

### Changes not appearing
- After modifying code:
  1. Run `npm run build`
  2. Go to `chrome://extensions/`
  3. Click the refresh icon on your extension

## Development Workflow

1. Make code changes
2. Run `npm run build`
3. Reload extension in Chrome
4. Test the changes

## File Structure

```
/public/
  manifest.json       # Extension configuration
  content.js         # Form detection and filling script
  icon16.png         # Small icon
  icon48.png         # Medium icon
  icon128.png        # Large icon

/src/
  /app/
    App.tsx          # Main settings UI
    /components/     # UI components
```

## Privacy Note

All data is stored locally on your computer using Chrome's Storage API. No information is sent to external servers.

## Next Steps

After installation:
1. Configure all your information
2. Export your data as backup
3. Test on a few job sites
4. Adjust settings as needed

## Support

If you encounter issues:
1. Check this guide's troubleshooting section
2. Verify all prerequisites are met
3. Review the browser console for errors
4. Try rebuilding the extension

Happy job hunting! 🎉
