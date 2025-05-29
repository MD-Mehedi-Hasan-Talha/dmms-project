"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChartBarIcon,
  CurrencyDollarIcon,
  
  ShoppingCartIcon,
  UsersIcon,
  CalendarIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import { cn, formatCurrency, getBengaliDate } from "@/lib/utils";
import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";
export default function AnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("30");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Mock Analytics Data
  const overviewStats = {
    totalExpense: 45000,
    totalMembers: 12,
    averageMealCost: 85,
    monthlyGrowth: 8.5,
    dailyAverage: 1500,
    weeklyTrend: "up",
  };

  // Marketplace Analysis Data
  const marketAnalysis = [
    {
      id: 1,
      buyer: "করিম ভাই",
      date: "2024-01-25",
      totalAmount: 2500,
      items: [
        {
          name: "চাল",
          quantity: "5 কেজি",
          unitPrice: 60,
          total: 300,
          priceChange: "+5%",
        },
        {
          name: "ডাল",
          quantity: "2 কেজি",
          unitPrice: 120,
          total: 240,
          priceChange: "0%",
        },
        {
          name: "সবজি",
          quantity: "মিক্স",
          unitPrice: 0,
          total: 800,
          priceChange: "-10%",
        },
        {
          name: "মাছ",
          quantity: "2 কেজি",
          unitPrice: 400,
          total: 800,
          priceChange: "+15%",
        },
        {
          name: "মসলা",
          quantity: "মিক্স",
          unitPrice: 0,
          total: 360,
          priceChange: "+3%",
        },
      ],
      efficiency: "ভাল",
      notes: "দাম যুক্তিসঙ্গত",
    },
    {
      id: 2,
      buyer: "রহিম ভাই",
      date: "2024-01-24",
      totalAmount: 1800,
      items: [
        {
          name: "মুরগি",
          quantity: "1.5 কেজি",
          unitPrice: 180,
          total: 270,
          priceChange: "+8%",
        },
        {
          name: "পেঁয়াজ",
          quantity: "3 কেজি",
          unitPrice: 40,
          total: 120,
          priceChange: "-5%",
        },
        {
          name: "আলু",
          quantity: "5 কেজি",
          unitPrice: 25,
          total: 125,
          priceChange: "0%",
        },
        {
          name: "তেল",
          quantity: "1 লিটার",
          unitPrice: 140,
          total: 140,
          priceChange: "+2%",
        },
      ],
      efficiency: "চমৎকার",
      notes: "সাশ্রয়ী কেনাকাটা",
    },
  ];

  // Product Price Tracking
  const priceTracking = [
    {
      product: "চাল (কেজি)",
      currentPrice: 60,
      previousPrice: 57,
      change: 5.3,
      trend: "up",
      history: [55, 56, 57, 58, 60],
      supplier: "নিউ মার্কেট",
    },
    {
      product: "ডাল (কেজি)",
      currentPrice: 120,
      previousPrice: 120,
      change: 0,
      trend: "stable",
      history: [118, 119, 120, 120, 120],
      supplier: "কারওয়ান বাজার",
    },
    {
      product: "মুরগি (কেজি)",
      currentPrice: 180,
      previousPrice: 167,
      change: 7.8,
      trend: "up",
      history: [160, 165, 167, 175, 180],
      supplier: "স্থানীয় খামার",
    },
    {
      product: "পেঁয়াজ (কেজি)",
      currentPrice: 40,
      previousPrice: 42,
      change: -4.8,
      trend: "down",
      history: [45, 44, 42, 41, 40],
      supplier: "ফরিদপুর",
    },
  ];

  // Expense Trend Analysis
  const expenseTrends = {
    daily: [
      { date: "২১/০১", amount: 1200, meals: 15 },
      { date: "২২/০১", amount: 1500, meals: 18 },
      { date: "২৩/০১", amount: 1800, meals: 20 },
      { date: "২৪/০১", amount: 1600, meals: 19 },
      { date: "২৫/০১", amount: 2100, meals: 22 },
    ],
    categories: [
      { name: "চাল-ডাল", amount: 15000, percentage: 33.3, trend: "up" },
      { name: "সবজি-ফল", amount: 12000, percentage: 26.7, trend: "stable" },
      { name: "মাছ-মাংস", amount: 10000, percentage: 22.2, trend: "up" },
      { name: "মসলা-তেল", amount: 5000, percentage: 11.1, trend: "down" },
      { name: "অন্যান্য", amount: 3000, percentage: 6.7, trend: "stable" },
    ],
  };

  // Member Performance Analysis
  const memberAnalysis = [
    {
      name: "করিম ভাই",
      totalPurchases: 8,
      totalAmount: 18500,
      averagePerTrip: 2312,
      efficiency: 92,
      bestCategory: "সবজি",
      savings: 1200,
    },
    {
      name: "রহিম ভাই",
      totalPurchases: 6,
      totalAmount: 12000,
      averagePerTrip: 2000,
      efficiency: 88,
      bestCategory: "মাছ-মাংস",
      savings: 800,
    },
    {
      name: "হাসান ভাই",
      totalPurchases: 4,
      totalAmount: 8500,
      averagePerTrip: 2125,
      efficiency: 85,
      bestCategory: "চাল-ডাল",
      savings: 400,
    },
  ];

  // Predictive Analytics
  const predictions = {
    nextWeekBudget: 12000,
    monthEndProjection: 48000,
    seasonalTrends: [
      {
        month: "ফেব্রুয়ারি",
        projection: 46000,
        reason: "শীতকালীন সবজির দাম কম",
      },
      {
        month: "মার্চ",
        projection: 52000,
        reason: "গ্রীষ্মকাল শুরু, দাম বৃদ্ধি",
      },
      { month: "এপ্রিল", projection: 55000, reason: "রমজান মাস, খরচ বৃদ্ধি" },
    ],
    alerts: [
      { type: "warning", message: "চালের দাম গত সপ্তাহে ৫% বেড়েছে" },
      { type: "success", message: "পেঁয়াজের দাম কমেছে, স্টক করার ভাল সময়" },
      { type: "info", message: "এই মাসে লক্ষ্যের চেয়ে ১৫% কম খরচ হয়েছে" },
    ],
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case "up":
        return <TrendingUpIcon className="w-4 h-4 text-red-500" />;
      case "down":
        return <TrendingDownIcon className="w-4 h-4 text-green-500" />;
      default:
        return <div className="w-4 h-4 bg-gray-400 rounded-full"></div>;
    }
  };

  const getEfficiencyColor = (efficiency) => {
    if (efficiency >= 90) return "text-green-600 bg-green-100";
    if (efficiency >= 80) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            অ্যানালিটিক্স ড্যাশবোর্ড
          </h1>
          <p className="text-gray-600 mt-1">
            মেস ব্যবস্থাপনার বিস্তারিত বিশ্লেষণ এবং প্রতিবেদন
          </p>
        </div>
        <div className="flex space-x-3">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">৭ দিন</SelectItem>
              <SelectItem value="30">৩০ দিন</SelectItem>
              <SelectItem value="90">৯০ দিন</SelectItem>
              <SelectItem value="365">১ বছর</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-green-600 hover:bg-green-700">
            <ArrowDownIcon className="w-4 h-4 mr-2" />
            রিপোর্ট ডাউনলোড
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">মোট খরচ</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(overviewStats.totalExpense)}
                </p>
                <div className="flex items-center mt-1">
                  <ArrowUpIcon className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">
                    +{overviewStats.monthlyGrowth}%
                  </span>
                </div>
              </div>
              <CurrencyDollarIcon className="w-12 h-12 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  মিল প্রতি খরচ
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  ৳{overviewStats.averageMealCost}
                </p>
                <p className="text-sm text-gray-500 mt-1">গড় হিসাব</p>
              </div>
              <ChartBarIcon className="w-12 h-12 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">দৈনিক গড়</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(overviewStats.dailyAverage)}
                </p>
                <div className="flex items-center mt-1">
                  {overviewStats.weeklyTrend === "up" ? (
                    <TrendingUpIcon className="w-4 h-4 text-red-500 mr-1" />
                  ) : (
                    <TrendingDownIcon className="w-4 h-4 text-green-500 mr-1" />
                  )}
                  <span className="text-sm text-gray-600">এই সপ্তাহে</span>
                </div>
              </div>
              <CalendarIcon className="w-12 h-12 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  সক্রিয় সদস্য
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {overviewStats.totalMembers}
                </p>
                <p className="text-sm text-gray-500 mt-1">জন</p>
              </div>
              <UsersIcon className="w-12 h-12 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Analytics Tabs */}
      <Tabs defaultValue="market" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="market">বাজার বিশ্লেষণ</TabsTrigger>
          <TabsTrigger value="price">দাম ট্র্যাকিং</TabsTrigger>
          <TabsTrigger value="trends">খরচের ট্রেন্ড</TabsTrigger>
          <TabsTrigger value="performance">পারফরমেন্স</TabsTrigger>
          <TabsTrigger value="predictions">পূর্বাভাস</TabsTrigger>
        </TabsList>

        {/* Market Analysis Tab */}
        <TabsContent value="market" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ShoppingCartIcon className="w-5 h-5" />
                <span>বাজার কেনাকাটার বিশ্লেষণ</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {marketAnalysis.map((purchase) => (
                  <div key={purchase.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div>
                          <h3 className="font-semibold text-lg">
                            {purchase.buyer}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {getBengaliDate(purchase.date)}
                          </p>
                        </div>
                        <Badge
                          className={cn(
                            purchase.efficiency === "চমৎকার"
                              ? "bg-green-100 text-green-800"
                              : purchase.efficiency === "ভাল"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                          )}
                        >
                          {purchase.efficiency}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-600">
                          {formatCurrency(purchase.totalAmount)}
                        </p>
                        <p className="text-sm text-gray-600">
                          {purchase.notes}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {purchase.items.map((item, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-3">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-medium">{item.name}</h4>
                              <p className="text-sm text-gray-600">
                                {item.quantity}
                              </p>
                            </div>
                            <span
                              className={cn(
                                "text-xs px-2 py-1 rounded",
                                item.priceChange.startsWith("+")
                                  ? "bg-red-100 text-red-600"
                                  : item.priceChange.startsWith("-")
                                  ? "bg-green-100 text-green-600"
                                  : "bg-gray-100 text-gray-600"
                              )}
                            >
                              {item.priceChange}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">একক দাম:</span>
                            <span className="font-medium">
                              {item.unitPrice > 0
                                ? `৳${item.unitPrice}`
                                : "মিক্স"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">মোট:</span>
                            <span className="font-semibold text-green-600">
                              ৳{item.total}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Price Tracking Tab */}
        <TabsContent value="price" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUpIcon className="w-5 h-5" />
                <span>পণ্যের দাম পরিবর্তন ট্র্যাকিং</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {priceTracking.map((item, index) => (
                  <Card key={index} className="border border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-lg">
                            {item.product}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {item.supplier}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold">
                            ৳{item.currentPrice}
                          </p>
                          <div className="flex items-center space-x-1">
                            {getTrendIcon(item.trend)}
                            <span
                              className={cn(
                                "text-sm font-medium",
                                item.change > 0
                                  ? "text-red-600"
                                  : item.change < 0
                                  ? "text-green-600"
                                  : "text-gray-600"
                              )}
                            >
                              {item.change > 0 ? "+" : ""}
                              {item.change}%
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>পূর্বের দাম:</span>
                          <span>৳{item.previousPrice}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>পরিবর্তন:</span>
                          <span
                            className={cn(
                              item.change > 0
                                ? "text-red-600"
                                : item.change < 0
                                ? "text-green-600"
                                : "text-gray-600"
                            )}
                          >
                            ৳{Math.abs(item.currentPrice - item.previousPrice)}
                          </span>
                        </div>
                      </div>

                      <div className="mt-4">
                        <p className="text-xs text-gray-600 mb-2">
                          গত ৫ দিনের ট্রেন্ড:
                        </p>
                        <div className="flex space-x-1">
                          {item.history.map((price, i) => (
                            <div
                              key={i}
                              className="flex-1 bg-gray-200 rounded"
                              style={{
                                height: `${
                                  (price / Math.max(...item.history)) * 40
                                }px`,
                                minHeight: "20px",
                                backgroundColor:
                                  i === item.history.length - 1
                                    ? item.change > 0
                                      ? "#ef4444"
                                      : item.change < 0
                                      ? "#10b981"
                                      : "#6b7280"
                                    : "#d1d5db",
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Trends Tab */}
        <TabsContent value="trends" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>দৈনিক খরচের ট্রেন্ড</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {expenseTrends.daily.map((day, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{day.date}</p>
                        <p className="text-sm text-gray-600">{day.meals} মিল</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">
                          {formatCurrency(day.amount)}
                        </p>
                        <p className="text-sm text-gray-600">
                          প্রতি মিল: ৳{Math.round(day.amount / day.meals)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>ক্যাটেগরি অনুযায়ী খরচ</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {expenseTrends.categories.map((category, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{category.name}</span>
                        <div className="flex items-center space-x-2">
                          {getTrendIcon(category.trend)}
                          <span className="font-semibold">
                            {formatCurrency(category.amount)}
                          </span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: `${category.percentage}%` }}
                        />
                      </div>
                      <p className="text-sm text-gray-600 text-right">
                        {category.percentage}%
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <UsersIcon className="w-5 h-5" />
                <span>সদস্যদের কেনাকাটার পারফরমেন্স</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {memberAnalysis.map((member, index) => (
                  <Card key={index} className="border border-gray-200">
                    <CardContent className="p-4">
                      <div className="text-center mb-4">
                        <h3 className="font-bold text-lg">{member.name}</h3>
                        <Badge
                          className={getEfficiencyColor(member.efficiency)}
                        >
                          {member.efficiency}% দক্ষতা
                        </Badge>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">
                            মোট কেনাকাটা:
                          </span>
                          <span className="font-medium">
                            {member.totalPurchases} বার
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">
                            মোট খরচ:
                          </span>
                          <span className="font-medium">
                            {formatCurrency(member.totalAmount)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">
                            প্রতিবার গড়:
                          </span>
                          <span className="font-medium">
                            {formatCurrency(member.averagePerTrip)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">
                            সাশ্রয়:
                          </span>
                          <span className="font-medium text-green-600">
                            {formatCurrency(member.savings)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">
                            সেরা ক্যাটেগরি:
                          </span>
                          <span className="font-medium">
                            {member.bestCategory}
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-600 h-2 rounded-full"
                            style={{ width: `${member.efficiency}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-600 mt-1 text-center">
                          দক্ষতার স্কোর
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Predictions Tab */}
        <TabsContent value="predictions" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ClockIcon className="w-5 h-5" />
                  <span>আগামীর পূর্বাভাস</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900">
                    পরবর্তী সপ্তাহের বাজেট
                  </h4>
                  <p className="text-2xl font-bold text-blue-600">
                    {formatCurrency(predictions.nextWeekBudget)}
                  </p>
                  <p className="text-sm text-blue-700">
                    বর্তমান ট্রেন্ড অনুযায়ী
                  </p>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-900">
                    মাস শেষে প্রত্যাশিত খরচ
                  </h4>
                  <p className="text-2xl font-bold text-green-600">
                    {formatCurrency(predictions.monthEndProjection)}
                  </p>
                  <p className="text-sm text-green-700">৯২% নির্ভুলতা</p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">মৌসুমী ট্রেন্ড</h4>
                  {predictions.seasonalTrends.map((trend, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{trend.month}</span>
                        <span className="font-semibold">
                          {formatCurrency(trend.projection)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{trend.reason}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ExclamationTriangleIcon className="w-5 h-5" />
                  <span>স্মার্ট সতর্কতা</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {predictions.alerts.map((alert, index) => (
                    <div
                      key={index}
                      className={cn(
                        "p-4 rounded-lg border-l-4",
                        alert.type === "warning"
                          ? "bg-yellow-50 border-yellow-400"
                          : alert.type === "success"
                          ? "bg-green-50 border-green-400"
                          : "bg-blue-50 border-blue-400"
                      )}
                    >
                      <div className="flex items-start space-x-3">
                        {alert.type === "warning" && (
                          <ExclamationTriangleIcon className="w-5 h-5 text-yellow-600 mt-0.5" />
                        )}
                        {alert.type === "success" && (
                          <CheckCircleIcon className="w-5 h-5 text-green-600 mt-0.5" />
                        )}
                        {alert.type === "info" && (
                          <EyeIcon className="w-5 h-5 text-blue-600 mt-0.5" />
                        )}
                        <p className="text-sm">{alert.message}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-3">সুপারিশসমূহ</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start space-x-2">
                      <CheckCircleIcon className="w-4 h-4 text-green-600 mt-0.5" />
                      <span>পেঁয়াজের দাম কমেছে, ২-৩ দিনের স্টক করুন</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <ExclamationTriangleIcon className="w-4 h-4 text-yellow-600 mt-0.5" />
                      <span>চালের দাম বাড়ছে, বিকল্প সাপ্লায়ার খুঁজুন</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <EyeIcon className="w-4 h-4 text-blue-600 mt-0.5" />
                      <span>রমজান মাসের জন্য আগাম বাজেট পরিকল্পনা করুন</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
