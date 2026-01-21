// Content script for auto-filling job application forms

// Track if extension context is still valid
let extensionContextValid = true;

// Check if extension context is still valid
function isExtensionContextValid() {
  try {
    // Accessing chrome.runtime.id will throw if context is invalidated
    return extensionContextValid && chrome.runtime && chrome.runtime.id;
  } catch (e) {
    extensionContextValid = false;
    return false;
  }
}

// Field mappings for common form fields
const fieldMappings = {
  firstName: ['firstname', 'first-name', 'first_name', 'fname', 'givenname', 'given-name', 'forename'],
  lastName: ['lastname', 'last-name', 'last_name', 'lname', 'surname', 'familyname', 'family-name'],
  email: ['email', 'e-mail', 'emailaddress', 'email-address', 'mail', 'user-email'],
  phone: ['phone', 'telephone', 'mobile', 'phonenumber', 'phone-number', 'tel', 'cell', 'contact'],
  dateOfBirth: ['dob', 'dateofbirth', 'date-of-birth', 'birthdate', 'birth-date', 'birthday', 'bday'],
  gender: ['gender', 'sex'],
  address: ['address', 'street', 'streetaddress', 'street-address', 'address1', 'addressline1', 'address-line-1'],
  address2: ['address2', 'addressline2', 'address-line-2', 'apartment', 'apt', 'suite', 'unit'],
  city: ['city', 'town', 'locality'],
  state: ['state', 'province', 'region', 'county'],
  postalCode: ['zip', 'zipcode', 'postal', 'postalcode', 'postal-code', 'postcode', 'zip-code'],
  country: ['country', 'nation'],
  linkedin: ['linkedin', 'linkedin-url', 'linkedinprofile', 'linkedin-profile', 'linkedin-link'],
  twitter: ['twitter', 'x', 'twitter-handle', 'x-profile', 'twitter-url', 'x-url'],
  website: ['website', 'portfolio', 'personal-site', 'personalwebsite', 'homepage', 'url'],
  github: ['github', 'github-url', 'github-profile', 'github-link', 'github-username'],
  bluesky: ['bluesky', 'bluesky-url', 'bluesky-profile', 'bsky'],
  instagram: ['instagram', 'instagram-url', 'instagram-profile', 'instagram-handle', 'ig'],
  facebook: ['facebook', 'facebook-url', 'facebook-profile', 'fb'],
  tiktok: ['tiktok', 'tiktok-url', 'tiktok-profile', 'tiktok-handle'],
  youtube: ['youtube', 'youtube-url', 'youtube-channel', 'youtube-profile', 'yt'],
  artstation: ['artstation', 'artstation-url', 'artstation-profile'],
  gitlab: ['gitlab', 'gitlab-url', 'gitlab-profile', 'gitlab-username'],
  bitbucket: ['bitbucket', 'bitbucket-url', 'bitbucket-profile', 'bitbucket-username'],
  replit: ['replit', 'replit-url', 'replit-profile', 'replit-username', 'repl-it'],
  leetcode: ['leetcode', 'leetcode-url', 'leetcode-profile', 'leetcode-username'],
  medium: ['medium', 'medium-url', 'medium-profile', 'medium-handle'],
  substack: ['substack', 'substack-url', 'substack-profile', 'substack-newsletter'],
  threads: ['threads', 'threads-url', 'threads-profile', 'threads-handle'],
  mastodon: ['mastodon', 'mastodon-url', 'mastodon-profile', 'mastodon-handle'],
  disability: ['disability', 'disability-status', 'disabled', 'handicap'],
  race: ['race', 'ethnicity', 'ethnic', 'racial'],
  veteran: ['veteran', 'veteran-status', 'military', 'military-service', 'armed-forces'],
  // Eligibility fields
  requireSponsorship: ['sponsorship', 'sponsor', 'visa-sponsorship', 'work-sponsorship', 'require-sponsorship', 'need-sponsorship', 'immigration', 'citizenship'],
  workAuthorization: ['work-authorization', 'workauthorization', 'authorized-to-work', 'legally-authorized', 'employment-authorization', 'eligible-to-work', 'right-to-work'],
  over18: ['over-18', 'over18', 'age-18', '18-years', '18-or-older', 'legal-age', 'atleast18', 'at-least-18'],
  willingToRelocate: ['relocate', 'relocation', 'willing-to-relocate', 'open-to-relocation', 'move'],
  willingToTravel: ['travel', 'willing-to-travel', 'travel-required', 'business-travel'],
  ableToWorkSchedule: ['schedule', 'work-schedule', 'nights', 'weekends', 'shift', 'flexible-schedule']
};

// Load saved data from Chrome storage
function loadUserData(callback) {
  if (!isExtensionContextValid()) {
    return;
  }

  try {
    chrome.storage.sync.get(['userData'], function(result) {
      if (chrome.runtime.lastError) {
        extensionContextValid = false;
        return;
      }
      if (result.userData) {
        callback(result.userData);
      }
    });
  } catch (e) {
    extensionContextValid = false;
  }
}

