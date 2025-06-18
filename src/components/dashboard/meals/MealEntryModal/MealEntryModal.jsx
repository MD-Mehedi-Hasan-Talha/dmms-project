"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";

import { members as mockMembers } from "@/lib/data-file";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import MealEntryCard from "./MealEntryCard";
import MealStatsGrid from "./MealStatsGrid";
export default function MealEntryModal({
  isOpen,
  onClose,
  date = null,
  onSave,
}) {
  const [selectedDate, setSelectedDate] = useState(
    date || new Date().toISOString().split("T")[0]
  );
  const [members, setMembers] = useState(mockMembers);

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
          <MealStatsGrid totals={totals} />
          {/* Members List */}
          <MealEntryCard members={members} setMembers={setMembers} />

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
