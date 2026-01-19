import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Button } from '@/app/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { UserData } from '@/app/App';

interface SkillsSectionProps {
  userData: UserData;
  updateUserData: (field: keyof UserData, value: any) => void;
}

export function SkillsSection({ userData, updateUserData }: SkillsSectionProps) {
  const skills = userData.skills || [];
  const certifications = userData.certifications || [];
  const languages = userData.languages || [];

  // Skills functions
  const addSkill = () => {
    const newSkill = {
      name: '',
      yearsOfExperience: ''
    };
    updateUserData('skills', [...skills, newSkill]);
  };

  const removeSkill = (index: number) => {
    const updated = skills.filter((_, i) => i !== index);
    updateUserData('skills', updated);
  };

  const updateSkill = (index: number, field: string, value: string) => {
    const updated = skills.map((skill, i) => 
      i === index ? { ...skill, [field]: value } : skill
    );
    updateUserData('skills', updated);
  };

  // Certifications functions
  const addCertification = () => {
    const newCertification = {
      name: '',
      issuer: '',
      dateObtained: ''
    };
    updateUserData('certifications', [...certifications, newCertification]);
  };

  const removeCertification = (index: number) => {
    const updated = certifications.filter((_, i) => i !== index);
    updateUserData('certifications', updated);
  };

  const updateCertification = (index: number, field: string, value: string) => {
    const updated = certifications.map((cert, i) => 
      i === index ? { ...cert, [field]: value } : cert
    );
    updateUserData('certifications', updated);
  };

  // Languages functions
  const addLanguage = () => {
    const newLanguage = {
      name: '',
      proficiency: ''
    };
    updateUserData('languages', [...languages, newLanguage]);
  };

  const removeLanguage = (index: number) => {
    const updated = languages.filter((_, i) => i !== index);
    updateUserData('languages', updated);
  };

  const updateLanguage = (index: number, field: string, value: string) => {
    const updated = languages.map((lang, i) => 
      i === index ? { ...lang, [field]: value } : lang
    );
    updateUserData('languages', updated);
  };

  return (
    <div className="space-y-6">
      {/* Skills Section */}
      <Card>
        <CardHeader>
          <CardTitle>Skills</CardTitle>
          <CardDescription>List your technical and professional skills</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {skills.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p className="mb-4">No skills added yet</p>
              <Button onClick={addSkill} className="gap-2">
                <Plus className="w-4 h-4" />
                Add Skill
              </Button>
            </div>
          ) : (
            <>
              {skills.map((skill, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-4 relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={() => removeSkill(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`skill-name-${index}`}>Skill Name</Label>
                      <Input
                        id={`skill-name-${index}`}
                        placeholder="e.g., React, Python, Project Management"
                        value={skill.name}
                        onChange={(e) => updateSkill(index, 'name', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`skill-years-${index}`}>Years of Experience</Label>
                      <Input
                        id={`skill-years-${index}`}
                        type="number"
                        min="0"
                        step="0.5"
                        placeholder="e.g., 3.5"
                        value={skill.yearsOfExperience}
                        onChange={(e) => updateSkill(index, 'yearsOfExperience', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}

              <Button onClick={addSkill} variant="outline" className="w-full gap-2">
                <Plus className="w-4 h-4" />
                Add Another Skill
              </Button>
            </>
          )}
        </CardContent>
      </Card>

      {/* Certifications Section */}
      <Card>
        <CardHeader>
          <CardTitle>Certifications</CardTitle>
          <CardDescription>Add your professional certifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {certifications.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p className="mb-4">No certifications added yet</p>
              <Button onClick={addCertification} className="gap-2">
                <Plus className="w-4 h-4" />
                Add Certification
              </Button>
            </div>
          ) : (
            <>
              {certifications.map((cert, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-4 relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={() => removeCertification(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>

                  <div className="space-y-2">
                    <Label htmlFor={`cert-name-${index}`}>Certification Name</Label>
                    <Input
                      id={`cert-name-${index}`}
                      placeholder="e.g., AWS Certified Solutions Architect"
                      value={cert.name}
                      onChange={(e) => updateCertification(index, 'name', e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`cert-issuer-${index}`}>Issuing Organization</Label>
                      <Input
                        id={`cert-issuer-${index}`}
                        placeholder="e.g., Amazon Web Services"
                        value={cert.issuer}
                        onChange={(e) => updateCertification(index, 'issuer', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`cert-date-${index}`}>Date Obtained</Label>
                      <Input
                        id={`cert-date-${index}`}
                        type="month"
                        value={cert.dateObtained}
                        onChange={(e) => updateCertification(index, 'dateObtained', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}

              <Button onClick={addCertification} variant="outline" className="w-full gap-2">
                <Plus className="w-4 h-4" />
                Add Another Certification
              </Button>
            </>
          )}
        </CardContent>
      </Card>

      {/* Languages Section */}
      <Card>
        <CardHeader>
          <CardTitle>Languages</CardTitle>
          <CardDescription>List languages you can speak</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {languages.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p className="mb-4">No languages added yet</p>
              <Button onClick={addLanguage} className="gap-2">
                <Plus className="w-4 h-4" />
                Add Language
              </Button>
            </div>
          ) : (
            <>
              {languages.map((lang, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-4 relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={() => removeLanguage(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`lang-name-${index}`}>Language</Label>
                      <Input
                        id={`lang-name-${index}`}
                        placeholder="e.g., Spanish, Mandarin"
                        value={lang.name}
                        onChange={(e) => updateLanguage(index, 'name', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`lang-proficiency-${index}`}>Proficiency Level</Label>
                      <Input
                        id={`lang-proficiency-${index}`}
                        placeholder="e.g., Native, Fluent, Conversational"
                        value={lang.proficiency}
                        onChange={(e) => updateLanguage(index, 'proficiency', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}

              <Button onClick={addLanguage} variant="outline" className="w-full gap-2">
                <Plus className="w-4 h-4" />
                Add Another Language
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
