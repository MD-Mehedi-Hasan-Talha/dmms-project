"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  UserIcon,
  CameraIcon,
  DevicePhoneMobileIcon,
  EnvelopeIcon,
  MapPinIcon,
  CalendarIcon,
  BanknotesIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  KeyIcon,
  EyeIcon,
  EyeSlashIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { cn, formatCurrency, getBengaliDate } from "@/lib/utils";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // Mock user data
  const [userProfile, setUserProfile] = useState({
    id: "USR001",
    name: "মাসুদ আহমেদ",
    email: "masud.ahmed@email.com",
    phone: "০১৭১২৩৪৫৬৭৮",
    role: "Admin",
    address: "ধানমন্ডি, ঢাকা",
    joinedDate: "2024-01-15",
    messName: "গ্রীন ভ্যালি মেস",
    avatar: "/api/placeholder/150/150",
    bio: "মেস ম্যানেজমেন্টের দায়িত্বে থাকা অভিজ্ঞ অ্যাডমিন।",
    nationalId: "১২৩৪৫৬১২৩৪৫৬৭",
    emergencyContact: "০১৯৮৭৬৫৪৩২১",
    bloodGroup: "B+",
    occupation: "সফটওয়্যার ইঞ্জিনিয়ার",
  });

  // Mock stats data
  const statsData = {
    totalMeals: 45,
    totalPaid: 15000,
    totalDue: 2500,
    averageMealsPerDay: 1.5,
    monthlyAverage: 12000,
    lastPayment: "2024-01-20",
  };

  // Mock activity data
  const recentActivities = [
    {
      id: 1,
      action: "মিল এন্ট্রি",
      details: "দুপুরের খাবার",
      date: "2024-01-25",
      type: "meal",
    },
    {
      id: 2,
      action: "পেমেন্ট",
      details: "৳৫০০০ জমা",
      date: "2024-01-24",
      type: "payment",
    },
    {
      id: 3,
      action: "প্রোফাইল আপডেট",
      details: "ফোন নম্বর পরিবর্তন",
      date: "2024-01-23",
      type: "profile",
    },
    {
      id: 4,
      action: "মিল এন্ট্রি",
      details: "রাতের খাবার",
      date: "2024-01-23",
      type: "meal",
    },
    {
      id: 5,
      action: "বাজার খরচ",
      details: "সবজি কেনাকাটা",
      date: "2024-01-22",
      type: "expense",
    },
  ];

  const handleSaveProfile = () => {
    // Here you would typically make an API call to update the profile
    setIsEditing(false);
    // Show success notification
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    // Reset form data to original values
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case "meal":
        return <ChartBarIcon className="w-4 h-4 text-blue-500" />;
      case "payment":
        return <BanknotesIcon className="w-4 h-4 text-green-500" />;
      case "profile":
        return <UserIcon className="w-4 h-4 text-purple-500" />;
      case "expense":
        return <ShoppingCartIcon className="w-4 h-4 text-orange-500" />;
      default:
        return <CalendarIcon className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            ব্যবহারকারী প্রোফাইল
          </h1>
          <p className="text-gray-600 mt-1">
            আপনার ব্যক্তিগত তথ্য এবং মেস কার্যক্রম দেখুন
          </p>
        </div>
        {!isEditing && (
          <Button
            onClick={() => setIsEditing(true)}
            className="bg-green-600 hover:bg-green-700"
          >
            <PencilIcon className="w-4 h-4 mr-2" />
            প্রোফাইল সম্পাদনা
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Summary Card */}
        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="relative inline-block">
                  <Avatar className="w-24 h-24 mx-auto">
                    <AvatarImage
                      src={userProfile.avatar}
                      alt={userProfile.name}
                    />
                    <AvatarFallback className="text-2xl font-semibold bg-green-100 text-green-600">
                      {userProfile.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <button className="absolute bottom-0 right-0 p-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors">
                      <CameraIcon className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <h2 className="text-xl font-bold text-gray-900 mt-4">
                  {userProfile.name}
                </h2>
                <p className="text-gray-600">{userProfile.email}</p>

                <div className="flex justify-center mt-3">
                  <Badge
                    className={cn(
                      "text-xs font-medium",
                      userProfile.role === "Admin"
                        ? "bg-green-100 text-green-800"
                        : userProfile.role === "Member"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                    )}
                  >
                    {userProfile.role === "Admin"
                      ? "অ্যাডমিন"
                      : userProfile.role === "Member"
                      ? "সদস্য"
                      : userProfile.role}
                  </Badge>
                </div>

                <div className="mt-4 pt-4 border-t text-sm text-gray-600 space-y-2">
                  <div className="flex items-center justify-center space-x-2">
                    <MapPinIcon className="w-4 h-4" />
                    <span>{userProfile.messName}</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <CalendarIcon className="w-4 h-4" />
                    <span>
                      যোগদান: {getBengaliDate(userProfile.joinedDate)}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Profile Content */}
        <div className="lg:col-span-2">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile">ব্যক্তিগত তথ্য</TabsTrigger>
              <TabsTrigger value="stats">পরিসংখ্যান</TabsTrigger>
              <TabsTrigger value="activity">কার্যক্রম</TabsTrigger>
              <TabsTrigger value="security">নিরাপত্তা</TabsTrigger>
            </TabsList>

            {/* Personal Information Tab */}
            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">ব্যক্তিগত তথ্য</CardTitle>
                  {isEditing && (
                    <div className="space-x-2">
                      <Button
                        size="sm"
                        onClick={handleSaveProfile}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckIcon className="w-4 h-4 mr-1" />
                        সংরক্ষণ
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleCancelEdit}
                      >
                        <XMarkIcon className="w-4 h-4 mr-1" />
                        বাতিল
                      </Button>
                    </div>
                  )}
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        পূর্ণ নাম
                      </label>
                      {isEditing ? (
                        <Input
                          value={userProfile.name}
                          onChange={(e) =>
                            setUserProfile({
                              ...userProfile,
                              name: e.target.value,
                            })
                          }
                          className="mt-1"
                        />
                      ) : (
                        <p className="mt-1 text-gray-900">{userProfile.name}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        ইমেইল
                      </label>
                      {isEditing ? (
                        <Input
                          type="email"
                          value={userProfile.email}
                          onChange={(e) =>
                            setUserProfile({
                              ...userProfile,
                              email: e.target.value,
                            })
                          }
                          className="mt-1"
                        />
                      ) : (
                        <p className="mt-1 text-gray-900">
                          {userProfile.email}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        মোবাইল নম্বর
                      </label>
                      {isEditing ? (
                        <Input
                          value={userProfile.phone}
                          onChange={(e) =>
                            setUserProfile({
                              ...userProfile,
                              phone: e.target.value,
                            })
                          }
                          className="mt-1"
                        />
                      ) : (
                        <p className="mt-1 text-gray-900">
                          {userProfile.phone}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        জাতীয় পরিচয়পত্র
                      </label>
                      {isEditing ? (
                        <Input
                          value={userProfile.nationalId}
                          onChange={(e) =>
                            setUserProfile({
                              ...userProfile,
                              nationalId: e.target.value,
                            })
                          }
                          className="mt-1"
                        />
                      ) : (
                        <p className="mt-1 text-gray-900">
                          {userProfile.nationalId}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        রক্তের গ্রুপ
                      </label>
                      {isEditing ? (
                        <Input
                          value={userProfile.bloodGroup}
                          onChange={(e) =>
                            setUserProfile({
                              ...userProfile,
                              bloodGroup: e.target.value,
                            })
                          }
                          className="mt-1"
                        />
                      ) : (
                        <p className="mt-1 text-gray-900">
                          {userProfile.bloodGroup}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        জরুরী যোগাযোগ
                      </label>
                      {isEditing ? (
                        <Input
                          value={userProfile.emergencyContact}
                          onChange={(e) =>
                            setUserProfile({
                              ...userProfile,
                              emergencyContact: e.target.value,
                            })
                          }
                          className="mt-1"
                        />
                      ) : (
                        <p className="mt-1 text-gray-900">
                          {userProfile.emergencyContact}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      ঠিকানা
                    </label>
                    {isEditing ? (
                      <Textarea
                        value={userProfile.address}
                        onChange={(e) =>
                          setUserProfile({
                            ...userProfile,
                            address: e.target.value,
                          })
                        }
                        className="mt-1"
                        rows={2}
                      />
                    ) : (
                      <p className="mt-1 text-gray-900">
                        {userProfile.address}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      পেশা
                    </label>
                    {isEditing ? (
                      <Input
                        value={userProfile.occupation}
                        onChange={(e) =>
                          setUserProfile({
                            ...userProfile,
                            occupation: e.target.value,
                          })
                        }
                        className="mt-1"
                      />
                    ) : (
                      <p className="mt-1 text-gray-900">
                        {userProfile.occupation}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      নিজের সম্পর্কে
                    </label>
                    {isEditing ? (
                      <Textarea
                        value={userProfile.bio}
                        onChange={(e) =>
                          setUserProfile({
                            ...userProfile,
                            bio: e.target.value,
                          })
                        }
                        className="mt-1"
                        rows={3}
                        placeholder="নিজের সম্পর্কে কিছু লিখুন..."
                      />
                    ) : (
                      <p className="mt-1 text-gray-900">{userProfile.bio}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Statistics Tab */}
            <TabsContent value="stats" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">মিল পরিসংখ্যান</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">মোট মিল</span>
                        <span className="font-semibold">
                          {statsData.totalMeals} টি
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">দৈনিক গড় মিল</span>
                        <span className="font-semibold">
                          {statsData.averageMealsPerDay} টি
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{
                            width: `${(statsData.totalMeals / 60) * 100}%`,
                          }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-500">
                        এই মাসে {statsData.totalMeals}/৬০ মিল
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">আর্থিক পরিসংখ্যান</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">মোট পরিশোধ</span>
                        <span className="font-semibold text-green-600">
                          {formatCurrency(statsData.totalPaid)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">বকেয়া</span>
                        <span className="font-semibold text-red-600">
                          {formatCurrency(statsData.totalDue)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">মাসিক গড়</span>
                        <span className="font-semibold">
                          {formatCurrency(statsData.monthlyAverage)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">শেষ পেমেন্ট</span>
                        <span className="font-semibold">
                          {getBengaliDate(statsData.lastPayment)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Monthly Chart Placeholder */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">মাসিক খরচের ট্রেন্ড</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <ChartBarIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">চার্ট লোড হচ্ছে...</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Activity Tab */}
            <TabsContent value="activity" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    সাম্প্রতিক কার্যক্রম
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex-shrink-0">
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-gray-900">
                              {activity.action}
                            </p>
                            <span className="text-sm text-gray-500">
                              {getBengaliDate(activity.date)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">
                            {activity.details}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">পাসওয়ার্ড পরিবর্তন</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      বর্তমান পাসওয়ার্ড
                    </label>
                    <div className="relative mt-1">
                      <Input
                        type={showOldPassword ? "text" : "password"}
                        placeholder="বর্তমান পাসওয়ার্ড লিখুন"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowOldPassword(!showOldPassword)}
                      >
                        {showOldPassword ? (
                          <EyeSlashIcon className="w-5 h-5 text-gray-400" />
                        ) : (
                          <EyeIcon className="w-5 h-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      নতুন পাসওয়ার্ড
                    </label>
                    <div className="relative mt-1">
                      <Input
                        type={showNewPassword ? "text" : "password"}
                        placeholder="নতুন পাসওয়ার্ড লিখুন"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? (
                          <EyeSlashIcon className="w-5 h-5 text-gray-400" />
                        ) : (
                          <EyeIcon className="w-5 h-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      নতুন পাসওয়ার্ড নিশ্চিত করুন
                    </label>
                    <Input
                      type="password"
                      placeholder="নতুন পাসওয়ার্ড পুনরায় লিখুন"
                      className="mt-1"
                    />
                  </div>

                  <Button className="bg-green-600 hover:bg-green-700">
                    <KeyIcon className="w-4 h-4 mr-2" />
                    পাসওয়ার্ড আপডেট করুন
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">নিরাপত্তা সেটিংস</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <ShieldCheckIcon className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-medium">টু-ফ্যাক্টর অথেন্টিকেশন</p>
                        <p className="text-sm text-gray-600">
                          অতিরিক্ত নিরাপত্তার জন্য সক্রিয় করুন
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      সক্রিয় করুন
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <DevicePhoneMobileIcon className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium">SMS বিজ্ঞপ্তি</p>
                        <p className="text-sm text-gray-600">
                          গুরুত্বপূর্ণ আপডেটের জন্য SMS পান
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      সক্রিয়
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <EnvelopeIcon className="w-5 h-5 text-purple-600" />
                      <div>
                        <p className="font-medium">ইমেইল বিজ্ঞপ্তি</p>
                        <p className="text-sm text-gray-600">
                          ইমেইলে নিয়মিত আপডেট পান
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      সক্রিয়
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
