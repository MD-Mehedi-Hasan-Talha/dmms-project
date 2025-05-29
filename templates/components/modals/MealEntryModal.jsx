"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  CalendarDaysIcon,
  UserGroupIcon,
  PlusIcon,
  MinusIcon,
} from "@heroicons/react/24/outline";

export default function MealEntryModal({
  isOpen,
  onClose,
  date = null,
  onSave,
}) {
  const [selectedDate, setSelectedDate] = useState(
    date || new Date().toISOString().split("T")[0]
  );
  const [members, setMembers] = useState([
    {
      id: 1,
      name: "মাসুদ আহমেদ",
      breakfast: false,
      lunch: false,
      dinner: false,
      guests: 0,
    },
    {
      id: 2,
      name: "রহিম উদ্দিন",
      breakfast: false,
      lunch: false,
      dinner: false,
      guests: 0,
    },
    {
      id: 3,
      name: "করিম সাহেব",
      breakfast: false,
      lunch: false,
      dinner: false,
      guests: 0,
    },
    {
      id: 4,
      name: "নাসির হোসেন",
      breakfast: false,
      lunch: false,
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
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSelectedDate(date || new Date().toISOString().split("T")[0]);
      // Reset meal data when modal opens
      setMembers((prev) =>
        prev.map((member) => ({
          ...member,
          breakfast: false,
          lunch: false,
          dinner: false,
          guests: 0,
        }))
      );
    }
  }, [isOpen, date]);

  const handleMealToggle = (memberId, mealType) => {
    setMembers((prev) =>
      prev.map((member) =>
        member.id === memberId
          ? { ...member, [mealType]: !member[mealType] }
          : member
      )
    );
  };

  const handleGuestChange = (memberId, change) => {
    setMembers((prev) =>
      prev.map((member) =>
        member.id === memberId
          ? {
              ...member,
              guests: Math.max(0, Math.min(10, member.guests + change)),
            }
          : member
      )
    );
  };

  const handleBulkToggle = (mealType) => {
    const allSelected = members.every((member) => member[mealType]);
    setMembers((prev) =>
      prev.map((member) => ({
        ...member,
        [mealType]: !allSelected,
      }))
    );
  };

  const getTotalMeals = () => {
    const totals = {
      breakfast: members.filter((m) => m.breakfast).length,
      lunch: members.filter((m) => m.lunch).length,
      dinner: members.filter((m) => m.dinner).length,
      guests: members.reduce((sum, m) => sum + m.guests, 0),
    };
    return totals;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mealData = {
        date: selectedDate,
        members: members,
        totals: getTotalMeals(),
      };

      onSave(mealData);
      onClose();
    } catch (error) {
      console.error("Error saving meal data:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const totals = getTotalMeals();

  const getMealIcon = (mealType) => {
    const icons = {
      breakfast: "🌅",
      lunch: "🍽️",
      dinner: "🌙",
    };
    return icons[mealType];
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CalendarDaysIcon className="w-5 h-5" />
            দৈনিক মিল এন্ট্রি
          </DialogTitle>
          <DialogDescription>
            {selectedDate} তারিখের মিল এন্ট্রি করুন
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Date Selection */}
          <div>
            <Label htmlFor="date">তারিখ নির্বাচন করুন</Label>
            <Input
              id="date"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-48"
            />
          </div>

          {/* Meal Summary */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-orange-50 p-4 rounded-lg text-center">
              <div className="text-2xl mb-1">🌅</div>
              <div className="font-semibold text-orange-800">নাশতা</div>
              <div className="text-xl font-bold text-orange-600">
                {totals.breakfast}
              </div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <div className="text-2xl mb-1">🍽️</div>
              <div className="font-semibold text-blue-800">দুপুরের খাবার</div>
              <div className="text-xl font-bold text-blue-600">
                {totals.lunch}
              </div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <div className="text-2xl mb-1">🌙</div>
              <div className="font-semibold text-purple-800">রাতের খাবার</div>
              <div className="text-xl font-bold text-purple-600">
                {totals.dinner}
              </div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <div className="text-2xl mb-1">👥</div>
              <div className="font-semibold text-green-800">গেস্ট</div>
              <div className="text-xl font-bold text-green-600">
                {totals.guests}
              </div>
            </div>
          </div>

          {/* Members List */}
          <div className="border rounded-lg">
            <div className="bg-gray-50 p-4 border-b">
              <h3 className="font-semibold text-gray-900 mb-3">
                সদস্যদের মিল এন্ট্রি
              </h3>

              {/* Bulk Actions */}
              <div className="flex gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => handleBulkToggle("breakfast")}
                  className="text-orange-600 border-orange-200"
                >
                  🌅 সবার নাশতা
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => handleBulkToggle("lunch")}
                  className="text-blue-600 border-blue-200"
                >
                  🍽️ সবার দুপুর
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => handleBulkToggle("dinner")}
                  className="text-purple-600 border-purple-200"
                >
                  🌙 সবার রাত
                </Button>
              </div>
            </div>

            <div className="p-4">
              <div className="space-y-4">
                {members.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center">
                      <UserGroupIcon className="w-5 h-5 text-gray-400 mr-3" />
                      <span className="font-medium text-gray-900">
                        {member.name}
                      </span>
                    </div>

                    <div className="flex items-center space-x-4">
                      {/* Meal Toggles */}
                      <div className="flex space-x-2">
                        <Button
                          type="button"
                          size="sm"
                          variant={member.breakfast ? "default" : "outline"}
                          onClick={() =>
                            handleMealToggle(member.id, "breakfast")
                          }
                          className={
                            member.breakfast
                              ? "bg-orange-500 hover:bg-orange-600"
                              : "border-orange-200 text-orange-600"
                          }
                        >
                          🌅
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          variant={member.lunch ? "default" : "outline"}
                          onClick={() => handleMealToggle(member.id, "lunch")}
                          className={
                            member.lunch
                              ? "bg-blue-500 hover:bg-blue-600"
                              : "border-blue-200 text-blue-600"
                          }
                        >
                          🍽️
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          variant={member.dinner ? "default" : "outline"}
                          onClick={() => handleMealToggle(member.id, "dinner")}
                          className={
                            member.dinner
                              ? "bg-purple-500 hover:bg-purple-600"
                              : "border-purple-200 text-purple-600"
                          }
                        >
                          🌙
                        </Button>
                      </div>

                      {/* Guest Counter */}
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">গেস্ট:</span>
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() => handleGuestChange(member.id, -1)}
                          disabled={member.guests === 0}
                          className="w-8 h-8 p-0"
                        >
                          <MinusIcon className="w-4 h-4" />
                        </Button>
                        <span className="w-8 text-center font-semibold">
                          {member.guests}
                        </span>
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() => handleGuestChange(member.id, 1)}
                          disabled={member.guests >= 10}
                          className="w-8 h-8 p-0"
                        >
                          <PlusIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              বাতিল
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-green-600 hover:bg-green-700"
            >
              {isSubmitting ? "সংরক্ষণ হচ্ছে..." : "মিল এন্ট্রি সংরক্ষণ"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
