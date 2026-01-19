# Installation Checklist

Follow this checklist to successfully install and use the Job Application Auto-Filler Chrome Extension.

## Prerequisites ✓

- [ ] Node.js installed (v16 or higher) - Check with: `node --version`
- [ ] npm installed - Check with: `npm --version`
- [ ] Google Chrome browser
- [ ] Project files downloaded/cloned

## Installation Steps ✓

### 1. Build Setup

- [ ] Open terminal in project directory
- [ ] Run `npm install` (wait for completion)
- [ ] Verify no errors in terminal

### 2. Create Icons

Choose ONE method:

**Method A: HTML Generator (Recommended)**
- [ ] Run `npm run build` first
- [ ] Open `dist/generate-icons.html` in Chrome
- [ ] Click "Generate All Icons" button
- [ ] Verify 3 PNG files downloaded (16, 48, 128)
- [ ] Move files to `/public/` folder
- [ ] Files named: `icon16.png`, `icon48.png`, `icon128.png`

**Method B: Online Tool**
- [ ] Visit https://redketchup.io/icon-converter
- [ ] Upload `/public/icon.svg`
- [ ] Generate at sizes: 16, 48, 128
- [ ] Download and rename properly
- [ ] Place in `/public/` folder

**Method C: Image Editor**
- [ ] Open `/public/icon.svg` in editor
- [ ] Export as PNG: 16x16, 48x48, 128x128
- [ ] Save as `icon16.png`, `icon48.png`, `icon128.png`
- [ ] Place in `/public/` folder

### 3. Build Extension

- [ ] Run `npm run build` in terminal
- [ ] Wait for build to complete
- [ ] Verify `dist` folder created
- [ ] Check that `dist` contains:
  - [ ] `index.html`
  - [ ] `manifest.json`
  - [ ] `content.js`
  - [ ] `icon16.png`, `icon48.png`, `icon128.png`
  - [ ] Other asset files

### 4. Load in Chrome

- [ ] Open Chrome browser
- [ ] Navigate to `chrome://extensions/`
- [ ] Enable "Developer mode" (top-right toggle)
- [ ] Click "Load unpacked" button
- [ ] Navigate to project folder
- [ ] Select the `dist` folder (NOT the root folder)
- [ ] Click "Select Folder"
- [ ] Verify extension appears in list
- [ ] Check for any error messages
- [ ] Extension shows: "Job Application Auto-Filler"

### 5. Pin Extension (Optional but Recommended)

- [ ] Click puzzle piece icon in Chrome toolbar
- [ ] Find "Job Application Auto-Filler"
- [ ] Click pin icon
- [ ] Verify extension icon visible in toolbar

## Configuration ✓

### 6. Initial Setup

- [ ] Click extension icon in toolbar
- [ ] Settings page opens
- [ ] All tabs visible: Personal, Contact, Social, Employment, Demographics

### 7. Enter Your Information

**Personal Tab:**
- [ ] First name entered
- [ ] Last name entered
- [ ] Date of birth entered (optional)
- [ ] Gender selected (optional)

**Contact Tab:**
- [ ] Email address entered
- [ ] Phone number entered
- [ ] Address line 1 entered
- [ ] Address line 2 entered (if applicable)
- [ ] City entered
- [ ] State entered
- [ ] Postal code entered
- [ ] Country entered

**Social Tab:**
- [ ] LinkedIn URL entered (optional)
- [ ] Twitter/X URL entered (optional)
- [ ] Website/Portfolio URL entered (optional)

**Employment Tab:**
- [ ] At least one job added (if applicable)
- [ ] Company name filled
- [ ] Position/title filled
- [ ] Start date filled
- [ ] End date filled (or left empty if current)
- [ ] Description filled

**Demographics Tab (Optional):**
- [ ] Disability status selected (if sharing)
- [ ] Race/ethnicity selected (if sharing)
- [ ] Veteran status selected (if sharing)

### 8. Save & Backup

- [ ] Clicked "Save Settings" button
- [ ] Success message appeared
- [ ] Clicked "Export Data" button
- [ ] JSON file downloaded
- [ ] JSON file saved to safe location
- [ ] File backed up (cloud, USB, etc.)

## Testing ✓

### 9. Test the Extension

**Using Demo Form:**
- [ ] Open `/public/demo.html` in browser
- [ ] Click extension icon
- [ ] Click "Auto-Fill Current Page"
- [ ] Form fields populated correctly
- [ ] All expected fields filled
- [ ] No errors in console (F12)

**Using Real Job Site:**
- [ ] Visit a job application page
- [ ] Click extension icon
- [ ] Click "Auto-Fill Current Page"
- [ ] Review filled information
- [ ] Customize as needed
- [ ] Test submission (optional)

### 10. Auto-Fill on Load (Optional)

- [ ] Open extension settings
- [ ] Toggle "Auto-fill on page load" ON
- [ ] Visit job application page
- [ ] Wait 1-2 seconds
- [ ] Form auto-fills automatically
- [ ] Test turning toggle OFF
- [ ] Verify auto-fill stops

## Troubleshooting ✓

If you encounter issues, check:

- [ ] All icons exist in `/public/` folder
- [ ] `npm run build` completed without errors
- [ ] Selected `dist` folder, not root folder
- [ ] "Developer mode" is enabled
- [ ] Clicked "Save Settings" after entering data
- [ ] Extension enabled in Chrome
- [ ] No error messages in extension list
- [ ] Browser console shows no errors (F12)
- [ ] Chrome is up to date

## Common Issues & Solutions

### ❌ "Extension failed to load"
**Solution:**
- [ ] Verify icon files exist
- [ ] Rebuild with `npm run build`
- [ ] Check for error messages
- [ ] Try removing and re-adding extension

### ❌ "Fields not auto-filling"
**Solution:**
- [ ] Verify settings saved
- [ ] Try manual fill first
- [ ] Check console for errors
- [ ] Verify correct field data entered

### ❌ "Settings not persisting"
**Solution:**
- [ ] Click "Save Settings" button
- [ ] Check storage permissions
- [ ] Try export/import workflow
- [ ] Reload extension

## Post-Installation ✓

### 11. Final Steps

- [ ] Extension working correctly
- [ ] Data exported and backed up
- [ ] Demo form tested successfully
- [ ] Real job site tested
- [ ] Comfortable with manual fill
- [ ] Understand auto-fill toggle
- [ ] Read [HOW_TO_USE.md](HOW_TO_USE.md)
- [ ] Bookmarked for future reference

## You're All Set! 🎉

Your extension is now ready to use. Remember to:

✅ Always review auto-filled information before submitting  
✅ Customize your application for each specific job  
✅ Keep your information updated in settings  
✅ Export your data regularly as backup  
✅ Disable auto-fill when not actively job hunting  

---

**Need Help?**

- Quick Start: [QUICK_START.md](QUICK_START.md)
- Setup Guide: [SETUP_GUIDE.md](SETUP_GUIDE.md)
- How to Use: [HOW_TO_USE.md](HOW_TO_USE.md)
- Full Documentation: [README.md](README.md)

**Happy job hunting! Good luck! 🚀**
