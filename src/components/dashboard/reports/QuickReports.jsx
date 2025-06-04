import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DocumentTextIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";

/**
 * QuickReports Component
 *
 * Renders three quick action buttons for generating reports:
 * - Monthly Statement
 * - Meal Analytics
 * - Payment Report
 *
 * @param {function} handleMonthlyStatement - Callback when Monthly Statement button is clicked
 * @param {function} handleMealAnalytics - Callback when Meal Analytics button is clicked
 * @param {function} handlePaymentReport - Callback when Payment Report button is clicked
 */
const QuickReports = () => {
  // @section Report Generating Handlers
  // @desc These trigger PDF or data generation based on current selections
  const handleMonthlyStatement = () => {
    generateMonthlyStatement(reportData, selectedMonth, selectedYear);
  };

  const handleMealAnalytics = () => {
    generateMealAnalytics(reportData, selectedMonth, selectedYear);
  };

  const handlePaymentReport = () => {
    generatePaymentReport(reportData, selectedMonth, selectedYear);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>দ্রুত রিপোর্ট</CardTitle>
        <CardDescription>
          প্রয়োজনীয় রিপোর্ট দ্রুত জেনারেট করুন
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Grid layout for buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Monthly Statement button */}
          <Button
            variant="outline"
            className="h-16 flex-col"
            onClick={handleMonthlyStatement}
            aria-label="মাসিক স্টেটমেন্ট জেনারেট করুন"
          >
            <DocumentTextIcon className="w-6 h-6 mb-2" />
            মাসিক স্টেটমেন্ট
          </Button>

          {/* Meal Analytics button */}
          <Button
            variant="outline"
            className="h-16 flex-col"
            onClick={handleMealAnalytics}
            aria-label="মিল অ্যানালিটিক্স দেখুন"
          >
            <ChartBarIcon className="w-6 h-6 mb-2" />
            মিল অ্যানালিটিক্স
          </Button>

          {/* Payment Report button */}
          <Button
            variant="outline"
            className="h-16 flex-col"
            onClick={handlePaymentReport}
            aria-label="পেমেন্ট রিপোর্ট দেখুন"
          >
            <CurrencyDollarIcon className="w-6 h-6 mb-2" />
            পেমেন্ট রিপোর্ট
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickReports;
