"use client";

import { useState, useEffect } from "react";
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
import { Input } from "@/components/ui/input";
import {
  ChartBarIcon,
  CurrencyDollarIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  BellIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  EyeIcon,
  AdjustmentsHorizontalIcon,
  FireIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/24/outline";
import { cn, formatCurrency, getBengaliDate } from "@/lib/utils";
import { RefreshCwIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react";

export default function CostAnalysisPage() {
  const [selectedTimeRange, setSelectedTimeRange] = useState("7d");
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [mounted, setMounted] = useState(false); // Real-time price monitoring data
  const [priceMonitoring, setPriceMonitoring] = useState([
    {
      id: 1,
      product: "চাল (নাজিরশাইল)",
      currentPrice: 62,
      yesterdayPrice: 60,
      weekAgoPrice: 58,
      change24h: 3.33,
      change7d: 6.9,
      highestThisWeek: 63,
      lowestThisWeek: 58,
      averagePrice: 60.5,
      volatility: "মাঝারি",
      prediction: "বৃদ্ধি",
      confidence: 78,
      suppliers: [
        { name: "কারওয়ান বাজার", price: 60, updated: "২ ঘন্টা আগে" },
        { name: "নিউ মার্কেট", price: 62, updated: "১ ঘন্টা আগে" },
        { name: "স্থানীয়", price: 65, updated: "৩০ মিনিট আগে" },
      ],
      alerts: [{ type: "warning", message: "দাম গত ২৪ ঘন্টায় ৩% বেড়েছে" }],
    },
    {
      id: 2,
      product: "পেঁয়াজ",
      currentPrice: 38,
      yesterdayPrice: 42,
      weekAgoPrice: 45,
      change24h: -9.52,
      change7d: -15.56,
      highestThisWeek: 45,
      lowestThisWeek: 38,
      averagePrice: 41.5,
      volatility: "উচ্চ",
      prediction: "কমে",
      confidence: 85,
      suppliers: [
        { name: "ফরিদপুর", price: 38, updated: "১ ঘন্টা আগে" },
        { name: "পাবনা", price: 40, updated: "২ ঘন্টা আগে" },
        { name: "স্থানীয়", price: 42, updated: "৪ ঘন্টা আগে" },
      ],
      alerts: [
        { type: "success", message: "দাম ১৫% কমেছে, স্টক করার ভাল সময়" },
      ],
    },
    {
      id: 3,
      product: "মুরগি",
      currentPrice: 185,
      yesterdayPrice: 180,
      weekAgoPrice: 175,
      change24h: 2.78,
      change7d: 5.71,
      highestThisWeek: 190,
      lowestThisWeek: 175,
      averagePrice: 182.5,
      volatility: "কম",
      prediction: "স্থিতিশীল",
      confidence: 92,
      suppliers: [
        { name: "স্থানীয় খামার", price: 180, updated: "১ ঘন্টা আগে" },
        { name: "ব্রয়লার ফার্ম", price: 185, updated: "৩০ মিনিট আগে" },
        { name: "লাইভ বার্ড", price: 190, updated: "২ ঘন্টা আগে" },
      ],
      alerts: [],
    },
  ]);

  // Cost breakdown analysis
  const costBreakdown = {
    daily: {
      today: {
        breakfast: 450,
        lunch: 800,
        dinner: 650,
        total: 1900,
        perMeal: 63.33,
        members: 10,
      },
      yesterday: {
        breakfast: 420,
        lunch: 750,
        dinner: 600,
        total: 1770,
        perMeal: 59,
        members: 10,
      },
      change: 7.34,
    },
    weekly: [
      { day: "শনিবার", amount: 1900, meals: 30, efficiency: 95 },
      { day: "রবিবার", amount: 1800, meals: 28, efficiency: 92 },
      { day: "সোমবার", amount: 2100, meals: 32, efficiency: 88 },
      { day: "মঙ্গলবার", amount: 1950, meals: 31, efficiency: 90 },
      { day: "বুধবার", amount: 1750, meals: 27, efficiency: 94 },
      { day: "বৃহস্পতিবার", amount: 2000, meals: 30, efficiency: 89 },
      { day: "শুক্রবার", amount: 1850, meals: 29, efficiency: 91 },
    ],
    monthly: {
      target: 45000,
      current: 38500,
      remaining: 6500,
      daysLeft: 8,
      dailyBudget: 812.5,
      onTrack: true,
    },
  };

  // Advanced cost metrics
  const costMetrics = {
    efficiency: {
      overall: 91,
      breakfast: 94,
      lunch: 89,
      dinner: 90,
      trends: {
        improving: ["breakfast", "dinner"],
        declining: ["lunch"],
      },
    },
    wastage: {
      percentage: 3.2,
      amount: 1440,
      trend: "decreasing",
      categories: [
        { name: "সবজি", percentage: 4.5, amount: 540 },
        { name: "ভাত", percentage: 2.8, amount: 420 },
        { name: "মাছ-মাংস", percentage: 2.1, amount: 315 },
        { name: "ডাল", percentage: 1.5, amount: 165 },
      ],
    },
    procurement: {
      score: 87,
      bestTime: "সকাল ৮-১০টা",
      bestDays: ["মঙ্গলবার", "বুধবার"],
      seasonalFactor: 1.05,
    },
  };

  // Price alerts and notifications
  const priceAlerts = [
    {
      id: 1,
      type: "urgent",
      product: "চাল",
      message: "দাম হঠাৎ ৫% বেড়েছে",
      action: "আজই ১ সপ্তাহের স্টক নিন",
      time: "১৫ মিনিট আগে",
    },
    {
      id: 2,
      type: "opportunity",
      product: "পেঁয়াজ",
      message: "দাম সর্বনিম্ন পর্যায়ে",
      action: "২-৩ সপ্তাহের স্টক নেওয়ার সুযোগ",
      time: "১ ঘন্টা আগে",
    },
    {
      id: 3,
      type: "info",
      product: "তেল",
      message: "দাম স্থিতিশীল রয়েছে",
      action: "স্বাভাবিক কেনাকাটা চালিয়ে যান",
      time: "২ ঘন্টা আগে",
    },
  ];

  // Initialize lastUpdate on client side to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
    setLastUpdate(new Date());
  }, []); // Auto refresh simulation
  useEffect(() => {
    if (!autoRefresh || !mounted) return;

    const interval = setInterval(() => {
      setLastUpdate(new Date());
      // Simulate price updates
      setPriceMonitoring((prev) =>
        prev.map((item) => ({
          ...item,
          currentPrice: item.currentPrice + (Math.random() - 0.5) * 2,
          change24h: item.change24h + (Math.random() - 0.5) * 1,
        }))
      );
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [autoRefresh, mounted]);

  const getPriceChangeColor = (change) => {
    if (change > 0) return "text-red-600";
    if (change < 0) return "text-green-600";
    return "text-gray-600";
  };

  const getPriceChangeIcon = (change) => {
    if (change > 0) return <TrendingUpIcon className="w-4 h-4 text-red-500" />;
    if (change < 0)
      return <TrendingDownIcon className="w-4 h-4 text-green-500" />;
    return <div className="w-4 h-4 bg-gray-400 rounded-full"></div>;
  };

  const getVolatilityColor = (volatility) => {
    switch (volatility) {
      case "উচ্চ":
        return "bg-red-100 text-red-800";
      case "মাঝারি":
        return "bg-yellow-100 text-yellow-800";
      case "কম":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getEfficiencyColor = (efficiency) => {
    if (efficiency >= 90) return "text-green-600";
    if (efficiency >= 80) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            খরচ বিশ্লেষণ ও দাম মনিটরিং
          </h1>
          <p className="text-gray-600 mt-1">
            রিয়েল-টাইম দাম ট্র্যাকিং এবং বিস্তারিত খরচ বিশ্লেষণ
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">শেষ আপডেট:</span>{" "}
            <span className="text-sm font-medium">
              {mounted && lastUpdate
                ? lastUpdate.toLocaleTimeString("bn-BD")
                : "--:--:--"}
            </span>
          </div>
          <Button
            variant={autoRefresh ? "default" : "outline"}
            size="sm"
            onClick={() => setAutoRefresh(!autoRefresh)}
          >
            <RefreshCwIcon
              className={cn("w-4 h-4 mr-2", autoRefresh && "animate-spin")}
            />
            অটো রিফ্রেশ
          </Button>
          <Select
            value={selectedTimeRange}
            onValueChange={setSelectedTimeRange}
          >
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1d">১ দিন</SelectItem>
              <SelectItem value="7d">৭ দিন</SelectItem>
              <SelectItem value="30d">৩০ দিন</SelectItem>
              <SelectItem value="90d">৯০ দিন</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Real-time Alerts */}
      {priceAlerts.length > 0 && (
        <Card className="mb-6 border-orange-200 bg-orange-50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-orange-800">
              <BellIcon className="w-5 h-5" />
              <span>রিয়েল-টাইম সতর্কতা</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {priceAlerts.slice(0, 3).map((alert) => (
                <div
                  key={alert.id}
                  className={cn(
                    "p-3 rounded-lg border-l-4",
                    alert.type === "urgent"
                      ? "bg-red-50 border-red-400"
                      : alert.type === "opportunity"
                      ? "bg-green-50 border-green-400"
                      : "bg-blue-50 border-blue-400"
                  )}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold">{alert.product}</h4>
                    <span className="text-xs text-gray-500">{alert.time}</span>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{alert.message}</p>
                  <p className="text-xs font-medium text-gray-600">
                    {alert.action}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">আজকের খরচ</p>
                <p className="text-2xl font-bold">
                  {formatCurrency(costBreakdown.daily.today.total)}
                </p>
                <div className="flex items-center mt-1">
                  {costBreakdown.daily.change > 0 ? (
                    <ArrowUpIcon className="w-4 h-4 text-blue-200 mr-1" />
                  ) : (
                    <ArrowDownIcon className="w-4 h-4 text-blue-200 mr-1" />
                  )}
                  <span className="text-blue-200 text-sm">
                    {Math.abs(costBreakdown.daily.change).toFixed(1)}%
                  </span>
                </div>
              </div>
              <CurrencyDollarIcon className="w-8 h-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">খরচ দক্ষতা</p>
                <p className="text-2xl font-bold">
                  {costMetrics.efficiency.overall}%
                </p>
                <p className="text-green-200 text-sm">
                  লক্ষ্যমাত্রার চেয়ে ভাল
                </p>
              </div>
              <CheckCircleIcon className="w-8 h-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">অপচয়</p>
                <p className="text-2xl font-bold">
                  {costMetrics.wastage.percentage}%
                </p>
                <p className="text-purple-200 text-sm">
                  {formatCurrency(costMetrics.wastage.amount)}
                </p>
              </div>
              <ExclamationTriangleIcon className="w-8 h-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100">মাসিক বাজেট</p>
                <p className="text-2xl font-bold">
                  {Math.round(
                    (costBreakdown.monthly.current /
                      costBreakdown.monthly.target) *
                      100
                  )}
                  %
                </p>
                <p className="text-orange-200 text-sm">ব্যবহৃত</p>
              </div>
              <ChartBarIcon className="w-8 h-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="monitoring" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="monitoring">দাম মনিটরিং</TabsTrigger>
          <TabsTrigger value="breakdown">খরচ ভাঙ্গন</TabsTrigger>
          <TabsTrigger value="efficiency">দক্ষতা বিশ্লেষণ</TabsTrigger>
          <TabsTrigger value="forecasting">পূর্বাভাস</TabsTrigger>
        </TabsList>

        {/* Price Monitoring Tab */}
        <TabsContent value="monitoring" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {priceMonitoring.map((item) => (
              <Card
                key={item.id}
                className="border-2 hover:border-green-300 transition-colors"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{item.product}</CardTitle>
                    <Badge className={getVolatilityColor(item.volatility)}>
                      {item.volatility} পরিবর্তনশীল
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-3xl font-bold text-gray-900">
                      ৳{item.currentPrice}
                    </p>
                    <div className="flex items-center justify-center space-x-2 mt-2">
                      {getPriceChangeIcon(item.change24h)}
                      <span
                        className={cn(
                          "font-medium",
                          getPriceChangeColor(item.change24h)
                        )}
                      >
                        {item.change24h > 0 ? "+" : ""}
                        {item.change24h.toFixed(2)}%
                      </span>
                      <span className="text-gray-500 text-sm">(২৪ ঘন্টা)</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">গতকাল:</span>
                      <p className="font-semibold">৳{item.yesterdayPrice}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">৭ দিন আগে:</span>
                      <p className="font-semibold">৳{item.weekAgoPrice}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">সর্বোচ্চ:</span>
                      <p className="font-semibold">৳{item.highestThisWeek}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">সর্বনিম্ন:</span>
                      <p className="font-semibold">৳{item.lowestThisWeek}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">সাপ্লায়ার দাম:</h4>
                    {item.suppliers.map((supplier, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-center p-2 bg-gray-50 rounded text-sm"
                      >
                        <div>
                          <span className="font-medium">{supplier.name}</span>
                          <p className="text-gray-600 text-xs">
                            {supplier.updated}
                          </p>
                        </div>
                        <span className="font-semibold">৳{supplier.price}</span>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">পূর্বাভাস:</span>
                      <span className="text-sm text-blue-600">
                        {item.confidence}% নিশ্চিত
                      </span>
                    </div>
                    <p className="text-sm text-blue-800">
                      আগামী সপ্তাহে দাম <strong>{item.prediction}</strong> পাবে
                    </p>
                  </div>

                  {item.alerts.length > 0 && (
                    <div className="space-y-2">
                      {item.alerts.map((alert, idx) => (
                        <div
                          key={idx}
                          className={cn(
                            "p-2 rounded text-sm",
                            alert.type === "warning"
                              ? "bg-yellow-50 text-yellow-800"
                              : "bg-green-50 text-green-800"
                          )}
                        >
                          {alert.message}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Cost Breakdown Tab */}
        <TabsContent value="breakdown" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>আজকের খরচ বিশ্লেষণ</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                      <p className="text-sm text-gray-600">সকালের নাস্তা</p>
                      <p className="text-xl font-bold text-orange-600">
                        {formatCurrency(costBreakdown.daily.today.breakfast)}
                      </p>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <p className="text-sm text-gray-600">দুপুরের খাবার</p>
                      <p className="text-xl font-bold text-green-600">
                        {formatCurrency(costBreakdown.daily.today.lunch)}
                      </p>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-gray-600">রাতের খাবার</p>
                      <p className="text-xl font-bold text-blue-600">
                        {formatCurrency(costBreakdown.daily.today.dinner)}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">মোট খরচ:</span>
                      <span className="text-2xl font-bold">
                        {formatCurrency(costBreakdown.daily.today.total)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>প্রতি মিল:</span>
                      <span>
                        ৳{costBreakdown.daily.today.perMeal.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>সদস্য সংখ্যা:</span>
                      <span>{costBreakdown.daily.today.members} জন</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>সাপ্তাহিক ট্রেন্ড</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {costBreakdown.weekly.map((day, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <span className="font-medium">{day.day}</span>
                        <p className="text-sm text-gray-600">{day.meals} মিল</p>
                      </div>
                      <div className="text-right">
                        <span className="font-semibold">
                          {formatCurrency(day.amount)}
                        </span>
                        <div className="flex items-center space-x-2">
                          <span
                            className={cn(
                              "text-sm",
                              getEfficiencyColor(day.efficiency)
                            )}
                          >
                            {day.efficiency}%
                          </span>
                          <Badge
                            className={cn(
                              "text-xs",
                              day.efficiency >= 90
                                ? "bg-green-100 text-green-800"
                                : day.efficiency >= 85
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            )}
                          >
                            {day.efficiency >= 90
                              ? "উন্নত"
                              : day.efficiency >= 85
                              ? "ভাল"
                              : "গড়"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>মাসিক বাজেট ট্র্যাকিং</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600">মাসিক লক্ষ্য</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {formatCurrency(costBreakdown.monthly.target)}
                  </p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600">এ পর্যন্ত ব্যবহৃত</p>
                  <p className="text-2xl font-bold text-green-600">
                    {formatCurrency(costBreakdown.monthly.current)}
                  </p>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <p className="text-sm text-gray-600">অবশিষ্ট</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {formatCurrency(costBreakdown.monthly.remaining)}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex justify-between text-sm mb-2">
                  <span>অগ্রগতি</span>
                  <span>
                    {Math.round(
                      (costBreakdown.monthly.current /
                        costBreakdown.monthly.target) *
                        100
                    )}
                    %
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-green-600 h-3 rounded-full"
                    style={{
                      width: `${
                        (costBreakdown.monthly.current /
                          costBreakdown.monthly.target) *
                        100
                      }%`,
                    }}
                  />
                </div>
                <div className="flex justify-between text-sm mt-2 text-gray-600">
                  <span>{costBreakdown.monthly.daysLeft} দিন বাকি</span>
                  <span>
                    দৈনিক বাজেট:{" "}
                    {formatCurrency(costBreakdown.monthly.dailyBudget)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Efficiency Analysis Tab */}
        <TabsContent value="efficiency" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AdjustmentsHorizontalIcon className="w-5 h-5" />
                  <span>খরচ দক্ষতা</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-4">
                      <span className="text-2xl font-bold text-green-600">
                        {costMetrics.efficiency.overall}%
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold">সামগ্রিক দক্ষতা</h3>
                    <p className="text-gray-600">লক্ষ্যমাত্রার চেয়ে ভাল</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>সকালের নাস্তা</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-600 h-2 rounded-full"
                            style={{
                              width: `${costMetrics.efficiency.breakfast}%`,
                            }}
                          />
                        </div>
                        <span
                          className={getEfficiencyColor(
                            costMetrics.efficiency.breakfast
                          )}
                        >
                          {costMetrics.efficiency.breakfast}%
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>দুপুরের খাবার</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-yellow-600 h-2 rounded-full"
                            style={{
                              width: `${costMetrics.efficiency.lunch}%`,
                            }}
                          />
                        </div>
                        <span
                          className={getEfficiencyColor(
                            costMetrics.efficiency.lunch
                          )}
                        >
                          {costMetrics.efficiency.lunch}%
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>রাতের খাবার</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-600 h-2 rounded-full"
                            style={{
                              width: `${costMetrics.efficiency.dinner}%`,
                            }}
                          />
                        </div>
                        <span
                          className={getEfficiencyColor(
                            costMetrics.efficiency.dinner
                          )}
                        >
                          {costMetrics.efficiency.dinner}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ExclamationTriangleIcon className="w-5 h-5" />
                  <span>অপচয় বিশ্লেষণ</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <p className="text-3xl font-bold text-red-600">
                      {costMetrics.wastage.percentage}%
                    </p>
                    <p className="text-red-800 font-medium">
                      {formatCurrency(costMetrics.wastage.amount)}
                    </p>
                    <p className="text-sm text-red-600">মাসিক অপচয়</p>
                  </div>

                  <div className="space-y-3">
                    {costMetrics.wastage.categories.map((category, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">
                            {category.name}
                          </span>
                          <span className="text-sm text-gray-600">
                            {category.percentage}% (
                            {formatCurrency(category.amount)})
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-red-500 h-2 rounded-full"
                            style={{ width: `${category.percentage * 10}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <TrendingDownIcon className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-800">
                        অপচয় কমছে
                      </span>
                    </div>
                    <p className="text-xs text-green-700">
                      গত মাসের তুলনায় ০.৮% কম অপচয় হয়েছে
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Forecasting Tab */}
        <TabsContent value="forecasting" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ClockIcon className="w-5 h-5" />
                  <span>খরচ পূর্বাভাস</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {[
                    { period: "আগামীকাল", amount: 1950, confidence: 95 },
                    { period: "পরবর্তী সপ্তাহ", amount: 13500, confidence: 88 },
                    { period: "মাস শেষে", amount: 44800, confidence: 82 },
                  ].map((forecast, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{forecast.period}</span>
                        <span className="font-bold text-lg">
                          {formatCurrency(forecast.amount)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">নির্ভুলতা:</span>
                        <span className="text-green-600">
                          {forecast.confidence}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FireIcon className="w-5 h-5" />
                  <span>হট স্পট</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-red-50 border-l-4 border-red-400 rounded">
                    <h4 className="font-semibold text-red-800">
                      দামে ঊর্ধ্বগতি
                    </h4>
                    <p className="text-sm text-red-700">
                      চাল ও তেলের দাম বাড়ছে। আগামী সপ্তাহে আরো বাড়তে পারে।
                    </p>
                  </div>

                  <div className="p-3 bg-green-50 border-l-4 border-green-400 rounded">
                    <h4 className="font-semibold text-green-800">
                      সাশ্রয়ের সুযোগ
                    </h4>
                    <p className="text-sm text-green-700">
                      পেঁয়াজ ও সবজির দাম কমেছে। স্টক করার ভাল সময়।
                    </p>
                  </div>

                  <div className="p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
                    <h4 className="font-semibold text-blue-800">
                      মৌসুমী প্রভাব
                    </h4>
                    <p className="text-sm text-blue-700">
                      শীতকালে সবজির দাম কম থাকে। মেনু পরিকল্পনা অনুযায়ী কিনুন।
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
