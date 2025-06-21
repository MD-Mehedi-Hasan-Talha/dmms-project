"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CalendarIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  EyeIcon,
  ScaleIcon,
} from "@heroicons/react/24/outline";
import { cn, formatCurrency } from "@/lib/utils";
import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import {
  downloadMarketIntelligenceReport,
  downloadDetailedMarketReport,
} from "@/lib/marketIntelligenceReportUtils";
import {
  supplierComparison,
  productComparison,
  marketIntelligence,
  budgetOptimization,
} from "@/lib/data-file";
import MarketIntelligenceHeader from "@/components/dashboard/market-intelligence/MarketIntelligenceHeader";
import QuickStats from "@/components/dashboard/market-intelligence/QuickStats";
import SupplierAnalysisTab from "@/components/dashboard/market-intelligence/SupplierAnalysisTab";
import ProductComparisonTab from "@/components/dashboard/market-intelligence/ProductComparisonTab";
import MarketIntelligenceTab from "@/components/dashboard/market-intelligence/MarketIntelligenceTab";
import BudgetOptimizationTab from "@/components/dashboard/market-intelligence/BudgetOptimizationTab";
import ForecastTab from "@/components/dashboard/market-intelligence/ForecastTab";

export default function AdvancedAnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("30");
  const [selectedProduct, setSelectedProduct] = useState("all");
  const [selectedSupplier, setSelectedSupplier] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = productComparison.filter(
    (product) =>
      selectedProduct === "all" || product.name.includes(selectedProduct)
  );

  const filteredSuppliers = supplierComparison.filter(
    (supplier) =>
      selectedSupplier === "all" || supplier.name.includes(selectedSupplier)
  );

  // Add report download handler
  const handleDownloadDetailedReport = () => {
    downloadDetailedMarketReport({
      supplierComparison,
      productComparison,
      marketIntelligence,
      budgetOptimization,
    });
  };

  const handleDownloadCSVReport = () => {
    downloadMarketIntelligenceReport(
      supplierComparison,
      productComparison,
      marketIntelligence,
      budgetOptimization
    );
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {/* Page Header */}
      <MarketIntelligenceHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleDownloadCSVReport={handleDownloadCSVReport}
        handleDownloadDetailedReport={handleDownloadDetailedReport}
      />

      {/* Quick Stats */}
      <QuickStats
        priceDropCount={5}
        bestSupplier={"কারওয়ান বাজার"}
        monitorCount={3}
        budgetOptimization={budgetOptimization}
      />

      {/* Advanced Analytics Tabs */}
      <Tabs defaultValue="suppliers" className="space-y-6">
        {/* Modified orginal code to make it responsive */}
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
          <TabsTrigger value="suppliers" className="text-xs md:text-sm">
            সাপ্লায়ার বিশ্লেষণ
          </TabsTrigger>
          <TabsTrigger value="products" className="text-xs md:text-sm">
            পণ্য তুলনা
          </TabsTrigger>
          <TabsTrigger value="intelligence" className="text-xs md:text-sm">
            বাজার বুদ্ধিমত্তা
          </TabsTrigger>
          <TabsTrigger value="optimization" className="text-xs md:text-sm">
            বাজেট অপটিমাইজেশন
          </TabsTrigger>
          <TabsTrigger value="forecast" className="text-xs md:text-sm">
            ভবিষ্যত পূর্বাভাস
          </TabsTrigger>
        </TabsList>

        {/* Supplier Analysis Tab */}
        <SupplierAnalysisTab filteredSuppliers={filteredSuppliers} />

        {/* Product Comparison Tab */}
        <ProductComparisonTab filteredProducts={filteredProducts} />

        {/* Market Intelligence Tab */}
        <MarketIntelligenceTab marketIntelligence={marketIntelligence} />

        {/* Budget Optimization Tab */}
        <BudgetOptimizationTab budgetOptimization={budgetOptimization} />

        {/* Forecast Tab */}
        <ForecastTab />
      </Tabs>
    </div>
  );
}
