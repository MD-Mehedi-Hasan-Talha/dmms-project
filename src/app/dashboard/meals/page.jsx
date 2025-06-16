"use client";

import { useState } from "react";

import MealEntryModal from "@/components/dashboard/meals/MealEntryModal/MealEntryModal";
import { MealDetailsModal } from "@/components/dashboard/meals/MealDetailsModal/MealDetailsModal";
import MealHeader from "@/components/dashboard/meals/MealHeader";
import TodayStats from "@/components/dashboard/meals/TodayStats";
import TodayMealStatus from "@/components/dashboard/meals/TodayMealStatus";
import WeeklyOverview from "@/components/dashboard/meals/WeeklyOverview";

import { members, weeklyMealData, todayStats } from "@/lib/data";

export default function MealsPage() {
  // Selected date for meals (YYYY-MM-DD)
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  // Controls meal entry modal visibility
  const [mealEntryModalOpen, setMealEntryModalOpen] = useState(false);

  // Controls meal details modal visibility
  const [mealDetailsModalOpen, setMealDetailsModalOpen] = useState(false);

  // Member selected for editing meal
  const [selectedMemberForEdit, setSelectedMemberForEdit] = useState(null);

  // Member selected for viewing meal details
  const [selectedMemberForView, setSelectedMemberForView] = useState(null);

  /**
   * Handles meal entry form submission
   * @param {Object} mealData - Submitted meal data
   */
  const handleMealEntrySubmit = (mealData) => {
    console.log("Meal entry submitted:", mealData);
    // TODO: Save meal data to backend or update state here
  };

  return (
    <>
      <div className="space-y-6">
        <MealHeader
          setSelectedMemberForEdit={setSelectedMemberForEdit}
          setMealEntryModalOpen={setMealEntryModalOpen}
        />

        <TodayStats todayStats={todayStats} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <TodayMealStatus
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            setSelectedMemberForEdit={setSelectedMemberForEdit}
            setMealEntryModalOpen={setMealEntryModalOpen}
            setSelectedMemberForView={setSelectedMemberForView}
            setMealDetailsModalOpen={setMealDetailsModalOpen}
          />

          <WeeklyOverview
            weeklyMealData={weeklyMealData}
            todayStats={todayStats}
          />
        </div>
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
