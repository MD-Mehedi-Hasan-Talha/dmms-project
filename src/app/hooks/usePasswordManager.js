import { useState } from "react";

export const usePasswordManager = () => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const toggleShowPassword = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("নতুন পাসওয়ার্ড ও নিশ্চিত পাসওয়ার্ড মিলছে না।");
      return;
    }
    // API কলের জন্য জায়গা
    console.log("Password change request:", passwordData);

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
    showPassword,
    toggleShowPassword,
    handlePasswordChange,
  };
};
