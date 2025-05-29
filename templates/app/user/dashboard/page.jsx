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
import {
  UserCircleIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  CalendarDaysIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  BellIcon,
  DocumentTextIcon,
  StarIcon,
  ArrowRightIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import Link from "next/link";
import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";

export default function UserDashboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("thisMonth");

  // Mock user data
  const userData = {
    name: "মোহাম্মদ রহিম উদ্দিন",
    role: "member",
    profileImage: null,
    joinDate: "2025-01-01",
    lastActive: "2025-05-29",
  };

  // Mock personal statistics
  const personalStats = {
    thisMonth: {
      totalMeals: 25,
      totalCost: 3500,
      averageMealCost: 140,
      mealsByType: {
        breakfast: 8,
        lunch: 10,
        dinner: 7,
      },
      daysActive: 20,
      feedbackGiven: 2,
    },
    lastMonth: {
      totalMeals: 30,
      totalCost: 4200,
      averageMealCost: 140,
      mealsByType: {
        breakfast: 12,
        lunch: 12,
        dinner: 6,
      },
      daysActive: 25,
      feedbackGiven: 1,
    },
    allTime: {
      totalMeals: 180,
      totalCost: 25200,
      averageMealCost: 140,
      mealsByType: {
        breakfast: 65,
        lunch: 75,
        dinner: 40,
      },
      daysActive: 120,
      feedbackGiven: 8,
    },
  };

  // Mock recent activities
  const recentActivities = [
    {
      id: 1,
      type: "meal",
      description: "আজকের দুপুরের খাবার এন্ট্রি করেছেন",
      time: "১২:৩০ PM",
      date: "আজ",
      icon: ChartBarIcon,
      color: "text-green-600",
    },
    {
      id: 2,
      type: "payment",
      description: "মাসিক বিল পরিশোধ করেছেন - ৳৩,৫০০",
      time: "১০:১৫ AM",
      date: "গতকাল",
      icon: CurrencyDollarIcon,
      color: "text-blue-600",
    },
    {
      id: 3,
      type: "feedback",
      description: "খাবারের মান নিয়ে ফিডব্যাক দিয়েছেন",
      time: "৬:৪৫ PM",
      date: "২ দিন আগে",
      icon: DocumentTextIcon,
      color: "text-purple-600",
    },
    {
      id: 4,
      type: "notice",
      description: "নতুন নোটিশ দেখেছেন",
      time: "৮:২০ PM",
      date: "৩ দিন আগে",
      icon: BellIcon,
      color: "text-orange-600",
    },
  ];

  // Mock upcoming events
  const upcomingEvents = [
    {
      id: 1,
      title: "মাসিক বিল পরিশোধের শেষ তারিখ",
      date: "৩০ মে, ২০২৫",
      type: "payment",
      urgent: true,
    },
    {
      id: 2,
      title: "মেস মিটিং",
      date: "৫ জুন, ২০২৫",
      type: "meeting",
      urgent: false,
    },
    {
      id: 3,
      title: "ঈদের ছুটি শুরু",
      date: "১৫ জুন, ২০২৫",
      type: "holiday",
      urgent: false,
    },
  ];

  // Mock notifications
  const notifications = [
    {
      id: 1,
      title: "নতুন মেনু আপডেট",
      message: "আগামীকালের মেনু প্রকাশ করা হয়েছে",
      time: "১ ঘন্টা আগে",
      unread: true,
      type: "info",
    },
    {
      id: 2,
      title: "পেমেন্ট রিমাইন্ডার",
      message: "আপনার এই মাসের বিল বাকি আছে",
      time: "৩ ঘন্টা আগে",
      unread: true,
      type: "warning",
    },
    {
      id: 3,
      title: "ফিডব্যাক উত্তর",
      message: "আপনার ফিডব্যাকের উত্তর দেওয়া হয়েছে",
      time: "১ দিন আগে",
      unread: false,
      type: "success",
    },
  ];

  const currentStats = personalStats[selectedPeriod];

  const getMealProgress = (current, target) => {
    return Math.min((current / target) * 100, 100);
  };

  const getComparison = (current, previous) => {
    if (previous === 0) return { value: 0, trend: "neutral" };
    const percentage = ((current - previous) / previous) * 100;
    return {
      value: Math.abs(percentage).toFixed(1),
      trend: percentage > 0 ? "up" : percentage < 0 ? "down" : "neutral",
    };
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("bn-BD", {
      day: "numeric",
      month: "long",
    });
  };

  const getNotificationIcon = (type) => {
    const icons = {
      info: BellIcon,
      warning: ExclamationTriangleIcon,
      success: CheckCircleIcon,
    };
    return icons[type] || BellIcon;
  };

  const getNotificationColor = (type) => {
    const colors = {
      info: "text-blue-600",
      warning: "text-yellow-600",
      success: "text-green-600",
    };
    return colors[type] || "text-blue-600";
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              স্বাগতম, {userData.name}
            </h1>
            <p className="text-gray-600 mt-1">আপনার ব্যক্তিগত মেস ড্যাশবোর্ড</p>
          </div>
          <div className="mt-4 sm:mt-0 flex gap-2">
            <Button variant="outline" asChild>
              <Link href="/user/profile">
                <UserCircleIcon className="h-4 w-4 mr-2" />
                প্রোফাইল
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Period Selector */}
      <div className="mb-6">
        <div className="flex gap-2">
          {[
            { value: "thisMonth", label: "এই মাস" },
            { value: "lastMonth", label: "গত মাস" },
            { value: "allTime", label: "সর্বমোট" },
          ].map((period) => (
            <Button
              key={period.value}
              variant={selectedPeriod === period.value ? "default" : "outline"}
              onClick={() => setSelectedPeriod(period.value)}
              size="sm"
            >
              {period.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      মোট খাবার
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {currentStats.totalMeals}
                    </p>
                    {selectedPeriod !== "allTime" && (
                      <div className="flex items-center gap-1 mt-1">
                        {getComparison(
                          currentStats.totalMeals,
                          personalStats.lastMonth.totalMeals
                        ).trend === "up" ? (
                          <TrendingUpIcon className="h-3 w-3 text-green-600" />
                        ) : getComparison(
                            currentStats.totalMeals,
                            personalStats.lastMonth.totalMeals
                          ).trend === "down" ? (
                          <TrendingDownIcon className="h-3 w-3 text-red-600" />
                        ) : null}
                        <span className="text-xs text-gray-500">
                          {
                            getComparison(
                              currentStats.totalMeals,
                              personalStats.lastMonth.totalMeals
                            ).value
                          }
                          %
                        </span>
                      </div>
                    )}
                  </div>
                  <ChartBarIcon className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">মোট খরচ</p>
                    <p className="text-2xl font-bold text-gray-900">
                      ৳{currentStats.totalCost.toLocaleString()}
                    </p>
                    {selectedPeriod !== "allTime" && (
                      <div className="flex items-center gap-1 mt-1">
                        {getComparison(
                          currentStats.totalCost,
                          personalStats.lastMonth.totalCost
                        ).trend === "up" ? (
                          <TrendingUpIcon className="h-3 w-3 text-red-600" />
                        ) : getComparison(
                            currentStats.totalCost,
                            personalStats.lastMonth.totalCost
                          ).trend === "down" ? (
                          <TrendingDownIcon className="h-3 w-3 text-green-600" />
                        ) : null}
                        <span className="text-xs text-gray-500">
                          {
                            getComparison(
                              currentStats.totalCost,
                              personalStats.lastMonth.totalCost
                            ).value
                          }
                          %
                        </span>
                      </div>
                    )}
                  </div>
                  <CurrencyDollarIcon className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      গড় খরচ/খাবার
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      ৳{currentStats.averageMealCost}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">প্রতি খাবারে</p>
                  </div>
                  <StarIcon className="h-8 w-8 text-purple-600" />
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
                      {currentStats.daysActive}
                    </p>
                    {selectedPeriod !== "allTime" && (
                      <div className="flex items-center gap-1 mt-1">
                        {getComparison(
                          currentStats.daysActive,
                          personalStats.lastMonth.daysActive
                        ).trend === "up" ? (
                          <TrendingUpIcon className="h-3 w-3 text-green-600" />
                        ) : getComparison(
                            currentStats.daysActive,
                            personalStats.lastMonth.daysActive
                          ).trend === "down" ? (
                          <TrendingDownIcon className="h-3 w-3 text-red-600" />
                        ) : null}
                        <span className="text-xs text-gray-500">
                          {
                            getComparison(
                              currentStats.daysActive,
                              personalStats.lastMonth.daysActive
                            ).value
                          }
                          %
                        </span>
                      </div>
                    )}
                  </div>
                  <CalendarDaysIcon className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Meal Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>খাবারের ধরন অনুযায়ী বিভাজন</CardTitle>
              <CardDescription>
                {selectedPeriod === "thisMonth"
                  ? "এই মাসে"
                  : selectedPeriod === "lastMonth"
                  ? "গত মাসে"
                  : "সর্বমোট"}{" "}
                আপনার খাবারের পরিসংখ্যান
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">সকালের নাস্তা</span>
                    <span className="text-sm text-gray-500">
                      {currentStats.mealsByType.breakfast} বার
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-orange-600 h-2 rounded-full"
                      style={{
                        width: `${getMealProgress(
                          currentStats.mealsByType.breakfast,
                          currentStats.totalMeals
                        )}%`,
                      }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">দুপুরের খাবার</span>
                    <span className="text-sm text-gray-500">
                      {currentStats.mealsByType.lunch} বার
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{
                        width: `${getMealProgress(
                          currentStats.mealsByType.lunch,
                          currentStats.totalMeals
                        )}%`,
                      }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">রাতের খাবার</span>
                    <span className="text-sm text-gray-500">
                      {currentStats.mealsByType.dinner} বার
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{
                        width: `${getMealProgress(
                          currentStats.mealsByType.dinner,
                          currentStats.totalMeals
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>সাম্প্রতিক কার্যক্রম</CardTitle>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/user/profile?tab=activity">
                    সব দেখুন
                    <ArrowRightIcon className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => {
                  const Icon = activity.icon;
                  return (
                    <div key={activity.id} className="flex items-center gap-4">
                      <Icon className={`h-8 w-8 ${activity.color}`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {activity.description}
                        </p>
                        <p className="text-xs text-gray-500">
                          {activity.date} - {activity.time}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Notifications */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>নোটিফিকেশন</CardTitle>
                <Badge variant="secondary">
                  {notifications.filter((n) => n.unread).length}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.slice(0, 3).map((notification) => {
                  const Icon = getNotificationIcon(notification.type);
                  return (
                    <div
                      key={notification.id}
                      className="flex items-start gap-3"
                    >
                      <Icon
                        className={`h-5 w-5 mt-0.5 ${getNotificationColor(
                          notification.type
                        )}`}
                      />
                      <div className="flex-1">
                        <p
                          className={`text-sm font-medium ${
                            notification.unread
                              ? "text-gray-900"
                              : "text-gray-600"
                          }`}
                        >
                          {notification.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {notification.time}
                        </p>
                      </div>
                      {notification.unread && (
                        <div className="h-2 w-2 bg-blue-600 rounded-full" />
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle>আসন্ন ইভেন্ট</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-start gap-3">
                    <div
                      className={`h-3 w-3 rounded-full mt-2 ${
                        event.urgent ? "bg-red-500" : "bg-blue-500"
                      }`}
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {event.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatDate(event.date)}
                      </p>
                      {event.urgent && (
                        <Badge variant="destructive" className="mt-1 text-xs">
                          জরুরি
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>দ্রুত কাজ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  asChild
                >
                  <Link href="/dashboard/meals">
                    <ChartBarIcon className="h-4 w-4 mr-2" />
                    আজকের খাবার এন্ট্রি
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  asChild
                >
                  <Link href="/dashboard/payments">
                    <CurrencyDollarIcon className="h-4 w-4 mr-2" />
                    বিল পরিশোধ
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  asChild
                >
                  <Link href="/dashboard/feedback">
                    <DocumentTextIcon className="h-4 w-4 mr-2" />
                    ফিডব্যাক দিন
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  asChild
                >
                  <Link href="/dashboard/notices">
                    <BellIcon className="h-4 w-4 mr-2" />
                    নোটিশ দেখুন
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
