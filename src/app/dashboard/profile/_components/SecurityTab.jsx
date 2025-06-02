import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { KeyIcon } from "@heroicons/react/24/outline";

import { SECURITY_OPTIONS } from "@/lib/data/constants";
import PasswordInput from "./PasswordInput";
import SecurityOption from "./SecurityOption";

export default function SecurityTab({
  showPassword,
  toggleShowPassword,
  onPasswordChange,
}) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">পাসওয়ার্ড পরিবর্তন</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onPasswordChange} className="space-y-4">
            <PasswordInput
              label="বর্তমান পাসওয়ার্ড"
              isVisible={showPassword.old}
              onToggle={() => toggleShowPassword("old")}
              placeholder="বর্তমান পাসওয়ার্ড লিখুন"
            />
            <PasswordInput
              label="নতুন পাসওয়ার্ড"
              isVisible={showPassword.new}
              onToggle={() => toggleShowPassword("new")}
              placeholder="নতুন পাসওয়ার্ড লিখুন"
            />
            <div>
              <label className="text-sm font-medium text-gray-700">
                নতুন পাসওয়ার্ড নিশ্চিত করুন
              </label>
              <input
                type="password"
                placeholder="নতুন পাসওয়ার্ড পুনরায় লিখুন"
                className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              <KeyIcon className="w-4 h-4 mr-2" />
              পাসওয়ার্ড আপডেট করুন
            </Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">নিরাপত্তা সেটিংস</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {SECURITY_OPTIONS.map((option) => (
            <SecurityOption key={option.title} {...option} />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
