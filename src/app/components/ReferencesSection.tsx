import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Button } from '@/app/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { UserData } from '@/app/App';

interface ReferencesSectionProps {
  userData: UserData;
  updateUserData: (field: keyof UserData, value: any) => void;
}

export function ReferencesSection({ userData, updateUserData }: ReferencesSectionProps) {
  const references = userData.references || [];

  const addReference = () => {
    const newReference = {
      name: '',
      relationship: '',
      email: '',
      phone: '',
      company: '',
      jobTitle: ''
    };
    updateUserData('references', [...references, newReference]);
  };

  const removeReference = (index: number) => {
    const updated = references.filter((_, i) => i !== index);
    updateUserData('references', updated);
  };

  const updateReference = (index: number, field: string, value: string) => {
    const updated = references.map((ref, i) => 
      i === index ? { ...ref, [field]: value } : ref
    );
    updateUserData('references', updated);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Professional References</CardTitle>
        <CardDescription>Add people who can vouch for your professional experience</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {references.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p className="mb-4">No references added yet</p>
            <Button onClick={addReference} className="gap-2">
              <Plus className="w-4 h-4" />
              Add Reference
            </Button>
          </div>
        ) : (
          <>
            {references.map((reference, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-4 relative">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">Reference {index + 1}</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={() => removeReference(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`ref-name-${index}`}>Full Name</Label>
                    <Input
                      id={`ref-name-${index}`}
                      placeholder="e.g., Jane Smith"
                      value={reference.name}
                      onChange={(e) => updateReference(index, 'name', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`ref-relationship-${index}`}>Relationship</Label>
                    <Input
                      id={`ref-relationship-${index}`}
                      placeholder="e.g., Former Manager, Colleague"
                      value={reference.relationship}
                      onChange={(e) => updateReference(index, 'relationship', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`ref-company-${index}`}>Company</Label>
                    <Input
                      id={`ref-company-${index}`}
                      placeholder="e.g., Acme Corp"
                      value={reference.company}
                      onChange={(e) => updateReference(index, 'company', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`ref-title-${index}`}>Job Title</Label>
                    <Input
                      id={`ref-title-${index}`}
                      placeholder="e.g., Senior Manager"
                      value={reference.jobTitle}
                      onChange={(e) => updateReference(index, 'jobTitle', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`ref-email-${index}`}>Email Address</Label>
                    <Input
                      id={`ref-email-${index}`}
                      type="email"
                      placeholder="jane.smith@example.com"
                      value={reference.email}
                      onChange={(e) => updateReference(index, 'email', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`ref-phone-${index}`}>Phone Number</Label>
                    <Input
                      id={`ref-phone-${index}`}
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      value={reference.phone}
                      onChange={(e) => updateReference(index, 'phone', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}

            <Button onClick={addReference} variant="outline" className="w-full gap-2">
              <Plus className="w-4 h-4" />
              Add Another Reference
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}
