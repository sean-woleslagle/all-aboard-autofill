# Troubleshooting Guide

This guide helps you solve common issues with the Job Application Auto-Filler extension.

---

## 🚨 Installation Issues

### Problem: "Failed to load extension"

**Symptoms:**
- Chrome shows error when loading unpacked extension
- Extension doesn't appear in extensions list

**Solutions:**

1. **Check icon files exist**
   ```
   /public/icon16.png
   /public/icon48.png
   /public/icon128.png
   ```
   - If missing, follow icon generation steps
   - Rebuild: `npm run build`

2. **Verify build completed**
   - Check that `dist` folder exists
   - Ensure it contains `manifest.json`, `content.js`, and icon files
   - Try rebuilding: `npm run build`

3. **Select correct folder**
   - Must select `dist` folder, NOT project root
   - Look for folder with `manifest.json` inside

4. **Check manifest.json**
   - Open `dist/manifest.json`
   - Verify it's valid JSON (no syntax errors)
   - Check all file references are correct

---

### Problem: Extension loads but icons are missing

**Symptoms:**
- Extension shows generic puzzle piece icon
- No custom icon in toolbar

**Solutions:**

1. **Generate icons**
   - Open `dist/generate-icons.html`
   - Click "Generate All Icons"
   - Move PNGs to `/public/`
   - Rebuild: `npm run build`

2. **Check icon file names**
   - Must be exactly: `icon16.png`, `icon48.png`, `icon128.png`
   - Case sensitive
   - PNG format only

3. **Reload extension**
   - Go to `chrome://extensions/`
   - Click reload icon on your extension
   - Icons should appear

---

### Problem: "npm install" fails

**Symptoms:**
- Error messages during installation
- Missing dependencies

**Solutions:**

1. **Check Node.js version**
   ```bash
   node --version
   ```
   - Must be v16 or higher
   - Update Node.js if needed

2. **Clear npm cache**
   ```bash
   npm cache clean --force
   rm -rf node_modules
   npm install
   ```

3. **Try different registry**
   ```bash
   npm install --registry=https://registry.npmjs.org/
   ```

4. **Check internet connection**
   - Ensure stable connection
   - Try on different network if VPN issues

---

## 🔧 Functionality Issues

### Problem: Forms not auto-filling

**Symptoms:**
- Click "Auto-Fill Current Page" but nothing happens
- Fields remain empty

**Solutions:**

1. **Verify settings saved**
   - Open extension settings
   - Check that information is entered
   - Click "Save Settings"
   - Green success message should appear

2. **Check Chrome Storage**
   - Open DevTools (F12)
   - Go to Application > Storage > Chrome Extension
   - Verify `userData` exists

3. **Try manual process**
   - Open extension
   - Verify data is visible in fields
   - Close and reopen extension
   - Try fill again

