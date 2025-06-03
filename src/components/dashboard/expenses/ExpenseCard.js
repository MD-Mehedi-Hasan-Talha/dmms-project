// src/components/expenses/ExpenseCard.js
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatDate } from "@/lib/utils";
import { getExpenseTypeInfo } from "@/lib/data/constants";
import { PencilIcon, TrashIcon, EyeIcon } from "@heroicons/react/24/outline";

export default function ExpenseCard({ expense, onView, onEdit, onDelete }) {
  const typeInfo = getExpenseTypeInfo(expense.type);

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center space-x-3">
          <div className="text-2xl">{typeInfo.icon}</div>
          <div>
            <h3 className="font-semibold text-gray-900">
              {expense.description}
            </h3>
            <div className="flex flex-wrap items-center space-x-4 text-sm text-gray-600 mt-1">
              <span>📅 {formatDate(new Date(expense.date))}</span>
              <span>👤 {expense.addedBy}</span>
              <Badge className={`${typeInfo.color} whitespace-nowrap`}>
                {typeInfo.label}
              </Badge>
            </div>
          </div>
        </div>
        <div className="text-right shrink-0 ml-2">
          <p className="text-2xl font-bold text-gray-900">
            {formatCurrency(expense.totalAmount)}
          </p>
          <div className="flex space-x-2 mt-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onView(expense)}
              title="বিস্তারিত দেখুন"
            >
              <EyeIcon className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onEdit(expense)}
              title="সম্পাদনা করুন"
            >
              <PencilIcon className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={() => onDelete(expense)}
              title="মুছে ফেলুন"
            >
              <TrashIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {expense.items && expense.items.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-3 mt-3">
          <h4 className="font-medium text-gray-700 mb-2">পণ্যের বিস্তারিত:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
            {expense.items.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center text-sm"
              >
                <span className="text-gray-600">
                  {item.name} ({item.quantity} {item.unit})
                </span>
                <span className="font-semibold text-gray-800">
                  {formatCurrency(item.total)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
