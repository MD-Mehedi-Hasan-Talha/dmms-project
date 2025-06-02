//ব্যবহারকারীর পছন্দসমূহ ম্যানেজ করার জন্য কাস্টম হুক
import { MOCK_PREFERENCES } from "@/lib/data/mockData";
import { useState } from "react";

export const usePreferences = () => {
  const [preferences, setPreferences] = useState(MOCK_PREFERENCES);

  const handlePreferencesUpdate = () => {
    // এখানে API তে পছন্দসমূহ সেভ করার কোড থাকবে
    console.log("Updated preferences:", preferences);
    alert("আপনার পছন্দসমূহ সংরক্ষণ করা হয়েছে!");
  };

  return { preferences, setPreferences, handlePreferencesUpdate };
};
