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
  formatCurrency,
  formatDate,
  getMonthName,
  getBengaliNumber,
} from "@/lib/utils";
import { ChartBarIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import {
  ArrowDownTrayIcon,
  CalendarDaysIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  EyeIcon,
  PrinterIcon,
  ShareIcon,
  ShoppingCartIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState("monthly");
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [dateRange, setDateRange] = useState("month");

  // Mock data
  const reportData = {
    monthly: {
      totalMembers: 12,
      totalMeals: 1250,
      totalRevenue: 187500,
      totalExpenses: 165300,
      profit: 22200,
      mealRate: 150,
      avgMealsPerMember: 104,
      collectionRate: 92,
    },
    expenses: {
      bazaar: 85200,
      utility: 32500,
      rent: 25000,
      gas: 15600,
      maintenance: 6800,
      other: 200,
    },
    memberStats: [
      { name: "মাসুদ আহমেদ", meals: 28, amount: 4200, paid: 4200, due: 0 },
      { name: "রহিম উদ্দিন", meals: 25, amount: 3750, paid: 3000, due: 750 },
      { name: "করিম সাহেব", meals: 30, amount: 4500, paid: 4500, due: 0 },
      { name: "নাসির হোসেন", meals: 22, amount: 3300, paid: 0, due: 3300 },
    ],
  };

  const reportTypes = {
    monthly: { name: "মাসিক রিপোর্ট", icon: CalendarDaysIcon },
    financial: { name: "আর্থিক রিপোর্ট", icon: CurrencyDollarIcon },
    meals: { name: "মিল রিপোর্ট", icon: UserGroupIcon },
    expenses: { name: "খরচ রিপোর্ট", icon: ShoppingCartIcon },
    members: { name: "সদস্য রিপোর্ট", icon: UserGroupIcon },
  };

  const monthlyTrends = [
    {
      month: "অক্টোবর",
      meals: 1180,
      revenue: 177000,
      expenses: 158400,
      profit: 18600,
    },
    {
      month: "নভেম্বর",
      meals: 1220,
      revenue: 183000,
      expenses: 162200,
      profit: 20800,
    },
    {
      month: "ডিসেম্বর",
      meals: 1250,
      revenue: 187500,
      expenses: 165300,
      profit: 22200,
    },
    {
      month: "জানুয়ারি",
      meals: 1180,
      revenue: 177000,
      expenses: 168500,
      profit: 8500,
    },
  ];

  const profitMargin = Math.round(
    (reportData.monthly.profit / reportData.monthly.totalRevenue) * 100
  );
  const expenseRatio = Math.round(
    (reportData.monthly.totalExpenses / reportData.monthly.totalRevenue) * 100
  );

  const generateReport = () => {
    console.log("Generating report:", {
      selectedReport,
      selectedMonth,
      selectedYear,
    });
    // Add report generation logic here
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            রিপোর্ট ও অ্যানালিটিক্স
          </h1>
          <p className="text-gray-600">মেস ব্যবস্থাপনার বিস্তারিত প্রতিবেদন</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <PrinterIcon className="w-4 h-4 mr-2" />
            প্রিন্ট করুন
          </Button>
          <Button variant="outline">
            <ShareIcon className="w-4 h-4 mr-2" />
            শেয়ার করুন
          </Button>
          <Button
            onClick={generateReport}
            className="bg-green-600 hover:bg-green-700"
          >
            <ArrowDownTrayIcon className="w-4 h-4 mr-2" />
            ডাউনলোড
          </Button>
        </div>
      </div>

      {/* Report Selection */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                রিপোর্টের ধরন
              </label>
              <select
                className="w-full p-2 border border-gray-300 rounded-md"
                value={selectedReport}
                onChange={(e) => setSelectedReport(e.target.value)}
              >
                {Object.entries(reportTypes).map(([key, type]) => (
                  <option key={key} value={key}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                মাস
              </label>
              <select
                className="w-full p-2 border border-gray-300 rounded-md"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
              >
                {[...Array(12)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {getMonthName(i + 1)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                বছর
              </label>
              <select
                className="w-full p-2 border border-gray-300 rounded-md"
                value={selectedYear}
                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              >
                <option value="2025">২০২৫</option>
                <option value="2024">২০২৪</option>
                <option value="2023">২০২৩</option>
              </select>
            </div>
            <div className="flex items-end">
              <Button
                onClick={generateReport}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                <EyeIcon className="w-4 h-4 mr-2" />
                রিপোর্ট দেখুন
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <UserGroupIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">মোট সদস্য</p>
                <p className="text-2xl font-bold text-gray-900">
                  {getBengaliNumber(reportData.monthly.totalMembers)}
                </p>
                <p className="text-xs text-gray-600">সক্রিয় সদস্য</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CurrencyDollarIcon className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">মোট আয়</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(reportData.monthly.totalRevenue)}
                </p>
                <p className="text-xs text-green-600">
                  {reportData.monthly.collectionRate}% সংগ্রহ
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <ShoppingCartIcon className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">মোট খরচ</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(reportData.monthly.totalExpenses)}
                </p>
                <p className="text-xs text-red-600">
                  {expenseRatio}% খরচের হার
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUpIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">নিট লাভ</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(reportData.monthly.profit)}
                </p>
                <p className="text-xs text-purple-600">
                  {profitMargin}% লাভের হার
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>আর্থিক সারসংক্ষেপ</CardTitle>
            <CardDescription>
              {getMonthName(selectedMonth)} {selectedYear} এর আর্থিক অবস্থা
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="font-medium text-green-800">মোট আয়</span>
                <span className="font-bold text-green-900">
                  {formatCurrency(reportData.monthly.totalRevenue)}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                <span className="font-medium text-red-800">মোট খরচ</span>
                <span className="font-bold text-red-900">
                  {formatCurrency(reportData.monthly.totalExpenses)}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="font-medium text-blue-800">নিট ব্যালেন্স</span>
                <span
                  className={`font-bold ${
                    reportData.monthly.profit > 0
                      ? "text-green-900"
                      : "text-red-900"
                  }`}
                >
                  {formatCurrency(reportData.monthly.profit)}
                </span>
              </div>
              <div className="pt-2">
                <div className="text-sm text-gray-600 mb-2">
                  লাভের হার: {profitMargin}%
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{
                      width: `${Math.max(0, Math.min(profitMargin, 100))}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>খরচের বিভাজন</CardTitle>
            <CardDescription>ক্যাটেগরি অনুসারে খরচের বিতরণ</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(reportData.expenses).map(([category, amount]) => {
                const percentage = Math.round(
                  (amount / reportData.monthly.totalExpenses) * 100
                );
                const categoryNames = {
                  bazaar: "বাজার",
                  utility: "ইউটিলিটি",
                  rent: "ভাড়া",
                  gas: "গ্যাস",
                  maintenance: "রক্ষণাবেক্ষণ",
                  other: "অন্যান্য",
                };

                return (
                  <div
                    key={category}
                    className="flex items-center justify-between"
                  >
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">
                          {categoryNames[category]}
                        </span>
                        <span className="text-sm text-gray-600">
                          {percentage}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                    <span className="ml-4 font-bold text-gray-900">
                      {formatCurrency(amount)}
                    </span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Trends */}
      <Card>
        <CardHeader>
          <CardTitle>মাসিক ট্রেন্ড বিশ্লেষণ</CardTitle>
          <CardDescription>গত কয়েক মাসের তুলনামূলক তথ্য</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    মাস
                  </th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">
                    মোট মিল
                  </th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">
                    আয়
                  </th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">
                    খরচ
                  </th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">
                    লাভ
                  </th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">
                    লাভের হার
                  </th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">
                    ট্রেন্ড
                  </th>
                </tr>
              </thead>
              <tbody>
                {monthlyTrends.map((month, index) => {
                  const profitRate = Math.round(
                    (month.profit / month.revenue) * 100
                  );
                  const prevProfit =
                    index > 0 ? monthlyTrends[index - 1].profit : month.profit;
                  const isIncreasing = month.profit > prevProfit;

                  return (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-4 font-medium">{month.month}</td>
                      <td className="py-4 px-4 text-center font-medium">
                        {getBengaliNumber(month.meals)}
                      </td>
                      <td className="py-4 px-4 text-right font-medium">
                        {formatCurrency(month.revenue)}
                      </td>
                      <td className="py-4 px-4 text-right font-medium">
                        {formatCurrency(month.expenses)}
                      </td>
                      <td className="py-4 px-4 text-right font-bold">
                        <span
                          className={
                            month.profit > 0 ? "text-green-600" : "text-red-600"
                          }
                        >
                          {formatCurrency(month.profit)}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <Badge
                          className={
                            profitRate > 10
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {getBengaliNumber(profitRate)}%
                        </Badge>
                      </td>
                      <td className="py-4 px-4 text-center">
                        {index > 0 && (
                          <div className="flex justify-center">
                            {isIncreasing ? (
                              <TrendingUpIcon className="w-5 h-5 text-green-600" />
                            ) : (
                              <TrendingDownIcon className="w-5 h-5 text-red-600" />
                            )}
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Member Performance */}
      <Card>
        <CardHeader>
          <CardTitle>সদস্যদের পেমেন্ট স্ট্যাটাস</CardTitle>
          <CardDescription>সদস্য অনুসারে মিল ও পেমেন্ট তথ্য</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    সদস্য
                  </th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">
                    মিল সংখ্যা
                  </th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">
                    মোট বিল
                  </th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">
                    পেইড
                  </th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">
                    বকেয়া
                  </th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">
                    পেমেন্ট হার
                  </th>
                </tr>
              </thead>
              <tbody>
                {reportData.memberStats.map((member, index) => {
                  const paymentRate = Math.round(
                    (member.paid / member.amount) * 100
                  );

                  return (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-4 font-medium">{member.name}</td>
                      <td className="py-4 px-4 text-center font-medium">
                        {getBengaliNumber(member.meals)}
                      </td>
                      <td className="py-4 px-4 text-right font-medium">
                        {formatCurrency(member.amount)}
                      </td>
                      <td className="py-4 px-4 text-right font-medium text-green-600">
                        {formatCurrency(member.paid)}
                      </td>
                      <td className="py-4 px-4 text-right font-medium">
                        <span
                          className={
                            member.due > 0 ? "text-red-600" : "text-green-600"
                          }
                        >
                          {formatCurrency(member.due)}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <Badge
                          className={
                            paymentRate === 100
                              ? "bg-green-100 text-green-800"
                              : paymentRate > 50
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }
                        >
                          {getBengaliNumber(paymentRate)}%
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Quick Reports */}
      <Card>
        <CardHeader>
          <CardTitle>দ্রুত রিপোর্ট</CardTitle>
          <CardDescription>
            প্রয়োজনীয় রিপোর্ট দ্রুত জেনারেট করুন
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-16 flex-col">
              <DocumentTextIcon className="w-6 h-6 mb-2" />
              মাসিক স্টেটমেন্ট
            </Button>
            <Button variant="outline" className="h-16 flex-col">
              <ChartBarIcon className="w-6 h-6 mb-2" />
              মিল অ্যানালিটিক্স
            </Button>
            <Button variant="outline" className="h-16 flex-col">
              <CurrencyDollarIcon className="w-6 h-6 mb-2" />
              পেমেন্ট রিপোর্ট
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
