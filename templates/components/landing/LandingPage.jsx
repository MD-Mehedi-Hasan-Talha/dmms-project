"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
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
  UsersIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  DevicePhoneMobileIcon,
  ShieldCheckIcon,
  ClockIcon,
  BanknotesIcon,
  DocumentChartBarIcon,
  BellIcon,
  StarIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  PhoneIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import Header from "../common/Header";

export default function LandingPage() {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: <HomeIcon className="w-8 h-8" />,
      title: "স্মার্ট মেস ম্যানেজমেন্ট",
      description: "খাতা-কলমের যুগ শেষ! সব কিছু এক অ্যাপেই।",
      details:
        "দৈনিক মিল এন্ট্রি, বাজার হিসাব, বিল জেনারেশন - সব কিছু অটোমেটিক",
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

  const testimonials = [
    {
      name: "আহমেদ আলী",
      role: "মেস অ্যাডমিন, ঢাকা",
      comment: "এই অ্যাপ ব্যবহার করে আমাদের মেসের সব ঝামেলা শেষ! সবাই খুশি।",
      rating: 5,
    },
    {
      name: "ফাতিমা খানম",
      role: "শিক্ষার্থী, চট্টগ্রাম",
      comment:
        "পেমেন্ট করা এখন খুবই সহজ। বিকাশ দিয়ে এক সেকেন্ডেই পেমেন্ট হয়ে যায়।",
      rating: 5,
    },
    {
      name: "রহিম উদ্দিন",
      role: "চাকরিজীবী, সিলেট",
      comment: "মাসের শেষে বিল কত হবে সেটা আগেই জানতে পারি। খুব সুবিধা।",
      rating: 5,
    },
  ];

  const stats = [
    {
      label: "সক্রিয় মেস",
      value: "২৫০+",
      icon: <HomeIcon className="w-6 h-6" />,
    },
    {
      label: "খুশি ব্যবহারকারী",
      value: "৫,০০০+",
      icon: <UsersIcon className="w-6 h-6" />,
    },
    {
      label: "মাসিক ট্রানজেকশন",
      value: "৳১০ লক্ষ+",
      icon: <BanknotesIcon className="w-6 h-6" />,
    },
    {
      label: "সময় বাঁচানো",
      value: "৮০%",
      icon: <ClockIcon className="w-6 h-6" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}

      <Header />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="animate-fade-in-up">
            <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-200">
              🚀 বাংলাদেশের প্রথম ডিজিটাল মেস সমাধান
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              আধুনিক যুগের
              <span className="text-green-600 block">মেস ম্যানেজমেন্ট</span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              খাতা-কলমের ঝামেলা শেষ! স্মার্ট অ্যাপ দিয়ে করুন মেসের সম্পূর্ণ
              হিসাব-নিকাশ। বিকাশ, নগদ, রকেট সহ সকল পেমেন্ট সুবিধা।
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-lg px-8 py-6"
                asChild
              >
                <Link href="/register">
                  ফ্রি ট্রাই করুন
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6"
                asChild
              >
                <Link href="/demo">ডেমো দেখুন</Link>
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex justify-center mb-2 text-green-600">
                  {stat.icon}
                </div>
                <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
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
                        <CardTitle className="text-lg">
                          {feature.title}
                        </CardTitle>
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

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              আমাদের <span className="text-green-600">বিশেষত্ব</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6 border-0 shadow-lg">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DevicePhoneMobileIcon className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">মোবাইল ফ্রেন্ডলি</h3>
              <p className="text-gray-600">
                যেকোনো ফোন থেকে সহজেই ব্যবহার করুন। অফলাইনেও কাজ করে।
              </p>
            </Card>

            <Card className="text-center p-6 border-0 shadow-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheckIcon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">সম্পূর্ণ নিরাপদ</h3>
              <p className="text-gray-600">
                আপনার সকল তথ্য ১০০% নিরাপদ। ব্যাংক লেভেল সিকিউরিটি।
              </p>
            </Card>

            <Card className="text-center p-6 border-0 shadow-lg">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DocumentChartBarIcon className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">স্বচ্ছ হিসাব</h3>
              <p className="text-gray-600">
                সকল হিসাব-নিকাশ স্বচ্ছ ও সঠিক। কোন গোপনীয়তা নেই।
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              ব্যবহারকারীরা কী <span className="text-green-600">বলছেন</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 border-0 shadow-lg">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">
                  "{testimonial.comment}"
                </p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              সাশ্রয়ী <span className="text-green-600">প্রাইসিং</span>
            </h2>
            <p className="text-xl text-gray-600">
              আপনার মেসের সাইজ অনুযায়ী পেমেন্ট প্ল্যান
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="p-6 border-2 border-gray-200">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl">বেসিক</CardTitle>
                <div className="text-3xl font-bold">ফ্রি</div>
                <CardDescription>৫ জন পর্যন্ত</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircleIcon className="w-5 h-5 text-green-600 mr-2" />
                    মিল ট্র্যাকিং
                  </li>
                  <li className="flex items-center">
                    <CheckCircleIcon className="w-5 h-5 text-green-600 mr-2" />
                    বেসিক রিপোর্ট
                  </li>
                  <li className="flex items-center">
                    <CheckCircleIcon className="w-5 h-5 text-green-600 mr-2" />
                    ইমেইল সাপোর্ট
                  </li>
                </ul>
                <Button className="w-full mt-6" variant="outline">
                  শুরু করুন
                </Button>
              </CardContent>
            </Card>

            <Card className="p-6 border-2 border-green-500 bg-green-50 relative">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-600">
                জনপ্রিয়
              </Badge>
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl">প্রো</CardTitle>
                <div className="text-3xl font-bold">
                  ৳৫০<span className="text-lg">/মাস</span>
                </div>
                <CardDescription>১৫ জন পর্যন্ত</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircleIcon className="w-5 h-5 text-green-600 mr-2" />
                    সব বেসিক ফিচার
                  </li>
                  <li className="flex items-center">
                    <CheckCircleIcon className="w-5 h-5 text-green-600 mr-2" />
                    পেমেন্ট গেটওয়ে
                  </li>
                  <li className="flex items-center">
                    <CheckCircleIcon className="w-5 h-5 text-green-600 mr-2" />
                    বিস্তারিত রিপোর্ট
                  </li>
                  <li className="flex items-center">
                    <CheckCircleIcon className="w-5 h-5 text-green-600 mr-2" />
                    ২৪/৭ সাপোর্ট
                  </li>
                </ul>
                <Button className="w-full mt-6 bg-green-600 hover:bg-green-700">
                  শুরু করুন
                </Button>
              </CardContent>
            </Card>

            <Card className="p-6 border-2 border-gray-200">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl">এন্টারপ্রাইজ</CardTitle>
                <div className="text-3xl font-bold">
                  ৳১০০<span className="text-lg">/মাস</span>
                </div>
                <CardDescription>আনলিমিটেড</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircleIcon className="w-5 h-5 text-green-600 mr-2" />
                    সব প্রো ফিচার
                  </li>
                  <li className="flex items-center">
                    <CheckCircleIcon className="w-5 h-5 text-green-600 mr-2" />
                    মাল্টি মেস সাপোর্ট
                  </li>
                  <li className="flex items-center">
                    <CheckCircleIcon className="w-5 h-5 text-green-600 mr-2" />
                    API অ্যাক্সেস
                  </li>
                  <li className="flex items-center">
                    <CheckCircleIcon className="w-5 h-5 text-green-600 mr-2" />
                    ডেডিকেটেড সাপোর্ট
                  </li>
                </ul>
                <Button className="w-full mt-6" variant="outline">
                  যোগাযোগ করুন
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-green-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            আজই শুরু করুন আপনার ডিজিটাল মেস
          </h2>
          <p className="text-xl mb-8 opacity-90">
            ৩০ দিনের ফ্রি ট্রাই। কোন ক্রেডিট কার্ড লাগবে না।
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8 py-6"
              asChild
            >
              <Link href="/register">
                ফ্রি ট্রাই শুরু করুন
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-green-600 text-lg px-8 py-6"
            >
              ডেমো বুক করুন
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="py-16 px-4 bg-gray-900 text-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                  <HomeIcon className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">মেস ম্যানেজার</span>
              </div>
              <p className="text-gray-400 mb-4">
                বাংলাদেশের প্রথম সম্পূর্ণ ডিজিটাল মেস ম্যানেজমেন্ট সমাধান।
              </p>
              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  <PhoneIcon className="w-4 h-4 mr-2" />
                  ০১৭xxxxxxxx
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  <EnvelopeIcon className="w-4 h-4 mr-2" />
                  support@messmanager.bd
                </Button>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">প্রোডাক্ট</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    ফিচার
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    প্রাইসিং
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    ডেমো
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    API
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">সাপোর্ট</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    হেল্প সেন্টার
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    গাইড
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    যোগাযোগ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    স্ট্যাটাস
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">কোম্পানি</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    আমাদের সম্পর্কে
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    ক্যারিয়ার
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    প্রাইভেসি
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    শর্তাবলী
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; ২০২৫ মেস ম্যানেজার। সকল অধিকার সংরক্ষিত।</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
