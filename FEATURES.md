# Extension Features Guide

## 🎨 User Interface

### Settings Page

The extension provides a clean, modern interface divided into tabs:

1. **Quick Actions Bar** (Top)
   - Save Settings button
   - Auto-Fill Current Page button
   - Export Data button
   - Import Data button

2. **Auto-Fill Toggle**
   - Switch to enable/disable auto-fill on page load
   - Clear description of functionality

3. **Tabbed Interface**
   - Personal
   - Contact
   - Social
   - Employment
   - Demographics

---

## 📝 Feature Details

### 1. Personal Information Tab

**What it stores:**
- First Name
- Last Name
- Date of Birth
- Gender

**Field Layout:**
- Two-column grid on desktop
- Single column on mobile
- Date picker for birth date
- Dropdown select for gender with options:
  - Male
  - Female
  - Non-binary
  - Prefer not to say
  - Other

**Auto-fill behavior:**
Detects fields with names/IDs/labels containing:
- firstname, first-name, fname, given-name
- lastname, last-name, lname, surname
- dob, dateofbirth, birthdate
- gender, sex

---

### 2. Contact Information Tab

**What it stores:**
- Email Address
- Phone Number
- Address Line 1
- Address Line 2 (optional)
- City
- State/Province
- Postal Code
- Country

**Field Layout:**
- Email and Phone in two-column grid
- Full width for address lines
- Three-column grid for City/State/Postal Code
- Full width for Country

**Auto-fill behavior:**
Detects fields with names/IDs/labels containing:
- email, e-mail, mail
- phone, telephone, mobile, tel
- address, street
- city, town
- state, province, region
- zip, postal, postcode
- country

---

### 3. Social Links Tab

**What it stores:**
- LinkedIn Profile URL
- X (Twitter) Profile URL
- Personal Website/Portfolio URL
- GitHub Profile URL
- GitLab Profile URL
- Bitbucket Profile URL
- Replit Profile URL
- LeetCode Profile URL
- ArtStation Profile URL
- Bluesky Profile URL
- Instagram Profile URL
- Facebook Profile URL
- TikTok Profile URL
- YouTube Channel URL
- Threads Profile URL
- Mastodon Profile URL
- Medium Profile URL
- Substack Profile URL

**Field Layout:**
- Organized into logical categories:
  - Professional Platforms (LinkedIn, GitHub, GitLab, Bitbucket, LeetCode, Replit, ArtStation)
  - Social Media (X/Twitter, Bluesky, Threads, Mastodon, Instagram, Facebook, TikTok, YouTube)
  - Content & Writing (Medium, Substack)
  - Personal (Website/Portfolio)
- Each field with icon indicator
- Full width fields
- Placeholder text showing URL format

**Icons:**
- Platform-specific icons from lucide-react
- Professional platform icons (LinkedIn, GitHub, Code)
- Social media icons (Twitter, Instagram, Facebook, YouTube)
- Content platform icons (Pen, Newspaper)
- Generic icons for newer platforms (Globe, Cloud)

**Auto-fill behavior:**
Detects fields with names/IDs/labels containing:
- linkedin, linkedin-url, linkedin-profile
- twitter, x, twitter-handle, x-profile
- website, portfolio, homepage
- github, github-url, github-profile, github-username
- gitlab, gitlab-url, gitlab-profile
- bitbucket, bitbucket-url, bitbucket-profile
- replit, replit-url, repl-it
- leetcode, leetcode-url, leetcode-profile
- artstation, artstation-url
- bluesky, bluesky-url, bsky
- instagram, instagram-url, instagram-handle, ig
- facebook, facebook-url, fb
- tiktok, tiktok-url
- youtube, youtube-url, youtube-channel, yt
- threads, threads-url, threads-handle
- mastodon, mastodon-url, mastodon-handle
- medium, medium-url, medium-handle
- substack, substack-url, substack-newsletter

---

### 4. Employment History Tab

**What it stores:**
Multiple employment records, each containing:
- Company Name
- Position/Job Title
- Start Date (month/year)
- End Date (month/year or blank for current)
- Job Description

**Field Layout:**
- Dynamic list of employment entries
- Add/Remove buttons
- Each entry in a bordered card
- Company and Position in two-column grid
- Start and End dates in two-column grid
- Description as full-width textarea

**Features:**
- ➕ Add Employment button
- 🗑️ Delete button for each entry
- No limit on number of entries
- Empty state message when no jobs added

**Auto-fill behavior:**
Currently stores for reference, not auto-filled to forms (most job sites have custom employment history sections)

---

### 5. Demographics Tab

**What it stores:**
- Disability Status
- Race/Ethnicity
- Veteran Status

**Field Layout:**
- Information alert explaining EEO
- Full-width dropdowns
- "Prefer not to say" option for all fields

**Disability Status Options:**
- No, I don't have a disability
- Yes, I have a disability
- Prefer not to say

**Race/Ethnicity Options:**
- American Indian or Alaska Native
- Asian
- Black or African American
- Hispanic or Latino
- Native Hawaiian or Other Pacific Islander
- White
- Two or More Races
- Prefer not to say

**Veteran Status Options:**
- I am not a protected veteran
- I identify as one or more classifications of protected veteran
- Prefer not to say

**Auto-fill behavior:**
Detects fields with names/IDs/labels containing:
- disability, disability-status
- race, ethnicity, ethnic
- veteran, veteran-status, military

---

## 🎯 Auto-Fill Modes

### Manual Fill Mode (Default)

**How it works:**
1. User navigates to a job application page
2. User clicks extension icon
3. User clicks "Auto-Fill Current Page" button
4. Form fields are populated instantly
5. User reviews and customizes information
6. User submits application

