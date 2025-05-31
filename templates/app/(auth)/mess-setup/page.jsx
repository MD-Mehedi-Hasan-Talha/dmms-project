"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
// import { useAuth } from "@/components/auth/AuthProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { HomeIcon, PlusIcon } from "@heroicons/react/24/outline";
// import apiService from "@/lib/api";

export default function MessSetupPage() {
  // const { user, checkAuth } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState(1);
  const [messCode, setMessCode] = useState("");

  const [messData, setMessData] = useState({
    name: "",
    description: "",
    address: "",
    phone: "",
    email: "",
    monthlyRate: 0,
    mealRate: 0,
  });

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setMessData({
      ...messData,
      [name]: type === "number" ? parseFloat(value) || 0 : value,
    });
  };

  const handleCreateMess = async (e) => {
    e.preventDefault();

    if (!messData.name || !messData.address) {
      setError("মেসের নাম এবং ঠিকানা আবশ্যক");
      return;
    }

    setLoading(true);
    setError("");

    // // try {
    // //   const response = await apiService.createMess(messData);

    // //   if (response.success) {
    // //     // Refresh user data to get updated mess info
    // //     // await checkAuth();
    // //     router.push("/dashboard");
    // //   } else {
    // //     setError(response.error || "মেস তৈরি করতে সমস্যা হয়েছে");
    // //   }
    // // } catch (error) {
    // //   console.error("Mess creation error:", error);
    // //   setError("মেস তৈরি করতে সমস্যা হয়েছে");
    // // } finally {
    // //   setLoading(false);
    // }
  };

  const handleJoinMess = async (e) => {
    e.preventDefault();

    if (!messCode.trim()) {
      setError("মেস কোড আবশ্যক");
      return;
    }

    setLoading(true);
    setError("");

    // try {
    //   const response = await apiService.joinMess(messCode);

    //   if (response.success) {
    //     // Refresh user data to get updated mess info
    //     await checkAuth();
    //     router.push("/dashboard");
    //   } else {
    //     setError(response.error || "মেসে যোগ দিতে সমস্যা হয়েছে");
    //   }
    // } catch (error) {
    //   console.error("Mess join error:", error);
    //   setError("মেসে যোগ দিতে সমস্যা হয়েছে। মেস কোড সঠিক কিনা পরীক্ষা করুন।");
    // } finally {
    //   setLoading(false);
    // }
  };

  const handleJoinMessClick = () => {
    setStep(2);
  };

  // if (user?.messId) {
  //   router.push("/dashboard");
  //   return null;
  // }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center shadow-lg">
              <HomeIcon className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">মেস সেটআপ</h1>
        </div>

        {step === 1 && (
          <div className="grid gap-6 md:grid-cols-2">
            {/* Create New Mess */}
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <PlusIcon className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>নতুন মেস তৈরি করুন</CardTitle>
                <CardDescription>
                  একটি নতুন মেস তৈরি করে অ্যাডমিন হিসেবে পরিচালনা করুন
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={() => setStep(3)}
                >
                  মেস তৈরি করুন
                </Button>
              </CardContent>
            </Card>

            {/* Join Existing Mess */}
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <HomeIcon className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle>মেসে যোগ দিন</CardTitle>
                <CardDescription>
                  বিদ্যমান মেসে সদস্য হিসেবে যোগ দিন
                </CardDescription>
              </CardHeader>
              <CardContent>
                {" "}
                <Button
                  variant="outline"
                  className="w-full border-green-600 text-green-600 hover:bg-green-50"
                  onClick={handleJoinMessClick}
                >
                  যোগ দিন
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>মেসে যোগদান</CardTitle>
              <CardDescription>
                মেস কোড বা আমন্ত্রণ লিংক দিয়ে যোগ দিন
              </CardDescription>
            </CardHeader>{" "}
            <CardContent className="space-y-4">
              <form onSubmit={handleJoinMess}>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="messCode">মেস কোড</Label>
                    <Input
                      id="messCode"
                      value={messCode}
                      onChange={(e) => setMessCode(e.target.value)}
                      placeholder="মেস কোড লিখুন (যেমন: MESS123)"
                      className="mt-1"
                      required
                    />
                  </div>

                  {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                      {error}
                    </div>
                  )}

                  <div className="flex space-x-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(1)}
                    >
                      পূর্ববর্তী
                    </Button>
                    <Button type="submit" className="flex-1" disabled={loading}>
                      {loading ? "যোগদান করা হচ্ছে..." : "যোগ দিন"}
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>নতুন মেস তৈরি করুন</CardTitle>
              <CardDescription>
                আপনার মেসের তথ্য দিয়ে শুরু করুন
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateMess} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="name">মেসের নাম *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={messData.name}
                      onChange={handleInputChange}
                      placeholder="যেমন: গ্রীন ভ্যালি মেস"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">ফোন নম্বর</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={messData.phone}
                      onChange={handleInputChange}
                      placeholder="০১৭xxxxxxxx"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">ঠিকানা *</Label>
                  <Textarea
                    id="address"
                    name="address"
                    value={messData.address}
                    onChange={handleInputChange}
                    placeholder="মেসের সম্পূর্ণ ঠিকানা"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">বিবরণ</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={messData.description}
                    onChange={handleInputChange}
                    placeholder="মেস সম্পর্কে সংক্ষিপ্ত বিবরণ"
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="monthlyRate">মাসিক রেট (৳)</Label>
                    <Input
                      id="monthlyRate"
                      name="monthlyRate"
                      type="number"
                      value={messData.monthlyRate}
                      onChange={handleInputChange}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="mealRate">প্রতি মিল রেট (৳)</Label>
                    <Input
                      id="mealRate"
                      name="mealRate"
                      type="number"
                      value={messData.mealRate}
                      onChange={handleInputChange}
                      placeholder="0"
                    />
                  </div>
                </div>

                {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                  </div>
                )}

                <div className="flex space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                  >
                    পূর্ববর্তী
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-green-600 hover:bg-green-700"
                    disabled={loading}
                  >
                    {loading ? "তৈরি করা হচ্ছে..." : "মেস তৈরি করুন"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
