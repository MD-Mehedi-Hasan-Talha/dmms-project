import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PencilIcon } from "@heroicons/react/24/outline";
import { BLOOD_GROUPS } from "@/lib/data/constants";

export default function ProfileForm({
  userData,
  setUserData,
  isEditing,
  setIsEditing,
  handleProfileUpdate,
}) {
  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (id, value) => {
    setUserData((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>প্রোফাইল তথ্য</CardTitle>
          <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
            <PencilIcon className="h-4 w-4 mr-2" />
            {isEditing ? "বাতিল" : "সম্পাদনা"}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleProfileUpdate} className="space-y-6">
          {/* Form fields here */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="name">পূর্ণ নাম *</Label>
              <Input
                id="name"
                value={userData.name}
                onChange={handleChange}
                disabled={!isEditing}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">ইমেইল *</Label>
              <Input
                id="email"
                type="email"
                value={userData.email}
                onChange={handleChange}
                disabled={!isEditing}
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">ফোন নম্বর *</Label>
              <Input
                id="phone"
                value={userData.phone}
                onChange={handleChange}
                disabled={!isEditing}
                required
              />
            </div>
            <div>
              <Label htmlFor="emergencyContact">জরুরি যোগাযোগ</Label>
              <Input
                id="emergencyContact"
                value={userData.emergencyContact}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label htmlFor="dateOfBirth">জন্ম তারিখ</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={userData.dateOfBirth}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label htmlFor="bloodGroup">রক্তের গ্রুপ</Label>
              <Select
                value={userData.bloodGroup}
                onValueChange={(value) =>
                  handleSelectChange("bloodGroup", value)
                }
                disabled={!isEditing}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {BLOOD_GROUPS.map((group) => (
                    <SelectItem key={group} value={group}>
                      {group}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="nidNumber">জাতীয় পরিচয়পত্র নম্বর</Label>
              <Input
                id="nidNumber"
                value={userData.nidNumber}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label htmlFor="occupation">পেশা</Label>
              <Input
                id="occupation"
                value={userData.occupation}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="address">ঠিকানা</Label>
            <Textarea
              id="address"
              value={userData.address}
              onChange={handleChange}
              disabled={!isEditing}
              rows={3}
            />
          </div>
          {isEditing && <Button type="submit">প্রোফাইল আপডেট করুন</Button>}
        </form>
      </CardContent>
    </Card>
  );
}
