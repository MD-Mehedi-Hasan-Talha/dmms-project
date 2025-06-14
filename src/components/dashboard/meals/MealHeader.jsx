import React from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

const MealHeader = ({ setSelectedMemberForEdit, setMealEntryModalOpen }) => {
  // @ Handle click on "মিল এন্ট্রি করুন" button: reset selected member and open modal
  const handleMealEntryClick = () => {
    setSelectedMemberForEdit(null);
    setMealEntryModalOpen(true);
  };

  return (
    <div className="flex flex-col md:flex-row md:justify-between justify-between md:items-center space-y-4 md:space-y-0">
      {/* @ Title and description */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">মিল ব্যবস্থাপনা</h1>
        <p className="text-gray-600">দৈনিক মিল এন্ট্রি ও ট্র্যাকিং সিস্টেম</p>
      </div>

      {/* @ Button to trigger meal entry modal */}
      <Button
        className="bg-green-600 hover:bg-green-700"
        onClick={handleMealEntryClick}
      >
        <PlusIcon className="w-4 h-4 mr-2" />
        মিল এন্ট্রি করুন
      </Button>
    </div>
  );
};

export default MealHeader;
