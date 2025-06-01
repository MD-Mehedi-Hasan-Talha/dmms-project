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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  HomeIcon,
  PhoneIcon,
  EyeIcon,
  EyeSlashIcon,
  ArrowRightIcon,
  UserIcon,
  LockClosedIcon,
  EnvelopeIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    password: "",
    confirmPassword: "",
    role: "member", // admin, member
    acceptTerms: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    // TODO: Integrate Clerk/Auth logic here
    console.log("Registration data:", formData);
  };

  const steps = [
    { number: 1, title: "ব্যক্তিগত তথ্য", description: "আপনার মূল তথ্য দিন" },
    {
      number: 2,
      title: "অ্যাকাউন্ট সেটআপ",
      description: "পাসওয়ার্ড ও নিরাপত্তা",
    },
    { number: 3, title: "রোল নির্বাচন", description: "আপনার ভূমিকা বেছে নিন" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center shadow-lg">
              <HomeIcon className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            নতুন অ্যাকাউন্ট তৈরি করুন
          </h1>
          <p className="text-gray-600">মেস ম্যানেজারে যোগ দিন এবং শুরু করুন</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            {steps.map((step) => (
              <div key={step.number} className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    currentStep >= step.number
                      ? "bg-green-600 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {step.number}
                </div>
                <span className="text-xs text-gray-600 mt-1 text-center">
                  {step.title}
                </span>
              </div>
            ))}
          </div>
          <div className="flex mt-2">
            <div
              className={`h-1 flex-1 mx-1 rounded ${
                currentStep >= 2 ? "bg-green-600" : "bg-gray-200"
              }`}
            ></div>
            <div
              className={`h-1 flex-1 mx-1 rounded ${
                currentStep >= 3 ? "bg-green-600" : "bg-gray-200"
              }`}
            ></div>
          </div>
        </div>

        <Card className="shadow-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm py-2">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xl text-center">
              {steps[currentStep - 1].title}
            </CardTitle>
            <CardDescription className="text-center">
              {steps[currentStep - 1].description}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleRegister} className="space-y-4">
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="name">পূর্ণ নাম</Label>
                    <div className="relative">
                      <UserIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="আপনার পূর্ণ নাম"
                        className="pl-10"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">ফোন নম্বর</Label>
                    <div className="relative">
                      <PhoneIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="০১৭xxxxxxxx"
                        className="pl-10"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">ইমেইল ঠিকানা</Label>
                    <div className="relative">
                      <EnvelopeIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="example@email.com"
                        className="pl-10"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">ঠিকানা</Label>
                    <div className="relative">
                      <MapPinIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <Input
                        id="address"
                        name="address"
                        type="text"
                        placeholder="আপনার বর্তমান ঠিকানা"
                        className="pl-10"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="my-3 flex items-center">
                    <div className="flex-1 border-t border-gray-300"></div>
                    <span className="px-4 text-sm text-gray-500">অথবা</span>
                    <div className="flex-1 border-t border-gray-300"></div>
                  </div>
                  <div className="flex justify-center items-center flex-wrap md:flex-nowrap gap-2 w-full m-0">
                    <Button
                      variant="outline"
                      className="w-full py-6 flex-1/2"
                      type="button"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 mr-2"
                        viewBox="0 0 48 48"
                      >
                        <path
                          fill="#EA4335"
                          d="M24 9.5c3.18 0 5.94 1.17 8.11 3.08l6.07-6.07C33.89 3.57 29.23 2 24 2 14.61 2 6.8 7.96 3.86 16.01l7.19 5.57C12.68 13.74 17.91 9.5 24 9.5z"
                        />
                        <path
                          fill="#4285F4"
                          d="M46 24c0-1.47-.12-2.9-.34-4.29H24v8.16h12.67C35.45 31.95 30.28 35.5 24 35.5c-6.09 0-11.32-4.24-13.06-9.88l-7.19 5.57C6.8 40.04 14.61 46 24 46c11.91 0 22-9.14 22-22z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M10.94 25.62c-.48-1.43-.76-2.95-.76-4.62s.28-3.18.76-4.62L3.86 10.81C2.66 13.28 2 16.05 2 19c0 2.95.66 5.72 1.86 8.19l7.08-5.57z"
                        />
                        <path
                          fill="#34A853"
                          d="M24 9.5c3.18 0 5.94 1.17 8.11 3.08l6.07-6.07C33.89 3.57 29.23 2 24 2 14.61 2 6.8 7.96 3.86 16.01l7.19 5.57C12.68 13.74 17.91 9.5 24 9.5z"
                        />
                      </svg>
                      Google দিয়ে লগইন
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full py-6 flex-1/2"
                      type="button"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 mr-2"
                        viewBox="0 0 48 48"
                      >
                        <path
                          fill="#1877F2"
                          d="M24 2C12.95 2 4 10.95 4 22c0 9.98 7.25 18.25 16.52 20.28v-14.4h-4.95V22h4.95v-3.9c0-4.92 3-7.7 7.5-7.7 2.18 0 4.44.39 4.44.39v4.92h-2.5c-2.46 0-3.23 1.54-3.23 3.11V22h5.52l-.88 5.88h-4.64V42.3C36.76 40.25 44 31.98 44 22 44 10.95 35.05 2 24 2z"
                        />
                      </svg>
                      Facebook দিয়ে লগইন
                    </Button>
                  </div>
                </>
              )}

              {/* Step 2: Account Setup */}
              {currentStep === 2 && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="password">পাসওয়ার্ড</Label>
                    <div className="relative">
                      <LockClosedIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="শক্তিশালী পাসওয়ার্ড"
                        className="pl-10 pr-10"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeSlashIcon className="w-5 h-5" />
                        ) : (
                          <EyeIcon className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">
                      পাসওয়ার্ড নিশ্চিত করুন
                    </Label>
                    <div className="relative">
                      <LockClosedIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="পাসওয়ার্ড পুনরায় লিখুন"
                        className="pl-10 pr-10"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeSlashIcon className="w-5 h-5" />
                        ) : (
                          <EyeIcon className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-sm text-blue-900 mb-2">
                      পাসওয়ার্ড নিয়ম:
                    </h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• কমপক্ষে ৮ অক্ষর</li>
                      <li>• একটি বড় হাতের অক্ষর</li>
                      <li>• একটি ছোট হাতের অক্ষর</li>
                      <li>• একটি সংখ্যা ও বিশেষ চিহ্ন</li>
                    </ul>
                  </div>
                </>
              )}

              {/* Step 3: Role Selection */}
              {currentStep === 3 && (
                <>
                  <div className="space-y-4">
                    <Label>আপনার ভূমিকা নির্বাচন করুন</Label>

                    <div className="space-y-3">
                      <div
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          formData.role === "admin"
                            ? "border-green-500 bg-green-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() =>
                          setFormData({ ...formData, role: "admin" })
                        }
                      >
                        <div className="flex items-center space-x-3">
                          <input
                            type="radio"
                            name="role"
                            value="admin"
                            checked={formData.role === "admin"}
                            onChange={handleInputChange}
                            className="text-green-600"
                          />
                          <div>
                            <h3 className="font-semibold">মেস অ্যাডমিন</h3>
                            <p className="text-sm text-gray-600">
                              নতুন মেস তৈরি করুন এবং সম্পূর্ণ নিয়ন্ত্রণ রাখুন
                            </p>
                            <Badge className="mt-1 bg-blue-100 text-blue-800">
                              সকল অধিকার
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          formData.role === "member"
                            ? "border-green-500 bg-green-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() =>
                          setFormData({ ...formData, role: "member" })
                        }
                      >
                        <div className="flex items-center space-x-3">
                          <input
                            type="radio"
                            name="role"
                            value="member"
                            checked={formData.role === "member"}
                            onChange={handleInputChange}
                            className="text-green-600"
                          />
                          <div>
                            <h3 className="font-semibold">মেস মেম্বার</h3>
                            <p className="text-sm text-gray-600">
                              বিদ্যমান মেসে যোগ দিন এবং সদস্য হিসেবে কাজ করুন
                            </p>
                            <Badge className="mt-1 bg-green-100 text-green-800">
                              সীমিত অধিকার
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <input
                      type="checkbox"
                      id="acceptTerms"
                      name="acceptTerms"
                      checked={formData.acceptTerms}
                      onChange={handleInputChange}
                      className="mt-1 text-green-600"
                      required
                    />
                    <label
                      htmlFor="acceptTerms"
                      className="text-sm text-gray-600"
                    >
                      আমি{" "}
                      <Link
                        href="/terms"
                        className="text-green-600 hover:underline"
                      >
                        শর্তাবলী
                      </Link>{" "}
                      এবং{" "}
                      <Link
                        href="/privacy"
                        className="text-green-600 hover:underline"
                      >
                        গোপনীয়তা নীতি
                      </Link>{" "}
                      পড়েছি এবং সম্মত আছি।
                    </label>
                  </div>
                </>
              )}

              {/* Navigation Buttons */}
              <div className="flex space-x-3 pt-4">
                {currentStep > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 py-6"
                    onClick={handlePrevStep}
                  >
                    পূর্ববর্তী
                  </Button>
                )}

                {currentStep < 3 ? (
                  <Button
                    type="button"
                    className="flex-1 bg-green-600 hover:bg-green-700 py-6"
                    onClick={handleNextStep}
                  >
                    পরবর্তী
                    <ArrowRightIcon className="w-5 h-5 ml-2" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="flex-1 bg-green-600 hover:bg-green-700 py-6"
                    disabled={!formData.acceptTerms}
                  >
                    অ্যাকাউন্ট তৈরি করুন
                    <ArrowRightIcon className="w-5 h-5 ml-2" />
                  </Button>
                )}
              </div>
            </form>

            <div className="mt-4 text-center text-gray-600">
              ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
              <Link
                href="/login"
                className="text-green-600 hover:text-green-700 font-semibold"
              >
                লগইন করুন
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
