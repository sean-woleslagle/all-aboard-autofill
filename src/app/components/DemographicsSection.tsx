import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Label } from '@/app/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { UserData } from '@/app/App';

interface DemographicsSectionProps {
  userData: UserData;
  updateUserData: (field: keyof UserData, value: any) => void;
}

export function DemographicsSection({ userData, updateUserData }: DemographicsSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Demographics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="disability">Disability Status</Label>
          <Select value={userData.disability} onValueChange={(value) => updateUserData('disability', value)}>
            <SelectTrigger id="disability">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="no">No, I don't have a disability</SelectItem>
              <SelectItem value="yes">Yes, I have a disability</SelectItem>
              <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="race">Race / Ethnicity</Label>
          <Select value={userData.race} onValueChange={(value) => updateUserData('race', value)}>
            <SelectTrigger id="race">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="american-indian">American Indian or Alaska Native</SelectItem>
              <SelectItem value="asian">Asian</SelectItem>
              <SelectItem value="black">Black or African American</SelectItem>
              <SelectItem value="hispanic">Hispanic or Latino</SelectItem>
              <SelectItem value="native-hawaiian">Native Hawaiian or Other Pacific Islander</SelectItem>
              <SelectItem value="white">White</SelectItem>
              <SelectItem value="two-or-more">Two or More Races</SelectItem>
              <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="veteran">Veteran Status</Label>
          <Select value={userData.veteran} onValueChange={(value) => updateUserData('veteran', value)}>
            <SelectTrigger id="veteran">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="not-veteran">I am not a protected veteran</SelectItem>
              <SelectItem value="veteran">I identify as one or more of the classifications of protected veteran</SelectItem>
              <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}