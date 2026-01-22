import { useState, useEffect, useRef, useCallback } from 'react';
import { PersonalInfoSection } from '@/app/components/PersonalInfoSection';
import { SocialLinksSection } from '@/app/components/SocialLinksSection';
import { EmploymentSection } from '@/app/components/EmploymentSection';
import { EducationSection } from '@/app/components/EducationSection';
import { SkillsSection } from '@/app/components/SkillsSection';
import { ReferencesSection } from '@/app/components/ReferencesSection';
import { DemographicsSection } from '@/app/components/DemographicsSection';
import { EligibilityLegalSection } from '@/app/components/EligibilityLegalSection';
import { ImportDataModal } from '@/app/components/ImportDataModal';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { ThemeToggle } from '@/app/components/ThemeToggle';
import { Button } from '@/app/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Switch } from '@/app/components/ui/switch';
import { Label } from '@/app/components/ui/label';
import { Alert, AlertDescription } from '@/app/components/ui/alert';
import { Save, FileDown, Zap, Lock, Train, AlertTriangle, Shield, ChevronDown } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/app/components/ui/collapsible';
import { toast, Toaster } from 'sonner';

export interface UserData {
  // Personal Info
  firstName: string;
  lastName: string;
  preferredFirstName: string;
  preferredLastName: string;
  dateOfBirth: string;
  gender: string;
  
  // Contact Info
  email: string;
  phone: string;
  address: string;
  address2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  
  // Compensation & Availability
  desiredSalary: string;
  desiredHourlyRate: string;
  earliestStartDate: string;
  employmentType: string;
  
  // Social Links
  linkedin: string;
  twitter: string;
  website: string;
  github: string;
  bluesky: string;
  instagram: string;
  facebook: string;
  tiktok: string;
  youtube: string;
  artstation: string;
  gitlab: string;
  bitbucket: string;
  replit: string;
  leetcode: string;
  medium: string;
  substack: string;
  threads: string;
  mastodon: string;
  
  // Employment History
  employmentHistory: Array<{
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
    reasonForLeaving: string;
    supervisorName: string;
    supervisorContact: string;
    permissionToContact: string;
  }>;
  
  // Education History
  educationHistory: Array<{
    level: string;
    schoolName: string;
    degreeType: string;
    fieldOfStudy: string;
    graduationDate: string;
  }>;
  
  // Skills & Qualifications
  skills: Array<{
    name: string;
    yearsOfExperience: string;
  }>;
  
  certifications: Array<{
    name: string;
    issuer: string;
    dateObtained: string;
  }>;
  
  languages: Array<{
    name: string;
    proficiency: string;
  }>;
  
  // References
  references: Array<{
    name: string;
    relationship: string;
    email: string;
    phone: string;
    company: string;
    jobTitle: string;
  }>;
  
  // Demographics
  disability: string;
  race: string;
  veteran: string;
  
  // Eligibility & Legal
  workAuthorization: string;
  requireSponsorship: string;
  over18: string;
  willingToRelocate: string;
  willingToTravel: string;
  ableToWorkSchedule: string;
}

const defaultUserData: UserData = {
  firstName: '',
  lastName: '',
  preferredFirstName: '',
  preferredLastName: '',
  dateOfBirth: '',
  gender: '',
  email: '',
  phone: '',
  address: '',
  address2: '',
  city: '',
  state: '',
  postalCode: '',
  country: '',
  desiredSalary: '',
  desiredHourlyRate: '',
  earliestStartDate: '',
  employmentType: '',
  linkedin: '',
  twitter: '',
  website: '',
  github: '',
  bluesky: '',
  instagram: '',
  facebook: '',
  tiktok: '',
  youtube: '',
  artstation: '',
  gitlab: '',
  bitbucket: '',
  replit: '',
  leetcode: '',
  medium: '',
  substack: '',
  threads: '',
  mastodon: '',
  employmentHistory: [],
  educationHistory: [],
  skills: [],
  certifications: [],
  languages: [],
  references: [],
  disability: '',
  race: '',
  veteran: '',
  workAuthorization: '',
  requireSponsorship: '',
  over18: '',
  willingToRelocate: '',
  willingToTravel: '',
  ableToWorkSchedule: '',
};

