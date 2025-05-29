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
import { Badge } from "@/components/ui/badge";

import { getGreeting, formatCurrency, formatDate } from "@/lib/utils";
import {
  CurrencyDollarIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import {
  CalendarDaysIcon,
  ChartBarIcon,
  CheckCircleIcon,
  ClockIcon,
  EyeIcon,
  PlusIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  UsersIcon,
} from "lucide-react";

export default function DashboardPage() {
  const [currentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear] = useState(new Date().getFullYear());

  // Mock data - will be replaced with real API data
  const stats = {
    totalMembers: 12,
    activeMembers: 10,
    totalMeals: 280,
    todayMeals: 18,
    monthlyExpense: 42000,
    dailyExpense: 1400,
    mealRate: 150,
    totalDue: 3500,
    lastMonthMealRate: 145,
  };

  const recentActivities = [
    {
      id: 1,
      type: "meal",
      message: "রহিম উদ্দিন আজকের লাঞ্চ এন্ট্রি করেছেন",
      time: "১০ মিনিট আগে",
      icon: CurrencyDollarIcon,
      color: "text-green-600",
    },
    {
      id: 2,
      type: "expense",
      message: "নতুন বাজার এন্ট্রি: ৳১,২০০",
      time: "৩০ মিনিট আগে",
      icon: ChartBarIcon,
      color: "text-blue-600",
    },
    {
      id: 3,
      type: "payment",
      message: "করিম সাহেব ৳২,৫০০ পেমেন্ট করেছেন",
      time: "১ ঘন্টা আগে",
      icon: CheckCircleIcon,
      color: "text-purple-600",
    },
    {
      id: 4,
      type: "member",
      message: "নাসির হোসেন নতুন সদস্য হিসেবে যোগ দিয়েছেন",
      time: "২ ঘন্টা আগে",
      icon: UsersIcon,
      color: "text-orange-600",
    },
  ];

  const todayMenu = {
    breakfast: "পরোটা ও ডিম",
    lunch: "ভাত, মাছের তরকারি, ডাল",
    dinner: "খিচুড়ি ও আলুর তরকারি",
  };

  const upcomingTasks = [
    {
      id: 1,
      task: "মাসিক বিল জেনারেশন",
      dueDate: "২৯ মে, ২০২৫",
      priority: "high",
      status: "pending",
    },
    {
      id: 2,
      task: "গ্যাস বিল পেমেন্ট",
      dueDate: "৩০ মে, ২০২৫",
      priority: "medium",
      status: "pending",
    },
    {
      id: 3,
      task: "নতুন সদস্য অনবোর্ডিং",
      dueDate: "১ জুন, ২০২৫",
      priority: "low",
      status: "in_progress",
    },
  ];

  const mealRateChange = (
    ((stats.mealRate - stats.lastMonthMealRate) / stats.lastMonthMealRate) *
    100
  ).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {getGreeting()}, মাসুদ ভাই! 👋
          </h1>
          <p className="text-gray-600">
            আজ {formatDate(new Date())} - আপনার মেসের সামগ্রিক অবস্থা দেখুন
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <EyeIcon className="w-4 h-4 mr-2" />
            রিপোর্ট দেখুন
          </Button>
          <Button className="bg-green-600 hover:bg-green-700">
            <PlusIcon className="w-4 h-4 mr-2" />
            নতুন এন্ট্রি
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  সদস্য সংখ্যা
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.activeMembers}/{stats.totalMembers}
                </p>
                <p className="text-xs text-green-600 mt-1">
                  {stats.activeMembers} জন সক্রিয়
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <UsersIcon className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">আজকের মিল</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.todayMeals}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  মোট: {stats.totalMeals} (এই মাসে)
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <CurrencyDollarIcon className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">মিল রেট</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(stats.mealRate)}
                </p>
                <div className="flex items-center mt-1">
                  {parseFloat(mealRateChange) > 0 ? (
                    <TrendingUpIcon className="w-4 h-4 text-red-500 mr-1" />
                  ) : (
                    <TrendingDownIcon className="w-4 h-4 text-green-500 mr-1" />
                  )}
                  <p
                    className={`text-xs ${
                      parseFloat(mealRateChange) > 0
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {mealRateChange}% গত মাস থেকে
                  </p>
                </div>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <ChartBarIcon className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">মোট বকেয়া</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(stats.totalDue)}
                </p>
                <p className="text-xs text-red-600 mt-1">৩ জনের বকেয়া আছে</p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <ExclamationTriangleIcon className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          {/* Today's Menu */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CalendarDaysIcon className="w-5 h-5 mr-2" />
                আজকের মেনু
              </CardTitle>
              <CardDescription>
                {formatDate(new Date())} - আজকের খাবারের তালিকা
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <h3 className="font-semibold text-orange-800 mb-2">
                    সকালের নাস্তা
                  </h3>
                  <p className="text-sm text-orange-600">
                    {todayMenu.breakfast}
                  </p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">
                    দুপুরের খাবার
                  </h3>
                  <p className="text-sm text-green-600">{todayMenu.lunch}</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">
                    রাতের খাবার
                  </h3>
                  <p className="text-sm text-blue-600">{todayMenu.dinner}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle>সাম্প্রতিক কার্যক্রম</CardTitle>
              <CardDescription>
                গত কয়েক ঘন্টার গুরুত্বপূর্ণ আপডেট
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg"
                  >
                    <div
                      className={`p-2 rounded-full bg-gray-100 ${activity.color}`}
                    >
                      <activity.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.message}
                      </p>
                      <p className="text-xs text-gray-500 flex items-center mt-1">
                        <ClockIcon className="w-3 h-3 mr-1" />
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - 1/3 width */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>দ্রুত অ্যাকশন</CardTitle>
              <CardDescription>সচরাচর ব্যবহৃত ফিচার</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <PlusIcon className="w-4 h-4 mr-2" />
                মিল এন্ট্রি করুন
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <PlusIcon className="w-4 h-4 mr-2" />
                বাজার এন্ট্রি করুন
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <UsersIcon className="w-4 h-4 mr-2" />
                নতুন সদস্য যোগ করুন
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <ChartBarIcon className="w-4 h-4 mr-2" />
                মাসিক রিপোর্ট
              </Button>
            </CardContent>
          </Card>

          {/* Upcoming Tasks */}
          <Card>
            <CardHeader>
              <CardTitle>আসন্ন কাজ</CardTitle>
              <CardDescription>করণীয় কাজের তালিকা</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingTasks.map((task) => (
                  <div
                    key={task.id}
                    className="p-3 border border-gray-200 rounded-lg"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <p className="text-sm font-medium text-gray-900">
                        {task.task}
                      </p>
                      <Badge
                        className={`text-xs ${
                          task.priority === "high"
                            ? "bg-red-100 text-red-800"
                            : task.priority === "medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {task.priority === "high"
                          ? "জরুরি"
                          : task.priority === "medium"
                          ? "মাঝারি"
                          : "সাধারণ"}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500 mb-2">
                      শেষ তারিখ: {task.dueDate}
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {task.status === "pending"
                          ? "অপেক্ষমাণ"
                          : task.status === "in_progress"
                          ? "চলমান"
                          : "সম্পন্ন"}
                      </Badge>
                      <Button size="sm" variant="outline">
                        দেখুন
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Weather Widget (Optional) */}
          <Card>
            <CardHeader>
              <CardTitle>আজকের আবহাওয়া</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl mb-2">🌤️</div>
                <p className="text-lg font-semibold">৩২°সে</p>
                <p className="text-sm text-gray-600">আংশিক মেঘলা</p>
                <p className="text-xs text-gray-500 mt-2">ঢাকা, বাংলাদেশ</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
