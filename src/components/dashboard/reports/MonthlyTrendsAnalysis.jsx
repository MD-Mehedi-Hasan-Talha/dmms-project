import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUpIcon, TrendingDownIcon } from "lucide-react";

/**
 * MonthlyTrendsAnalysis Component
 *
 * Displays a table with month-wise analysis of meals, revenue, expenses, profit, profit rate,
 * and shows trend icons indicating whether profit increased or decreased compared to previous month.
 *
 * @param {Array} monthlyTrends - Array of monthly data objects containing:
 *                                month, meals, revenue, expenses, profit
 * @param {Function} getBengaliNumber - Converts numbers to Bengali numerals
 * @param {Function} formatCurrency - Formats numbers as currency strings
 */
const MonthlyTrendsAnalysis = ({
  monthlyTrends,
  getBengaliNumber,
  formatCurrency,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>মাসিক ট্রেন্ড বিশ্লেষণ</CardTitle>
        <CardDescription>গত কয়েক মাসের তুলনামূলক তথ্য</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          {/* Table showing monthly trend data */}
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  মাস
                </th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700">
                  মোট মিল
                </th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">
                  আয়
                </th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">
                  খরচ
                </th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">
                  লাভ
                </th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700">
                  লাভের হার
                </th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700">
                  ট্রেন্ড
                </th>
              </tr>
            </thead>
            <tbody>
              {monthlyTrends.map((month, index) => {
                // Calculate profit rate as a percentage of revenue
                const profitRate = Math.round(
                  (month.profit / month.revenue) * 100
                );

                // Previous month's profit for trend comparison
                const prevProfit =
                  index > 0 ? monthlyTrends[index - 1].profit : month.profit;

                // Determine if profit increased compared to previous month
                const isIncreasing = month.profit > prevProfit;

                return (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    {/* Month name */}
                    <td className="py-4 px-4 font-medium">{month.month}</td>

                    {/* Meals count in Bengali numerals */}
                    <td className="py-4 px-4 text-center font-medium">
                      {getBengaliNumber(month.meals)}
                    </td>

                    {/* Revenue formatted as currency */}
                    <td className="py-4 px-4 text-right font-medium">
                      {formatCurrency(month.revenue)}
                    </td>

                    {/* Expenses formatted as currency */}
                    <td className="py-4 px-4 text-right font-medium">
                      {formatCurrency(month.expenses)}
                    </td>

                    {/* Profit formatted as currency; green if positive, red if negative */}
                    <td className="py-4 px-4 text-right font-bold">
                      <span
                        className={
                          month.profit > 0 ? "text-green-600" : "text-red-600"
                        }
                      >
                        {formatCurrency(month.profit)}
                      </span>
                    </td>

                    {/* Profit rate badge; green if > 10%, yellow otherwise */}
                    <td className="py-4 px-4 text-center">
                      <Badge
                        className={
                          profitRate > 10
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {getBengaliNumber(profitRate)}%
                      </Badge>
                    </td>

                    {/* Trend icon: up if profit increased, down if decreased */}
                    <td className="py-4 px-4 text-center">
                      {index > 0 && (
                        <div className="flex justify-center">
                          {isIncreasing ? (
                            <TrendingUpIcon className="w-5 h-5 text-green-600" />
                          ) : (
                            <TrendingDownIcon className="w-5 h-5 text-red-600" />
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default MonthlyTrendsAnalysis;
