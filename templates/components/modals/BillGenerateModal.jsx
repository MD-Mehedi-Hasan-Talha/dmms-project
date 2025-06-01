"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calculator,
  Calendar,
  Users,
  DollarSign,
  FileText,
  Check,
  X,
} from "lucide-react";
import { formatCurrency, getMonthName } from "@/lib/utils";

export function BillGenerateModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    mealRate: 150,
    totalExpenses: 45000,
    totalMeals: 300,
    additionalCharges: 0,
    billDeadline: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const calculateMealRate = () => {
    if (formData.totalMeals > 0) {
      const rate =
        (formData.totalExpenses + formData.additionalCharges) /
        formData.totalMeals;
      handleInputChange("mealRate", Math.round(rate));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.month) {
      newErrors.month = "মাস নির্বাচন করুন";
    }
    if (!formData.year) {
      newErrors.year = "বছর নির্বাচন করুন";
    }
    if (formData.totalExpenses <= 0) {
      newErrors.totalExpenses = "মোট খরচ সঠিক নয়";
    }
    if (formData.totalMeals <= 0) {
      newErrors.totalMeals = "মোট মিল সঠিক নয়";
    }
    if (!formData.billDeadline) {
      newErrors.billDeadline = "বিল পেমেন্ট ডেডলাইন দিন";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(formData);
      onClose();
    }
  };

  const totalBillAmount = formData.totalExpenses + formData.additionalCharges;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-bold">
            <FileText className="w-6 h-6 text-blue-600" />
            মাসিক বিল জেনারেট করুন
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Month & Year Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                মাস *
              </Label>
              <Select
                value={formData.month.toString()}
                onValueChange={(value) =>
                  handleInputChange("month", parseInt(value))
                }
              >
                <SelectTrigger className={errors.month ? "border-red-500" : ""}>
                  <SelectValue placeholder="মাস নির্বাচন করুন" />
                </SelectTrigger>
                <SelectContent>
                  {[...Array(12)].map((_, i) => (
                    <SelectItem key={i + 1} value={(i + 1).toString()}>
                      {getMonthName(i + 1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.month && (
                <p className="text-red-500 text-sm">{errors.month}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>বছর *</Label>
              <Select
                value={formData.year.toString()}
                onValueChange={(value) =>
                  handleInputChange("year", parseInt(value))
                }
              >
                <SelectTrigger className={errors.year ? "border-red-500" : ""}>
                  <SelectValue placeholder="বছর নির্বাচন করুন" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">২০২৪</SelectItem>
                  <SelectItem value="2025">২০২৫</SelectItem>
                  <SelectItem value="2026">২০২৬</SelectItem>
                </SelectContent>
              </Select>
              {errors.year && (
                <p className="text-red-500 text-sm">{errors.year}</p>
              )}
            </div>
          </div>

          {/* Expense Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                মোট খরচ *
              </Label>
              <Input
                type="number"
                placeholder="৪৫০০০"
                value={formData.totalExpenses}
                onChange={(e) =>
                  handleInputChange(
                    "totalExpenses",
                    parseFloat(e.target.value) || 0
                  )
                }
                className={errors.totalExpenses ? "border-red-500" : ""}
              />
              {errors.totalExpenses && (
                <p className="text-red-500 text-sm">{errors.totalExpenses}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                মোট মিল *
              </Label>
              <Input
                type="number"
                placeholder="৩০০"
                value={formData.totalMeals}
                onChange={(e) =>
                  handleInputChange(
                    "totalMeals",
                    parseFloat(e.target.value) || 0
                  )
                }
                className={errors.totalMeals ? "border-red-500" : ""}
              />
              {errors.totalMeals && (
                <p className="text-red-500 text-sm">{errors.totalMeals}</p>
              )}
            </div>
          </div>

          {/* Additional Charges & Meal Rate */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>অতিরিক্ত চার্জ (ঐচ্ছিক)</Label>
              <Input
                type="number"
                placeholder="০"
                value={formData.additionalCharges}
                onChange={(e) =>
                  handleInputChange(
                    "additionalCharges",
                    parseFloat(e.target.value) || 0
                  )
                }
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Calculator className="w-4 h-4" />
                মিল রেট
              </Label>
              <div className="flex space-x-2">
                <Input
                  type="number"
                  value={formData.mealRate}
                  onChange={(e) =>
                    handleInputChange(
                      "mealRate",
                      parseFloat(e.target.value) || 0
                    )
                  }
                  readOnly
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={calculateMealRate}
                >
                  <Calculator className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Bill Deadline */}
          <div className="space-y-2">
            <Label>বিল পেমেন্ট ডেডলাইন *</Label>
            <Input
              type="date"
              value={formData.billDeadline}
              onChange={(e) =>
                handleInputChange("billDeadline", e.target.value)
              }
              className={errors.billDeadline ? "border-red-500" : ""}
            />
            {errors.billDeadline && (
              <p className="text-red-500 text-sm">{errors.billDeadline}</p>
            )}
          </div>

          {/* Summary */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <h3 className="font-semibold text-blue-900 mb-3">বিল সামারি</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-blue-700">মোট খরচ:</span>
                  <span className="font-semibold ml-2">
                    {formatCurrency(formData.totalExpenses)}
                  </span>
                </div>
                <div>
                  <span className="text-blue-700">অতিরিক্ত চার্জ:</span>
                  <span className="font-semibold ml-2">
                    {formatCurrency(formData.additionalCharges)}
                  </span>
                </div>
                <div>
                  <span className="text-blue-700">মোট মিল:</span>
                  <span className="font-semibold ml-2">
                    {formData.totalMeals}
                  </span>
                </div>
                <div>
                  <span className="text-blue-700">মিল রেট:</span>
                  <span className="font-semibold ml-2">
                    {formatCurrency(formData.mealRate)}
                  </span>
                </div>
              </div>
              <div className="border-t border-blue-200 mt-3 pt-3">
                <div className="flex justify-between items-center">
                  <span className="text-blue-900 font-semibold">
                    সর্বমোট বিল:
                  </span>
                  <span className="text-xl font-bold text-blue-900">
                    {formatCurrency(totalBillAmount)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              <X className="w-4 h-4 mr-2" />
              বাতিল
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              <Check className="w-4 h-4 mr-2" />
              বিল জেনারেট করুন
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
