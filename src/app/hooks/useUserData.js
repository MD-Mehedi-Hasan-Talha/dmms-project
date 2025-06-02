import { useState } from "react";
import { MOCK_USER_DATA } from "@/lib/data/mockData";

export const useUserData = () => {
  const [userData, setUserData] = useState(MOCK_USER_DATA);
  const [isEditing, setIsEditing] = useState(false);

  // একক ফিল্ড আপডেট করার জন্য
  const handleValueChange = (field, value) => {
    setUserData((prev) => ({ ...prev, [field]: value }));
  };

  // ফর্ম সাবমিট হ্যান্ডলার
  const handleProfileUpdate = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    // API কল করে ডেটা সেভ করার জন্য জায়গা
    console.log("Updated user data:", userData);
    setIsEditing(false);
    alert("প্রোফাইল সফলভাবে আপডেট করা হয়েছে!");
  };

  // বাতিল করার জন্য (যদি রিসেট দিতে চাও)
  const handleCancel = () => {
    setUserData(MOCK_USER_DATA);
    setIsEditing(false);
  };

  return {
    userData,
    isEditing,
    setIsEditing,
    handleValueChange,
    handleProfileUpdate,
    handleCancel,
    setUserData, // প্রয়োজনে সরাসরি ডেটা সেট করতে পারবে
  };
};
