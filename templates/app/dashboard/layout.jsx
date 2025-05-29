"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  HomeIcon,
  UsersIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  DocumentTextIcon,
  CogIcon,
  BellIcon,
  Bars3Icon,
  XMarkIcon,
  ArrowRightOnRectangleIcon,
  UserCircleIcon,
  CalendarDaysIcon,
  ShoppingCartIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [notifications] = useState([
    { id: 1, message: "নতুন মিল এন্ট্রি", unread: true },
    { id: 2, message: "পেমেন্ট পেন্ডিং", unread: true },
    { id: 3, message: "মাসিক রিপোর্ট প্রস্তুত", unread: false },
  ]);

  const navigation = [
    { name: "ড্যাশবোর্ড", href: "/dashboard", icon: HomeIcon },
    {
      name: "ড্যাশবোর্ড-v2",
      href: "/dashboard/dashboard-v2",
      icon: HomeIcon,
    },
    {
      name: "সদস্যবৃন্দ",
      href: "/dashboard/members",
      icon: UsersIcon,
    },
    {
      name: "মিল ব্যবস্থাপনা",
      href: "/dashboard/meals",
      icon: ChartBarIcon,
    },
    {
      name: "আজকের মেনু",
      href: "/dashboard/menu",
      icon: DocumentTextIcon,
    },
    {
      name: "বাজার ও খরচ",
      href: "/dashboard/expenses",
      icon: ShoppingCartIcon,
    },
    {
      name: "বিল ও পেমেন্ট",
      href: "/dashboard/payments",
      icon: CurrencyDollarIcon,
    },
    {
      name: "নোটিশ বোর্ড",
      href: "/dashboard/notices",
      icon: BellIcon,
    },
    {
      name: "ফিডব্যাক",
      href: "/dashboard/feedback",
      icon: DocumentTextIcon,
    },
    {
      name: "অ্যানালিটিক্স",
      href: "/dashboard/analytics",
      icon: ChartBarIcon,
    },
    {
      name: "মার্কেট ইন্টেলিজেন্স",
      href: "/dashboard/market-intelligence",
      icon: ChartBarIcon,
    },
    {
      name: "কস্ট অ্যানালাইসিস",
      href: "/dashboard/cost-analysis",
      icon: ChartBarIcon,
    },
    {
      name: "রিপোর্ট",
      href: "/dashboard/reports",
      icon: DocumentTextIcon,
    },
    {
      name: "ক্যালেন্ডার",
      href: "/dashboard/calendar",
      icon: CalendarDaysIcon,
    },
    {
      name: "প্রোফাইল",
      href: "/dashboard/profile",
      icon: UserCircleIcon,
    },
    {
      name: "সেটিংস",
      href: "/dashboard/settings",
      icon: CogIcon,
    },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
                fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
                lg:translate-x-0 lg:static lg:inset-0
                ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
            `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <HomeIcon className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">
                মেস ম্যানেজার
              </span>
            </div>
            <button
              className="lg:hidden p-1 rounded-md hover:bg-gray-100"
              onClick={() => setSidebarOpen(false)}
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          {/* User Info */}
          <div className="p-4 border-b bg-green-50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                <UserCircleIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  মাসুদ আহমেদ
                </p>
                <p className="text-xs text-gray-600">গ্রীন ভ্যালি মেস</p>
                <Badge className="mt-1 bg-green-100 text-green-800 text-xs">
                  অ্যাডমিন
                </Badge>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                                        flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors
                                        ${
                                          isActive
                                            ? "bg-green-100 text-green-700 border-r-2 border-green-600"
                                            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                        }
                                    `}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t">
            <Button
              variant="outline"
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <ArrowRightOnRectangleIcon className="w-5 h-5 mr-3" />
              লগআউট
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                className="lg:hidden p-2 rounded-md hover:bg-gray-100"
                onClick={() => setSidebarOpen(true)}
              >
                <Bars3Icon className="w-6 h-6" />
              </button>
              <h1 className="text-xl font-semibold text-gray-900">
                ড্যাশবোর্ড
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <div className="relative">
                <Button variant="outline" size="sm" className="relative">
                  <BellIcon className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center bg-red-500 text-white text-xs">
                      {unreadCount}
                    </Badge>
                  )}
                </Button>
              </div>
              {/* Quick Stats */}
              <div className="hidden md:flex items-center space-x-4 text-sm">
                <div className="text-center">
                  <div className="font-semibold text-green-600">৳150</div>
                  <div className="text-gray-500">মিল রেট</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-blue-600">28</div>
                  <div className="text-gray-500">আজকের মিল</div>
                </div>
              </div>
              {/* Profile Dropdown */}
              <Link href="/dashboard/profile">
                <Button variant="outline" size="sm">
                  <UserCircleIcon className="w-5 h-5 mr-2" />
                  প্রোফাইল
                </Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
