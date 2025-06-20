// MealEntryCard.jsx
import React from "react";
import { UserGroupIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import { Button } from "@/components/ui/button"; // Adjust based on your actual Button component path

const MealEntryCard = ({
  members, // Array of member objects with meal and guest info
  setMembers, // State setter function to update members
}) => {
  // Toggle a meal (breakfast/lunch/dinner) for a specific member by id
  const handleMealToggle = (memberId, mealType) => {
    setMembers((prev) =>
      prev.map((member) =>
        member.id === memberId
          ? { ...member, [mealType]: !member[mealType] } // flip meal boolean
          : member
      )
    );
  };

  // Change guest count for a specific member, with limits (0 to 10)
  const handleGuestChange = (memberId, change) => {
    setMembers((prev) =>
      prev.map((member) =>
        member.id === memberId
          ? {
              ...member,
              guests: Math.max(0, Math.min(10, member.guests + change)), // clamp guests between 0 and 10
            }
          : member
      )
    );
  };

  // Toggle a meal for all members (bulk toggle)
  const handleBulkToggle = (mealType) => {
    // Check if all members already have this meal selected
    const allSelected = members.every((member) => member[mealType]);
    setMembers((prev) =>
      prev.map((member) => ({
        ...member,
        [mealType]: !allSelected, // if all selected, unselect all; else select all
      }))
    );
  };

  return (
    <div className="border rounded-lg">
      {/* Header section with title and bulk action buttons */}
      <div className="bg-gray-50 p-4 border-b">
        <h3 className="font-semibold text-gray-900 mb-3">
          সদস্যদের মিল এন্ট্রি {/* "Members Meal Entry" in Bengali */}
        </h3>

        {/* Bulk Actions for toggling meals for all members */}
        <div className="flex gap-2">
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => handleBulkToggle("breakfast")}
            className="text-orange-600 border-orange-200"
          >
            🌅 সবার নাশতা {/* "Everyone's Breakfast" */}
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => handleBulkToggle("lunch")}
            className="text-blue-600 border-blue-200"
          >
            🍽️ সবার দুপুর {/* "Everyone's Lunch" */}
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => handleBulkToggle("dinner")}
            className="text-purple-600 border-purple-200"
          >
            🌙 সবার রাত {/* "Everyone's Dinner" */}
          </Button>
        </div>
      </div>

      {/* Member List */}
      <div className="p-4">
        <div className="space-y-4">
          {members.map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              {/* Member name and icon */}
              <div className="flex items-center">
                <UserGroupIcon className="w-5 h-5 text-gray-400 mr-3" />
                <span className="font-medium text-gray-900">{member.name}</span>
              </div>

              {/* Meal toggles and guest counter */}
              <div className="flex items-center space-x-4">
                {/* Meal Toggles */}
                <div className="flex space-x-2">
                  {/* Breakfast toggle button */}
                  <Button
                    type="button"
                    size="sm"
                    variant={member.breakfast ? "default" : "outline"}
                    onClick={() => handleMealToggle(member.id, "breakfast")}
                    className={
                      member.breakfast
                        ? "bg-orange-500 hover:bg-orange-600"
                        : "border-orange-200 text-orange-600"
                    }
                  >
                    🌅
                  </Button>
                  {/* Lunch toggle button */}
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
                  {/* Dinner toggle button */}
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
                  <span className="text-sm text-gray-600">গেস্ট:</span>{" "}
                  {/* "Guest:" */}
                  {/* Decrement guest button */}
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
                  {/* Guest count display */}
                  <span className="w-8 text-center font-semibold">
                    {member.guests}
                  </span>
                  {/* Increment guest button */}
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
  );
};

export default MealEntryCard;
