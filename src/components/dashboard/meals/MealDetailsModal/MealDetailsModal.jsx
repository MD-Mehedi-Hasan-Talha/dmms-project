"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { UserGroupIcon } from "@heroicons/react/24/outline";

import MealStatusCard from "@/components/dashboard/meals/MealDetailsModal/MealStatusCard";
import MealDetailsHeader from "@/components/dashboard/meals/MealDetailsModal/MealDetailsHeader";
import GuestInfoCard from "@/components/dashboard/meals/MealDetailsModal/GuestInfoCard";
import MealSummaryCard from "@/components/dashboard/meals/MealDetailsModal/MealSummaryCard";

export function MealDetailsModal({
  isOpen,
  onClose,
  memberData,
  selectedDate,
}) {
  if (!memberData) return null;

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

  const totalMeals = [
    memberData.breakfast,
    memberData.lunch,
    memberData.dinner,
  ].filter(Boolean).length;
  const status = getMealStatus(memberData);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <UserGroupIcon className="w-6 h-6" />
            {memberData.name} - মিলের বিস্তারিত
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <MealDetailsHeader
            name={memberData.name}
            date={selectedDate}
            status={status}
            totalMeals={totalMeals}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <MealStatusCard
              icon="🌅"
              label="সকালের নাস্তা"
              present={memberData.breakfast}
            />
            <MealStatusCard
              icon="🍽️"
              label="দুপুরের খাবার"
              present={memberData.lunch}
            />
            <MealStatusCard
              icon="🌙"
              label="রাতের খাবার"
              present={memberData.dinner}
            />
          </div>

          <GuestInfoCard guests={memberData.guests} />

          <MealSummaryCard totalMeals={totalMeals} guests={memberData.guests} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