**Best for:**
- Maximum control
- Reviewing before filling
- Testing on new sites
- One-off applications

### Automatic Fill Mode

**How it works:**
1. User enables "Auto-fill on page load" toggle
2. User navigates to a job application page
3. After 1 second delay, form is automatically filled
4. User reviews and customizes information
5. User submits application

**Best for:**
- Applying to many positions
- Familiar websites
- Speed and efficiency
- Streamlined workflow

**Technical Details:**
- 1 second delay allows dynamic content to load
- Watches for dynamically added forms
- Won't override existing field values
- Triggers on DOM mutations (new forms added)

---

## 💾 Data Management

### Save Settings

**Button:** "Save Settings"  
**Location:** Quick Actions bar  
**Function:** Saves all entered information to Chrome's Storage API  
**Feedback:** Success toast notification

**Technical:**
- Uses `chrome.storage.sync`
- Syncs across devices (if Chrome sync enabled)
- Maximum 100KB storage limit
- Persists after browser restart

### Export Data

**Button:** "Export Data"  
**Location:** Quick Actions bar  
**Function:** Downloads JSON file with all settings  
**File name:** `job-autofill-data.json`

**Use cases:**
- Backup your information
- Transfer to another computer
- Version control your data
- Share template with others

**File format:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  ...
}
```

### Import Data

**Button:** "Import Data"  
**Location:** Quick Actions bar  
**Function:** Loads data from previously exported JSON file  
**File type:** `.json` only

**Process:**
1. Click "Import Data"
2. Select JSON file from computer
3. Data loaded into form
4. Click "Save Settings" to persist

**Validation:**
- Checks for valid JSON format
- Shows error if file is invalid
- Merges with default structure
- Shows success notification

---

## 🔍 Field Detection System

### How it Works

The extension uses intelligent pattern matching to detect form fields:

1. **Attribute Analysis**
   - Field `name` attribute
   - Field `id` attribute
   - `placeholder` text
   - `aria-label` attribute
   - `autocomplete` attribute

2. **Keyword Matching**
   - Converts all text to lowercase
   - Checks if any keyword appears in any attribute
   - First match wins

3. **Fill Strategy**
   - Regular inputs: Set value and trigger events
   - Select dropdowns: Find matching option
   - Radio buttons: Check if value matches
   - Checkboxes: Set based on boolean value

### Smart Features

**Doesn't Override:**
- Fields that already have values
- Exception: Radio buttons (need to be checked)

**Event Triggering:**
- `input` event - for real-time validation
- `change` event - for form libraries (React, Vue, etc.)
- Bubbles through DOM - triggers parent listeners

**Select Dropdown Matching:**
- Matches option value (case-insensitive)
- Falls back to option text
- Partial matching supported

---

## 🔒 Privacy Features

### Local Storage Only

- All data stored in Chrome Storage API
- Never transmitted over network
- No external server communication
- Completely offline after installation

### No Tracking

- No analytics
- No usage statistics
- No error reporting to external services
- No user identification

### Minimal Permissions

**Required Permissions:**
- `storage` - Save user settings
- `activeTab` - Fill current tab's forms
- `scripting` - Inject content script
- `<all_urls>` - Work on any website

**Why needed:**
- Can't fill forms without page access
- Can't save settings without storage
- Can't inject scripts without scripting permission

---

## ⚡ Performance

### Optimizations

**Lazy Loading:**
- Only processes visible forms
- Doesn't scan entire page repeatedly

**Debouncing:**
- Mutation observer doesn't trigger on every change
- 1 second delay on page load prevents premature filling

**Efficient Selectors:**
- Single query for all inputs
- Early return if field already filled
- Break after first field type match

**Small Footprint:**
- Content script < 5KB
- Minimal memory usage
- Doesn't block page rendering

---

## 🎨 Design System

### Colors

- **Primary Blue:** #3B82F6 (buttons, links)
- **Secondary Purple:** #764ba2 (gradients)
- **Success Green:** #10B981 (checkmarks, success)
- **Warning Yellow:** #F59E0B (alerts)
- **Error Red:** #EF4444 (errors, delete)

### Typography

- **Headings:** System font stack
- **Body:** -apple-system, BlinkMacSystemFont, 'Segoe UI'
- **Weights:** Regular (400), Medium (500), Semibold (600), Bold (700)

### Components

- **Cards:** Rounded corners, subtle shadows
- **Inputs:** 1.5px borders, focus rings
- **Buttons:** Gradient backgrounds, hover effects
- **Toasts:** Top-right position, rich colors

---

## 🔄 Future Enhancements

Potential features for future versions:

1. **Multiple Profiles**
   - Switch between different sets of information
   - "Software Engineer" vs "Data Analyst" profiles

2. **Resume Parsing**
   - Upload resume PDF
   - Auto-extract information
   - Populate fields automatically

3. **Cover Letter Templates**
   - Store multiple templates
   - Variable substitution
   - Quick insert

4. **Application Tracking**
   - Track where you've applied
   - Status updates
   - Follow-up reminders

5. **Custom Field Mapping**
   - User-defined field detection
   - Site-specific overrides
   - Community-shared mappings

6. **Keyboard Shortcuts**
   - Quick fill shortcut
   - Open settings shortcut
   - Toggle auto-fill

7. **Cloud Sync**
   - Optional cloud backup
   - Encrypted storage
   - Multi-device sync

8. **Smart Suggestions**
   - AI-powered field detection
   - Context-aware filling
   - Learn from user corrections

---

**Built with modern web technologies and best practices for job seekers. 🚀**