import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Label } from '@/app/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { UserData } from '@/app/App';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/app/components/ui/alert';

interface EligibilityLegalSectionProps {
  userData: UserData;
  updateUserData: (field: keyof UserData, value: any) => void;
}

export function EligibilityLegalSection({ userData, updateUserData }: EligibilityLegalSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Eligibility & Legal</CardTitle>
        <CardDescription>Work authorization and employment eligibility information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Note: Date of birth is less common now due to age discrimination concerns. Many systems only ask "Are you 18 or older?"
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="workAuthorization">Work Authorization Status</Label>
            <Select value={userData.workAuthorization} onValueChange={(value) => updateUserData('workAuthorization', value)}>
              <SelectTrigger id="workAuthorization">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="us-citizen">US Citizen</SelectItem>
                <SelectItem value="permanent-resident">Permanent Resident</SelectItem>
                <SelectItem value="work-visa">Work Visa (H-1B, L-1, etc.)</SelectItem>
                <SelectItem value="ead">Employment Authorization Document (EAD)</SelectItem>
                <SelectItem value="student-visa">Student Visa (F-1 OPT/CPT)</SelectItem>
                <SelectItem value="require-authorization">Require Work Authorization</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="requireSponsorship">Will you now or in the future require sponsorship?</Label>
            <Select value={userData.requireSponsorship} onValueChange={(value) => updateUserData('requireSponsorship', value)}>
              <SelectTrigger id="requireSponsorship">
                <SelectValue placeholder="Select answer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="over18">Are you 18 years of age or older?</Label>
            <Select value={userData.over18} onValueChange={(value) => updateUserData('over18', value)}>
              <SelectTrigger id="over18">
                <SelectValue placeholder="Select answer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="willingToRelocate">Willing to relocate?</Label>
            <Select value={userData.willingToRelocate} onValueChange={(value) => updateUserData('willingToRelocate', value)}>
              <SelectTrigger id="willingToRelocate">
                <SelectValue placeholder="Select answer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
                <SelectItem value="maybe">Open to discussion</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="willingToTravel">Willing to travel?</Label>
            <Select value={userData.willingToTravel} onValueChange={(value) => updateUserData('willingToTravel', value)}>
              <SelectTrigger id="willingToTravel">
                <SelectValue placeholder="Select answer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
                <SelectItem value="up-to-25">Up to 25%</SelectItem>
                <SelectItem value="up-to-50">Up to 50%</SelectItem>
                <SelectItem value="up-to-75">Up to 75%</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="ableToWorkSchedule">Able to work required schedule (nights/weekends)?</Label>
            <Select value={userData.ableToWorkSchedule} onValueChange={(value) => updateUserData('ableToWorkSchedule', value)}>
              <SelectTrigger id="ableToWorkSchedule">
                <SelectValue placeholder="Select answer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
                <SelectItem value="flexible">Flexible/Negotiable</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
