import { useState, useEffect } from 'react';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Switch } from '@/app/components/ui/switch';
import { Label } from '@/app/components/ui/label';
import { Separator } from '@/app/components/ui/separator';
import { ThemeToggle } from '@/app/components/ThemeToggle';
import { Settings, Zap, FileDown, Upload, Train, CheckCircle, XCircle } from 'lucide-react';
import { UserData } from '@/app/App';

const defaultUserData: Partial<UserData> = {};

export default function Popup() {
  const [userData, setUserData] = useState<Partial<UserData>>(defaultUserData);
  const [fillStatus, setFillStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    // Load data from Chrome storage
    if (typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.sync.get(['userData'], (result) => {
        if (result.userData) {
          setUserData(result.userData);
          // Check if user has filled in basic info
          const hasBasicInfo = result.userData.firstName && result.userData.lastName && result.userData.email;
          setHasData(!!hasBasicInfo);
        }
      });
    }
  }, []);

  const handleAutoFill = () => {
    if (typeof chrome !== 'undefined' && chrome.tabs) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]?.id) {
          chrome.tabs.sendMessage(tabs[0].id, { action: 'autoFill', userData }, (response) => {
            if (chrome.runtime.lastError) {
              setFillStatus('error');
              setTimeout(() => setFillStatus('idle'), 3000);
            } else if (response?.success) {
              setFillStatus('success');
              setTimeout(() => setFillStatus('idle'), 3000);
            } else {
              setFillStatus('error');
              setTimeout(() => setFillStatus('idle'), 3000);
            }
          });
        }
      });
    }
  };

  const openSettings = () => {
    if (typeof chrome !== 'undefined' && chrome.runtime) {
      chrome.runtime.openOptionsPage();
    }
  };

  const handleQuickExport = () => {
    if (typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.sync.get(['userData'], (result) => {
        if (result.userData) {
          const dataStr = JSON.stringify(result.userData, null, 2);
          const dataBlob = new Blob([dataStr], { type: 'application/json' });
          const url = URL.createObjectURL(dataBlob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'job-autofill-data.json';
          link.click();
        }
      });
    }
  };

  const handleQuickImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const importedData = JSON.parse(event.target?.result as string);
            if (typeof chrome !== 'undefined' && chrome.storage) {
              chrome.storage.sync.set({ userData: importedData }, () => {
                setUserData(importedData);
                const hasBasicInfo = importedData.firstName && importedData.lastName && importedData.email;
                setHasData(!!hasBasicInfo);
              });
            }
          } catch (error) {
            console.error('Import failed:', error);
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  return (
    <div className="w-[400px] p-4 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Train className="w-6 h-6 text-blue-600" />
            <h2 className="text-lg font-semibold">All Aboard ATS</h2>
          </div>
          <p className="text-xs text-gray-600">Auto-fill job applications instantly</p>
        </div>
        <ThemeToggle size="sm" />
      </div>

      <Card className="mb-3">
        <CardContent className="p-4 space-y-3">
          {!hasData && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-3">
              <p className="text-xs text-amber-900">
                <strong>Get Started:</strong> Click "Full Settings" below to set up your profile first.
              </p>
            </div>
          )}

          <Button 
            onClick={handleAutoFill} 
            className="w-full gap-2"
            disabled={!hasData}
          >
            <Zap className="w-4 h-4" />
            Auto-Fill This Page
          </Button>

          {fillStatus === 'success' && (
            <div className="flex items-center gap-2 text-green-700 text-sm bg-green-50 p-2 rounded">
              <CheckCircle className="w-4 h-4" />
              <span>Form filled successfully!</span>
            </div>
          )}

          {fillStatus === 'error' && (
            <div className="flex items-center gap-2 text-red-700 text-sm bg-red-50 p-2 rounded">
              <XCircle className="w-4 h-4" />
              <span>Unable to fill form on this page</span>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-2 mb-3">
        <Button onClick={handleQuickImport} variant="outline" size="sm" className="gap-2">
          <Upload className="w-3 h-3" />
          Import
        </Button>
        <Button onClick={handleQuickExport} variant="outline" size="sm" className="gap-2">
          <FileDown className="w-3 h-3" />
          Export
        </Button>
      </div>

      <Button onClick={openSettings} variant="secondary" className="w-full gap-2" size="sm">
        <Settings className="w-4 h-4" />
        Full Settings
      </Button>

      <p className="text-xs text-gray-500 text-center mt-3">
        All data stored locally on your device
      </p>
    </div>
  );
}