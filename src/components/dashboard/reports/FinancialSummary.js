import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; // @component - Reusable card UI elements

import { categoryNames } from "@/lib/data-file"; // @data - Category label mapping

/**
 * @component FinancialSummary
 * @desc Displays financial overview for the selected month including revenue, expenses,
 *        net profit and visual percentage breakdown of expenses by category.
 *
 * @props reportData - Full report object containing monthly, revenue, and expense details
 * @props selectedMonth - Active month (numeric, 1-12)
 * @props selectedYear - Active year (e.g. 2024)
 * @props getMonthName - Utility function to convert month number to string name
 * @props formatCurrency - Utility to format numeric values into currency strings
 * @props profitMargin - Calculated profit margin (in percentage)
 */

const FinancialSummary = ({
  reportData,
  selectedMonth,
  selectedYear,
  getMonthName,
  formatCurrency,
  profitMargin,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* @section - Monthly Financial Overview Card */}
      <Card>
        <CardHeader>
          <CardTitle>আর্থিক সারসংক্ষেপ</CardTitle>
          <CardDescription>
            {/* @desc - Shows current month and year in Bengali */}
            {getMonthName(selectedMonth)} {selectedYear} এর আর্থিক অবস্থা
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* @metric - Total Revenue */}
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <span className="font-medium text-green-800">মোট আয়</span>
              <span className="font-bold text-green-900">
                {formatCurrency(reportData.monthly.totalRevenue)}
              </span>
            </div>

            {/* @metric - Total Expenses */}
            <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
              <span className="font-medium text-red-800">মোট খরচ</span>
              <span className="font-bold text-red-900">
                {formatCurrency(reportData.monthly.totalExpenses)}
              </span>
            </div>

            {/* @metric - Net Balance / Profit */}
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <span className="font-medium text-blue-800">নিট ব্যালেন্স</span>
              <span
                className={`font-bold ${
                  reportData.monthly.profit > 0
                    ? "text-green-900"
                    : "text-red-900"
                }`}
              >
                {formatCurrency(reportData.monthly.profit)}
              </span>
            </div>

            {/* @visual - Profit Margin Progress Bar */}
            <div className="pt-2">
              <div className="text-sm text-gray-600 mb-2">
                লাভের হার: {profitMargin}%
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full"
                  style={{
                    width: `${Math.max(0, Math.min(profitMargin, 100))}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* @section - Expense Breakdown by Category */}
      <Card>
        <CardHeader>
          <CardTitle>খরচের বিভাজন</CardTitle>
          <CardDescription>ক্যাটেগরি অনুসারে খরচের বিতরণ</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {/* @loop - Map over each expense category and show progress bar */}
            {Object.entries(reportData.expenses).map(([category, amount]) => {
              const percentage = Math.round(
                (amount / reportData.monthly.totalExpenses) * 100
              );

              return (
                <div
                  key={category}
                  className="flex items-center justify-between"
                >
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">
                        {categoryNames[category] || category}
                      </span>
                      <span className="text-sm text-gray-600">
                        {percentage}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                  {/* @amount - Display individual category expense */}
                  <span className="ml-4 font-bold text-gray-900">
                    {formatCurrency(amount)}
                  </span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialSummary;
