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
import { Textarea } from "@/components/ui/textarea";
import {
  CalendarDaysIcon,
  PlusIcon,
  DocumentTextIcon,
  ClockIcon,
  PencilIcon,
  TrashIcon,
  SunIcon,
  MoonIcon,
  StarIcon,
} from "@heroicons/react/24/outline";

export default function MenuPage() {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [showMenuForm, setShowMenuForm] = useState(false);
  const [editingMenu, setEditingMenu] = useState(null);
  const [menuData, setMenuData] = useState({
    date: new Date().toISOString().split("T")[0],
    breakfast: "",
    lunch: "",
    dinner: "",
    specialNote: "",
  });

  // Mock data for weekly menu
  const weeklyMenu = [
    {
      id: 1,
      date: "2025-05-29",
      dayName: "বৃহস্পতিবার",
      breakfast: "পরোটা, ডিম ভাজি, চা",
      lunch: "ভাত, মুরগির মাংস, ডাল, সবজি",
      dinner: "ভাত, মাছ, ডাল, সবজি ভাজি",
      specialNote: "আজ বিশেষ মুরগির মাংস",
      isToday: true,
    },
    {
      id: 2,
      date: "2025-05-30",
      dayName: "শুক্রবার",
      breakfast: "রুটি, সবজি, চা",
      lunch: "পোলাও, কাবাব, রায়তা, সালাদ",
      dinner: "ভাত, গরুর মাংস, ডাল, আলু ভর্তা",
      specialNote: "জুমার বিশেষ পোলাও",
      isToday: false,
    },
    {
      id: 3,
      date: "2025-05-31",
      dayName: "শনিবার",
      breakfast: "খিচুড়ি, ভর্তা",
      lunch: "ভাত, চিকেন কারি, ডাল, সবজি",
      dinner: "ভাত, মাছ ভাজি, ডাল, শাক",
      specialNote: "",
      isToday: false,
    },
  ];

  const [menus, setMenus] = useState(weeklyMenu);

  const handleInputChange = (field, value) => {
    setMenuData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingMenu) {
      // Update existing menu
      setMenus((prev) =>
        prev.map((menu) =>
          menu.id === editingMenu.id
            ? { ...menu, ...menuData, dayName: getDayName(menuData.date) }
            : menu
        )
      );
    } else {
      // Add new menu
      const newMenu = {
        id: Date.now(),
        ...menuData,
        dayName: getDayName(menuData.date),
        isToday: menuData.date === new Date().toISOString().split("T")[0],
      };
      setMenus((prev) => [...prev, newMenu]);
    }

    resetForm();
  };

  const handleEdit = (menu) => {
    setEditingMenu(menu);
    setMenuData({
      date: menu.date,
      breakfast: menu.breakfast,
      lunch: menu.lunch,
      dinner: menu.dinner,
      specialNote: menu.specialNote || "",
    });
    setShowMenuForm(true);
  };

  const handleDelete = (menuId) => {
    setMenus((prev) => prev.filter((menu) => menu.id !== menuId));
  };

  const resetForm = () => {
    setMenuData({
      date: new Date().toISOString().split("T")[0],
      breakfast: "",
      lunch: "",
      dinner: "",
      specialNote: "",
    });
    setEditingMenu(null);
    setShowMenuForm(false);
  };

  const getDayName = (dateString) => {
    const days = [
      "রবিবার",
      "সোমবার",
      "মঙ্গলবার",
      "বুধবার",
      "বৃহস্পতিবার",
      "শুক্রবার",
      "শনিবার",
    ];
    const date = new Date(dateString);
    return days[date.getDay()];
  };

  const getMealIcon = (mealType) => {
    switch (mealType) {
      case "breakfast":
        return <SunIcon className="h-5 w-5 text-yellow-500" />;
      case "lunch":
        return <StarIcon className="h-5 w-5 text-orange-500" />;
      case "dinner":
        return <MoonIcon className="h-5 w-5 text-indigo-500" />;
      default:
        return null;
    }
  };

  const todaysMenu = menus.find((menu) => menu.isToday);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            দৈনিক মেনু ব্যবস্থাপনা
          </h1>
          <p className="text-gray-600">
            প্রতিদিনের নাশতা, দুপুর ও রাতের খাবারের মেনু নির্ধারণ
          </p>
        </div>
        <Button
          className="bg-green-600 hover:bg-green-700"
          onClick={() => setShowMenuForm(true)}
        >
          <PlusIcon className="w-4 h-4 mr-2" />
          নতুন মেনু যোগ করুন
        </Button>
      </div>

      {/* Today's Special Menu */}
      {todaysMenu && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center gap-2">
              <CalendarDaysIcon className="h-5 w-5" />
              আজকের বিশেষ মেনু - {todaysMenu.dayName}
            </CardTitle>
            <CardDescription className="text-green-600">
              {new Date(todaysMenu.date).toLocaleDateString("bn-BD")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg border">
                <div className="flex items-center gap-2 mb-2">
                  {getMealIcon("breakfast")}
                  <h3 className="font-semibold text-gray-800">নাশতা</h3>
                </div>
                <p className="text-gray-600">{todaysMenu.breakfast}</p>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <div className="flex items-center gap-2 mb-2">
                  {getMealIcon("lunch")}
                  <h3 className="font-semibold text-gray-800">দুপুরের খাবার</h3>
                </div>
                <p className="text-gray-600">{todaysMenu.lunch}</p>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <div className="flex items-center gap-2 mb-2">
                  {getMealIcon("dinner")}
                  <h3 className="font-semibold text-gray-800">রাতের খাবার</h3>
                </div>
                <p className="text-gray-600">{todaysMenu.dinner}</p>
              </div>
            </div>
            {todaysMenu.specialNote && (
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-800 font-medium">
                  <span className="font-semibold">বিশেষ নোট:</span>{" "}
                  {todaysMenu.specialNote}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Weekly Menu List */}
      <Card>
        <CardHeader>
          <CardTitle>সাপ্তাহিক মেনু তালিকা</CardTitle>
          <CardDescription>
            সপ্তাহের সকল দিনের মেনু একনজরে দেখুন
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {menus.map((menu) => (
              <div
                key={menu.id}
                className={`border rounded-lg p-4 ${
                  menu.isToday
                    ? "border-green-300 bg-green-50"
                    : "border-gray-200"
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">
                      {menu.dayName}
                      {menu.isToday && (
                        <Badge className="ml-2 bg-green-100 text-green-800">
                          আজ
                        </Badge>
                      )}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {new Date(menu.date).toLocaleDateString("bn-BD")}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(menu)}
                    >
                      <PencilIcon className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-600 hover:text-red-700"
                      onClick={() => handleDelete(menu.id)}
                    >
                      <TrashIcon className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      {getMealIcon("breakfast")}
                      <span className="text-sm font-medium">নাশতা</span>
                    </div>
                    <p className="text-sm text-gray-600">{menu.breakfast}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      {getMealIcon("lunch")}
                      <span className="text-sm font-medium">দুপুর</span>
                    </div>
                    <p className="text-sm text-gray-600">{menu.lunch}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      {getMealIcon("dinner")}
                      <span className="text-sm font-medium">রাত</span>
                    </div>
                    <p className="text-sm text-gray-600">{menu.dinner}</p>
                  </div>
                </div>

                {menu.specialNote && (
                  <div className="mt-3 p-2 bg-blue-50 border border-blue-200 rounded">
                    <p className="text-sm text-blue-800">
                      <span className="font-medium">বিশেষ নোট:</span>{" "}
                      {menu.specialNote}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Menu Form Modal */}
      {showMenuForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">
                {editingMenu ? "মেনু সম্পাদনা" : "নতুন মেনু যোগ করুন"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="date">তারিখ *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={menuData.date}
                    onChange={(e) => handleInputChange("date", e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="breakfast">নাশতা *</Label>
                  <Textarea
                    id="breakfast"
                    placeholder="নাশতার মেনু লিখুন..."
                    value={menuData.breakfast}
                    onChange={(e) =>
                      handleInputChange("breakfast", e.target.value)
                    }
                    required
                    rows={2}
                  />
                </div>

                <div>
                  <Label htmlFor="lunch">দুপুরের খাবার *</Label>
                  <Textarea
                    id="lunch"
                    placeholder="দুপুরের খাবারের মেনু লিখুন..."
                    value={menuData.lunch}
                    onChange={(e) => handleInputChange("lunch", e.target.value)}
                    required
                    rows={2}
                  />
                </div>

                <div>
                  <Label htmlFor="dinner">রাতের খাবার *</Label>
                  <Textarea
                    id="dinner"
                    placeholder="রাতের খাবারের মেনু লিখুন..."
                    value={menuData.dinner}
                    onChange={(e) =>
                      handleInputChange("dinner", e.target.value)
                    }
                    required
                    rows={2}
                  />
                </div>

                <div>
                  <Label htmlFor="specialNote">বিশেষ নোট (ঐচ্ছিক)</Label>
                  <Textarea
                    id="specialNote"
                    placeholder="কোনো বিশেষ নোট বা তথ্য..."
                    value={menuData.specialNote}
                    onChange={(e) =>
                      handleInputChange("specialNote", e.target.value)
                    }
                    rows={2}
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={resetForm}
                    className="flex-1"
                  >
                    বাতিল
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    {editingMenu ? "আপডেট করুন" : "সংরক্ষণ করুন"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
