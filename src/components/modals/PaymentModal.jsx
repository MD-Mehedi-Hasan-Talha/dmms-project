"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Calendar,
  CreditCard,
  User,
  DollarSign,
  FileText,
  Check,
  X,
} from "lucide-react";

export function PaymentModal({
  isOpen,
  onClose,
  onSubmit,
  paymentData = null,
  members = [],
}) {
  const [formData, setFormData] = useState({
    memberId: "",
    memberName: "",
    amount: "",
    paymentMethod: "",
    transactionId: "",
    description: "",
    paymentDate: "",
    paymentType: "meal_payment", // meal_payment, deposit, other
    status: "completed",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (paymentData) {
      setFormData(paymentData);
    } else {
      // Reset form when opening for new payment
      setFormData({
        memberId: "",
        memberName: "",
        amount: "",
        paymentMethod: "",
        transactionId: "",
        description: "",
        paymentDate: new Date().toISOString().split("T")[0],
        paymentType: "meal_payment",
        status: "completed",
      });
    }
    setErrors({});
  }, [paymentData, isOpen]);

  const paymentMethods = [
    { value: "cash", label: "নগদ (Cash)" },
    { value: "bkash", label: "বিকাশ (bKash)" },
    { value: "nagad", label: "নগদ (Nagad)" },
    { value: "rocket", label: "রকেট (Rocket)" },
    { value: "bank_transfer", label: "ব্যাংক ট্রান্সফার" },
    { value: "mobile_banking", label: "মোবাইল ব্যাংকিং" },
  ];

  const paymentTypes = [
    { value: "meal_payment", label: "মিল পেমেন্ট" },
    { value: "deposit", label: "জমা" },
    { value: "advance", label: "অগ্রিম" },
    { value: "other", label: "অন্যান্য" },
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }

    // Auto-fill member name when member is selected
    if (field === "memberId" && value) {
      const selectedMember = members.find((member) => member.id === value);
      if (selectedMember) {
        setFormData((prev) => ({
          ...prev,
          memberId: value,
          memberName: selectedMember.name,
        }));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.memberId) {
      newErrors.memberId = "সদস্য নির্বাচন করুন";
    }

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = "সঠিক পরিমাণ লিখুন";
    }

    if (!formData.paymentMethod) {
      newErrors.paymentMethod = "পেমেন্ট পদ্ধতি নির্বাচন করুন";
    }

    if (!formData.paymentDate) {
      newErrors.paymentDate = "তারিখ নির্বাচন করুন";
    }

    // Validate transaction ID for non-cash payments
    if (formData.paymentMethod !== "cash" && !formData.transactionId) {
      newErrors.transactionId = "লেনদেন আইডি প্রয়োজন";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit({
        ...formData,
        amount: parseFloat(formData.amount),
        id: paymentData?.id || Date.now().toString(),
      });
      onClose();
    }
  };

  const formatAmount = (value) => {
    const numValue = parseFloat(value) || 0;
    return numValue.toLocaleString("bn-BD");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg font-semibold">
            <CreditCard className="h-5 w-5 text-green-600" />
            {paymentData ? "পেমেন্ট সম্পাদনা" : "নতুন পেমেন্ট রেকর্ড"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Member Selection */}
          <div className="space-y-2">
            <Label
              htmlFor="member"
              className="text-sm font-medium flex items-center gap-2"
            >
              <User className="h-4 w-4" />
              সদস্য নির্বাচন করুন *
            </Label>
            <Select
              value={formData.memberId}
              onValueChange={(value) => handleInputChange("memberId", value)}
            >
              <SelectTrigger
                className={errors.memberId ? "border-red-500" : ""}
              >
                <SelectValue placeholder="সদস্য নির্বাচন করুন" />
              </SelectTrigger>
              <SelectContent>
                {members.map((member) => (
                  <SelectItem key={member.id} value={member.id}>
                    <div className="flex items-center justify-between w-full">
                      <span>{member.name}</span>
                      <span className="text-sm text-gray-500 ml-2">
                        {member.role}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.memberId && (
              <p className="text-red-500 text-sm">{errors.memberId}</p>
            )}
          </div>

          {/* Payment Type */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">পেমেন্ট ধরন *</Label>
            <Select
              value={formData.paymentType}
              onValueChange={(value) => handleInputChange("paymentType", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="পেমেন্ট ধরন নির্বাচন করুন" />
              </SelectTrigger>
              <SelectContent>
                {paymentTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Amount */}
          <div className="space-y-2">
            <Label
              htmlFor="amount"
              className="text-sm font-medium flex items-center gap-2"
            >
              <DollarSign className="h-4 w-4" />
              পরিমাণ (টাকা) *
            </Label>
            <Input
              id="amount"
              type="number"
              placeholder="পরিমাণ লিখুন"
              value={formData.amount}
              onChange={(e) => handleInputChange("amount", e.target.value)}
              className={errors.amount ? "border-red-500" : ""}
              step="0.01"
              min="0"
            />
            {formData.amount && (
              <p className="text-sm text-gray-600">
                অর্থ: {formatAmount(formData.amount)} টাকা
              </p>
            )}
            {errors.amount && (
              <p className="text-red-500 text-sm">{errors.amount}</p>
            )}
          </div>

          {/* Payment Method */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">পেমেন্ট পদ্ধতি *</Label>
            <Select
              value={formData.paymentMethod}
              onValueChange={(value) =>
                handleInputChange("paymentMethod", value)
              }
            >
              <SelectTrigger
                className={errors.paymentMethod ? "border-red-500" : ""}
              >
                <SelectValue placeholder="পেমেন্ট পদ্ধতি নির্বাচন করুন" />
              </SelectTrigger>
              <SelectContent>
                {paymentMethods.map((method) => (
                  <SelectItem key={method.value} value={method.value}>
                    {method.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.paymentMethod && (
              <p className="text-red-500 text-sm">{errors.paymentMethod}</p>
            )}
          </div>

          {/* Transaction ID (only for non-cash payments) */}
          {formData.paymentMethod && formData.paymentMethod !== "cash" && (
            <div className="space-y-2">
              <Label htmlFor="transactionId" className="text-sm font-medium">
                লেনদেন আইডি *
              </Label>
              <Input
                id="transactionId"
                placeholder="লেনদেন আইডি লিখুন"
                value={formData.transactionId}
                onChange={(e) =>
                  handleInputChange("transactionId", e.target.value)
                }
                className={errors.transactionId ? "border-red-500" : ""}
              />
              {errors.transactionId && (
                <p className="text-red-500 text-sm">{errors.transactionId}</p>
              )}
            </div>
          )}

          {/* Payment Date */}
          <div className="space-y-2">
            <Label
              htmlFor="paymentDate"
              className="text-sm font-medium flex items-center gap-2"
            >
              <Calendar className="h-4 w-4" />
              পেমেন্ট তারিখ *
            </Label>
            <Input
              id="paymentDate"
              type="date"
              value={formData.paymentDate}
              onChange={(e) => handleInputChange("paymentDate", e.target.value)}
              className={errors.paymentDate ? "border-red-500" : ""}
            />
            {errors.paymentDate && (
              <p className="text-red-500 text-sm">{errors.paymentDate}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label
              htmlFor="description"
              className="text-sm font-medium flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              বিবরণ (ঐচ্ছিক)
            </Label>
            <Textarea
              id="description"
              placeholder="অতিরিক্ত বিবরণ লিখুন..."
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              rows={3}
              className="resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              <X className="h-4 w-4 mr-2" />
              বাতিল
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              <Check className="h-4 w-4 mr-2" />
              {paymentData ? "আপডেট করুন" : "সংরক্ষণ করুন"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
