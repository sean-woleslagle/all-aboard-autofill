import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { UserData } from '@/app/App';

interface PersonalInfoSectionProps {
  userData: UserData;
  updateUserData: (field: keyof UserData, value: any) => void;
}

export function PersonalInfoSection({ userData, updateUserData }: PersonalInfoSectionProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Enter your basic personal details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                placeholder="John"
                value={userData.firstName}
                onChange={(e) => updateUserData('firstName', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                placeholder="Doe"
                value={userData.lastName}
                onChange={(e) => updateUserData('lastName', e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="preferredFirstName">Preferred First Name</Label>
              <Input
                id="preferredFirstName"
                placeholder="Optional"
                value={userData.preferredFirstName}
                onChange={(e) => updateUserData('preferredFirstName', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="preferredLastName">Preferred Last Name</Label>
              <Input
                id="preferredLastName"
                placeholder="Optional"
                value={userData.preferredLastName}
                onChange={(e) => updateUserData('preferredLastName', e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={userData.dateOfBirth}
                onChange={(e) => updateUserData('dateOfBirth', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select value={userData.gender} onValueChange={(value) => updateUserData('gender', value)}>
                <SelectTrigger id="gender">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <CardDescription>Your address and contact details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="john.doe@example.com"
                value={userData.email}
                onChange={(e) => updateUserData('email', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={userData.phone}
                onChange={(e) => updateUserData('phone', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address Line 1</Label>
            <Input
              id="address"
              placeholder="123 Main Street"
              value={userData.address}
              onChange={(e) => updateUserData('address', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address2">Address Line 2 (Optional)</Label>
            <Input
              id="address2"
              placeholder="Apartment, suite, unit, etc."
              value={userData.address2}
              onChange={(e) => updateUserData('address2', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                placeholder="New York"
                value={userData.city}
                onChange={(e) => updateUserData('city', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State / Province</Label>
              <Input
                id="state"
                placeholder="NY"
                value={userData.state}
                onChange={(e) => updateUserData('state', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="postalCode">Postal Code</Label>
              <Input
                id="postalCode"
                placeholder="10001"
                value={userData.postalCode}
                onChange={(e) => updateUserData('postalCode', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              placeholder="United States"
              value={userData.country}
              onChange={(e) => updateUserData('country', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Compensation & Availability</CardTitle>
          <CardDescription>Your salary expectations and availability details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="desiredSalary">Desired Salary (Annual)</Label>
              <Input
                id="desiredSalary"
                type="text"
                placeholder="e.g., $100,000"
                value={userData.desiredSalary}
                onChange={(e) => updateUserData('desiredSalary', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="desiredHourlyRate">Desired Hourly Rate</Label>
              <Input
                id="desiredHourlyRate"
                type="text"
                placeholder="e.g., $50/hour"
                value={userData.desiredHourlyRate}
                onChange={(e) => updateUserData('desiredHourlyRate', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="earliestStartDate">Earliest Start Date</Label>
            <Input
              id="earliestStartDate"
              type="date"
              value={userData.earliestStartDate}
              onChange={(e) => updateUserData('earliestStartDate', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="employmentType">Employment Type Preference</Label>
            <Select value={userData.employmentType} onValueChange={(value) => updateUserData('employmentType', value)}>
              <SelectTrigger id="employmentType">
                <SelectValue placeholder="Select employment type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full-time">Full-Time</SelectItem>
                <SelectItem value="part-time">Part-Time</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
                <SelectItem value="temporary">Temporary</SelectItem>
                <SelectItem value="remote">Remote</SelectItem>
                <SelectItem value="hybrid">Hybrid</SelectItem>
                <SelectItem value="on-site">On-Site</SelectItem>
                <SelectItem value="flexible">Flexible</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}