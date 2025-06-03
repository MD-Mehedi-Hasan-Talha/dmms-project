import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import InfoField from "./InfoField";

export default function ProfileInfoTab({
  user,
  isEditing,
  onValueChange,
  onSave,
  onCancel,
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">ব্যক্তিগত তথ্য</CardTitle>
        {isEditing && (
          <div className="space-x-2">
            <Button
              size="sm"
              onClick={onSave}
              className="bg-green-600 hover:bg-green-700"
            >
              <CheckIcon className="w-4 h-4 mr-1" /> সংরক্ষণ
            </Button>
            <Button size="sm" variant="outline" onClick={onCancel}>
              <XMarkIcon className="w-4 h-4 mr-1" /> বাতিল
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoField
            label="পূর্ণ নাম"
            field="name"
            value={user.name}
            isEditing={isEditing}
            onChange={onValueChange}
          />
          <InfoField
            label="ইমেইল"
            field="email"
            value={user.email}
            isEditing={isEditing}
            onChange={onValueChange}
          />
          <InfoField
            label="মোবাইল নম্বর"
            field="phone"
            value={user.phone}
            isEditing={isEditing}
            onChange={onValueChange}
          />
          <InfoField
            label="জাতীয় পরিচয়পত্র"
            field="nationalId"
            value={user.nationalId}
            isEditing={isEditing}
            onChange={onValueChange}
          />
          <InfoField
            label="রক্তের গ্রুপ"
            field="bloodGroup"
            value={user.bloodGroup}
            isEditing={isEditing}
            onChange={onValueChange}
          />
          <InfoField
            label="জরুরী যোগাযোগ"
            field="emergencyContact"
            value={user.emergencyContact}
            isEditing={isEditing}
            onChange={onValueChange}
          />
        </div>
        <InfoField
          label="ঠিকানা"
          field="address"
          value={user.address}
          isEditing={isEditing}
          onChange={onValueChange}
          isTextarea
          rows={2}
        />
        <InfoField
          label="পেশা"
          field="occupation"
          value={user.occupation}
          isEditing={isEditing}
          onChange={onValueChange}
        />
        <InfoField
          label="নিজের সম্পর্কে"
          field="bio"
          value={user.bio}
          isEditing={isEditing}
          onChange={onValueChange}
          isTextarea
          rows={3}
          placeholder="নিজের সম্পর্কে কিছু লিখুন..."
        />
      </CardContent>
    </Card>
  );
}
