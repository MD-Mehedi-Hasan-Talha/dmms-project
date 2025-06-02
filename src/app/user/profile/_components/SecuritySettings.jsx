import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function SecuritySettings({
  passwordData,
  setPasswordData,
  showStates,
  toggleShowPassword,
  handlePasswordChange,
}) {
  const handleChange = (e) => {
    setPasswordData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const PasswordInput = ({ id, label, value, type, onToggle }) => (
    <div>
      <Label htmlFor={id}>{label} *</Label>
      <div className="relative">
        <Input
          id={id}
          type={type}
          value={value}
          onChange={handleChange}
          required
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
          onClick={onToggle}
        >
          {type === "password" ? (
            <EyeIcon className="h-4 w-4 text-gray-400" />
          ) : (
            <EyeSlashIcon className="h-4 w-4 text-gray-400" />
          )}
        </button>
      </div>
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>পাসওয়ার্ড পরিবর্তন</CardTitle>
        <CardDescription>
          আপনার অ্যাকাউন্টের নিরাপত্তার জন্য নিয়মিত পাসওয়ার্ড পরিবর্তন করুন
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <PasswordInput
            id="currentPassword"
            label="বর্তমান পাসওয়ার্ড"
            value={passwordData.currentPassword}
            type={showStates.current ? "text" : "password"}
            onToggle={() => toggleShowPassword("current")}
          />
          <PasswordInput
            id="newPassword"
            label="নতুন পাসওয়ার্ড"
            value={passwordData.newPassword}
            type={showStates.new ? "text" : "password"}
            onToggle={() => toggleShowPassword("new")}
          />
          <PasswordInput
            id="confirmPassword"
            label="নতুন পাসওয়ার্ড নিশ্চিত করুন"
            value={passwordData.confirmPassword}
            type={showStates.confirm ? "text" : "password"}
            onToggle={() => toggleShowPassword("confirm")}
          />
          <Button type="submit">পাসওয়ার্ড পরিবর্তন করুন</Button>
        </form>
      </CardContent>
    </Card>
  );
}
