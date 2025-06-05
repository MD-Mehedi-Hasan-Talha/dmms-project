import React from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowDownTrayIcon,
  PrinterIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";

export default function ReportHeader({
  printCurrentReport,
  shareReport,
  downloadCSVReport,
  reportData,
  selectedMonth,
  selectedYear,
}) {
  const handlePrint = () => {
    printCurrentReport();
  };
  const handleShare = () => {
    shareReport(reportData, selectedMonth, selectedYear);
  };
  const handleDownload = () => {
    downloadCSVReport(reportData, selectedMonth, selectedYear);
  };

  return (
    <div className="flex flex-col md:flex-row md:justify-between justify-between md:items-center space-y-4 md:space-y-0">
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">
          রিপোর্ট ও অ্যানালিটিক্স
        </h1>
        <p className="text-gray-600 text-sm md:text-base">
          মেস ব্যবস্থাপনার বিস্তারিত প্রতিবেদন
        </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:space-x-3 space-y-3 sm:space-y-0">
        <Button
          variant="outline"
          onClick={handlePrint}
          aria-label="প্রিন্ট করুন"
        >
          <PrinterIcon className="w-4 h-4 mr-2" />
          প্রিন্ট করুন
        </Button>
        <Button
          variant="outline"
          onClick={handleShare}
          aria-label="শেয়ার করুন"
        >
          <ShareIcon className="w-4 h-4 mr-2" />
          শেয়ার করুন
        </Button>
        <Button
          onClick={handleDownload}
          className="bg-green-600 hover:bg-green-700 text-white"
          aria-label="ডাউনলোড"
        >
          <ArrowDownTrayIcon className="w-4 h-4 mr-2" />
          ডাউনলোড
        </Button>
      </div>
    </div>
  );
}
