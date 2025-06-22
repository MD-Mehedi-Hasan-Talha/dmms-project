"use client";
import { formatDate, getGreeting } from "@/lib/utils";
import { Button } from "../ui/button";
import { EyeIcon, PlusIcon } from "lucide-react";

const WelcomeHeader = () => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {getGreeting()}, মাসুদ ভাই! 👋
        </h1>
        <p className="text-gray-600">
          আজ {formatDate(new Date())} - আপনার মেসের সামগ্রিক অবস্থা দেখুন
        </p>
      </div>
      <div className="flex space-x-3">
        <Button variant="outline">
          <EyeIcon className="w-4 h-4 mr-2" />
          রিপোর্ট দেখুন
        </Button>
        <Button className="bg-green-600 hover:bg-green-700">
          <PlusIcon className="w-4 h-4 mr-2" />
          নতুন এন্ট্রি
        </Button>
      </div>
    </div>
  );
};

export default WelcomeHeader;
