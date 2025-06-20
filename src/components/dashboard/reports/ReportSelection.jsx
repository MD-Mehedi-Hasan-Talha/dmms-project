"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { reportData, reportTypes } from "@/lib/data-file";
import {
  generateMealAnalytics,
  generateMonthlyStatement,
  generatePaymentReport,
} from "@/lib/reportsUtils";
import { getMonthName } from "@/lib/utils";
import { EyeIcon } from "@heroicons/react/24/outline";
import { useMemo, useState } from "react";

function ReportSelection() {
  const [selectedReport, setSelectedReport] = useState("monthly");
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Generate last 5 years dynamically
  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 5 }, (_, i) => currentYear - i);
  }, []);

  const generateReport = () => {
    console.log("Generating report:", {
      selectedReport,
      selectedMonth,
      selectedYear,
    });

    switch (selectedReport) {
      case "monthly":
      case "financial":
      case "expenses":
        generateMonthlyStatement(reportData, selectedMonth, selectedYear);
        break;
      case "meals":
        generateMealAnalytics(reportData, selectedMonth, selectedYear);
        break;
      case "members":
        generatePaymentReport(reportData, selectedMonth, selectedYear);
        break;
      default:
        generateMonthlyStatement(reportData, selectedMonth, selectedYear);
    }
  };

  // Helper: convert digits to Bengali numerals
  const toBengaliDigits = (num) =>
    num.toString().replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[parseInt(d)]);

  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* রিপোর্টের ধরন */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              রিপোর্টের ধরন
            </label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              value={selectedReport}
              onChange={(e) => setSelectedReport(e.target.value)}
            >
              {Object.entries(reportTypes).map(([key, type]) => (
                <option key={key} value={key}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>

          {/* মাস */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              মাস
            </label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
            >
              {[...Array(12)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {getMonthName(i + 1)}
                </option>
              ))}
            </select>
          </div>

          {/* বছর */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              বছর
            </label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {toBengaliDigits(year)}
                </option>
              ))}
            </select>
          </div>

          {/* রিপোর্ট দেখুন */}
          <div className="flex items-end">
            <Button
              onClick={generateReport}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              aria-label="রিপোর্ট দেখুন"
            >
              <EyeIcon className="w-4 h-4 mr-2" />
              রিপোর্ট দেখুন
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ReportSelection;
