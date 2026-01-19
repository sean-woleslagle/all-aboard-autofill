import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Button } from '@/app/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { UserData } from '@/app/App';

interface EducationSectionProps {
  userData: UserData;
  updateUserData: (field: keyof UserData, value: any) => void;
}

export function EducationSection({ userData, updateUserData }: EducationSectionProps) {
  const educationHistory = userData.educationHistory || [];
  
  const addEducation = () => {
    const newEducation = {
      level: '',
      schoolName: '',
      degreeType: '',
      fieldOfStudy: '',
      graduationDate: ''
    };
    updateUserData('educationHistory', [...educationHistory, newEducation]);
  };

  const removeEducation = (index: number) => {
    const updated = educationHistory.filter((_, i) => i !== index);
    updateUserData('educationHistory', updated);
  };

  const updateEducation = (index: number, field: string, value: string) => {
    const updated = educationHistory.map((edu, i) => 
      i === index ? { ...edu, [field]: value } : edu
    );
    updateUserData('educationHistory', updated);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Education History</CardTitle>
        <CardDescription>Add your educational background</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {educationHistory.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p className="mb-4">No education history added yet</p>
            <Button onClick={addEducation} className="gap-2">
              <Plus className="w-4 h-4" />
              Add Education
            </Button>
          </div>
        ) : (
          <>
            {educationHistory.map((education, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-4 relative">
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={() => removeEducation(index)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>

                <div className="space-y-2">
                  <Label htmlFor={`level-${index}`}>Highest Level of Education</Label>
                  <Select
                    value={education.level}
                    onValueChange={(value) => updateEducation(index, 'level', value)}
                  >
                    <SelectTrigger id={`level-${index}`}>
                      <SelectValue placeholder="Select education level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high-school">High School</SelectItem>
                      <SelectItem value="associate">Associate Degree</SelectItem>
                      <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                      <SelectItem value="master">Master's Degree</SelectItem>
                      <SelectItem value="doctorate">Doctorate / PhD</SelectItem>
                      <SelectItem value="professional">Professional Degree</SelectItem>
                      <SelectItem value="certificate">Certificate</SelectItem>
                      <SelectItem value="bootcamp">Bootcamp</SelectItem>
                      <SelectItem value="some-college">Some College (No Degree)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`schoolName-${index}`}>School Name</Label>
                  <Input
                    id={`schoolName-${index}`}
                    placeholder="University of Example"
                    value={education.schoolName}
                    onChange={(e) => updateEducation(index, 'schoolName', e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`degreeType-${index}`}>Degree Type</Label>
                    <Input
                      id={`degreeType-${index}`}
                      placeholder="e.g., B.S., M.A., Ph.D."
                      value={education.degreeType}
                      onChange={(e) => updateEducation(index, 'degreeType', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`fieldOfStudy-${index}`}>Field of Study</Label>
                    <Input
                      id={`fieldOfStudy-${index}`}
                      placeholder="Computer Science"
                      value={education.fieldOfStudy}
                      onChange={(e) => updateEducation(index, 'fieldOfStudy', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`graduationDate-${index}`}>Graduation Date (or Expected)</Label>
                  <Input
                    id={`graduationDate-${index}`}
                    type="month"
                    value={education.graduationDate}
                    onChange={(e) => updateEducation(index, 'graduationDate', e.target.value)}
                  />
                </div>
              </div>
            ))}

            <Button onClick={addEducation} variant="outline" className="w-full gap-2">
              <Plus className="w-4 h-4" />
              Add Another Education
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}