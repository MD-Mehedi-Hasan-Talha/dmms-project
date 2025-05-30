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
import { Input } from "@/components/ui/input";
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
  MagnifyingGlassIcon,
  BuildingStorefrontIcon,
  ScaleIcon,
} from "@heroicons/react/24/outline";
import { cn, formatCurrency, getBengaliDate } from "@/lib/utils";
import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";

export default function AdvancedAnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("30");
  const [selectedProduct, setSelectedProduct] = useState("all");
  const [selectedSupplier, setSelectedSupplier] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Enhanced Market Data with more suppliers and price history
  const supplierComparison = [
    {
      name: "নিউ মার্কেট",
      location: "নিউ মার্কেট, ঢাকা",
      rating: 4.2,
      totalPurchases: 25,
      averagePrice: 95,
      reliability: 88,
      products: [
        { name: "চাল", price: 60, quality: "উন্নত", lastUpdated: "2024-01-25" },
        { name: "ডাল", price: 120, quality: "ভাল", lastUpdated: "2024-01-24" },
        {
          name: "তেল",
          price: 140,
          quality: "উন্নত",
          lastUpdated: "2024-01-23",
        },
      ],
      advantages: ["দাম স্থিতিশীল", "ভাল মানের পণ্য"],
      disadvantages: ["দূরত্ব বেশি"],
    },
    {
      name: "কারওয়ান বাজার",
      location: "কারওয়ান বাজার, ঢাকা",
      rating: 4.5,
      totalPurchases: 18,
      averagePrice: 87,
      reliability: 92,
      products: [
        { name: "চাল", price: 58, quality: "ভাল", lastUpdated: "2024-01-25" },
        {
          name: "ডাল",
          price: 115,
          quality: "উন্নত",
          lastUpdated: "2024-01-24",
        },
        { name: "সবজি", price: 35, quality: "তাজা", lastUpdated: "2024-01-25" },
      ],
      advantages: ["সাশ্রয়ী দাম", "তাজা সবজি"],
      disadvantages: ["ভিড় বেশি"],
    },
    {
      name: "স্থানীয় দোকান",
      location: "মহল্লার দোকান",
      rating: 3.8,
      totalPurchases: 32,
      averagePrice: 102,
      reliability: 75,
      products: [
        {
          name: "চাল",
          price: 62,
          quality: "মাঝারি",
          lastUpdated: "2024-01-25",
        },
        { name: "ডাল", price: 125, quality: "ভাল", lastUpdated: "2024-01-24" },
        { name: "মসলা", price: 80, quality: "ভাল", lastUpdated: "2024-01-23" },
      ],
      advantages: ["কাছে", "চেনা মানুষ"],
      disadvantages: ["দাম একটু বেশি"],
    },
  ];

  // Product comparison across suppliers
  const productComparison = [
    {
      name: "চাল (নাজিরশাইল)",
      unit: "কেজি",
      suppliers: [
        { name: "কারওয়ান বাজার", price: 58, quality: 4, availability: 5 },
        { name: "নিউ মার্কেট", price: 60, quality: 5, availability: 4 },
        { name: "স্থানীয় দোকান", price: 62, quality: 3, availability: 5 },
      ],
      priceHistory: [55, 56, 58, 59, 58],
      recommendation: "কারওয়ান বাজার থেকে কিনুন",
      savings: 120, // monthly savings if buy from recommended
    },
    {
      name: "মাছ (রুই)",
      unit: "কেজি",
      suppliers: [
        { name: "কাঁচা বাজার", price: 380, quality: 5, availability: 4 },
        { name: "স্থানীয় দোকান", price: 400, quality: 4, availability: 5 },
        { name: "পাইকারি বাজার", price: 360, quality: 4, availability: 3 },
      ],
      priceHistory: [350, 360, 370, 380, 375],
      recommendation: "পাইকারি বাজার থেকে কিনুন",
      savings: 400,
    },
    {
      name: "পেঁয়াজ",
      unit: "কেজি",
      suppliers: [
        { name: "কারওয়ান বাজার", price: 40, quality: 4, availability: 5 },
        { name: "নিউ মার্কেট", price: 45, quality: 4, availability: 4 },
        { name: "স্থানীয় দোকান", price: 48, quality: 3, availability: 5 },
      ],
      priceHistory: [50, 48, 45, 42, 40],
      recommendation: "কারওয়ান বাজার থেকে কিনুন",
      savings: 240,
    },
  ];

  // Market intelligence data
  const marketIntelligence = {
    priceAlerts: [
      {
        product: "চাল",
        status: "warning",
        message: "গত সপ্তাহে ৫% দাম বৃদ্ধি",
        suggestion: "পরবর্তী সপ্তাহে আরো বাড়তে পারে",
        action: "২-৩ দিনের স্টক করুন",
      },
      {
        product: "পেঁয়াজ",
        status: "success",
        message: "দাম ১২% কমেছে",
        suggestion: "স্টক করার ভাল সময়",
        action: "১ সপ্তাহের স্টক নিন",
      },
      {
        product: "তেল",
        status: "info",
        message: "দাম স্থিতিশীল",
        suggestion: "স্বাভাবিক কেনাকাটা চালিয়ে যান",
        action: "কোন বিশেষ ব্যবস্থা নেই",
      },
    ],
    seasonalTrends: [
      {
        season: "শীত",
        months: "ডিসেম্বর-ফেব্রুয়ারি",
        trends: [
          { category: "সবজি", change: -15, reason: "শীতকালীন সবজি বেশি" },
          { category: "মাছ", change: -8, reason: "মাছের মৌসুম" },
          { category: "ফল", change: -20, reason: "শীতকালীন ফল" },
        ],
      },
      {
        season: "গ্রীষ্ম",
        months: "মার্চ-মে",
        trends: [
          { category: "সবজি", change: +25, reason: "গ্রীষ্মে সবজি কম" },
          { category: "ফল", change: +10, reason: "গ্রীষ্মকালীন ফল বেশি" },
          { category: "পানীয়", change: +30, reason: "পানীয়ের চাহিদা বৃদ্ধি" },
        ],
      },
    ],
  };

  // Budget optimization suggestions
  const budgetOptimization = {
    currentMonthly: 45000,
    optimizedBudget: 38500,
    potentialSavings: 6500,
    suggestions: [
      {
        action: "সাপ্লায়ার পরিবর্তন",
        savings: 2500,
        description: "কারওয়ান বাজার থেকে বেশি কেনাকাটা করুন",
        effort: "সহজ",
      },
      {
        action: "বাল্ক পারচেস",
        savings: 1800,
        description: "চাল-ডাল একসাথে বেশি পরিমাণে কিনুন",
        effort: "মাঝারি",
      },
      {
        action: "মৌসুমী কেনাকাটা",
        savings: 1500,
        description: "সবজি-ফল মৌসুম অনুযায়ী কিনুন",
        effort: "সহজ",
      },
      {
        action: "মেনু অপটিমাইজেশন",
        savings: 700,
        description: "সাশ্রয়ী পুষ্টিকর মেনু পরিকল্পনা",
        effort: "কঠিন",
      },
    ],
  };

  const getSupplierRating = (rating) => {
    return "★".repeat(Math.floor(rating)) + "☆".repeat(5 - Math.floor(rating));
  };

  const getQualityBadge = (quality) => {
    const score = typeof quality === "number" ? quality : 3;
    if (score >= 4.5) return "bg-green-100 text-green-800";
    if (score >= 3.5) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  const getQualityText = (quality) => {
    const score = typeof quality === "number" ? quality : 3;
    if (score >= 4.5) return "উন্নত";
    if (score >= 3.5) return "ভাল";
    return "মাঝারি";
  };

  const filteredProducts = productComparison.filter(
    (product) =>
      selectedProduct === "all" || product.name.includes(selectedProduct)
  );

  const filteredSuppliers = supplierComparison.filter(
    (supplier) =>
      selectedSupplier === "all" || supplier.name.includes(selectedSupplier)
  );

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            উন্নত অ্যানালিটিক্স
          </h1>
          <p className="text-gray-600 mt-1">
            গভীর বাজার বিশ্লেষণ এবং বাজেট অপটিমাইজেশন
          </p>
        </div>
        <div className="flex space-x-3">
          <div className="relative">
            <MagnifyingGlassIcon className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <Input
              placeholder="পণ্য খুঁজুন..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-48"
            />
          </div>
          <Button className="bg-green-600 hover:bg-green-700">
            <ArrowDownIcon className="w-4 h-4 mr-2" />
            বিস্তারিত রিপোর্ট
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">সম্ভাব্য সাশ্রয়</p>
                <p className="text-2xl font-bold">
                  {formatCurrency(budgetOptimization.potentialSavings)}
                </p>
              </div>
              <CurrencyDollarIcon className="w-8 h-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">সেরা সাপ্লায়ার</p>
                <p className="text-lg font-bold">কারওয়ান বাজার</p>
              </div>
              <BuildingStorefrontIcon className="w-8 h-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">দাম কমেছে</p>
                <p className="text-lg font-bold">৩ টি পণ্যে</p>
              </div>
              <TrendingDownIcon className="w-8 h-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100">মনিটর করুন</p>
                <p className="text-lg font-bold">৫ টি পণ্য</p>
              </div>
              <ExclamationTriangleIcon className="w-8 h-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Advanced Analytics Tabs */}
      <Tabs defaultValue="suppliers" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="suppliers">সাপ্লায়ার বিশ্লেষণ</TabsTrigger>
          <TabsTrigger value="products">পণ্য তুলনা</TabsTrigger>
          <TabsTrigger value="intelligence">বাজার বুদ্ধিমত্তা</TabsTrigger>
          <TabsTrigger value="optimization">বাজেট অপটিমাইজেশন</TabsTrigger>
          <TabsTrigger value="forecast">ভবিষ্যত পূর্বাভাস</TabsTrigger>
        </TabsList>

        {/* Supplier Analysis Tab */}
        <TabsContent value="suppliers" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredSuppliers.map((supplier, index) => (
              <Card
                key={index}
                className="border-2 hover:border-green-300 transition-colors"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{supplier.name}</CardTitle>
                    <Badge className="bg-blue-100 text-blue-800">
                      {getSupplierRating(supplier.rating)}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{supplier.location}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">মোট কেনাকাটা:</span>
                      <p className="font-semibold">
                        {supplier.totalPurchases} বার
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-600">গড় দাম:</span>
                      <p className="font-semibold">৳{supplier.averagePrice}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">নির্ভরযোগ্যতা:</span>
                      <p className="font-semibold">{supplier.reliability}%</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">প্রধান পণ্যসমূহ:</h4>
                    <div className="space-y-2">
                      {supplier.products.map((product, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between items-center p-2 bg-gray-50 rounded"
                        >
                          <div>
                            <span className="font-medium">{product.name}</span>
                            <Badge
                              className={`ml-2 text-xs ${getQualityBadge(
                                product.quality
                              )}`}
                            >
                              {typeof product.quality === "string"
                                ? product.quality
                                : getQualityText(product.quality)}
                            </Badge>
                          </div>
                          <span className="font-semibold">
                            ৳{product.price}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">সুবিধা:</h4>
                    <ul className="text-sm space-y-1">
                      {supplier.advantages.map((advantage, idx) => (
                        <li
                          key={idx}
                          className="flex items-center text-green-600"
                        >
                          <CheckCircleIcon className="w-4 h-4 mr-2" />
                          {advantage}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">অসুবিধা:</h4>
                    <ul className="text-sm space-y-1">
                      {supplier.disadvantages.map((disadvantage, idx) => (
                        <li
                          key={idx}
                          className="flex items-center text-red-600"
                        >
                          <ExclamationTriangleIcon className="w-4 h-4 mr-2" />
                          {disadvantage}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Product Comparison Tab */}
        <TabsContent value="products" className="space-y-6">
          {filteredProducts.map((product, index) => (
            <Card key={index} className="border border-gray-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <ScaleIcon className="w-5 h-5" />
                    <span>{product.name}</span>
                  </CardTitle>
                  <div className="text-right">
                    <Badge className="bg-green-100 text-green-800 mb-1">
                      মাসিক সাশ্রয়: {formatCurrency(product.savings)}
                    </Badge>
                    <p className="text-sm text-gray-600">
                      সুপারিশ: {product.recommendation}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">সাপ্লায়ার তুলনা:</h4>
                    <div className="space-y-3">
                      {product.suppliers.map((supplier, idx) => (
                        <div key={idx} className="p-3 border rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium">{supplier.name}</span>
                            <span className="text-lg font-bold text-green-600">
                              ৳{supplier.price}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <span className="text-gray-600">মান:</span>
                              <div className="flex items-center">
                                {"★".repeat(supplier.quality)}
                                {"☆".repeat(5 - supplier.quality)}
                              </div>
                            </div>
                            <div>
                              <span className="text-gray-600">প্রাপ্যতা:</span>
                              <div className="flex items-center">
                                {"★".repeat(supplier.availability)}
                                {"☆".repeat(5 - supplier.availability)}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">
                      দামের ইতিহাস (গত ৫ দিন):
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>সর্বোচ্চ:</span>
                        <span>৳{Math.max(...product.priceHistory)}</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>সর্বনিম্ন:</span>
                        <span>৳{Math.min(...product.priceHistory)}</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>গড়:</span>
                        <span>
                          ৳
                          {Math.round(
                            product.priceHistory.reduce((a, b) => a + b) /
                              product.priceHistory.length
                          )}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="flex space-x-1 items-end h-20">
                        {product.priceHistory.map((price, i) => (
                          <div
                            key={i}
                            className="flex-1 bg-green-500 rounded-t"
                            style={{
                              height: `${
                                (price / Math.max(...product.priceHistory)) *
                                100
                              }%`,
                              minHeight: "20px",
                            }}
                            title={`দিন ${i + 1}: ৳${price}`}
                          />
                        ))}
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>৫ দিন আগে</span>
                        <span>আজ</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Market Intelligence Tab */}
        <TabsContent value="intelligence" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ExclamationTriangleIcon className="w-5 h-5" />
                  <span>মূল্য সতর্কতা</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {marketIntelligence.priceAlerts.map((alert, index) => (
                  <div
                    key={index}
                    className={cn(
                      "p-4 rounded-lg border-l-4",
                      alert.status === "warning"
                        ? "bg-yellow-50 border-yellow-400"
                        : alert.status === "success"
                        ? "bg-green-50 border-green-400"
                        : "bg-blue-50 border-blue-400"
                    )}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold">{alert.product}</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {alert.message}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          {alert.suggestion}
                        </p>
                      </div>
                      {alert.status === "warning" && (
                        <ExclamationTriangleIcon className="w-5 h-5 text-yellow-600" />
                      )}
                      {alert.status === "success" && (
                        <CheckCircleIcon className="w-5 h-5 text-green-600" />
                      )}
                      {alert.status === "info" && (
                        <EyeIcon className="w-5 h-5 text-blue-600" />
                      )}
                    </div>
                    <div className="mt-3 p-2 bg-white rounded border">
                      <span className="text-sm font-medium">করণীয়: </span>
                      <span className="text-sm">{alert.action}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CalendarIcon className="w-5 h-5" />
                  <span>মৌসুমী ট্রেন্ড</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {marketIntelligence.seasonalTrends.map((season, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold">{season.season}</h4>
                      <span className="text-sm text-gray-600">
                        {season.months}
                      </span>
                    </div>
                    <div className="space-y-2">
                      {season.trends.map((trend, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-2 bg-gray-50 rounded"
                        >
                          <div>
                            <span className="font-medium">
                              {trend.category}
                            </span>
                            <p className="text-xs text-gray-600">
                              {trend.reason}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            {trend.change > 0 ? (
                              <TrendingUpIcon className="w-4 h-4 text-red-500" />
                            ) : (
                              <TrendingDownIcon className="w-4 h-4 text-green-500" />
                            )}
                            <span
                              className={cn(
                                "font-semibold",
                                trend.change > 0
                                  ? "text-red-600"
                                  : "text-green-600"
                              )}
                            >
                              {trend.change > 0 ? "+" : ""}
                              {trend.change}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Budget Optimization Tab */}
        <TabsContent value="optimization" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>বাজেট সারসংক্ষেপ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">বর্তমান মাসিক খরচ</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCurrency(budgetOptimization.currentMonthly)}
                  </p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600">অপটিমাইজড বাজেট</p>
                  <p className="text-2xl font-bold text-green-600">
                    {formatCurrency(budgetOptimization.optimizedBudget)}
                  </p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600">সম্ভাব্য সাশ্রয়</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {formatCurrency(budgetOptimization.potentialSavings)}
                  </p>
                  <p className="text-sm text-blue-600">
                    {Math.round(
                      (budgetOptimization.potentialSavings /
                        budgetOptimization.currentMonthly) *
                        100
                    )}
                    % কম
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>অপটিমাইজেশন সুপারিশ</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {budgetOptimization.suggestions.map((suggestion, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold">{suggestion.action}</h4>
                        <Badge
                          className={cn(
                            suggestion.effort === "সহজ"
                              ? "bg-green-100 text-green-800"
                              : suggestion.effort === "মাঝারি"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          )}
                        >
                          {suggestion.effort}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        {suggestion.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          প্রত্যাশিত সাশ্রয়:
                        </span>
                        <span className="font-semibold text-green-600">
                          {formatCurrency(suggestion.savings)}/মাস
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Forecast Tab */}
        <TabsContent value="forecast" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ClockIcon className="w-5 h-5" />
                <span>ভবিষ্যত পূর্বাভাস ও পরিকল্পনা</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">আগামী ৩ মাসের পূর্বাভাস:</h4>
                  <div className="space-y-3">
                    {[
                      {
                        month: "ফেব্রুয়ারি ২০২৪",
                        amount: 42000,
                        confidence: 92,
                      },
                      { month: "মার্চ ২০২৪", amount: 48000, confidence: 87 },
                      { month: "এপ্রিল ২০২৪", amount: 52000, confidence: 82 },
                    ].map((forecast, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">{forecast.month}</span>
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
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">পরিকল্পনা ও প্রস্তুতি:</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                      <h5 className="font-medium text-yellow-800">
                        রমজান প্রস্তুতি
                      </h5>
                      <p className="text-sm text-yellow-700">
                        এপ্রিল মাসে খরচ ১৫% বাড়বে। আগাম বাজেট বরাদ্দ করুন।
                      </p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
                      <h5 className="font-medium text-green-800">
                        শীতকালীন সাশ্রয়
                      </h5>
                      <p className="text-sm text-green-700">
                        ফেব্রুয়ারিতে সবজির দাম কম থাকবে। বেশি সবজি ব্যবহার
                        করুন।
                      </p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                      <h5 className="font-medium text-blue-800">
                        স্টক পরিকল্পনা
                      </h5>
                      <p className="text-sm text-blue-700">
                        চাল-ডালের দাম বাড়ার সম্ভাবনা। ১৫ দিনের স্টক রাখুন।
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
