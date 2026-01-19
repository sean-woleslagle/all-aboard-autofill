import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Button } from '@/app/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { UserData } from '@/app/App';

interface EmploymentSectionProps {
  userData: UserData;
  updateUserData: (field: keyof UserData, value: any) => void;
}

export function EmploymentSection({ userData, updateUserData }: EmploymentSectionProps) {
  const addEmployment = () => {
    const newEmployment = {
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: '',
      reasonForLeaving: '',
      supervisorName: '',
      supervisorContact: '',
      permissionToContact: ''
    };
    updateUserData('employmentHistory', [...userData.employmentHistory, newEmployment]);
  };

  const removeEmployment = (index: number) => {
    const updated = userData.employmentHistory.filter((_, i) => i !== index);
    updateUserData('employmentHistory', updated);
  };

  const updateEmployment = (index: number, field: string, value: string) => {
    const updated = userData.employmentHistory.map((emp, i) => 
      i === index ? { ...emp, [field]: value } : emp
    );
    updateUserData('employmentHistory', updated);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Employment History</CardTitle>
        <CardDescription>Add your work experience</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {userData.employmentHistory.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p className="mb-4">No employment history added yet</p>
            <Button onClick={addEmployment} className="gap-2">
              <Plus className="w-4 h-4" />
              Add Employment
            </Button>
          </div>
        ) : (
          <>
            {userData.employmentHistory.map((employment, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-4 relative">
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={() => removeEmployment(index)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`company-${index}`}>Company</Label>
                    <Input
                      id={`company-${index}`}
                      placeholder="Company Name"
                      value={employment.company}
                      onChange={(e) => updateEmployment(index, 'company', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`position-${index}`}>Position</Label>
                    <Input
                      id={`position-${index}`}
                      placeholder="Job Title"
                      value={employment.position}
                      onChange={(e) => updateEmployment(index, 'position', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`startDate-${index}`}>Start Date</Label>
                    <Input
                      id={`startDate-${index}`}
                      type="month"
                      value={employment.startDate}
                      onChange={(e) => updateEmployment(index, 'startDate', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`endDate-${index}`}>End Date</Label>
                    <Input
                      id={`endDate-${index}`}
                      type="month"
                      placeholder="Leave empty if current"
                      value={employment.endDate}
                      onChange={(e) => updateEmployment(index, 'endDate', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`description-${index}`}>Responsibilities / Description</Label>
                  <Textarea
                    id={`description-${index}`}
                    placeholder="Describe your responsibilities and achievements..."
                    rows={3}
                    value={employment.description}
                    onChange={(e) => updateEmployment(index, 'description', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`reasonForLeaving-${index}`}>Reason for Leaving (Optional)</Label>
                  <Textarea
                    id={`reasonForLeaving-${index}`}
                    placeholder="Explain why you left this position..."
                    rows={2}
                    value={employment.reasonForLeaving}
                    onChange={(e) => updateEmployment(index, 'reasonForLeaving', e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`supervisorName-${index}`}>Supervisor Name</Label>
                    <Input
                      id={`supervisorName-${index}`}
                      placeholder="John Smith"
                      value={employment.supervisorName}
                      onChange={(e) => updateEmployment(index, 'supervisorName', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`supervisorContact-${index}`}>Supervisor Contact Info</Label>
                    <Input
                      id={`supervisorContact-${index}`}
                      placeholder="Email or phone number"
                      value={employment.supervisorContact}
                      onChange={(e) => updateEmployment(index, 'supervisorContact', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`permissionToContact-${index}`}>Permission to Contact Employer</Label>
                  <Select
                    value={employment.permissionToContact}
                    onValueChange={(value) => updateEmployment(index, 'permissionToContact', value)}
                  >
                    <SelectTrigger id={`permissionToContact-${index}`}>
                      <SelectValue placeholder="Select permission" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ))}

            <Button onClick={addEmployment} variant="outline" className="w-full gap-2">
              <Plus className="w-4 h-4" />
              Add Another Employment
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}