// Check if an element matches a field type
function matchesField(element, keywords) {
  const elementName = (element.name || '').toLowerCase();
  const elementId = (element.id || '').toLowerCase();
  const elementPlaceholder = (element.placeholder || '').toLowerCase();
  const elementAriaLabel = (element.getAttribute('aria-label') || '').toLowerCase();
  const elementAutocomplete = (element.autocomplete || '').toLowerCase();

  let allText = `${elementName} ${elementId} ${elementPlaceholder} ${elementAriaLabel} ${elementAutocomplete}`;

  // For radio buttons and checkboxes, also check the surrounding context
  if (element.type === 'radio' || element.type === 'checkbox') {
    // Check parent fieldset legend
    const fieldset = element.closest('fieldset');
    if (fieldset) {
      const legend = fieldset.querySelector('legend');
      if (legend) {
        allText += ' ' + legend.textContent.toLowerCase();
      }
    }

    // Check associated label (by for attribute or parent)
    const labelFor = document.querySelector(`label[for="${element.id}"]`);
    if (labelFor) {
      allText += ' ' + labelFor.textContent.toLowerCase();
    }
    const parentLabel = element.closest('label');
    if (parentLabel) {
      allText += ' ' + parentLabel.textContent.toLowerCase();
    }

    // Check nearby text (parent container, previous sibling, form group label)
    const parent = element.parentElement;
    if (parent) {
      // Look for common form group patterns
      const formGroup = element.closest('[class*="form-group"], [class*="field"], [class*="question"], [role="group"], [role="radiogroup"]');
      if (formGroup) {
        // Get label or heading text within form group
        const groupLabel = formGroup.querySelector('label, .label, [class*="label"], h1, h2, h3, h4, h5, h6, p');
        if (groupLabel && !groupLabel.contains(element)) {
          allText += ' ' + groupLabel.textContent.toLowerCase();
        }
      }
    }

    // Check aria-labelledby
    const labelledBy = element.getAttribute('aria-labelledby');
    if (labelledBy) {
      const labelElement = document.getElementById(labelledBy);
      if (labelElement) {
        allText += ' ' + labelElement.textContent.toLowerCase();
      }
    }
  }

  return keywords.some(keyword => allText.includes(keyword));
}

// Fill a single field
function fillField(element, value) {
  if (!value || element.value) return; // Don't override existing values
  
  if (element.tagName === 'SELECT') {
    // For select elements, try to find matching option
    const options = Array.from(element.options);
    const matchingOption = options.find(option => 
      option.value.toLowerCase().includes(value.toLowerCase()) ||
      option.text.toLowerCase().includes(value.toLowerCase())
    );
    if (matchingOption) {
      element.value = matchingOption.value;
      element.dispatchEvent(new Event('change', { bubbles: true }));
    }
  } else if (element.type === 'radio') {
    // For radio buttons, check if value matches
    const radioValue = element.value.toLowerCase();
    const userValue = value.toLowerCase();

    // Get the label text for this specific radio button
    const radioLabel = document.querySelector(`label[for="${element.id}"]`);
    const radioLabelText = radioLabel ? radioLabel.textContent.toLowerCase().trim() : '';
    const parentLabel = element.closest('label');
    const parentLabelText = parentLabel ? parentLabel.textContent.toLowerCase().trim() : '';

    // Check for yes/no type matching
    const yesValues = ['yes', 'true', '1', 'y'];
    const noValues = ['no', 'false', '0', 'n'];

    const isUserYes = yesValues.includes(userValue);
    const isUserNo = noValues.includes(userValue);
    const isRadioYes = yesValues.some(v => radioValue.includes(v) || radioLabelText.includes(v) || parentLabelText.includes(v));
    const isRadioNo = noValues.some(v => radioValue.includes(v) || radioLabelText.includes(v) || parentLabelText.includes(v));

    // Match yes to yes, no to no
    if ((isUserYes && isRadioYes) || (isUserNo && isRadioNo)) {
      element.checked = true;
      element.dispatchEvent(new Event('change', { bubbles: true }));
      element.dispatchEvent(new Event('click', { bubbles: true }));
    }
    // Fallback: direct value matching
    else if (radioValue.includes(userValue) || radioLabelText.includes(userValue)) {
      element.checked = true;
      element.dispatchEvent(new Event('change', { bubbles: true }));
      element.dispatchEvent(new Event('click', { bubbles: true }));
    }
  } else if (element.type === 'checkbox') {
    // Handle checkboxes based on the value
    if (value === true || value === 'yes' || value === 'true') {
      element.checked = true;
      element.dispatchEvent(new Event('change', { bubbles: true }));
    }
  } else {
    // Regular input fields
    element.value = value;
    element.dispatchEvent(new Event('input', { bubbles: true }));
    element.dispatchEvent(new Event('change', { bubbles: true }));
  }
}

// Auto-fill form
function autoFillForm(userData) {
  const allInputs = document.querySelectorAll('input, select, textarea');
  
  allInputs.forEach(element => {
    // Skip if already filled
    if (element.value && element.type !== 'radio') return;
    
    // Check each field type
    for (const [fieldType, keywords] of Object.entries(fieldMappings)) {
      if (matchesField(element, keywords)) {
        const value = userData[fieldType];
        if (value) {
          fillField(element, value);
          break;
        }
      }
    }
  });
}

// Listen for messages from popup
try {
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (!isExtensionContextValid()) {
      return false;
    }

    if (request.action === 'autoFill') {
      loadUserData((userData) => {
        if (userData) {
          autoFillForm(userData);
          sendResponse({ success: true });
        } else {
          sendResponse({ success: false, error: 'No user data found' });
        }
      });
      return true; // Keep message channel open for async response
    }
  });
} catch (e) {
  extensionContextValid = false;
}

// Watch for dynamically added forms
let observer = null;

function setupObserver() {
  if (observer) return;

  observer = new MutationObserver((mutations) => {
    // Stop observing if extension context is invalidated
    if (!isExtensionContextValid()) {
      if (observer) {
        observer.disconnect();
        observer = null;
      }
      return;
    }

    // Auto-fill is only triggered by user clicking the extension
  });

  if (document.body) {
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
}

// Only set up observer if context is valid
if (isExtensionContextValid()) {
  setupObserver();
}