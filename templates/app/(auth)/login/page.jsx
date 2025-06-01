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
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    phone: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // TODO: Integrate Clerk/Auth logic here
    // For now, just log the data
    console.log("Login data:", formData);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center shadow-lg">
              <HomeIcon className="w-8 h-8 text-white" />
            </div>
          </div>{" "}
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            মেস ম্যানেজারে স্বাগতম
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            আপনার অ্যাকাউন্টে লগইন করুন
          </p>
        </div>

        <Card className="shadow-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xl text-center">লগইন</CardTitle>
            <CardDescription className="text-center">
              আপনার ফোন নম্বর এবং পাসওয়ার্ড দিয়ে লগইন করুন
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">ফোন নম্বর</Label>{" "}
                <div className="relative">
                  <PhoneIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400 dark:text-gray-500" />
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
                <Label htmlFor="password">পাসওয়ার্ড</Label>
                <div className="relative">
                  {" "}
                  <LockClosedIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400 dark:text-gray-500" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="আপনার পাসওয়ার্ড"
                    className="pl-10 pr-10"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
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
              <div className="text-right">
                <Link
                  href="/forgot-password"
                  className="text-sm text-green-600 hover:text-green-700 hover:underline"
                >
                  পাসওয়ার্ড ভুলে গেছেন?
                </Link>
              </div>
              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-lg py-6"
              >
                লগইন করুন
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </Button>
            </form>
            <div className="my-6 flex items-center">
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
            <div className="mt-8 text-center text-gray-600">
              নতুন ব্যবহারকারী?{" "}
              <Link
                href="/register"
                className="text-green-600 hover:text-green-700 font-semibold"
              >
                একাউন্ট খুলুন
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
