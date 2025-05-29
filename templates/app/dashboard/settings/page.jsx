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
import { Badge } from "@/components/ui/badge";
import {
  CogIcon,
  UserIcon,
  CurrencyDollarIcon,
  BellIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  DevicePhoneMobileIcon,
  KeyIcon,
  DocumentTextIcon,
  TrashIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { formatCurrency, getBengaliNumber } from "@/lib/utils";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [settings, setSettings] = useState({
    general: {
      messName: "আমাদের ডিজিটাল মেস",
      address: "ধানমন্ডি, ঢাকা-১২০৫",
      phone: "০১৭১২৩৪৫৬৭৮",
      email: "info@mess.com",
      currency: "BDT",
      language: "bn",
    },
    financial: {
      mealRate: 150,
      mealRateFlexible: true,
      autoCalculation: true,
      taxRate: 0,
      lateFee: 50,
      discountRate: 5,
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      paymentReminders: true,
      mealReminders: true,
      expenseAlerts: true,
      weeklyReports: true,
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: 30,
      passwordStrength: "medium",
      loginAttempts: 5,
    },
  });

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmAction, setConfirmAction] = useState("");

  const settingsTabs = {
    general: { name: "সাধারণ", icon: CogIcon },
    financial: { name: "আর্থিক", icon: CurrencyDollarIcon },
    notifications: { name: "নোটিফিকেশন", icon: BellIcon },
    security: { name: "নিরাপত্তা", icon: ShieldCheckIcon },
    users: { name: "ব্যবহারকারী", icon: UserIcon },
    backup: { name: "ব্যাকআপ", icon: DocumentTextIcon },
  };

  const updateSetting = (category, key, value) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value,
      },
    }));
  };

  const handleSaveSettings = () => {
    setShowConfirmation(true);
    setConfirmAction("save");
  };

  const handleResetSettings = () => {
    setShowConfirmation(true);
    setConfirmAction("reset");
  };

  const handleExportData = () => {
    console.log("Exporting data...");
    // Add export logic here
  };

  const handleBackupData = () => {
    console.log("Creating backup...");
    // Add backup logic here
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">সেটিংস</h1>
          <p className="text-gray-600">সিস্টেম কনফিগারেশন এবং পছন্দসমূহ</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={handleResetSettings}>
            <TrashIcon className="w-4 h-4 mr-2" />
            রিসেট করুন
          </Button>
          <Button
            onClick={handleSaveSettings}
            className="bg-green-600 hover:bg-green-700"
          >
            <CheckCircleIcon className="w-4 h-4 mr-2" />
            সংরক্ষণ করুন
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>সেটিংস মেনু</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {Object.entries(settingsTabs).map(([key, tab]) => {
                  const TabIcon = tab.icon;
                  return (
                    <button
                      key={key}
                      onClick={() => setActiveTab(key)}
                      className={`w-full flex items-center px-4 py-3 text-left hover:bg-gray-50 ${
                        activeTab === key
                          ? "bg-green-50 border-r-2 border-green-500 text-green-700"
                          : "text-gray-700"
                      }`}
                    >
                      <TabIcon className="w-5 h-5 mr-3" />
                      {tab.name}
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          {/* General Settings */}
          {activeTab === "general" && (
            <Card>
              <CardHeader>
                <CardTitle>সাধারণ সেটিংস</CardTitle>
                <CardDescription>মেস ব্যবস্থাপনার মৌলিক তথ্য</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      মেসের নাম
                    </label>
                    <Input
                      value={settings.general.messName}
                      onChange={(e) =>
                        updateSetting("general", "messName", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ফোন নম্বর
                    </label>
                    <Input
                      value={settings.general.phone}
                      onChange={(e) =>
                        updateSetting("general", "phone", e.target.value)
                      }
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ঠিকানা
                  </label>
                  <Input
                    value={settings.general.address}
                    onChange={(e) =>
                      updateSetting("general", "address", e.target.value)
                    }
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ইমেইল
                    </label>
                    <Input
                      type="email"
                      value={settings.general.email}
                      onChange={(e) =>
                        updateSetting("general", "email", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ভাষা
                    </label>
                    <select
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={settings.general.language}
                      onChange={(e) =>
                        updateSetting("general", "language", e.target.value)
                      }
                    >
                      <option value="bn">বাংলা</option>
                      <option value="en">English</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Financial Settings */}
          {activeTab === "financial" && (
            <Card>
              <CardHeader>
                <CardTitle>আর্থিক সেটিংস</CardTitle>
                <CardDescription>মিল রেট এবং আর্থিক নীতিমালা</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      মিল রেট (টাকা)
                    </label>
                    <Input
                      type="number"
                      value={settings.financial.mealRate}
                      onChange={(e) =>
                        updateSetting(
                          "financial",
                          "mealRate",
                          parseInt(e.target.value)
                        )
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      বিলম্ব ফি (টাকা)
                    </label>
                    <Input
                      type="number"
                      value={settings.financial.lateFee}
                      onChange={(e) =>
                        updateSetting(
                          "financial",
                          "lateFee",
                          parseInt(e.target.value)
                        )
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ছাড়ের হার (%)
                    </label>
                    <Input
                      type="number"
                      value={settings.financial.discountRate}
                      onChange={(e) =>
                        updateSetting(
                          "financial",
                          "discountRate",
                          parseInt(e.target.value)
                        )
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ট্যাক্স রেট (%)
                    </label>
                    <Input
                      type="number"
                      value={settings.financial.taxRate}
                      onChange={(e) =>
                        updateSetting(
                          "financial",
                          "taxRate",
                          parseInt(e.target.value)
                        )
                      }
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">
                      মিল রেট নমনীয় করুন
                    </label>
                    <input
                      type="checkbox"
                      checked={settings.financial.mealRateFlexible}
                      onChange={(e) =>
                        updateSetting(
                          "financial",
                          "mealRateFlexible",
                          e.target.checked
                        )
                      }
                      className="rounded"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">
                      স্বয়ংক্রিয় হিসাব
                    </label>
                    <input
                      type="checkbox"
                      checked={settings.financial.autoCalculation}
                      onChange={(e) =>
                        updateSetting(
                          "financial",
                          "autoCalculation",
                          e.target.checked
                        )
                      }
                      className="rounded"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Notification Settings */}
          {activeTab === "notifications" && (
            <Card>
              <CardHeader>
                <CardTitle>নোটিফিকেশন সেটিংস</CardTitle>
                <CardDescription>
                  সতর্কতা এবং রিমাইন্ডার পছন্দসমূহ
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">ইমেইল নোটিফিকেশন</div>
                      <div className="text-sm text-gray-600">
                        ইমেইলের মাধ্যমে আপডেট পান
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.notifications.emailNotifications}
                      onChange={(e) =>
                        updateSetting(
                          "notifications",
                          "emailNotifications",
                          e.target.checked
                        )
                      }
                      className="rounded"
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">SMS নোটিফিকেশন</div>
                      <div className="text-sm text-gray-600">
                        SMS এর মাধ্যমে জরুরি সতর্কতা
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.notifications.smsNotifications}
                      onChange={(e) =>
                        updateSetting(
                          "notifications",
                          "smsNotifications",
                          e.target.checked
                        )
                      }
                      className="rounded"
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">পেমেন্ট রিমাইন্ডার</div>
                      <div className="text-sm text-gray-600">
                        বকেয়া পেমেন্টের রিমাইন্ডার
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.notifications.paymentReminders}
                      onChange={(e) =>
                        updateSetting(
                          "notifications",
                          "paymentReminders",
                          e.target.checked
                        )
                      }
                      className="rounded"
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">মিল রিমাইন্ডার</div>
                      <div className="text-sm text-gray-600">
                        দৈনিক মিল এন্ট্রির রিমাইন্ডার
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.notifications.mealReminders}
                      onChange={(e) =>
                        updateSetting(
                          "notifications",
                          "mealReminders",
                          e.target.checked
                        )
                      }
                      className="rounded"
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">খরচ সতর্কতা</div>
                      <div className="text-sm text-gray-600">
                        বাজেট সীমা অতিক্রমের সতর্কতা
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.notifications.expenseAlerts}
                      onChange={(e) =>
                        updateSetting(
                          "notifications",
                          "expenseAlerts",
                          e.target.checked
                        )
                      }
                      className="rounded"
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">সাপ্তাহিক রিপোর্ট</div>
                      <div className="text-sm text-gray-600">
                        সাপ্তাহিক সারসংক্ষেপ রিপোর্ট
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.notifications.weeklyReports}
                      onChange={(e) =>
                        updateSetting(
                          "notifications",
                          "weeklyReports",
                          e.target.checked
                        )
                      }
                      className="rounded"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Security Settings */}
          {activeTab === "security" && (
            <Card>
              <CardHeader>
                <CardTitle>নিরাপত্তা সেটিংস</CardTitle>
                <CardDescription>
                  অ্যাকাউন্ট নিরাপত্তা এবং গোপনীয়তা
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">দুই-ধাপ প্রমাণীকরণ</div>
                      <div className="text-sm text-gray-600">
                        অতিরিক্ত নিরাপত্তার জন্য সক্রিয় করুন
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.security.twoFactorAuth}
                      onChange={(e) =>
                        updateSetting(
                          "security",
                          "twoFactorAuth",
                          e.target.checked
                        )
                      }
                      className="rounded"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        সেশন টাইমআউট (মিনিট)
                      </label>
                      <Input
                        type="number"
                        value={settings.security.sessionTimeout}
                        onChange={(e) =>
                          updateSetting(
                            "security",
                            "sessionTimeout",
                            parseInt(e.target.value)
                          )
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        লগইন চেষ্টার সীমা
                      </label>
                      <Input
                        type="number"
                        value={settings.security.loginAttempts}
                        onChange={(e) =>
                          updateSetting(
                            "security",
                            "loginAttempts",
                            parseInt(e.target.value)
                          )
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      পাসওয়ার্ড শক্তি
                    </label>
                    <select
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={settings.security.passwordStrength}
                      onChange={(e) =>
                        updateSetting(
                          "security",
                          "passwordStrength",
                          e.target.value
                        )
                      }
                    >
                      <option value="low">দুর্বল</option>
                      <option value="medium">মাঝারি</option>
                      <option value="high">শক্তিশালী</option>
                    </select>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <Button variant="outline" className="w-full">
                    <KeyIcon className="w-4 h-4 mr-2" />
                    পাসওয়ার্ড পরিবর্তন করুন
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Users Management */}
          {activeTab === "users" && (
            <Card>
              <CardHeader>
                <CardTitle>ব্যবহারকারী ব্যবস্থাপনা</CardTitle>
                <CardDescription>
                  সিস্টেম ব্যবহারকারী এবং অনুমতিসমূহ
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">
                      নতুন ব্যবহারকারী যোগ করুন
                    </span>
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <UserIcon className="w-4 h-4 mr-2" />
                      যোগ করুন
                    </Button>
                  </div>
                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-3">ব্যবহারকারীর ভূমিকা</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium">অ্যাডমিন</div>
                          <div className="text-sm text-gray-600">
                            সম্পূর্ণ নিয়ন্ত্রণ এবং অ্যাক্সেস
                          </div>
                        </div>
                        <Badge className="bg-red-100 text-red-800">
                          উচ্চ ক্ষমতা
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium">ম্যানেজার</div>
                          <div className="text-sm text-gray-600">
                            দৈনন্দিন কার্যক্রম ব্যবস্থাপনা
                          </div>
                        </div>
                        <Badge className="bg-blue-100 text-blue-800">
                          মাঝারি ক্ষমতা
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium">সদস্য</div>
                          <div className="text-sm text-gray-600">
                            শুধুমাত্র নিজের তথ্য দেখা
                          </div>
                        </div>
                        <Badge className="bg-green-100 text-green-800">
                          সীমিত ক্ষমতা
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Backup Settings */}
          {activeTab === "backup" && (
            <Card>
              <CardHeader>
                <CardTitle>ডেটা ব্যাকআপ</CardTitle>
                <CardDescription>
                  ডেটা নিরাপত্তা এবং ব্যাকআপ ব্যবস্থাপনা
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button
                    onClick={handleBackupData}
                    className="h-16 flex-col bg-blue-600 hover:bg-blue-700"
                  >
                    <DocumentTextIcon className="w-6 h-6 mb-2" />
                    ডেটা ব্যাকআপ তৈরি করুন
                  </Button>
                  <Button
                    onClick={handleExportData}
                    variant="outline"
                    className="h-16 flex-col"
                  >
                    <DocumentTextIcon className="w-6 h-6 mb-2" />
                    ডেটা এক্সপোর্ট করুন
                  </Button>
                </div>
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-3">স্বয়ংক্রিয় ব্যাকআপ</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-gray-700">
                        দৈনিক ব্যাকআপ
                      </label>
                      <input type="checkbox" className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-gray-700">
                        সাপ্তাহিক ব্যাকআপ
                      </label>
                      <input
                        type="checkbox"
                        defaultChecked
                        className="rounded"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-gray-700">
                        মাসিক ব্যাকআপ
                      </label>
                      <input
                        type="checkbox"
                        defaultChecked
                        className="rounded"
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <ExclamationTriangleIcon className="w-5 h-5 text-yellow-600 mr-2" />
                    <span className="text-sm text-yellow-800">
                      সর্বশেষ ব্যাকআপ: ২৫ জানুয়ারি, ২০২৫ - ১০:৩০ AM
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">
              {confirmAction === "save" ? "সেটিংস সংরক্ষণ" : "সেটিংস রিসেট"}
            </h3>
            <p className="text-gray-600 mb-6">
              {confirmAction === "save"
                ? "আপনি কি নিশ্চিত যে এই সেটিংস সংরক্ষণ করতে চান?"
                : "আপনি কি নিশ্চিত যে সকল সেটিংস ডিফল্ট অবস্থায় ফিরিয়ে আনতে চান?"}
            </p>
            <div className="flex space-x-3">
              <Button
                onClick={() => setShowConfirmation(false)}
                variant="outline"
                className="flex-1"
              >
                বাতিল
              </Button>
              <Button
                onClick={() => {
                  setShowConfirmation(false);
                  console.log(`${confirmAction} action confirmed`);
                }}
                className={`flex-1 ${
                  confirmAction === "save"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {confirmAction === "save" ? "সংরক্ষণ করুন" : "রিসেট করুন"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
