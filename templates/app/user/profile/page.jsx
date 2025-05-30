"use client";

import { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  UserCircleIcon,
  PencilIcon,
  CameraIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  CalendarDaysIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ChartBarIcon,
  DocumentTextIcon,
  KeyIcon,
  BellIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";

export default function UserProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Mock user data
  const [userData, setUserData] = useState({
    id: 1,
    name: "মোহাম্মদ রহিম উদ্দিন",
    email: "rahim@example.com",
    phone: "০১৭১২৩৪৫৬৭৮",
    address: "ঢাকা, বাংলাদেশ",
    dateOfBirth: "1995-05-15",
    joinDate: "2025-01-01",
    role: "member",
    status: "active",
    emergencyContact: "০১৯৮৭৆৫৪৩২১",
    nidNumber: "১২৩৪৫৬৭৮৯০",
    occupation: "সফটওয়্যার ইঞ্জিনিয়ার",
    bloodGroup: "B+",
    profileImage: null,
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsNotifications: false,
    mealReminders: true,
    paymentReminders: true,
    language: "bn",
    theme: "light",
  });

  // Mock activity data
  const recentActivities = [
    {
      id: 1,
      type: "meal",
      description: "আজকের দুপুরের খাবার এন্ট্রি",
      date: "2025-05-29",
      time: "12:30 PM",
    },
    {
      id: 2,
      type: "payment",
      description: "মাসিক বিল পরিশোধ - ৳৩,৫০০",
      date: "2025-05-28",
      time: "10:15 AM",
    },
    {
      id: 3,
      type: "feedback",
      description: "খাবারের মান নিয়ে ফিডব্যাক দিয়েছেন",
      date: "2025-05-27",
      time: "6:45 PM",
    },
    {
      id: 4,
      type: "meal",
      description: "গতকালের রাতের খাবার এন্ট্রি",
      date: "2025-05-26",
      time: "8:20 PM",
    },
  ];

  // Mock statistics
  const userStats = {
    totalMeals: 180,
    thisMonthMeals: 25,
    totalPayments: 12500,
    lastPayment: 3500,
    feedbackGiven: 8,
    daysActive: 120,
  };

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const roles = [
    { value: "admin", label: "প্রশাসক" },
    { value: "manager", label: "ম্যানেজার" },
    { value: "member", label: "সদস্য" },
  ];

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your API
    setIsEditing(false);
    // Show success message
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("নতুন পাসওয়ার্ড ও নিশ্চিত পাসওয়ার্ড মিলছে না");
      return;
    }
    // Here you would typically send the password data to your API
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    // Show success message
  };

  const handlePreferencesUpdate = () => {
    // Here you would typically save preferences to your API
    // Show success message
  };

  const getActivityIcon = (type) => {
    const icons = {
      meal: ChartBarIcon,
      payment: CurrencyDollarIcon,
      feedback: DocumentTextIcon,
      default: ClockIcon,
    };
    return icons[type] || icons.default;
  };

  const getActivityColor = (type) => {
    const colors = {
      meal: "text-green-600",
      payment: "text-blue-600",
      feedback: "text-purple-600",
      default: "text-gray-600",
    };
    return colors[type] || colors.default;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("bn-BD", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const tabs = [
    { id: "profile", label: "প্রোফাইল তথ্য", icon: UserCircleIcon },
    { id: "activity", label: "কার্যক্রম", icon: ClockIcon },
    { id: "statistics", label: "পরিসংখ্যান", icon: ChartBarIcon },
    { id: "security", label: "নিরাপত্তা", icon: KeyIcon },
    { id: "preferences", label: "পছন্দসমূহ", icon: BellIcon },
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          ব্যবহারকারী প্রোফাইল
        </h1>
        <p className="text-gray-600">
          আপনার প্রোফাইল তথ্য ও সেটিংস ব্যবস্থাপনা করুন
        </p>
      </div>

      {/* Profile Header Card */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative">
              <div className="h-24 w-24 rounded-full bg-gray-300 flex items-center justify-center">
                {userData.profileImage ? (
                  <img
                    src={userData.profileImage}
                    alt="Profile"
                    className="h-24 w-24 rounded-full object-cover"
                  />
                ) : (
                  <UserCircleIcon className="h-16 w-16 text-gray-400" />
                )}
              </div>
              <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700">
                <CameraIcon className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold text-gray-900">
                {userData.name}
              </h2>
              <p className="text-gray-600 mb-2">{userData.occupation}</p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
                <Badge className="bg-green-100 text-green-800">
                  {roles.find((r) => r.value === userData.role)?.label}
                </Badge>
                <Badge
                  className={
                    userData.status === "active"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-red-100 text-red-800"
                  }
                >
                  {userData.status === "active" ? "সক্রিয়" : "নিষ্ক্রিয়"}
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <EnvelopeIcon className="h-4 w-4 text-gray-400" />
                  <span>{userData.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <PhoneIcon className="h-4 w-4 text-gray-400" />
                  <span>{userData.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarDaysIcon className="h-4 w-4 text-gray-400" />
                  <span>যোগদান: {formatDate(userData.joinDate)}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tab Navigation */}
      <div className="mb-6">
        <nav className="flex space-x-8 border-b border-gray-200">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === "profile" && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>প্রোফাইল তথ্য</CardTitle>
              <Button
                variant="outline"
                onClick={() => setIsEditing(!isEditing)}
              >
                <PencilIcon className="h-4 w-4 mr-2" />
                {isEditing ? "বাতিল" : "সম্পাদনা"}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleProfileUpdate} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">পূর্ণ নাম *</Label>
                  <Input
                    id="name"
                    value={userData.name}
                    onChange={(e) =>
                      setUserData({ ...userData, name: e.target.value })
                    }
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
                    onChange={(e) =>
                      setUserData({ ...userData, email: e.target.value })
                    }
                    disabled={!isEditing}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="phone">ফোন নম্বর *</Label>
                  <Input
                    id="phone"
                    value={userData.phone}
                    onChange={(e) =>
                      setUserData({ ...userData, phone: e.target.value })
                    }
                    disabled={!isEditing}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="emergencyContact">জরুরি যোগাযোগ</Label>
                  <Input
                    id="emergencyContact"
                    value={userData.emergencyContact}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        emergencyContact: e.target.value,
                      })
                    }
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="dateOfBirth">জন্ম তারিখ</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={userData.dateOfBirth}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        dateOfBirth: e.target.value,
                      })
                    }
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="bloodGroup">রক্তের গ্রুপ</Label>
                  <Select
                    value={userData.bloodGroup}
                    onValueChange={(value) =>
                      setUserData({ ...userData, bloodGroup: value })
                    }
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {bloodGroups.map((group) => (
                        <SelectItem key={group} value={group}>
                          {group}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="nidNumber">জাতীয় পরিচয়পত্র নম্বর</Label>
                  <Input
                    id="nidNumber"
                    value={userData.nidNumber}
                    onChange={(e) =>
                      setUserData({ ...userData, nidNumber: e.target.value })
                    }
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="occupation">পেশা</Label>
                  <Input
                    id="occupation"
                    value={userData.occupation}
                    onChange={(e) =>
                      setUserData({ ...userData, occupation: e.target.value })
                    }
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="address">ঠিকানা</Label>
                <Textarea
                  id="address"
                  value={userData.address}
                  onChange={(e) =>
                    setUserData({ ...userData, address: e.target.value })
                  }
                  disabled={!isEditing}
                  rows={3}
                />
              </div>

              {isEditing && <Button type="submit">প্রোফাইল আপডেট করুন</Button>}
            </form>
          </CardContent>
        </Card>
      )}

      {activeTab === "activity" && (
        <Card>
          <CardHeader>
            <CardTitle>সাম্প্রতিক কার্যক্রম</CardTitle>
            <CardDescription>
              আপনার সাম্প্রতিক কার্যক্রমের তালিকা
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => {
                const Icon = getActivityIcon(activity.type);
                return (
                  <div
                    key={activity.id}
                    className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg"
                  >
                    <Icon
                      className={`h-8 w-8 ${getActivityColor(activity.type)}`}
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        {activity.description}
                      </p>
                      <p className="text-sm text-gray-500">
                        {formatDate(activity.date)} - {activity.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "statistics" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">মোট খাবার</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {userStats.totalMeals}
                  </p>
                </div>
                <ChartBarIcon className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    এই মাসের খাবার
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {userStats.thisMonthMeals}
                  </p>
                </div>
                <CalendarDaysIcon className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    মোট পেমেন্ট
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    ৳{userStats.totalPayments.toLocaleString()}
                  </p>
                </div>
                <CurrencyDollarIcon className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    শেষ পেমেন্ট
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    ৳{userStats.lastPayment.toLocaleString()}
                  </p>
                </div>
                <CheckCircleIcon className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    দেওয়া ফিডব্যাক
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {userStats.feedbackGiven}
                  </p>
                </div>
                <DocumentTextIcon className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    সক্রিয় দিন
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {userStats.daysActive}
                  </p>
                </div>
                <ClockIcon className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "security" && (
        <Card>
          <CardHeader>
            <CardTitle>পাসওয়ার্ড পরিবর্তন</CardTitle>
            <CardDescription>
              আপনার অ্যাকাউন্টের নিরাপত্তার জন্য নিয়মিত পাসওয়ার্ড পরিবর্তন
              করুন
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <Label htmlFor="currentPassword">বর্তমান পাসওয়ার্ড *</Label>
                <div className="relative">
                  <Input
                    id="currentPassword"
                    type={showPassword ? "text" : "password"}
                    value={passwordData.currentPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        currentPassword: e.target.value,
                      })
                    }
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-4 w-4 text-gray-400" />
                    ) : (
                      <EyeIcon className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <Label htmlFor="newPassword">নতুন পাসওয়ার্ড *</Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    value={passwordData.newPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        newPassword: e.target.value,
                      })
                    }
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? (
                      <EyeSlashIcon className="h-4 w-4 text-gray-400" />
                    ) : (
                      <EyeIcon className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <Label htmlFor="confirmPassword">
                  নতুন পাসওয়ার্ড নিশ্চিত করুন *
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={passwordData.confirmPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        confirmPassword: e.target.value,
                      })
                    }
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeSlashIcon className="h-4 w-4 text-gray-400" />
                    ) : (
                      <EyeIcon className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <Button type="submit">পাসওয়ার্ড পরিবর্তন করুন</Button>
            </form>
          </CardContent>
        </Card>
      )}

      {activeTab === "preferences" && (
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
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">ইমেইল নোটিফিকেশন</p>
                      <p className="text-sm text-gray-500">
                        গুরুত্বপূর্ণ আপডেটের জন্য ইমেইল পান
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={preferences.emailNotifications}
                      onChange={(e) =>
                        setPreferences({
                          ...preferences,
                          emailNotifications: e.target.checked,
                        })
                      }
                      className="rounded border-gray-300"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">SMS নোটিফিকেশন</p>
                      <p className="text-sm text-gray-500">
                        জরুরি বিজ্ঞপ্তির জন্য SMS পান
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={preferences.smsNotifications}
                      onChange={(e) =>
                        setPreferences({
                          ...preferences,
                          smsNotifications: e.target.checked,
                        })
                      }
                      className="rounded border-gray-300"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">খাবারের রিমাইন্ডার</p>
                      <p className="text-sm text-gray-500">
                        খাবারের সময় রিমাইন্ডার পান
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={preferences.mealReminders}
                      onChange={(e) =>
                        setPreferences({
                          ...preferences,
                          mealReminders: e.target.checked,
                        })
                      }
                      className="rounded border-gray-300"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">পেমেন্ট রিমাইন্ডার</p>
                      <p className="text-sm text-gray-500">
                        বিল পরিশোধের রিমাইন্ডার পান
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={preferences.paymentReminders}
                      onChange={(e) =>
                        setPreferences({
                          ...preferences,
                          paymentReminders: e.target.checked,
                        })
                      }
                      className="rounded border-gray-300"
                    />
                  </div>
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
                        setPreferences({ ...preferences, language: value })
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
                      onValueChange={(value) =>
                        setPreferences({ ...preferences, theme: value })
                      }
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
      )}
    </div>
  );
}
