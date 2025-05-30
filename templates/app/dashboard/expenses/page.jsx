"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  ShoppingCartIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  CurrencyDollarIcon,
  CalendarDaysIcon,
  DocumentTextIcon,
  XMarkIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import { formatCurrency, formatDate } from "@/lib/utils";
import { ExpenseModal, DeleteConfirmation } from "@/components/modals";

export default function ExpensesPage() {
  const [showExpenseEntry, setShowExpenseEntry] = useState(false);
  const [expenseModalOpen, setExpenseModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState(null);
  const [expenseType, setExpenseType] = useState("bazaar");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      date: "2025-05-29",
      type: "bazaar",
      description: "দৈনিক বাজার",
      totalAmount: 1200,
      addedBy: "মাসুদ আহমেদ",
      items: [
        { name: "চাল", quantity: 3, unit: "কেজি", unitPrice: 60, total: 180 },
        { name: "মাছ", quantity: 2, unit: "কেজি", unitPrice: 350, total: 700 },
        { name: "সবজি", quantity: 1, unit: "কেজি", unitPrice: 80, total: 80 },
        { name: "ডাল", quantity: 1, unit: "কেজি", unitPrice: 120, total: 120 },
      ],
    },
    {
      id: 2,
      date: "2025-05-28",
      type: "fixed",
      description: "বাবুর্চি বেতন",
      totalAmount: 8000,
      addedBy: "রহিম উদ্দিন",
      items: [
        {
          name: "মাসিক বেতন",
          quantity: 1,
          unit: "মাস",
          unitPrice: 8000,
          total: 8000,
        },
      ],
    },
    {
      id: 3,
      date: "2025-05-27",
      type: "bazaar",
      description: "সাপ্তাহিক বাজার",
      totalAmount: 2500,
      addedBy: "করিম সাহেব",
      items: [
        {
          name: "মাংস",
          quantity: 3,
          unit: "কেজি",
          unitPrice: 650,
          total: 1950,
        },
        {
          name: "পেঁয়াজ",
          quantity: 2,
          unit: "কেজি",
          unitPrice: 40,
          total: 80,
        },
        {
          name: "রসুন",
          quantity: 0.5,
          unit: "কেজি",
          unitPrice: 200,
          total: 100,
        },
      ],
    },
  ]);

  // Handlers
  const handleAddExpense = () => {
    setSelectedExpense(null);
    setExpenseModalOpen(true);
  };

  const handleEditExpense = (expense) => {
    setSelectedExpense(expense);
    setExpenseModalOpen(true);
  };

  const handleDeleteExpense = (expense) => {
    setExpenseToDelete(expense);
    setDeleteModalOpen(true);
  };

  const handleExpenseSubmit = (expenseData) => {
    if (selectedExpense) {
      // Edit existing expense
      setExpenses((prev) =>
        prev.map((expense) =>
          expense.id === selectedExpense.id
            ? { ...expense, ...expenseData }
            : expense
        )
      );
    } else {
      // Add new expense
      const newExpense = {
        ...expenseData,
        id: Date.now(),
        addedBy: "বর্তমান ব্যবহারকারী",
      };
      setExpenses((prev) => [...prev, newExpense]);
    }
  };

  const confirmDeleteExpense = () => {
    if (expenseToDelete) {
      setExpenses((prev) =>
        prev.filter((expense) => expense.id !== expenseToDelete.id)
      );
      setDeleteModalOpen(false);
      setExpenseToDelete(null);
    }
  };

  const monthlyStats = {
    totalExpense: 45000,
    bazaarExpense: 32000,
    fixedExpense: 13000,
    averageDaily: 1500,
    transactionCount: 24,
  };

  const expenseCategories = [
    { id: "all", name: "সকল ক্যাটাগরি", count: expenses.length },
    {
      id: "bazaar",
      name: "দৈনিক বাজার",
      count: expenses.filter((e) => e.type === "bazaar").length,
    },
    {
      id: "fixed",
      name: "ফিক্সড খরচ",
      count: expenses.filter((e) => e.type === "fixed").length,
    },
    { id: "special", name: "বিশেষ খরচ", count: 0 },
    { id: "maintenance", name: "রক্ষণাবেক্ষণ", count: 0 },
  ];

  const getExpenseTypeInfo = (type) => {
    const types = {
      bazaar: {
        label: "দৈনিক বাজার",
        color: "bg-green-100 text-green-800",
        icon: "🛒",
      },
      fixed: {
        label: "ফিক্সড খরচ",
        color: "bg-blue-100 text-blue-800",
        icon: "💼",
      },
      special: {
        label: "বিশেষ খরচ",
        color: "bg-purple-100 text-purple-800",
        icon: "🎉",
      },
      maintenance: {
        label: "রক্ষণাবেক্ষণ",
        color: "bg-orange-100 text-orange-800",
        icon: "🔧",
      },
    };
    return types[type] || types.bazaar;
  };

  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch =
      expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.addedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || expense.type === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      {" "}
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              বাজার ও খরচ ব্যবস্থাপনা
            </h1>
            <p className="text-gray-600">
              দৈনিক বাজার এবং সকল ধরনের খরচের হিসাব
            </p>
          </div>{" "}
          <Button
            className="bg-green-600 hover:bg-green-700"
            onClick={handleAddExpense}
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            নতুন খরচ যোগ করুন
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CurrencyDollarIcon className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">মোট খরচ</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCurrency(monthlyStats.totalExpense)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <ShoppingCartIcon className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">বাজার খরচ</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCurrency(monthlyStats.bazaarExpense)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <DocumentTextIcon className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    ফিক্সড খরচ
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCurrency(monthlyStats.fixedExpense)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <CalendarDaysIcon className="w-6 h-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">দৈনিক গড়</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCurrency(monthlyStats.averageDaily)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-red-100 rounded-lg">
                  <DocumentTextIcon className="w-6 h-6 text-red-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    মোট এন্ট্রি
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {monthlyStats.transactionCount}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="flex flex-wrap gap-2">
            {expenseCategories.map((category) => (
              <Button
                key={category.id}
                variant={
                  selectedCategory === category.id ? "default" : "outline"
                }
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className={
                  selectedCategory === category.id
                    ? "bg-green-600 hover:bg-green-700"
                    : ""
                }
              >
                {category.name} ({category.count})
              </Button>
            ))}
          </div>
          <div className="relative w-full sm:w-64">
            <MagnifyingGlassIcon className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <Input
              placeholder="খরচ খুঁজুন..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Expenses List */}
        <Card>
          <CardHeader>
            <CardTitle>খরচের তালিকা</CardTitle>
            <CardDescription>সকল খরচের বিস্তারিত তথ্য</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredExpenses.map((expense) => {
                const typeInfo = getExpenseTypeInfo(expense.type);
                return (
                  <div
                    key={expense.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{typeInfo.icon}</div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {expense.description}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                            <span>📅 {formatDate(new Date(expense.date))}</span>
                            <span>👤 {expense.addedBy}</span>
                            <Badge className={typeInfo.color}>
                              {typeInfo.label}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900">
                          {formatCurrency(expense.totalAmount)}
                        </p>{" "}
                        <div className="flex space-x-2 mt-2">
                          <Button
                            size="sm"
                            variant="outline"
                            title="বিস্তারিত দেখুন"
                          >
                            <EyeIcon className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditExpense(expense)}
                            title="সম্পাদনা করুন"
                          >
                            <PencilIcon className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 hover:text-red-700"
                            onClick={() => handleDeleteExpense(expense)}
                            title="মুছে ফেলুন"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Items breakdown */}
                    <div className="bg-gray-50 rounded-lg p-3">
                      <h4 className="font-medium text-gray-700 mb-2">
                        পণ্যের বিস্তারিত:
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {expense.items.map((item, index) => (
                          <div
                            key={index}
                            className="flex justify-between items-center text-sm"
                          >
                            <span className="text-gray-600">
                              {item.name} ({item.quantity} {item.unit})
                            </span>
                            <span className="font-semibold">
                              {formatCurrency(item.total)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Expense Entry Modal */}
        {showExpenseEntry && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">নতুন খরচ যোগ করুন</h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowExpenseEntry(false)}
                >
                  <XMarkIcon className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="date">তারিখ</Label>
                    <Input
                      id="date"
                      type="date"
                      defaultValue={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                  <div>
                    <Label htmlFor="type">খরচের ধরন</Label>
                    <select
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={expenseType}
                      onChange={(e) => setExpenseType(e.target.value)}
                    >
                      <option value="bazaar">দৈনিক বাজার</option>
                      <option value="fixed">ফিক্সড খরচ</option>
                      <option value="special">বিশেষ খরচ</option>
                      <option value="maintenance">রক্ষণাবেক্ষণ</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="description">বিবরণ</Label>
                    <Input id="description" placeholder="খরচের বিবরণ লিখুন" />
                  </div>
                </div>

                {/* Product-wise Entry */}
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold">পণ্যের তালিকা</h3>
                    <Button size="sm" variant="outline">
                      <PlusIcon className="w-4 h-4 mr-2" />
                      নতুন পণ্য যোগ করুন
                    </Button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 px-2">পণ্যের নাম</th>
                          <th className="text-left py-2 px-2">পরিমাণ</th>
                          <th className="text-left py-2 px-2">একক</th>
                          <th className="text-left py-2 px-2">
                            দর (প্রতি একক)
                          </th>
                          <th className="text-left py-2 px-2">মোট</th>
                          <th className="text-left py-2 px-2">অ্যাকশন</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2 px-2">
                            <Input placeholder="চাল" />
                          </td>
                          <td className="py-2 px-2">
                            <Input
                              type="number"
                              placeholder="৫"
                              className="w-20"
                            />
                          </td>
                          <td className="py-2 px-2">
                            <select className="w-full p-2 border border-gray-300 rounded-md">
                              <option value="kg">কেজি</option>
                              <option value="piece">পিস</option>
                              <option value="liter">লিটার</option>
                              <option value="packet">প্যাকেট</option>
                            </select>
                          </td>
                          <td className="py-2 px-2">
                            <Input
                              type="number"
                              placeholder="৬০"
                              className="w-24"
                            />
                          </td>
                          <td className="py-2 px-2">
                            <span className="font-semibold">৳৩০০</span>
                          </td>
                          <td className="py-2 px-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-600"
                            >
                              <TrashIcon className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="flex justify-between items-center mt-4 pt-4 border-t">
                    <span className="font-semibold">মোট খরচ:</span>
                    <span className="text-2xl font-bold text-green-600">
                      ৳৩০০
                    </span>
                  </div>
                </div>

                {/* Receipt Upload */}
                <div>
                  <Label>রশিদ আপলোড (ঐচ্ছিক)</Label>
                  <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <PhotoIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">
                      ছবি আপলোড করতে ক্লিক করুন বা ড্র্যাগ করুন
                    </p>
                    <input type="file" className="hidden" accept="image/*" />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowExpenseEntry(false)}
                  >
                    বাতিল
                  </Button>
                  <Button className="bg-green-600 hover:bg-green-700">
                    সংরক্ষণ করুন
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Modals */}
      <ExpenseModal
        isOpen={expenseModalOpen}
        onClose={() => setExpenseModalOpen(false)}
        onSubmit={handleExpenseSubmit}
        expenseData={selectedExpense}
      />
      <DeleteConfirmation
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDeleteExpense}
        itemName={expenseToDelete?.description}
        itemType="খরচ এন্ট্রি"
      />
    </>
  );
}
