// src/components/expenses/StatsCards.js
"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  CurrencyDollarIcon,
  ShoppingCartIcon,
  DocumentTextIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";
import { formatCurrency } from "@/lib/utils";

export default function StatsCards({ monthlyStats, transactionCount }) {
  return (
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
              <p className="text-sm font-medium text-gray-600">ফিক্সড খরচ</p>
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
              {/* Using DocumentTextIcon as a placeholder, consider a more specific icon for count */}
              <DocumentTextIcon className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">মোট এন্ট্রি</p>
              <p className="text-2xl font-bold text-gray-900">
                {transactionCount}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
