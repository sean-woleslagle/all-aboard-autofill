# How to Use the Job Application Auto-Filler

## First Time Setup

### Step 1: Configure Your Information

After installing the extension, click on the extension icon in your Chrome toolbar to open the settings page.

#### Personal Tab
- Enter your first and last name
- Add your date of birth (format: YYYY-MM-DD)
- Select your gender

#### Contact Tab
- Email address
- Phone number
- Street address (Address Line 1)
- Apartment/Suite (Address Line 2) - optional
- City, State, Postal Code, Country

#### Social Tab
- LinkedIn profile URL
- Twitter/X profile URL
- Personal website or portfolio URL

#### Employment Tab
- Click "Add Employment" to add a job
- Fill in:
  - Company name
  - Position/Job title
  - Start date (month and year)
  - End date (leave empty if current position)
  - Job description
- Add multiple positions if needed
- Use the trash icon to remove entries

#### Demographics Tab (Optional)
- Disability status
- Race/Ethnicity
- Veteran status

*Note: This information is often requested for Equal Employment Opportunity (EEO) reporting and is typically optional.*

### Step 2: Save Your Settings

After entering all your information, click the **"Save Settings"** button at the top of the page.

### Step 3: Export Your Data (Recommended)

Click **"Export Data"** to download a JSON backup of your information. Store this file safely - you can use it to:
- Restore your data if you reinstall the extension
- Transfer your data to another computer
- Keep a backup of your information

## Using Auto-Fill

### Method 1: Manual Fill (Recommended)

1. Navigate to any job application page
2. Click the extension icon in your Chrome toolbar
3. Click **"Auto-Fill Current Page"**
4. The form will be populated with your saved information
5. **Review and customize** the filled information for the specific job
6. Submit your application

### Method 2: Automatic Fill

1. In the extension settings, toggle on **"Auto-fill on page load"**
2. When you visit job application pages, forms will be automatically filled after 1 second
3. **Important**: This mode fills forms automatically, so make sure to review the information before submitting

## Tips for Best Results

### ✅ Do's

- **Always review** auto-filled information before submitting
- **Customize** your responses for each specific position
- **Keep your data updated** in the extension settings
- **Export regularly** to backup your information
- **Test first** on the included demo.html page
- **Save after changes** - click "Save Settings" every time you update your info

### ❌ Don'ts

- **Don't submit blindly** - always review what was filled
- **Don't store sensitive** financial information (SSN, credit cards)
- **Don't use for shared computers** without clearing data afterwards
- **Don't assume all fields** will be filled - some sites use custom forms
- **Don't forget to customize** - tailor each application to the job

## Field Detection

The extension detects form fields by looking for common keywords in:
- Field names (e.g., "firstName", "first_name")
- Field IDs
- Placeholder text
- ARIA labels
- Autocomplete attributes

### Commonly Detected Fields

- **Names**: First name, last name, full name
- **Contact**: Email, phone, address fields
- **Location**: City, state, zip/postal code, country
- **Personal**: Date of birth, gender
- **Professional**: LinkedIn, Twitter, portfolio links
- **EEO**: Disability status, race, veteran status

## Troubleshooting

### Fields Not Filling

**Problem**: Some fields aren't being filled  
**Solutions**:
- Make sure you clicked "Save Settings"
- Try using manual fill instead of automatic
- Check that you've entered data for those specific fields
- Some websites use custom field names - you may need to fill manually

### Wrong Information Filled

**Problem**: Extension fills incorrect data in some fields  
**Solutions**:
- This can happen with non-standard forms
- Simply correct the fields manually
- The extension is meant to save time, not be 100% perfect

### Extension Not Working

**Problem**: Extension doesn't appear or work  
**Solutions**:
- Refresh the page and try again
- Check that the extension is enabled in `chrome://extensions/`
- Make sure you've saved your settings
- Try reloading the extension

### Data Not Saving

**Problem**: Settings don't persist  
**Solutions**:
- Make sure you clicked "Save Settings"
- Check Chrome storage permissions
- Try exporting and reimporting your data

## Privacy & Security

### Your Data is Safe

- ✅ All information stored **locally** on your computer
- ✅ **No data sent** to any external servers
- ✅ **No tracking or analytics**
- ✅ Uses Chrome's secure Storage API
- ✅ Only you can access your saved information

### Best Practices

1. **Use export/import** for backups, not cloud storage
2. **Clear data** if using a shared computer (click "Clear All Data" in settings)
3. **Don't store** highly sensitive information like SSN or passwords
4. **Review permissions** - the extension only needs what's listed in manifest

## Advanced Features

### Import Previously Saved Data

1. Click **"Import Data"**
2. Select your previously exported JSON file
3. Your settings will be restored
4. Click "Save Settings" to confirm

### Managing Multiple Profiles

While the extension currently supports one profile, you can:
1. Export your data for "Job Type A"
2. Create new settings for "Job Type B"
3. Export that data too
4. Import whichever profile you need before applying

### Keyboard Shortcuts (Future Feature)

Currently not implemented, but could be added:
- `Ctrl+Shift+F` - Fill current page
- `Ctrl+Shift+S` - Open settings

## Getting Help

### Common Questions

**Q: Will this work on LinkedIn job applications?**  
A: Yes, it works on most job sites including LinkedIn, Indeed, Monster, and company career pages.

**Q: Can I use this for non-job forms?**  
A: Yes! It can fill any web form with matching field names.

**Q: How do I uninstall?**  
A: Go to `chrome://extensions/`, find the extension, and click "Remove". Your data will be deleted.

**Q: Can others see my saved data?**  
A: No, data is stored locally on your computer in Chrome's secure storage.

## Support

If you encounter issues:

1. Check this guide's troubleshooting section
2. Review the [README.md](README.md) for technical details
3. Open the browser console (F12) to check for errors
4. Try rebuilding and reloading the extension

---

**Remember**: This extension is a tool to save time, but you should always review and customize your job applications for each specific position. Good luck with your job search! 🎉
