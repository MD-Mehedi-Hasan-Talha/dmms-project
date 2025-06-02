//ব্যবহারকারীর ডেটা ম্যানেজ করার জন্য কাস্টম হুক
import { useState } from "react";
import { MOCK_USER_DATA } from "@/lib/data/mockData";

export const useUserData = () => {
  const [userData, setUserData] = useState(MOCK_USER_DATA);
  const [isEditing, setIsEditing] = useState(false);

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    // এখানে API তে ডেটা পাঠানোর কোড থাকবে
    console.log("Updated user data:", userData);
    setIsEditing(false);
    alert("প্রোফাইল সফলভাবে আপডেট করা হয়েছে!");
  };

  return {
    userData,
    setUserData,
    isEditing,
    setIsEditing,
    handleProfileUpdate,
  };
};
