// src/components/expenses/ExpenseList.js
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ExpenseCard from "./ExpenseCard";

export default function ExpenseList({
  expenses,
  onViewExpense,
  onEditExpense,
  onDeleteExpense,
}) {
  if (!expenses || expenses.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>খরচের তালিকা</CardTitle>
          <CardDescription>কোনো খরচ পাওয়া যায়নি।</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-500">
            অনুগ্রহ করে নতুন খরচ যোগ করুন অথবা আপনার ফিল্টার পরিবর্তন করুন।
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>খরচের তালিকা</CardTitle>
        <CardDescription>সকল খরচের বিস্তারিত তথ্য</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {expenses.map((expense) => (
            <ExpenseCard
              key={expense.id}
              expense={expense}
              onView={onViewExpense}
              onEdit={onEditExpense}
              onDelete={onDeleteExpense}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
