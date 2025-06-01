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
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  CalendarDaysIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  UserGroupIcon,
  ClockIcon,
  CheckCircleIcon,
  XMarkIcon,
  PencilIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import { MealEntryModal, MealDetailsModal } from "@/components/modals";

export default function MealsPage() {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [showMealEntry, setShowMealEntry] = useState(false);
  const [mealEntryModalOpen, setMealEntryModalOpen] = useState(false);
  const [mealDetailsModalOpen, setMealDetailsModalOpen] = useState(false);
  const [selectedMemberForEdit, setSelectedMemberForEdit] = useState(null);
  const [selectedMemberForView, setSelectedMemberForView] = useState(null);
  const [mealData, setMealData] = useState({
    date: new Date().toISOString().split("T")[0],
    mealType: "lunch",
    members: [],
  });
  // Mock data
  const members = [
    {
      id: 1,
      name: "মাসুদ আহমেদ",
      breakfast: true,
      lunch: true,
      dinner: true,
      guests: 0,
    },
    {
      id: 2,
      name: "রহিম উদ্দিন",
      breakfast: false,
      lunch: true,
      dinner: true,
      guests: 1,
    },
    {
      id: 3,
      name: "করিম সাহেব",
      breakfast: true,
      lunch: false,
      dinner: true,
      guests: 0,
    },
    {
      id: 4,
      name: "নাসির হোসেন",
      breakfast: true,
      lunch: true,
      dinner: false,
      guests: 0,
    },
    {
      id: 5,
      name: "আলী হাসান",
      breakfast: false,
      lunch: false,
      dinner: false,
      guests: 0,
    },
  ];

  const todayStats = {
    totalBreakfast: members.filter((m) => m.breakfast).length,
    totalLunch: members.filter((m) => m.lunch).length,
    totalDinner: members.filter((m) => m.dinner).length,
    totalGuests: members.reduce((sum, m) => sum + m.guests, 0),
    absentMembers: members.filter((m) => !m.breakfast && !m.lunch && !m.dinner)
      .length,
  };

  const weeklyMealData = [
    { date: "২৫ মে", breakfast: 8, lunch: 10, dinner: 9 },
    { date: "২৬ মে", breakfast: 7, lunch: 9, dinner: 10 },
    { date: "২৭ মে", breakfast: 9, lunch: 10, dinner: 8 },
    { date: "২৮ মে", breakfast: 8, lunch: 8, dinner: 9 },
    {
      date: "২৯ মে",
      breakfast: todayStats.totalBreakfast,
      lunch: todayStats.totalLunch,
      dinner: todayStats.totalDinner,
    },
  ];

  const getMealIcon = (mealType) => {
    const icons = {
      breakfast: "🌅",
      lunch: "🍽️",
      dinner: "🌙",
    };
    return icons[mealType] || "🍽️";
  };

  const getMealStatus = (member) => {
    const totalMeals = [member.breakfast, member.lunch, member.dinner].filter(
      Boolean
    ).length;
    if (totalMeals === 0)
      return { label: "অনুপস্থিত", color: "bg-red-100 text-red-800" };
    if (totalMeals === 3)
      return { label: "সম্পূর্ণ", color: "bg-green-100 text-green-800" };
    return { label: "আংশিক", color: "bg-yellow-100 text-yellow-800" };
  };

  // Meal entry handlers
  const handleMealEntryClick = () => {
    setSelectedMemberForEdit(null);
    setMealEntryModalOpen(true);
  };

  const handleEditMemberMeal = (member) => {
    setSelectedMemberForEdit(member);
    setMealEntryModalOpen(true);
  };

  const handleViewMemberMeal = (member) => {
    setSelectedMemberForView(member);
    setMealDetailsModalOpen(true);
  };

  const handleMealEntrySubmit = (mealData) => {
    console.log("Meal entry submitted:", mealData);
    // In real app, this would save to database
  };

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              মিল ব্যবস্থাপনা
            </h1>
            <p className="text-gray-600">
              দৈনিক মিল এন্ট্রি ও ট্র্যাকিং সিস্টেম
            </p>
          </div>{" "}
          <Button
            className="bg-green-600 hover:bg-green-700"
            onClick={handleMealEntryClick}
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            মিল এন্ট্রি করুন
          </Button>
        </div>

        {/* Today's Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="text-2xl mr-3">🌅</div>
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    সকালের নাস্তা
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {todayStats.totalBreakfast}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="text-2xl mr-3">🍽️</div>
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    দুপুরের খাবার
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {todayStats.totalLunch}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="text-2xl mr-3">🌙</div>
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    রাতের খাবার
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {todayStats.totalDinner}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="text-2xl mr-3">👥</div>
                <div>
                  <p className="text-sm font-medium text-gray-600">অতিথি মিল</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {todayStats.totalGuests}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="text-2xl mr-3">❌</div>
                <div>
                  <p className="text-sm font-medium text-gray-600">অনুপস্থিত</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {todayStats.absentMembers}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Meal Status - 2/3 width */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="flex items-center">
                      <CalendarDaysIcon className="w-5 h-5 mr-2" />
                      আজকের মিল স্ট্যাটাস
                    </CardTitle>
                    <CardDescription>
                      {new Date(selectedDate).toLocaleDateString("bn-BD")} -
                      সদস্যদের মিলের বিস্তারিত
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-auto"
                    />
                  </div>
                </div>
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
                          🌅 নাস্তা
                        </th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-700">
                          🍽️ দুপুর
                        </th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-700">
                          🌙 রাত
                        </th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-700">
                          👥 অতিথি
                        </th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-700">
                          স্ট্যাটাস
                        </th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-700">
                          অ্যাকশন
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {members.map((member) => {
                        const status = getMealStatus(member);
                        return (
                          <tr
                            key={member.id}
                            className="border-b hover:bg-gray-50"
                          >
                            <td className="py-4 px-4">
                              <div className="font-semibold text-gray-900">
                                {member.name}
                              </div>
                            </td>
                            <td className="py-4 px-4 text-center">
                              {member.breakfast ? (
                                <CheckCircleIcon className="w-5 h-5 text-green-600 mx-auto" />
                              ) : (
                                <XMarkIcon className="w-5 h-5 text-red-500 mx-auto" />
                              )}
                            </td>
                            <td className="py-4 px-4 text-center">
                              {member.lunch ? (
                                <CheckCircleIcon className="w-5 h-5 text-green-600 mx-auto" />
                              ) : (
                                <XMarkIcon className="w-5 h-5 text-red-500 mx-auto" />
                              )}
                            </td>
                            <td className="py-4 px-4 text-center">
                              {member.dinner ? (
                                <CheckCircleIcon className="w-5 h-5 text-green-600 mx-auto" />
                              ) : (
                                <XMarkIcon className="w-5 h-5 text-red-500 mx-auto" />
                              )}
                            </td>
                            <td className="py-4 px-4 text-center">
                              <span className="font-semibold">
                                {member.guests}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-center">
                              <Badge className={status.color}>
                                {status.label}
                              </Badge>
                            </td>
                            <td className="py-4 px-4 text-center">
                              <div className="flex justify-center space-x-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleEditMemberMeal(member)}
                                  title="মিল এন্ট্রি সম্পাদনা করুন"
                                >
                                  <PencilIcon className="w-4 h-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleViewMemberMeal(member)}
                                  title="বিস্তারিত দেখুন"
                                >
                                  <EyeIcon className="w-4 h-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Weekly Overview - 1/3 width */}
          <div className="space-y-6">
            {/* Weekly Chart */}
            <Card>
              <CardHeader>
                <CardTitle>সাপ্তাহিক মিল চার্ট</CardTitle>
                <CardDescription>গত ৫ দিনের মিলের তুলনা</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {weeklyMealData.map((day, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{day.date}</span>
                        <span className="text-gray-500">
                          মোট: {day.breakfast + day.lunch + day.dinner}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <div className="bg-orange-100 rounded px-2 py-1 text-center text-xs">
                          🌅 {day.breakfast}
                        </div>
                        <div className="bg-green-100 rounded px-2 py-1 text-center text-xs">
                          🍽️ {day.lunch}
                        </div>
                        <div className="bg-blue-100 rounded px-2 py-1 text-center text-xs">
                          🌙 {day.dinner}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>দ্রুত পরিসংখ্যান</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">আজকের মোট মিল</span>
                  <span className="font-semibold">
                    {todayStats.totalBreakfast +
                      todayStats.totalLunch +
                      todayStats.totalDinner}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    সর্বোচ্চ উপস্থিতি
                  </span>
                  <span className="font-semibold">
                    দুপুরের খাবার ({todayStats.totalLunch})
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">গড় দৈনিক মিল</span>
                  <span className="font-semibold">২৮</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">এ মাসের মোট</span>
                  <span className="font-semibold">৮১২</span>
                </div>
              </CardContent>
            </Card>

            {/* Today's Menu */}
            <Card>
              <CardHeader>
                <CardTitle>আজকের মেনু</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3 p-2 bg-orange-50 rounded-lg">
                  <span className="text-xl">🌅</span>
                  <div>
                    <p className="text-sm font-medium">সকালের নাস্তা</p>
                    <p className="text-xs text-gray-600">পরোটা ও ডিম</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-2 bg-green-50 rounded-lg">
                  <span className="text-xl">🍽️</span>
                  <div>
                    <p className="text-sm font-medium">দুপুরের খাবার</p>
                    <p className="text-xs text-gray-600">ভাত, মাছ, ডাল</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-2 bg-blue-50 rounded-lg">
                  <span className="text-xl">🌙</span>
                  <div>
                    <p className="text-sm font-medium">রাতের খাবার</p>
                    <p className="text-xs text-gray-600">খিচুড়ি ও সবজি</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Meal Entry Modal */}
        {showMealEntry && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">মিল এন্ট্রি করুন</h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowMealEntry(false)}
                >
                  <XMarkIcon className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">তারিখ</Label>
                    <Input
                      id="date"
                      type="date"
                      value={mealData.date}
                      onChange={(e) =>
                        setMealData({ ...mealData, date: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="mealType">খাবারের ধরন</Label>
                    <select
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={mealData.mealType}
                      onChange={(e) =>
                        setMealData({ ...mealData, mealType: e.target.value })
                      }
                    >
                      <option value="breakfast">সকালের নাস্তা</option>
                      <option value="lunch">দুপুরের খাবার</option>
                      <option value="dinner">রাতের খাবার</option>
                    </select>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-4">সদস্যদের উপস্থিতি</h3>
                  <div className="space-y-3">
                    {members.map((member) => (
                      <div
                        key={member.id}
                        className="flex items-center justify-between p-2 border border-gray-200 rounded-lg"
                      >
                        <span className="font-medium">{member.name}</span>
                        <div className="flex items-center space-x-4">
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              className="rounded"
                              defaultChecked
                            />
                            <span className="text-sm">উপস্থিত</span>
                          </label>
                          <div className="flex items-center space-x-2">
                            <label className="text-sm">অতিথি:</label>
                            <input
                              type="number"
                              min="0"
                              max="5"
                              defaultValue="0"
                              className="w-16 p-1 border border-gray-300 rounded text-center"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowMealEntry(false)}
                  >
                    বাতিল
                  </Button>
                  <Button className="bg-green-600 hover:bg-green-700">
                    সংরক্ষণ করুন
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Meal Entry Modal */}
      <MealEntryModal
        isOpen={mealEntryModalOpen}
        onClose={() => {
          setMealEntryModalOpen(false);
          setSelectedMemberForEdit(null);
        }}
        onSubmit={handleMealEntrySubmit}
        members={members}
        editMember={selectedMemberForEdit}
        selectedDate={selectedDate}
      />

      {/* Meal Details Modal */}
      <MealDetailsModal
        isOpen={mealDetailsModalOpen}
        onClose={() => {
          setMealDetailsModalOpen(false);
          setSelectedMemberForView(null);
        }}
        memberData={selectedMemberForView}
        selectedDate={selectedDate}
      />
    </>
  );
}
