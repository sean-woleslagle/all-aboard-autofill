import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/app/components/ui/dialog';
import { Button } from '@/app/components/ui/button';
import { Label } from '@/app/components/ui/label';
import { Alert, AlertDescription } from '@/app/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Upload, FileText, FileJson, Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { UserData } from '@/app/App';
import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';

// Configure PDF.js worker for Chrome extension
// Use local bundled worker file to comply with CSP
if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.getURL) {
  pdfjsLib.GlobalWorkerOptions.workerSrc = chrome.runtime.getURL('pdf.worker.min.js');
} else {
  // Fallback for development
  pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';
}

interface ImportDataModalProps {
  onDataExtracted: (data: Partial<UserData>) => void;
  onJsonImported: (data: UserData) => void;
}

export function ImportDataModal({ onDataExtracted, onJsonImported }: ImportDataModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const extractTextFromPDF = async (file: File): Promise<string> => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ');
      fullText += pageText + '\n';
    }

    return fullText;
  };

  const extractTextFromDOCX = async (file: File): Promise<string> => {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value;
  };

  const parseResumeText = (text: string): Partial<UserData> => {
    const data: Partial<UserData> = {};

    // Extract email
    const emailMatch = text.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/);
    if (emailMatch) {
      data.email = emailMatch[0];
    }

    // Extract phone number (various formats)
    const phoneMatch = text.match(/(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
    if (phoneMatch) {
      data.phone = phoneMatch[0];
    }

    // Extract name (assuming it's at the beginning, all caps or title case)
    const lines = text.split('\n').filter(line => line.trim());
    if (lines.length > 0) {
      const firstLine = lines[0].trim();
      // Check if first line looks like a name (2-3 words, capitalized)
      const nameMatch = firstLine.match(/^([A-Z][a-z]+(\s+[A-Z][a-z]+){1,2})$/);
      if (nameMatch) {
        const nameParts = nameMatch[0].split(' ');
        if (nameParts.length >= 2) {
          data.firstName = nameParts[0];
          data.lastName = nameParts.slice(1).join(' ');
        }
      }
    }

    // Extract LinkedIn
    const linkedinMatch = text.match(/linkedin\.com\/in\/[\w-]+/i);
    if (linkedinMatch) {
      data.linkedin = 'https://' + linkedinMatch[0];
    }

    // Extract GitHub
    const githubMatch = text.match(/github\.com\/[\w-]+/i);
    if (githubMatch) {
      data.github = 'https://' + githubMatch[0];
    }

    // Extract portfolio/website
    const websiteMatch = text.match(/https?:\/\/(www\.)?[\w-]+\.(com|net|org|io|dev)[\w\-._~:/?#[\]@!$&'()*+,;=]*/i);
    if (websiteMatch && !websiteMatch[0].includes('linkedin') && !websiteMatch[0].includes('github')) {
      data.website = websiteMatch[0];
    }

    // Extract city, state (pattern: City, ST or City, State)
    const locationMatch = text.match(/([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*),\s*([A-Z]{2}|[A-Z][a-z]+)/);
    if (locationMatch) {
      data.city = locationMatch[1];
      data.state = locationMatch[2];
    }

    // Extract skills (looking for common patterns)
    const skillsSection = text.match(/(?:SKILLS|TECHNICAL SKILLS|CORE COMPETENCIES)[\s\S]*?(?=\n[A-Z]{3,}|\n{2,}|$)/i);
    if (skillsSection) {
      const skillsText = skillsSection[0];
      // Common skill keywords
      const commonSkills = ['JavaScript', 'Python', 'Java', 'React', 'Node', 'SQL', 'AWS', 'Docker', 
                            'TypeScript', 'CSS', 'HTML', 'Git', 'MongoDB', 'PostgreSQL'];
      
      const foundSkills: Array<{ name: string; yearsOfExperience: string }> = [];
      commonSkills.forEach(skill => {
        if (new RegExp(skill, 'i').test(skillsText)) {
          foundSkills.push({ name: skill, yearsOfExperience: '' });
        }
      });
      
      if (foundSkills.length > 0) {
        data.skills = foundSkills;
      }
    }

    return data;
  };

  const handleResumeUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    setStatus('idle');
    setMessage('');

    try {
      let text = '';

      if (file.type === 'application/pdf') {
        setMessage('Extracting text from PDF...');
        text = await extractTextFromPDF(file);
      } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        setMessage('Extracting text from DOCX...');
        text = await extractTextFromDOCX(file);
      } else {
        throw new Error('Unsupported file type. Please upload a PDF or DOCX file.');
      }

      setMessage('Parsing resume data...');
      const extractedData = parseResumeText(text);

      // Count how many fields were extracted
      const fieldsExtracted = Object.keys(extractedData).length;

      if (fieldsExtracted === 0) {
        setStatus('error');
        setMessage('Could not extract any data from the resume. Please try a different file or enter data manually.');
      } else {
        setStatus('success');
        setMessage(`Successfully extracted ${fieldsExtracted} field${fieldsExtracted > 1 ? 's' : ''} from your resume!`);
        onDataExtracted(extractedData);
        
        // Close modal after 2 seconds
        setTimeout(() => {
          setIsOpen(false);
          setStatus('idle');
          setMessage('');
        }, 2000);
      }
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'An error occurred while processing your resume.');
    } finally {
      setIsProcessing(false);
      // Reset the input
      event.target.value = '';
    }
  };

  const handleJsonImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    setStatus('idle');
    setMessage('Importing JSON data...');

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target?.result as string);
        setStatus('success');
        setMessage('Data imported successfully!');
        onJsonImported(importedData);
        
        // Close modal after 1.5 seconds
        setTimeout(() => {
          setIsOpen(false);
          setStatus('idle');
          setMessage('');
        }, 1500);
      } catch (error) {
        setStatus('error');
        setMessage('Failed to import data. Invalid JSON file.');
      } finally {
        setIsProcessing(false);
      }
    };
    reader.readAsText(file);
    
    // Reset the input
    event.target.value = '';
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Upload className="w-4 h-4" />
          Import Data
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Import Data</DialogTitle>
          <DialogDescription>
            Import your information from a resume file or previously exported JSON data.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="resume" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="resume">Resume</TabsTrigger>
            <TabsTrigger value="json">JSON Data</TabsTrigger>
          </TabsList>
          
          <TabsContent value="resume" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="resume-upload" className="cursor-pointer">
                <div className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
                  <div className="text-center">
                    <FileText className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-600">
                      Click to upload your resume
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      PDF or DOCX (max 10MB)
                    </p>
                  </div>
                </div>
                <input
                  id="resume-upload"
                  type="file"
                  accept=".pdf,.docx"
                  className="hidden"
                  onChange={handleResumeUpload}
                  disabled={isProcessing}
                />
              </Label>
            </div>
            
            <Alert>
              <AlertDescription className="text-xs">
                <strong>Note:</strong> The parser will extract basic information like name, email, phone, 
                location, and social links. You can review and edit the data before saving.
              </AlertDescription>
            </Alert>
          </TabsContent>
          
          <TabsContent value="json" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="json-upload" className="cursor-pointer">
                <div className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
                  <div className="text-center">
                    <FileJson className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-600">
                      Click to upload JSON file
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Previously exported .json file
                    </p>
                  </div>
                </div>
                <input
                  id="json-upload"
                  type="file"
                  accept=".json"
                  className="hidden"
                  onChange={handleJsonImport}
                  disabled={isProcessing}
                />
              </Label>
            </div>
            
            <Alert>
              <AlertDescription className="text-xs">
                <strong>Note:</strong> This will restore all your previously saved settings from 
                an exported JSON file. Your current data will be replaced.
              </AlertDescription>
            </Alert>
          </TabsContent>
        </Tabs>

        {isProcessing && (
          <Alert>
            <Loader2 className="h-4 w-4 animate-spin" />
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}

        {status === 'success' && (
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-900">
              {message}
            </AlertDescription>
          </Alert>
        )}

        {status === 'error' && (
          <Alert className="border-red-200 bg-red-50">
            <XCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-900">
              {message}
            </AlertDescription>
          </Alert>
        )}
      </DialogContent>
    </Dialog>
  );
}
