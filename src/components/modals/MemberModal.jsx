"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { UserIcon, EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";

export default function MemberModal({
  isOpen,
  onClose,
  member = null,
  onSave,
  onSubmit,
}) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    role: "member",
    joinDate: new Date().toISOString().split("T")[0],
    status: "active",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (member) {
      setFormData({
        name: member.name || "",
        phone: member.phone || "",
        email: member.email || "",
        role: member.role || "member",
        joinDate: member.joinDate || new Date().toISOString().split("T")[0],
        status: member.status || "active",
      });
    } else {
      setFormData({
        name: "",
        phone: "",
        email: "",
        role: "member",
        joinDate: new Date().toISOString().split("T")[0],
        status: "active",
      });
    }
    setErrors({});
  }, [member, isOpen]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "নাম অবশ্যক";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "ফোন নম্বর অবশ্যক";
    } else if (!/^01[3-9]\d{8}$/.test(formData.phone)) {
      newErrors.phone = "সঠিক ফোন নম্বর দিন (01XXXXXXXXX)";
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "সঠিক ইমেইল ঠিকানা দিন";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      onSubmit({
        ...formData,
        id: member?.id || Date.now(),
        totalMeals: member?.totalMeals || 0,
        totalPaid: member?.totalPaid || 0,
        due: member?.due || 0,
      });

      onClose();
    } catch (error) {
      console.error("Error saving member:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const roleOptions = [
    { value: "admin", label: "অ্যাডমিন" },
    { value: "sub_admin", label: "সাব অ্যাডমিন" },
    { value: "member", label: "সদস্য" },
  ];

  const statusOptions = [
    { value: "active", label: "সক্রিয়" },
    { value: "inactive", label: "নিষ্ক্রিয়" },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserIcon className="w-5 h-5" />
            {member ? "সদস্য সম্পাদনা" : "নতুন সদস্য যোগ"}
          </DialogTitle>
          <DialogDescription>
            {member ? "সদস্যের তথ্য আপডেট করুন" : "নতুন সদস্যের তথ্য পূরণ করুন"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <Label htmlFor="name">নাম *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="সদস্যের নাম"
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <Label htmlFor="phone">ফোন নম্বর *</Label>
            <div className="relative">
              <PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="01712345678"
                className={`pl-10 ${errors.phone ? "border-red-500" : ""}`}
              />
            </div>
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email">ইমেইল (ঐচ্ছিক)</Label>
            <div className="relative">
              <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="email@example.com"
                className={`pl-10 ${errors.email ? "border-red-500" : ""}`}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Role and Status */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="role">ভূমিকা</Label>
              <select
                id="role"
                value={formData.role}
                onChange={(e) => handleInputChange("role", e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                {roleOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="status">অবস্থা</Label>
              <select
                id="status"
                value={formData.status}
                onChange={(e) => handleInputChange("status", e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Join Date */}
          <div>
            <Label htmlFor="joinDate">যোগদানের তারিখ</Label>
            <Input
              id="joinDate"
              type="date"
              value={formData.joinDate}
              onChange={(e) => handleInputChange("joinDate", e.target.value)}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              বাতিল
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-green-600 hover:bg-green-700"
            >
              {isSubmitting
                ? "সংরক্ষণ হচ্ছে..."
                : member
                  ? "আপডেট করুন"
                  : "সংরক্ষণ করুন"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
