// src/app/expenses/page.js
"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@heroicons/react/24/outline";

import StatsCards from "@/components/dashboard/expenses/StatsCards";
import ExpenseFilters from "@/components/dashboard/expenses/ExpenseFilters";
import ExpenseList from "@/components/dashboard/expenses/ExpenseList";

// Import from constants
import {
  getExpenseCategories,
  initialMonthlyStats,
} from "@/lib/data/constants";

// Initial data - in a real app, this would likely come from an API
import { initialExpensesData } from "@/lib/data/mockData";
import ExpenseModal from "@/components/modals/ExpenseModal";
import DeleteConfirmationModal from "@/components/modals/DeleteConfirmationModal";
import ExpenseDetailsModal from "@/components/modals/ExpenseDetailsModal";

export default function ExpensesPage() {
  const [expenseModalOpen, setExpenseModalOpen] = useState(false);
  const [expenseDetailsModalOpen, setExpenseDetailsModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null); // For editing
  const [selectedExpenseForView, setSelectedExpenseForView] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expenses, setExpenses] = useState(initialExpensesData);

  // In a real app, monthlyStats would be derived from `expenses` or fetched.
  // For now, using the initial constant, but transactionCount is dynamic.
  const [monthlyStats, setMonthlyStats] = useState(initialMonthlyStats);

  const handleAddExpense = () => {
    setSelectedExpense(null); // Ensure it's for a new expense
    setExpenseModalOpen(true);
  };

  const handleEditExpense = (expense) => {
    setSelectedExpense(expense);
    setExpenseModalOpen(true);
  };

  const handleViewExpense = (expense) => {
    setSelectedExpenseForView(expense);
    setExpenseDetailsModalOpen(true);
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
        id: Date.now(), // Simple ID generation
        addedBy: "বর্তমান ব্যবহারকারী", // Replace with actual user data
      };
      setExpenses((prev) => [newExpense, ...prev]); // Add to the beginning of the list
    }
    // Note: You might want to recalculate monthlyStats here if it's derived
    setExpenseModalOpen(false);
    setSelectedExpense(null);
  };

  const confirmDeleteExpense = () => {
    if (expenseToDelete) {
      setExpenses((prev) =>
        prev.filter((expense) => expense.id !== expenseToDelete.id)
      );
      setDeleteModalOpen(false);
      setExpenseToDelete(null);
      // Note: You might want to recalculate monthlyStats here
    }
  };

  const expenseCategories = useMemo(
    () => getExpenseCategories(expenses),
    [expenses]
  );

  const filteredExpenses = useMemo(() => {
    return expenses.filter((expense) => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        expense.description.toLowerCase().includes(searchLower) ||
        expense.addedBy.toLowerCase().includes(searchLower) ||
        (expense.items &&
          expense.items.some((item) =>
            item.name.toLowerCase().includes(searchLower)
          ));

      const matchesCategory =
        selectedCategory === "all" || expense.type === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [expenses, searchTerm, selectedCategory]);

  // Update transaction count in stats dynamically
  // In a real app, all stats would be recalculated based on 'expenses'
  const currentMonthlyStats = {
    ...monthlyStats,
    transactionCount: expenses.length,
    // Ideally, totalExpense, bazaarExpense etc. would be recalculated here too.
    // For example:
    // totalExpense: expenses.reduce((sum, ex) => sum + ex.totalAmount, 0),
    // bazaarExpense: expenses.filter(ex => ex.type === 'bazaar').reduce((sum, ex) => sum + ex.totalAmount, 0),
  };

  return (
    <>
      <div className="space-y-6 p-4 md:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              বাজার ও খরচ ব্যবস্থাপনা
            </h1>
            <p className="text-gray-600">
              দৈনিক বাজার এবং সকল ধরনের খরচের হিসাব
            </p>
          </div>
          <Button
            className="bg-green-600 hover:bg-green-700 mt-4 sm:mt-0"
            onClick={handleAddExpense}
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            নতুন খরচ যোগ করুন
          </Button>
        </div>

        {/* Stats Cards */}
        <StatsCards
          monthlyStats={currentMonthlyStats}
          transactionCount={filteredExpenses.length}
        />

        {/* Filters and Search */}
        <ExpenseFilters
          expenseCategories={expenseCategories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        {/* Expenses List */}
        <ExpenseList
          expenses={filteredExpenses}
          onViewExpense={handleViewExpense}
          onEditExpense={handleEditExpense}
          onDeleteExpense={handleDeleteExpense}
        />
      </div>

      {/* Modals */}
      <ExpenseModal
        isOpen={expenseModalOpen}
        onClose={() => {
          setExpenseModalOpen(false);
          setSelectedExpense(null); // Clear selected expense on close
        }}
        onSubmit={handleExpenseSubmit}
        expenseData={selectedExpense} // Pass null for new, or expense object for edit
      />
      <ExpenseDetailsModal
        isOpen={expenseDetailsModalOpen}
        onClose={() => {
          setExpenseDetailsModalOpen(false);
          setSelectedExpenseForView(null);
        }}
        expenseData={selectedExpenseForView}
      />
      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDeleteExpense}
        itemName={expenseToDelete?.description}
        itemType="খরচ এন্ট্রি"
      />
    </>
  );
}
