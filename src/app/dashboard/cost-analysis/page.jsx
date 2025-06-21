"use client";
import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/dashboard/cost-analysis/Header";
import {
  costBreakdown,
  costMetrics,
  priceAlerts,
  priceMonitoringData,
} from "@/lib/data-file";
import RealTimeAlerts from "@/components/dashboard/cost-analysis/RealTimeAlerts";
import QuickStats from "@/components/dashboard/cost-analysis/QuickStats";
import PriceMonitoringTab from "@/components/dashboard/cost-analysis/PriceMonitoringTab";
import CostBreakdownTab from "@/components/dashboard/cost-analysis/CostBreakdownTab";
import EffiencyAnalysisTab from "@/components/dashboard/cost-analysis/EffiencyAnalysisTab";
import ForcastingTab from "@/components/dashboard/cost-analysis/ForcastingTab";

export default function CostAnalysisPage() {
  const [selectedTimeRange, setSelectedTimeRange] = useState("7d");
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [mounted, setMounted] = useState(false); // Real-time price monitoring data
  const [priceMonitoring, setPriceMonitoring] = useState(priceMonitoringData);

  // Initialize lastUpdate on client side to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
    setLastUpdate(new Date());
  }, []); // Auto refresh simulation
  useEffect(() => {
    if (!autoRefresh || !mounted) return;

    const interval = setInterval(() => {
      setLastUpdate(new Date());
      // Simulate price updates
      setPriceMonitoring((prev) =>
        prev.map((item) => ({
          ...item,
          currentPrice: item.currentPrice + (Math.random() - 0.5) * 2,
          change24h: item.change24h + (Math.random() - 0.5) * 1,
        }))
      );
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [autoRefresh, mounted]);

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {/* Page Header */}
      <Header
        mounted={mounted}
        lastUpdate={lastUpdate}
        autoRefresh={autoRefresh}
        setAutoRefresh={setAutoRefresh}
        selectedTimeRange={selectedTimeRange}
        setSelectedTimeRange={setSelectedTimeRange}
      />

      {/* Real-time Alerts */}
      {priceAlerts.length > 0 && <RealTimeAlerts alerts={priceAlerts} />}

      {/* Quick Stats */}
      <QuickStats costBreakdown={costBreakdown} costMetrics={costMetrics} />

      {/* Main Content Tabs */}
      <Tabs defaultValue="monitoring" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="monitoring">দাম মনিটরিং</TabsTrigger>
          <TabsTrigger value="breakdown">খরচ ভাঙ্গন</TabsTrigger>
          <TabsTrigger value="efficiency">দক্ষতা বিশ্লেষণ</TabsTrigger>
          <TabsTrigger value="forecasting">পূর্বাভাস</TabsTrigger>
        </TabsList>

        {/* Price Monitoring Tab */}
        <PriceMonitoringTab priceMonitoring={priceMonitoring} />

        {/* Cost Breakdown Tab */}
        <CostBreakdownTab costBreakdown={costBreakdown} />

        {/* Efficiency Analysis Tab */}
        <EffiencyAnalysisTab costMetrics={costMetrics} />

        {/* Forecasting Tab */}
        <ForcastingTab />
      </Tabs>
    </div>
  );
}