4. **Check page compatibility**
   - Some sites use iframes (can't fill those)
   - Some sites load forms dynamically
   - Try waiting 5 seconds after page load

5. **Check console errors**
   - Open DevTools (F12)
   - Go to Console tab
   - Look for red error messages
   - Share errors for debugging

---

### Problem: Only some fields fill

**Symptoms:**
- Name fills but address doesn't
- Partial form completion

**Reasons & Solutions:**

1. **Field not detected**
   - Website uses non-standard field names
   - Fill manually for those fields
   - Report field names for future updates

2. **Data not entered**
   - Check that you entered data for those fields
   - Some fields are optional (address2, social links)
   - Verify in extension settings

3. **Field already has value**
   - Extension won't override existing values
   - Clear field first, then auto-fill

4. **Custom form implementation**
   - Some sites use React/Vue with special handling
   - May need manual entry
   - This is a limitation of those sites

---

### Problem: Wrong data in wrong fields

**Symptoms:**
- First name appears in last name field
- Email appears in wrong field

**Solutions:**

1. **Non-standard form**
   - Website uses unusual field names
   - Manually correct the fields
   - Report website for future improvements

2. **Multiple fields match**
   - Site has ambiguous field names
   - Extension picks first match
   - Manually verify and correct

3. **Embedded forms**
   - Page has multiple forms
   - Extension fills all matching fields
   - Check which form you're using

---

### Problem: Auto-fill on page load not working

**Symptoms:**
- Toggle enabled but forms don't auto-fill
- Manual fill works, automatic doesn't

**Solutions:**

1. **Verify toggle enabled**
   - Open extension settings
   - Check "Auto-fill on page load" is ON (blue)
   - Click "Save Settings"

2. **Reload page**
   - After enabling, reload the job site
   - Extension only activates on fresh page load

3. **Wait for page to load**
   - Forms might load dynamically
   - Wait 2-3 seconds after page appears
   - Try manual fill if automatic fails

4. **Check content script loaded**
   - Open DevTools (F12)
   - Go to Sources > Content Scripts
   - Look for `content.js`
   - If missing, reload extension

---

## 💾 Data Management Issues

### Problem: Settings don't save

**Symptoms:**
- Enter data, click save, but data disappears
- Settings reset when reopening extension

**Solutions:**

1. **Click Save Settings**
   - Must click "Save Settings" button
   - Wait for success message
   - Don't close immediately

2. **Check storage permissions**
   - Go to `chrome://extensions/`
   - Find extension
   - Verify permissions include "storage"

3. **Storage quota exceeded**
   - Chrome Storage has 100KB limit
   - Unlikely but possible with very long employment history
   - Try reducing description length

4. **Browser storage disabled**
   - Check Chrome settings
   - Ensure cookies/storage enabled
   - Try different Chrome profile

---

### Problem: Export doesn't work

**Symptoms:**
- Click export, no file downloads
- Error message appears

**Solutions:**

1. **Check download permissions**
   - Allow downloads in Chrome settings
   - Check popup blocker settings

2. **Check download folder**
   - File might be downloading
   - Look in default download folder
   - Check Chrome downloads (Ctrl+J)

3. **Try different browser**
   - Test in Incognito mode
   - Try different Chrome profile

---

### Problem: Import fails

**Symptoms:**
- "Invalid JSON file" error
- Data doesn't load after import

**Solutions:**

1. **Verify file format**
   - Must be `.json` file
   - Previously exported from extension
   - Not edited or corrupted

2. **Check JSON validity**
   - Open file in text editor
   - Ensure valid JSON syntax
   - Use online JSON validator

3. **Re-export and try again**
   - Export data again
   - Don't modify the file
   - Import fresh export

4. **Manual entry**
   - If import fails, enter data manually
   - Use exported JSON as reference

---

## 🌐 Browser Issues

### Problem: Extension not visible

**Symptoms:**
- Can't find extension icon
- Extension installed but hidden

**Solutions:**

1. **Pin extension**
   - Click puzzle piece icon in toolbar
   - Find "Job Application Auto-Filler"
   - Click pin icon
   - Extension appears in toolbar

2. **Extensions menu**
   - Click puzzle piece icon
   - Extension should be in list
   - Click to open settings

---

### Problem: Extension disabled

**Symptoms:**
- Extension grayed out
- "This extension is disabled" message

**Solutions:**

1. **Enable extension**
   - Go to `chrome://extensions/`
   - Find extension
   - Toggle switch to ON
   - Should turn blue

2. **Check for errors**
   - Red error message on extension card
   - Click "Details" for more info
   - May need to rebuild

3. **Reload extension**
   - Click reload icon
   - Wait for reload to complete
   - Test functionality

---

### Problem: "Developer mode extensions" warning

**Symptoms:**
- Chrome shows warning about developer extensions
- Warning on every browser start

**This is normal:**
- Extension is loaded as "unpacked"
- Not from Chrome Web Store
- Warning is expected
- Safe to use for personal use

**To remove warning:**
- Would need to publish to Chrome Web Store
- Or use extension permanently in Developer Mode
- This is a Chrome limitation

---

## 🐛 Debugging Steps

### General debugging process:

1. **Check the basics**
   - Extension enabled?
   - Settings saved?
   - Correct page type?

2. **Open DevTools**
   ```
   F12 or Right-click > Inspect
   ```

3. **Check Console**
   - Look for red errors
   - Look for yellow warnings
   - Note any messages

4. **Check Extension Storage**
   - DevTools > Application > Storage
   - Chrome Extension > [Extension ID]
   - Verify `userData` exists and looks correct

5. **Check Content Script**
   - DevTools > Sources > Content Scripts
   - Find `content.js`
   - Set breakpoints if needed

6. **Check Network**
   - DevTools > Network
   - Verify no failed requests
   - Check if page loaded completely

7. **Test in isolation**
   - Try `/public/demo.html`
   - If works there but not on real site, it's site-specific
   - If doesn't work on demo, it's extension issue

---

## 🔄 Reset & Reinstall

### Complete reset process:

1. **Remove extension**
   - Go to `chrome://extensions/`
   - Click "Remove" on extension
   - Confirm removal

2. **Clean build**
   ```bash
   rm -rf dist node_modules
   npm install
   npm run build
   ```

3. **Recreate icons**
   - Follow icon generation steps
   - Ensure all 3 sizes created

4. **Reload extension**
   - Load unpacked from `dist` folder
   - Configure settings from scratch
   - Test on demo page

---

## 📞 Getting Help

### Before asking for help:

- [ ] Checked this troubleshooting guide
- [ ] Tried rebuilding: `npm run build`
- [ ] Verified settings are saved
- [ ] Checked browser console for errors
- [ ] Tested on demo.html page
- [ ] Tried in Incognito mode

### Information to provide:

1. **Environment**
   - Chrome version: `chrome://version/`
   - Extension version
   - Operating system

2. **Steps to reproduce**
   - What you did
   - What you expected
   - What actually happened

3. **Error messages**
   - Console errors (with screenshot)
   - Extension errors
   - Build errors

4. **What you've tried**
   - List troubleshooting steps attempted
   - Results of each attempt

---

## ✅ Quick Fixes Checklist

Try these quick fixes first:

- [ ] Click "Save Settings" after entering data
- [ ] Reload the web page
- [ ] Reload the extension (`chrome://extensions/`)
- [ ] Disable and re-enable extension
- [ ] Close and reopen browser
- [ ] Try in Incognito mode
- [ ] Check console for errors (F12)
- [ ] Rebuild: `npm run build`
- [ ] Verify icons exist in `/public/`
- [ ] Test on `/public/demo.html`

---

## 🎯 Common Solutions Summary

| Problem | Quick Fix |
|---------|-----------|
| Forms not filling | Click "Save Settings" |
| Extension won't load | Check icons exist, rebuild |
| Settings don't save | Click "Save Settings" button |
| Can't find extension | Pin it (puzzle icon) |
| Some fields don't fill | Manual entry for non-standard forms |
| Auto-fill on load broken | Verify toggle ON, save, reload page |
| Import fails | Check file is valid JSON |
| Icons missing | Generate icons, rebuild |

---

**Still having issues? Double-check the [SETUP_GUIDE.md](SETUP_GUIDE.md) and [HOW_TO_USE.md](HOW_TO_USE.md) for detailed instructions.**