export default function App() {
  const [userData, setUserData] = useState<UserData>(defaultUserData);
  const [isLoading, setIsLoading] = useState(true);
  const isInitialLoad = useRef(true);
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Use a ref to always have the latest userData for saving on unmount
  const userDataRef = useRef<UserData>(defaultUserData);

  // Keep ref in sync with state
  useEffect(() => {
    userDataRef.current = userData;
  }, [userData]);

  // Load data from Chrome storage
  useEffect(() => {
    if (typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.sync.get(['userData'], (result) => {
        if (result.userData) {
          const loadedData = { ...defaultUserData, ...result.userData };
          setUserData(loadedData);
          userDataRef.current = loadedData;
        }
        setIsLoading(false);
        // Mark initial load as complete after a short delay to avoid saving initial state
        setTimeout(() => {
          isInitialLoad.current = false;
        }, 500);
      });
    } else {
      setIsLoading(false);
      setTimeout(() => {
        isInitialLoad.current = false;
      }, 500);
    }
  }, []);

  // Auto-save function (reusable, memoized) - uses ref to get latest data
  const autoSave = useCallback((showToast = false, dataToSave?: UserData) => {
    if (typeof chrome !== 'undefined' && chrome.storage) {
      const data = dataToSave || userDataRef.current;
      chrome.storage.sync.set({ userData: data }, () => {
        if (showToast) {
          toast.success('Settings saved successfully!');
        }
      });
    }
  }, []);

  // Auto-save data to Chrome storage with debouncing
  useEffect(() => {
    // Don't autosave during initial load or if still loading
    if (isLoading || isInitialLoad.current) {
      return;
    }

    // Clear any existing timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    // Set a new timeout to save after 100ms of no changes (very short for faster saves)
    saveTimeoutRef.current = setTimeout(() => {
      autoSave(false);
    }, 100);

    // Cleanup: save immediately if component unmounts before timeout completes
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
        saveTimeoutRef.current = null;
      }
      // Save immediately on unmount if we have data and it's not initial load
      // Use the ref to get the latest data even if state hasn't updated
      if (!isLoading && !isInitialLoad.current) {
        autoSave(false, userDataRef.current);
      }
    };
  }, [userData, isLoading, autoSave]);

  // Save on window unload/pagehide (when user closes extension tab/window)
  useEffect(() => {
    const saveOnExit = () => {
      if (!isLoading && !isInitialLoad.current) {
        // Save immediately on exit using ref to get latest data
        if (typeof chrome !== 'undefined' && chrome.storage) {
          chrome.storage.sync.set({ userData: userDataRef.current });
        }
      }
    };

    // pagehide is more reliable than beforeunload in Chrome extensions
    window.addEventListener('pagehide', saveOnExit);
    window.addEventListener('beforeunload', saveOnExit);
    
    // Also listen for visibility change (when tab becomes hidden)
    const handleVisibilityChange = () => {
      if (document.hidden && !isLoading && !isInitialLoad.current) {
        // Clear any pending timeout and save immediately
        if (saveTimeoutRef.current) {
          clearTimeout(saveTimeoutRef.current);
          saveTimeoutRef.current = null;
        }
        // Save immediately when tab becomes hidden using ref
        if (typeof chrome !== 'undefined' && chrome.storage) {
          chrome.storage.sync.set({ userData: userDataRef.current });
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('pagehide', saveOnExit);
      window.removeEventListener('beforeunload', saveOnExit);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      // Final save attempt on cleanup
      saveOnExit();
    };
  }, [userData, isLoading]);

  // Save immediately when any input/textarea/select loses focus
  useEffect(() => {
    const handleBlur = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      // Check if the blurred element is an input, textarea, or select
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT')) {
        // Clear any pending timeout and save immediately
        if (saveTimeoutRef.current) {
          clearTimeout(saveTimeoutRef.current);
          saveTimeoutRef.current = null;
        }
        // Small delay to ensure state has updated
        setTimeout(() => {
          if (!isLoading && !isInitialLoad.current) {
            autoSave(false, userDataRef.current);
          }
        }, 50);
      }
    };

    // Use capture phase to catch all blur events
    document.addEventListener('blur', handleBlur, true);

    return () => {
      document.removeEventListener('blur', handleBlur, true);
    };
  }, [isLoading, autoSave]);

  // Save data to Chrome storage (manual save button)
  const handleSave = () => {
    autoSave(true);
  };

  // Auto-fill current page
  const handleAutoFill = () => {
    if (typeof chrome !== 'undefined' && chrome.tabs) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]?.id) {
          chrome.tabs.sendMessage(tabs[0].id, { action: 'autoFill' }, (response) => {
            if (response?.success) {
              toast.success('Form auto-filled!');
            } else {
              toast.error('Failed to auto-fill form');
            }
          });
        }
      });
    } else {
      toast.info('Auto-fill will work when installed as a Chrome extension');
    }
  };

  // Export data to JSON
  const handleExport = () => {
    const dataStr = JSON.stringify(userData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'job-autofill-data.json';
    link.click();
    toast.success('Data exported successfully!');
  };

  // Import data from JSON
  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedData = JSON.parse(e.target?.result as string);
          setUserData({ ...defaultUserData, ...importedData });
          // Temporarily disable autosave to avoid saving during import
          isInitialLoad.current = true;
          setTimeout(() => {
            isInitialLoad.current = false;
          }, 500);
          toast.success('Data imported successfully!');
        } catch (error) {
          toast.error('Failed to import data. Invalid JSON file.');
        }
      };
      reader.readAsText(file);
    }
  };

  // Handle resume data extraction
  const handleResumeDataExtracted = (extractedData: Partial<UserData>) => {
    setUserData(prev => ({ ...prev, ...extractedData }));
    // Temporarily disable autosave to avoid saving during import
    isInitialLoad.current = true;
    setTimeout(() => {
      isInitialLoad.current = false;
    }, 500);
    toast.success('Resume data has been imported! Please review and save.');
  };

  // Handle JSON import
  const handleJsonImported = (importedData: UserData) => {
    setUserData({ ...defaultUserData, ...importedData });
    // Temporarily disable autosave to avoid saving during import
    isInitialLoad.current = true;
    setTimeout(() => {
      isInitialLoad.current = false;
    }, 500);
    toast.success('Data imported successfully!');
  };

  const updateUserData = (field: keyof UserData, value: any) => {
    setUserData(prev => {
      const updated = { ...prev, [field]: value };
      // Update ref immediately so it's available for saves
      userDataRef.current = updated;
      return updated;
    });
  };

  if (isLoading) {
    return (
      <ThemeProvider>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-8">
        <Toaster position="top-right" richColors />
        
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Train className="w-8 h-8 text-blue-600" />
                <div>
                  <h1 className="mb-0">All Aboard ATS Auto-Filler</h1>
                  <p className="text-gray-600">An easy way to take the pain out of filling out legacy job applications</p>
                </div>
              </div>
              <div className="flex items-center gap-2 relative">
                <Collapsible>
                  <CollapsibleTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Shield className="w-4 h-4" />
                      Privacy & Data Use
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="absolute right-0 mt-2 w-[600px] z-50 bg-white dark:bg-gray-900 border rounded-lg shadow-lg p-6 max-h-[70vh] overflow-y-auto">
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      <h2 className="text-lg font-semibold mb-4">Privacy Policy</h2>
                      <p className="text-xs text-gray-500 mb-4">Last updated: January 2026</p>
                      <p className="mb-4">This privacy policy explains how this Chrome extension ("the Extension") handles your information.</p>

                      <h3 className="text-md font-semibold mt-4 mb-2">1. Information Stored</h3>
                      <p className="mb-2">The Extension may store information you choose to provide, including but not limited to:</p>
                      <ul className="list-disc pl-5 mb-4 space-y-1">
                        <li>First and last name</li>
                        <li>Email address and phone number</li>
                        <li>Home address and previous addresses</li>
                        <li>Employment history (employers, roles, dates)</li>
                        <li>Education history (schools, degrees, GPA)</li>
                        <li>References and related contact information</li>
                      </ul>
                      <p className="mb-4">This information is used solely to assist with filling out job application forms.</p>

                      <h3 className="text-md font-semibold mt-4 mb-2">2. Where Your Data Is Stored</h3>
                      <p className="mb-2">All information is stored locally in your browser using Chrome's extension storage.</p>
                      <p className="mb-4">The Extension does not store your data on external servers owned or operated by us.</p>

                      <h3 className="text-md font-semibold mt-4 mb-2">3. Data Collection & Sharing</h3>
                      <p className="mb-2">We do not:</p>
                      <ul className="list-disc pl-5 mb-4 space-y-1">
                        <li>Collect your data on our servers</li>
                        <li>Sell or rent your personal information</li>
                        <li>Share your data with third parties</li>
                        <li>Use analytics, tracking, or advertising tools</li>
                      </ul>
                      <p className="mb-4">Your data is only used locally by the Extension and is submitted only to job application websites you choose to interact with.</p>

                      <h3 className="text-md font-semibold mt-4 mb-2">4. User Control & Data Deletion</h3>
                      <p className="mb-2">You are always in control of your data.</p>
                      <ul className="list-disc pl-5 mb-4 space-y-1">
                        <li>You can edit or delete stored information at any time within the Extension</li>
                        <li>You can remove all stored data by uninstalling the Extension</li>
                        <li>No data persists after removal of the Extension</li>
                      </ul>

                      <h3 className="text-md font-semibold mt-4 mb-2">5. Third-Party Websites</h3>
                      <p className="mb-4">When you apply for a job, your information is submitted directly to third-party websites (such as employer career pages or applicant tracking systems). Their handling of your data is governed by their own privacy policies, not this one.</p>

                      <h3 className="text-md font-semibold mt-4 mb-2">6. Changes to This Policy</h3>
                      <p className="mb-4">This privacy policy may be updated from time to time. Any changes will be reflected within the Extension.</p>

                      <h3 className="text-md font-semibold mt-4 mb-2">7. Contact</h3>
                      <p className="mb-2">If you have questions or concerns about this privacy policy, you may contact:</p>
                      <p className="mb-4">Email: <a href="mailto:Sean.woleslagle@gmail.com" className="text-blue-600 hover:underline">Sean.woleslagle@gmail.com</a></p>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
                <ThemeToggle />
              </div>
            </div>
          </div>

          <Alert className="mb-6">
            <Lock className="h-4 w-4" />
            <AlertDescription>
              Your information is stored locally in your browser. We do not collect, sell, or transmit your data to our servers. Data is used only within the extension to assist with filling job application forms on third-party websites you choose.
            </AlertDescription>
          </Alert>

          <Alert className="mb-6 border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950">
            <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            <AlertDescription className="text-amber-900 dark:text-amber-200">
              Due to the way ATS systems such as Workday, iCIMS, Greenhouse, Lever, Taleo, etc. work, this may not work 100% of the time, but we try to make it so it works as well as the ATS lets it. Our goal is to help save you time, so by filling these out, we hope you find that it does save you time and we value your feedback.
            </AlertDescription>
          </Alert>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Save your data and auto-fill forms with one click</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <Button onClick={handleSave} className="gap-2">
                  <Save className="w-4 h-4" />
                  Save Settings
                </Button>
                <Button onClick={handleAutoFill} variant="secondary" className="gap-2">
                  <Zap className="w-4 h-4" />
                  Auto-Fill Current Page
                </Button>
                <ImportDataModal 
                  onDataExtracted={handleResumeDataExtracted}
                  onJsonImported={handleJsonImported}
                />
                <Button onClick={handleExport} variant="outline" className="gap-2">
                  <FileDown className="w-4 h-4" />
                  Export Data
                </Button>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="personal" className="space-y-6">
            <TabsList className="grid w-full grid-cols-8">
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="social">Social</TabsTrigger>
              <TabsTrigger value="employment">Employment</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="references">References</TabsTrigger>
              <TabsTrigger value="demographics">Demographics</TabsTrigger>
              <TabsTrigger value="eligibility">Eligibility</TabsTrigger>
            </TabsList>

            <TabsContent value="personal">
              <PersonalInfoSection userData={userData} updateUserData={updateUserData} />
            </TabsContent>

            <TabsContent value="social">
              <SocialLinksSection userData={userData} updateUserData={updateUserData} />
            </TabsContent>

            <TabsContent value="employment">
              <EmploymentSection userData={userData} updateUserData={updateUserData} />
            </TabsContent>

            <TabsContent value="education">
              <EducationSection userData={userData} updateUserData={updateUserData} />
            </TabsContent>

            <TabsContent value="skills">
              <SkillsSection userData={userData} updateUserData={updateUserData} />
            </TabsContent>

            <TabsContent value="references">
              <ReferencesSection userData={userData} updateUserData={updateUserData} />
            </TabsContent>

            <TabsContent value="demographics">
              <DemographicsSection userData={userData} updateUserData={updateUserData} />
            </TabsContent>

            <TabsContent value="eligibility">
              <EligibilityLegalSection userData={userData} updateUserData={updateUserData} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ThemeProvider>
  );
}