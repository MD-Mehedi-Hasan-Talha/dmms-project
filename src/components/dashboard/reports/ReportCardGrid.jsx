import React from "react";
import { reportData, expenseRatio, profitMargin } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import {
  CurrencyDollarIcon,
  ShoppingCartIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { TrendingUpIcon } from "lucide-react";
import { formatCurrency, getBengaliNumber } from "@/lib/utils";

function ReportCardGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {/* Total Members Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <UserGroupIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">মোট সদস্য</p>
              <p className="text-2xl font-bold text-gray-900">
                {getBengaliNumber(reportData.monthly.totalMembers)}
              </p>
              <p className="text-xs text-gray-600">সক্রিয় সদস্য</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Total Revenue Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CurrencyDollarIcon className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">মোট আয়</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(reportData.monthly.totalRevenue)}
              </p>
              <p className="text-xs text-green-600">
                {reportData.monthly.collectionRate}% সংগ্রহ
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Total Expenses Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <ShoppingCartIcon className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">মোট খরচ</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(reportData.monthly.totalExpenses)}
              </p>
              <p className="text-xs text-red-600">{expenseRatio}% খরচের হার</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Net Profit Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <TrendingUpIcon className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">নিট লাভ</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(reportData.monthly.profit)}
              </p>
              <p className="text-xs text-purple-600">
                {profitMargin}% লাভের হার
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ReportCardGrid;
