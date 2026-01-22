# 🎯 Job Application Auto-Filler Chrome Extension

A powerful Chrome extension that automatically fills job application forms with your personal information, saving hours of repetitive typing when applying for jobs.

![Extension Demo](https://img.shields.io/badge/Chrome-Extension-blue?logo=google-chrome)
![Version](https://img.shields.io/badge/version-1.1.0-green)
![License](https://img.shields.io/badge/license-MIT-blue)

## ✨ Features

- **🔄 Auto-Fill Forms** - Automatically detect and fill common job application fields
- **👤 Personal Information** - Store first name, last name, date of birth, gender
- **📧 Contact Details** - Email, phone number, complete address
- **💼 Employment History** - Manage multiple previous positions with dates and descriptions
- **🔗 Social Links** - LinkedIn, Twitter/X, personal website/portfolio
- **📊 Demographics** - Optional EEO information (disability status, race, veteran status)
- **⚡ Two Modes** - Manual fill on-demand or automatic fill on page load
- **💾 Data Management** - Export/import your data as JSON for backup or transfer
- **🔒 Privacy First** - All data stored locally, nothing sent to external servers
- **🎨 Beautiful UI** - Modern, intuitive settings interface built with React

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Create Extension Icons
- Open `/public/generate-icons.html` in your browser
- Click "Generate All Icons"
- Move the downloaded `icon16.png`, `icon48.png`, `icon128.png` to `/public/`

### 3. Build the Extension
```bash
npm run build
```

### 4. Load in Chrome
1. Navigate to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top-right)
3. Click "Load unpacked"
4. Select the `dist` folder

### 5. Configure & Use
1. Click the extension icon
2. Fill in your information
3. Click "Save Settings"
4. Visit any job application page
5. Click "Auto-Fill Current Page" or enable auto-fill

## 📖 Documentation

- **[Quick Start Guide](QUICK_START.md)** - Get up and running in 5 minutes
- **[Setup Guide](SETUP_GUIDE.md)** - Detailed installation instructions
- **[Extension README](EXTENSION_README.md)** - Complete feature documentation

## 🎨 Preview

The extension includes:
- **Settings Page** - Tabbed interface for managing all your information
- **Personal Info Tab** - Name, date of birth, gender
- **Contact Tab** - Email, phone, full address details
- **Social Tab** - Professional social media links
- **Employment Tab** - Add and manage work history
- **Demographics Tab** - Optional EEO information

## 🧪 Test It Out

Open `/public/demo.html` in your browser to see a sample job application form that you can test the extension on.

## 🛠️ Technical Stack

- **React 18.3** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling
- **Radix UI** - Accessible components
- **Chrome Storage API** - Secure local data storage
- **Vite** - Build tool

## 📁 Project Structure

```
/
├── public/
│   ├── manifest.json          # Chrome extension manifest
│   ├── content.js            # Form detection and auto-fill logic
│   ├── demo.html             # Test form for the extension
│   └── generate-icons.html   # Icon generator tool
├── src/
│   └── app/
│       ├── App.tsx           # Main settings UI
│       └── components/
│           ├── PersonalInfoSection.tsx
│           ├── ContactInfoSection.tsx
│           ├── SocialLinksSection.tsx
│           ├── EmploymentSection.tsx
│           └── DemographicsSection.tsx
└── dist/                     # Built extension (after npm run build)
```

## 🔧 Development

### Build for Production
```bash
npm run build
```

### Making Changes
1. Modify source files
2. Run `npm run build`
3. Go to `chrome://extensions/`
4. Click refresh icon on your extension
5. Test your changes

## 🎯 Supported Fields

The extension automatically detects and fills:

- **Names**: firstname, lastname, first-name, last-name, fname, lname, etc.
- **Contact**: email, phone, telephone, mobile, etc.
- **Address**: address, street, city, state, zip, postal-code, country, etc.
- **Personal**: dob, date-of-birth, gender, sex, etc.
- **Social**: linkedin, twitter, x, website, portfolio, etc.
- **Demographics**: disability, race, ethnicity, veteran, etc.

The extension uses intelligent field detection based on:
- Input field names
- Input field IDs
- Placeholder text
- ARIA labels
- Autocomplete attributes

## 🔒 Privacy & Security

- ✅ **100% Local Storage** - All data stored in Chrome's secure Storage API
- ✅ **No External Servers** - Zero data transmission to any server
- ✅ **No Tracking** - No analytics or usage tracking
- ✅ **No Permissions Abuse** - Only requests necessary permissions
- ✅ **Open Source** - Full source code available for review

## 💡 Tips

1. **Review Before Submitting** - Always check auto-filled information before submitting applications
2. **Keep Data Updated** - Regularly update your information in the extension settings
3. **Export Regularly** - Create backups using the export feature
4. **Customize Per Job** - The extension fills a starting point; tailor for each position
5. **Disable When Not Needed** - Turn off auto-fill when not actively job hunting

## 🐛 Troubleshooting

**Extension won't load:**
- Ensure you selected the `dist` folder, not project root
- Verify all icon files exist in `/public/`
- Rebuild with `npm run build`

**Fields not filling:**
- Click "Save Settings" after entering information
- Try manual fill instead of automatic
- Some sites use custom form implementations

**Icons missing:**
- Follow icon generation steps in Quick Start
- Rebuild after adding icons
- Check that PNG files are in `/public/`

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## 📄 License

This project is open source and available under the MIT License.

## 🎓 Use Cases

Perfect for:
- Job seekers applying to multiple positions
- Recent graduates entering the job market
- Career changers exploring new opportunities
- Freelancers looking for contract work
- Anyone tired of filling the same forms repeatedly

## ⚠️ Disclaimer

This extension is designed to assist with filling repetitive form data. Always:
- Review all auto-filled information before submitting
- Customize your responses for each specific job
- Read and follow each company's application guidelines
- Ensure accuracy of all submitted information

---

**Made with ❤️ for job seekers everywhere**

*Happy job hunting! 🎉*
