import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function PreferencesSettings({
  preferences,
  setPreferences,
  handlePreferencesUpdate,
}) {
  const handleCheckboxChange = (e) => {
    setPreferences((prev) => ({ ...prev, [e.target.id]: e.target.checked }));
  };
  const handleSelectChange = (id, value) => {
    setPreferences((prev) => ({ ...prev, [id]: value }));
  };

  const ToggleSetting = ({ id, title, description, checked }) => (
    <div className="flex items-center justify-between">
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={handleCheckboxChange}
        className="rounded border-gray-300"
      />
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>পছন্দসমূহ</CardTitle>
        <CardDescription>
          আপনার অ্যাপ্লিকেশন সেটিংস কাস্টমাইজ করুন
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              নোটিফিকেশন সেটিংস
            </h3>
            <div className="space-y-4">
              <ToggleSetting
                id="emailNotifications"
                title="ইমেইল নোটিফিকেশন"
                description="গুরুত্বপূর্ণ আপডেটের জন্য ইমেইল পান"
                checked={preferences.emailNotifications}
              />
              <ToggleSetting
                id="smsNotifications"
                title="SMS নোটিফিকেশন"
                description="জরুরি বিজ্ঞপ্তির জন্য SMS পান"
                checked={preferences.smsNotifications}
              />
              <ToggleSetting
                id="mealReminders"
                title="খাবারের রিমাইন্ডার"
                description="খাবারের সময় রিমাইন্ডার পান"
                checked={preferences.mealReminders}
              />
              <ToggleSetting
                id="paymentReminders"
                title="পেমেন্ট রিমাইন্ডার"
                description="বিল পরিশোধের রিমাইন্ডার পান"
                checked={preferences.paymentReminders}
              />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              অ্যাপ্লিকেশন সেটিংস
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="language">ভাষা</Label>
                <Select
                  value={preferences.language}
                  onValueChange={(value) =>
                    handleSelectChange("language", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bn">বাংলা</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="theme">থিম</Label>
                <Select
                  value={preferences.theme}
                  onValueChange={(value) => handleSelectChange("theme", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">হালকা</SelectItem>
                    <SelectItem value="dark">গাঢ়</SelectItem>
                    <SelectItem value="auto">স্বয়ংক্রিয়</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <Button onClick={handlePreferencesUpdate}>
            পছন্দসমূহ সংরক্ষণ করুন
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
