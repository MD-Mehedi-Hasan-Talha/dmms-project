import { useState } from "react";

export const usePasswordManager = () => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showStates, setShowStates] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const toggleShowPassword = (field) => {
    setShowStates((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("নতুন পাসওয়ার্ড ও নিশ্চিত পাসওয়ার্ড মিলছে না।");
      return;
    }
    // এখানে API তে পাসওয়ার্ড ডেটা পাঠানোর কোড থাকবে
    console.log("Password change data:", passwordData);
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    alert("পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে!");
  };

  return {
    passwordData,
    setPasswordData,
    showStates,
    toggleShowPassword,
    handlePasswordChange,
  };
};
