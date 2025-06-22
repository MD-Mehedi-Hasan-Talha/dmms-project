"use client";

import WelcomeHeader from "@/components/dashboard_v2/WelcomeHeader";
import StatusGroup from "@/components/dashboard_v2/StatusGroup";
import MenuBoard from "@/components/dashboard_v2/MenuBoard";
import QuickAction from "@/components/dashboard_v2/QuickAction";
import NoticeBoard from "@/components/dashboard_v2/NoticeBoard";
import WeatherBoard from "@/components/dashboard_v2/WeatherBoard";
import RecentActivities from "@/components/dashboard_v2/RecentActivities";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <WelcomeHeader />
      {/* Stats Cards */}
      <StatusGroup />
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          <MenuBoard />
          {/* Recent Activities */}
          <RecentActivities />
        </div>
        {/* Right Column - 1/3 width */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <QuickAction />
          {/* Upcoming Tasks */}
          <NoticeBoard />
          {/* Weather Widget (Optional) */}
          <WeatherBoard />
        </div>
      </div>
    </div>
  );
}
