# Job Application Auto-Filler Chrome Extension

A Chrome extension that automatically fills job application forms with your personal information, saving you time and effort when applying to multiple positions.

## Features

- ✅ Auto-fill personal information (name, date of birth, gender)
- ✅ Auto-fill contact details (email, phone, address)
- ✅ Auto-fill social links (LinkedIn, Twitter/X, website)
- ✅ Store employment history
- ✅ Auto-fill demographics (disability status, race, veteran status)
- ✅ Toggle auto-fill on page load
- ✅ Manual auto-fill with one click
- ✅ Export/Import data as JSON
- ✅ Secure local storage using Chrome Storage API

## Installation

### Build the Extension

1. Install dependencies:
```bash
npm install
```

2. Build the extension:
```bash
npm run build
```

3. The extension files will be in the `dist` folder.

### Load in Chrome

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" using the toggle in the top-right corner
3. Click "Load unpacked"
4. Select the `dist` folder from this project
5. The extension should now appear in your extensions list

## Usage

### Configure Your Information

1. Click the extension icon in your Chrome toolbar
2. Fill in your information across the different tabs:
   - **Personal**: First name, last name, date of birth, gender
   - **Contact**: Email, phone, address, city, state, postal code, country
   - **Social**: LinkedIn, Twitter/X, website/portfolio
   - **Employment**: Add your work history
   - **Demographics**: Optional EEO information
3. Click "Save Settings" to store your information

### Auto-Fill Forms

**Manual Mode:**
1. Navigate to a job application page
2. Click the extension icon
3. Click "Auto-Fill Current Page"
4. The form will be populated with your information

**Automatic Mode:**
1. Enable "Auto-fill on page load" in the extension settings
2. When you visit job application pages, forms will be automatically filled
3. The extension waits 1 second after page load to ensure dynamic forms are loaded

### Export/Import Data

**Export:**
- Click "Export Data" to download your information as a JSON file
- Use this to backup your data or transfer to another computer

**Import:**
- Click "Import Data" and select a previously exported JSON file
- Your settings will be restored

## Privacy & Security

- **Local Storage Only**: All data is stored locally in Chrome's secure storage API
- **No Tracking**: This extension does not send any data to external servers
- **No Analytics**: We don't collect any usage data
- **Open Source**: You can review the code to verify security

## Field Detection

The extension automatically detects form fields by analyzing:
- Input field names
- Input field IDs
- Placeholder text
- ARIA labels
- Autocomplete attributes

It supports various naming conventions used across different job application platforms.

## Supported Field Types

- Text inputs
- Email inputs
- Phone inputs
- Date inputs
- Select dropdowns
- Radio buttons
- Checkboxes
- Textareas

## Tips

1. **Fill Before Customizing**: The auto-fill works best as a starting point. Review and customize the filled information for each application.
2. **Keep Data Updated**: Regularly update your information in the extension settings.
3. **Export Regularly**: Create backups of your data using the export feature.
4. **Disable When Not Needed**: Turn off "Auto-fill on page load" when you're not actively job hunting.

## Troubleshooting

**Extension not filling fields:**
- Make sure you've saved your settings
- Try clicking "Auto-Fill Current Page" manually
- Some sites use custom form implementations that may not be detected
- Check browser console for any errors

**Data not saving:**
- Ensure you click "Save Settings" after making changes
- Check that Chrome Storage API is enabled

**Auto-fill not working on page load:**
- Some sites load forms dynamically - try manual fill instead
- Increase the delay in the content script if needed

## Development

### File Structure

```
/public/
  manifest.json         # Chrome extension manifest
  content.js           # Content script for form detection and filling
  
/src/
  /app/
    App.tsx            # Main settings interface
    /components/
      PersonalInfoSection.tsx
      ContactInfoSection.tsx
      SocialLinksSection.tsx
      EmploymentSection.tsx
      DemographicsSection.tsx
```

### Building for Production

```bash
npm run build
```

The built extension will be in the `dist` folder, ready to be loaded in Chrome or packaged for distribution.

## License

This project is open source and available for personal use.

## Support

For issues or feature requests, please check the project repository.
