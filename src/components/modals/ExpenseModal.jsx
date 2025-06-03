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
import { Card } from "@/components/ui/card";
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  Calendar,
  DollarSign,
  Package,
  FileText,
  Check,
  X,
  Calculator,
} from "lucide-react";

const ExpenseModal = ({ isOpen, onClose, onSubmit, expenseData = null }) => {
  const [formData, setFormData] = useState({
    date: "",
    type: "", // Changed from category to type to match your data structure
    description: "",
    totalAmount: 0,
    items: [],
  });

  const [currentItem, setCurrentItem] = useState({
    name: "",
    quantity: 1,
    unit: "কেজি", // Changed to Bengali
    unitPrice: "",
    total: 0, // Changed from totalPrice to total to match your data structure
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (expenseData && isOpen) {
      // Convert existing data structure to modal format
      const convertedItems =
        expenseData.items?.map((item) => ({
          ...item,
          id: item.id || Date.now().toString() + Math.random(),
          total: item.total || 0,
          unitPrice: item.unitPrice || 0,
          quantity: item.quantity || 1,
          unit: item.unit || "কেজি",
        })) || [];

      setFormData({
        date: expenseData.date || new Date().toISOString().split("T")[0],
        type: expenseData.type || "",
        description: expenseData.description || "",
        totalAmount: expenseData.totalAmount || 0,
        items: convertedItems,
      });
    } else if (isOpen) {
      // Reset form when opening for new expense
      setFormData({
        date: new Date().toISOString().split("T")[0],
        type: "",
        description: "",
        totalAmount: 0,
        items: [],
      });
      setCurrentItem({
        name: "",
        quantity: 1,
        unit: "কেজি",
        unitPrice: "",
        total: 0,
      });
    }
    setErrors({});
  }, [expenseData, isOpen]);

  // Updated categories to match your data structure
  const categories = [
    { value: "bazaar", label: "দৈনিক বাজার", icon: "🛒" },
    { value: "fixed", label: "ফিক্সড খরচ", icon: "💼" },
    { value: "special", label: "বিশেষ খরচ", icon: "🎉" },
    { value: "maintenance", label: "রক্ষণাবেক্ষণ", icon: "🔧" },
  ];

  const units = [
    { value: "কেজি", label: "কেজি" },
    { value: "গ্রাম", label: "গ্রাম" },
    { value: "লিটার", label: "লিটার" },
    { value: "পিস", label: "পিস" },
    { value: "প্যাকেট", label: "প্যাকেট" },
    { value: "বোতল", label: "বোতল" },
    { value: "ব্যাগ", label: "ব্যাগ" },
    { value: "বক্স", label: "বক্স" },
    { value: "মাস", label: "মাস" },
  ];

  // Calculate total price for current item
  useEffect(() => {
    const quantity = parseFloat(currentItem.quantity) || 0;
    const unitPrice = parseFloat(currentItem.unitPrice) || 0;
    const total = quantity * unitPrice;

    setCurrentItem((prev) => ({
      ...prev,
      total: total,
    }));
  }, [currentItem.quantity, currentItem.unitPrice]);

  // Calculate total amount for all items
  useEffect(() => {
    const total = formData.items.reduce(
      (sum, item) => sum + (parseFloat(item.total) || 0),
      0
    );
    setFormData((prev) => ({ ...prev, totalAmount: total }));
  }, [formData.items]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleCurrentItemChange = (field, value) => {
    setCurrentItem((prev) => ({ ...prev, [field]: value }));
  };

  const addItem = () => {
    if (!currentItem.name || !currentItem.unitPrice) {
      return;
    }

    const newItem = {
      ...currentItem,
      id: Date.now().toString() + Math.random(),
      unitPrice: parseFloat(currentItem.unitPrice),
      quantity: parseFloat(currentItem.quantity),
      total: parseFloat(currentItem.total),
    };

    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, newItem],
    }));

    // Reset current item
    setCurrentItem({
      name: "",
      quantity: 1,
      unit: "কেজি",
      unitPrice: "",
      total: 0,
    });
  };

  const removeItem = (itemId) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== itemId),
    }));
  };

  const updateItemQuantity = (itemId, delta) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.map((item) => {
        if (item.id === itemId) {
          const newQuantity = Math.max(0.1, item.quantity + delta);
          return {
            ...item,
            quantity: newQuantity,
            total: newQuantity * item.unitPrice,
          };
        }
        return item;
      }),
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.date) {
      newErrors.date = "তারিখ নির্বাচন করুন";
    }

    if (!formData.type) {
      newErrors.type = "খরচের ধরন নির্বাচন করুন";
    }

    if (formData.items.length === 0) {
      newErrors.items = "কমপক্ষে একটি আইটেম যোগ করুন";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit({
        ...formData,
        id: expenseData?.id || Date.now(),
      });
      onClose();
    }
  };

  // Safe formatCurrency function
  const formatCurrency = (amount) => {
    const numAmount = parseFloat(amount) || 0;
    try {
      return numAmount.toLocaleString("bn-BD", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      });
    } catch (error) {
      return numAmount.toString();
    }
  };

  const selectedCategory = categories.find(
    (cat) => cat.value === formData.type
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg font-semibold">
            <ShoppingCart className="h-5 w-5 text-blue-600" />
            {expenseData ? "খরচ সম্পাদনা" : "নতুন খরচ এন্ট্রি"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Date */}
            <div className="space-y-2">
              <Label
                htmlFor="date"
                className="text-sm font-medium flex items-center gap-2"
              >
                <Calendar className="h-4 w-4" />
                তারিখ *
              </Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange("date", e.target.value)}
                className={errors.date ? "border-red-500" : ""}
              />
              {errors.date && (
                <p className="text-red-500 text-sm">{errors.date}</p>
              )}
            </div>

            {/* Type */}
            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Package className="h-4 w-4" />
                খরচের ধরন *
              </Label>
              <Select
                value={formData.type}
                onValueChange={(value) => handleInputChange("type", value)}
              >
                <SelectTrigger className={errors.type ? "border-red-500" : ""}>
                  <SelectValue placeholder="খরচের ধরন নির্বাচন করুন" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      <div className="flex items-center gap-2">
                        <span>{category.icon}</span>
                        <span>{category.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.type && (
                <p className="text-red-500 text-sm">{errors.type}</p>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label
              htmlFor="description"
              className="text-sm font-medium flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              বিবরণ *
            </Label>
            <Input
              id="description"
              placeholder="খরচের বিবরণ লিখুন..."
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              required
            />
          </div>

          {/* Add New Item */}
          <Card className="p-4 border-dashed border-2 border-gray-300">
            <h3 className="font-medium mb-4 flex items-center gap-2">
              <Plus className="h-4 w-4" />
              নতুন আইটেম যোগ করুন
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              <div className="md:col-span-2">
                <Input
                  placeholder="আইটেমের নাম"
                  value={currentItem.name}
                  onChange={(e) =>
                    handleCurrentItemChange("name", e.target.value)
                  }
                />
              </div>

              <div>
                <Input
                  type="number"
                  placeholder="পরিমাণ"
                  value={currentItem.quantity}
                  onChange={(e) =>
                    handleCurrentItemChange("quantity", e.target.value)
                  }
                  step="0.1"
                  min="0.1"
                />
              </div>

              <div>
                <Select
                  value={currentItem.unit}
                  onValueChange={(value) =>
                    handleCurrentItemChange("unit", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {units.map((unit) => (
                      <SelectItem key={unit.value} value={unit.value}>
                        {unit.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Input
                  type="number"
                  placeholder="দর"
                  value={currentItem.unitPrice}
                  onChange={(e) =>
                    handleCurrentItemChange("unitPrice", e.target.value)
                  }
                  step="0.01"
                  min="0"
                />
              </div>
            </div>

            <div className="flex items-center justify-between mt-3 pt-3 border-t">
              <div className="text-sm text-gray-600">
                মোট: ৳{formatCurrency(currentItem.total)}
              </div>
              <Button
                type="button"
                onClick={addItem}
                disabled={!currentItem.name || !currentItem.unitPrice}
                size="sm"
                className="bg-green-600 hover:bg-green-700"
              >
                <Plus className="h-4 w-4 mr-1" />
                যোগ করুন
              </Button>
            </div>
          </Card>

          {/* Items List */}
          {formData.items.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-medium flex items-center gap-2">
                <Package className="h-4 w-4" />
                আইটেম তালিকা ({formData.items.length})
              </h3>

              {formData.items.map((item) => (
                <Card key={item.id} className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-gray-600">
                        {item.quantity} {item.unit} × ৳
                        {formatCurrency(item.unitPrice)} = ৳
                        {formatCurrency(item.total)}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => updateItemQuantity(item.id, -0.1)}
                        disabled={item.quantity <= 0.1}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>

                      <span className="text-sm min-w-[3rem] text-center">
                        {item.quantity}
                      </span>

                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => updateItemQuantity(item.id, 0.1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>

                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}

              {errors.items && (
                <p className="text-red-500 text-sm">{errors.items}</p>
              )}
            </div>
          )}

          {/* Total Summary */}
          {formData.items.length > 0 && (
            <Card className="p-4 bg-blue-50 border-blue-200">
              <div className="flex items-center justify-between">
                <span className="font-medium flex items-center gap-2">
                  <Calculator className="h-4 w-4" />
                  মোট খরচ:
                </span>
                <span className="text-xl font-bold text-blue-600">
                  ৳{formatCurrency(formData.totalAmount)}
                </span>
              </div>
            </Card>
          )}

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
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              <Check className="h-4 w-4 mr-2" />
              {expenseData ? "আপডেট করুন" : "সংরক্ষণ করুন"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ExpenseModal;
