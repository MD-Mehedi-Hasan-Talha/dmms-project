"use client";

import { useState, useEffect } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ChartBarIcon,
  HomeIcon,
  UsersIcon,
  ClockIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  PlusIcon,
  BellIcon,
  CalendarDaysIcon,
} from "lucide-react";

import { CurrencyDollarIcon } from "@heroicons/react/24/outline";
import { formatCurrency, getGreeting } from "@/lib/utils copy";

export default function DashboardPage() {
  const [userData, setUserData] = useState({
    name: "মাসুদ আহমেদ",
    role: "admin",
    messName: "গ্রীন ভ্যালি মেস",
  });

  const [dashboardStats, setDashboardStats] = useState({
    totalMembers: 12,
    todayMeals: 28,
    monthlyExpense: 45000,
    pendingPayments: 8500,
    mealRate: 150,
    todayExpense: 2800,
  });

  const [recentActivities, setRecentActivities] = useState([
    {
      id: 1,
      type: "meal",
      message: "রাহিম ভাই আজকের লাঞ্চ এন্ট্রি করেছেন",
      time: "১০ মিনিট আগে",
      icon: <ChartBarIcon className="w-4 h-4" />,
    },
    {
      id: 2,
      type: "payment",
      message: "করিম সাহেব ৳২,৫০০ পেমেন্ট করেছেন",
      time: "৩০ মিনিট আগে",
      icon: <CurrencyDollarIcon className="w-4 h-4" />,
    },
    {
      id: 3,
      type: "expense",
      message: "আজকের বাজার ৳১,২০০ এন্ট্রি করা হয়েছে",
      time: "১ ঘন্টা আগে",
      icon: <HomeIcon className="w-4 h-4" />,
    },
  ]);

  const quickStats = [
    {
      title: "মোট সদস্য",
      value: dashboardStats.totalMembers,
      icon: <UsersIcon className="w-6 h-6" />,
      color: "blue",
      change: "+2",
      changeType: "increase",
    },
    {
      title: "আজকের মিল",
      value: dashboardStats.todayMeals,
      icon: <ChartBarIcon className="w-6 h-6" />,
      color: "green",
      change: "+4",
      changeType: "increase",
    },
    {
      title: "মাসিক খরচ",
      value: formatCurrency(dashboardStats.monthlyExpense),
      icon: <CurrencyDollarIcon className="w-6 h-6" />,
      color: "purple",
      change: "-5%",
      changeType: "decrease",
    },
    {
      title: "বকেয়া টাকা",
      value: formatCurrency(dashboardStats.pendingPayments),
      icon: <ClockIcon className="w-6 h-6" />,
      color: "red",
      change: "৩ জন",
      changeType: "neutral",
    },
  ];
  const getColorClasses = (color) => {
    const colors = {
      blue: "bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
      green:
        "bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400",
      purple:
        "bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400",
      red: "bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400",
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-6 text-white">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              {getGreeting()}, {userData.name}! 👋
            </h1>
            <p className="opacity-90 mb-4">
              {userData.messName} এর ড্যাশবোর্ডে স্বাগতম
            </p>
            <div className="flex items-center space-x-4">
              <Badge className="bg-white/20 text-white hover:bg-white/30">
                {userData.role === "admin" ? "অ্যাডমিন" : "মেম্বার"}
              </Badge>
              <div className="text-sm opacity-75">
                আজ: {new Date().toLocaleDateString("bn-BD")}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold mb-1">
              ৳{dashboardStats.mealRate}
            </div>
            <div className="text-sm opacity-75">প্রতি মিল রেট</div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <Card key={index} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${getColorClasses(stat.color)}`}>
                {stat.icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-1">{stat.value}</div>{" "}
              <div className="flex items-center text-sm">
                {stat.changeType === "increase" && (
                  <TrendingUpIcon className="w-4 h-4 text-green-600 dark:text-green-400 mr-1" />
                )}
                {stat.changeType === "decrease" && (
                  <TrendingDownIcon className="w-4 h-4 text-red-600 dark:text-red-400 mr-1" />
                )}
                <span
                  className={`${
                    stat.changeType === "increase"
                      ? "text-green-600 dark:text-green-400"
                      : stat.changeType === "decrease"
                        ? "text-red-600 dark:text-red-400"
                        : "text-gray-600 dark:text-gray-400"
                  }`}
                >
                  {stat.change}
                </span>
                <span className="text-gray-500 dark:text-gray-400 ml-1">
                  গত সপ্তাহ থেকে
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <PlusIcon className="w-5 h-5 mr-2" />
                দ্রুত কাজ
              </CardTitle>
              <CardDescription>সাধারণ কাজগুলো দ্রুত করুন</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <ChartBarIcon className="w-4 h-4 mr-2" />
                আজকের মিল এন্ট্রি
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <HomeIcon className="w-4 h-4 mr-2" />
                বাজার খরচ যোগ করুন
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <UsersIcon className="w-4 h-4 mr-2" />
                নতুন সদস্য যোগ করুন
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <CurrencyDollarIcon className="w-4 h-4 mr-2" />
                পেমেন্ট রেকর্ড করুন
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BellIcon className="w-5 h-5 mr-2" />
                সাম্প্রতিক কার্যক্রম
              </CardTitle>
              <CardDescription>গত কয়েক ঘন্টার আপডেট</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start space-x-3 p-3 rounded-lg border"
                  >
                    <div className="p-1 rounded-full bg-gray-100">
                      {activity.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.message}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                সব কার্যক্রম দেখুন
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Today's Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CalendarDaysIcon className="w-5 h-5 mr-2" />
              আজকের সামারি
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">মোট মিল</span>
                <Badge variant="secondary">{dashboardStats.todayMeals}টি</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">আজকের খরচ</span>
                <span className="font-semibold">
                  {formatCurrency(dashboardStats.todayExpense)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">প্রতি মিল খরচ</span>
                <span className="font-semibold text-green-600">
                  {formatCurrency(
                    Math.round(
                      dashboardStats.todayExpense / dashboardStats.todayMeals
                    )
                  )}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">উপস্থিত সদস্য</span>
                <Badge className="bg-green-100 text-green-800">
                  {Math.round(dashboardStats.todayMeals / 2)} জন
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CurrencyDollarIcon className="w-5 h-5 mr-2" />
              পেমেন্ট স্ট্যাটাস
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">পেইড সদস্য</span>
                <Badge className="bg-green-100 text-green-800">
                  {dashboardStats.totalMembers - 3} জন
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">পেন্ডিং</span>
                <Badge className="bg-yellow-100 text-yellow-800">৩ জন</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">মোট বকেয়া</span>
                <span className="font-semibold text-red-600">
                  {formatCurrency(dashboardStats.pendingPayments)}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${
                      ((dashboardStats.totalMembers - 3) /
                        dashboardStats.totalMembers) *
                      100
                    }%`,
                  }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 text-center">
                {Math.round(
                  ((dashboardStats.totalMembers - 3) /
                    dashboardStats.totalMembers) *
                    100
                )}
                % পেমেন্ট সম্পন্ন
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
