import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import React from "react";

const MenuHeader = ({ setShowMenuForm }) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="md:text-2xl text-lg font-bold text-gray-900">
          দৈনিক মেনু ব্যবস্থাপনা
        </h1>
        <p className="md:text-md text-xs text-gray-600">
          প্রতিদিনের নাশতা, দুপুর ও রাতের খাবারের মেনু নির্ধারণ
        </p>
      </div>
      <Button
        className="bg-green-600 hover:bg-green-700"
        onClick={() => setShowMenuForm(true)}
      >
        <PlusIcon className="w-4 h-4 md:mr-2" />
        <span className="md:block hidden">নতুন মেনু যোগ করুন</span>
      </Button>
    </div>
  );
};

export default MenuHeader;
