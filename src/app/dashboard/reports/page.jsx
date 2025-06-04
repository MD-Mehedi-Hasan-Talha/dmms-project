"use client";
import { useState } from "react";

// Utility Functions
import { formatCurrency, getMonthName, getBengaliNumber } from "@/lib/utils";

// Report Generators
import {
  generateMonthlyStatement,
  generateMealAnalytics,
  generatePaymentReport,
} from "@/lib/reportsUtils";

// Mocked Report Data
import { reportData, monthlyTrends, profitMargin } from "@/lib/data";

// Report Components
import ReportHeader from "@/components/dashboard/reports/ReportHeader";
import ReportSelection from "@/components/dashboard/reports/ReportSelection";
import ReportCardGrid from "@/components/dashboard/reports/ReportCardGrid";
import FinancialSummary from "@/components/dashboard/reports/FinancialSummary";
import MonthlyTrendsAnalysis from "@/components/dashboard/reports/MonthlyTrendsAnalysis";
import MemberPaymentStatus from "@/components/dashboard/reports/MemberPaymentStatus";
import QuickReports from "@/components/dashboard/reports/QuickReports";

export default function ReportsPage() {
  // @state Current selected month and year for filtering report data
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  return (
    <div className="space-y-6">
      {/* @section Header */}
      {/* @desc Displays the page title and intro */}
      <ReportHeader />

      {/* @section Filter Controls */}
      {/* @desc Allows user to pick a specific month and year */}
      <ReportSelection
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
      />

      {/* @section Key Report Metrics */}
      {/* @desc Shows quick summary report cards like total meals, expenses etc */}
      <ReportCardGrid />

      {/* @section Financial Summary */}
      {/* @desc Provides net cost, income, balance and profit margin */}
      <FinancialSummary
        reportData={reportData}
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        getMonthName={getMonthName}
        formatCurrency={formatCurrency}
        profitMargin={profitMargin}
      />

      {/* @section Monthly Trends */}
      {/* @desc Visual or tabular trend report across months */}
      <MonthlyTrendsAnalysis
        monthlyTrends={monthlyTrends}
        getBengaliNumber={getBengaliNumber}
        formatCurrency={formatCurrency}
      />

      {/* @section Member Payment Table */}
      {/* @desc Shows each member's meals, total bill, paid and due with status badge */}
      <MemberPaymentStatus
        memberStats={reportData.memberStats}
        getBengaliNumber={getBengaliNumber}
        formatCurrency={formatCurrency}
      />

      {/* @section Quick PDF Reports */}
      {/* @desc Allows quick download/preview of key reports using buttons */}
      <QuickReports />
    </div>
  );
}
