"use client";

import { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  HomeIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  BellIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    icon: <HomeIcon className="w-8 h-8" />,
    title: "স্মার্ট মেস ম্যানেজমেন্ট",
    description: "খাতা-কলমের যুগ শেষ! সব কিছু এক অ্যাপেই।",
    details: "দৈনিক মিল এন্ট্রি, বাজার হিসাব, বিল জেনারেশন - সব কিছু অটোমেটিক",
  },
  {
    icon: <CurrencyDollarIcon className="w-8 h-8" />,
    title: "সহজ পেমেন্ট সিস্টেম",
    description: "বিকাশ, নগদ, রকেট - সব পেমেন্ট একসাথে।",
    details: "QR কোড, পেমেন্ট লিংক এবং অটো ভেরিফিকেশন সুবিধা",
  },
  {
    icon: <ChartBarIcon className="w-8 h-8" />,
    title: "বিস্তারিত রিপোর্ট",
    description: "দৈনিক, সাপ্তাহিক, মাসিক - সব ধরনের রিপোর্ট।",
    details: "PDF/Excel ডাউনলোড, ইমেইল শেয়ার এবং প্রিন্ট সুবিধা",
  },
  {
    icon: <BellIcon className="w-8 h-8" />,
    title: "স্মার্ট নোটিফিকেশন",
    description: "মিল রিমাইন্ডার থেকে পেমেন্ট অ্যালার্ট।",
    details: "পুশ নোটিফিকেশন, ইমেইল এবং SMS এর মাধ্যমে আপডেট",
  },
];

export default function FeaturesSection() {
  const [activeFeature, setActiveFeature] = useState(0);
  return (
    <section id="features" className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            কেন <span className="text-green-600">মেস ম্যানেজার</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            আমাদের অ্যাপ দিয়ে পাবেন সম্পূর্ণ মেস ম্যানেজমেন্ট সমাধান
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className={`cursor-pointer transition-all duration-300 ${
                  activeFeature === index
                    ? "border-green-500 shadow-lg bg-green-50"
                    : "hover:shadow-md"
                }`}
                onClick={() => setActiveFeature(index)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-2 rounded-lg ${
                        activeFeature === index
                          ? "bg-green-600 text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {feature.icon}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                {activeFeature === index && (
                  <CardContent className="pt-0">
                    <p className="text-gray-600">{feature.details}</p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>

          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8 border">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  {features[activeFeature].icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {features[activeFeature].title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {features[activeFeature].details}
                </p>

                {/* Mock Interface */}
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">আজকের মিল</span>
                    <Badge variant="secondary">২৮টি</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">মোট খরচ</span>
                    <span className="font-semibold">৳২,৮০০</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">প্রতি মিল</span>
                    <span className="font-semibold text-green-600">৳১০০</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
