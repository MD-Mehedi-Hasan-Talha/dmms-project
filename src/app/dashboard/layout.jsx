"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  CheckIcon,
  ClockIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "নতুন মিল এন্ট্রি যোগ করা হয়েছে",
      unread: true,
      time: "৫ মিনিট আগে",
      type: "info",
      icon: ChartBarIcon,
    },
    {
      id: 2,
      message: "রহিম সাহেবের পেমেন্ট পেন্ডিং",
      unread: true,
      time: "১০ মিনিট আগে",
      type: "warning",
      icon: ExclamationTriangleIcon,
    },
    {
      id: 3,
      message: "মাসিক রিপোর্ট প্রস্তুত হয়েছে",
      unread: false,
      time: "২ ঘণ্টা আগে",
      type: "success",
      icon: DocumentTextIcon,
    },
    {
      id: 4,
      message: "আগামীকাল বাজার করার পালা",
      unread: true,
      time: "৩ ঘণ্টা আগে",
      type: "reminder",
      icon: ClockIcon,
    },
    {
      id: 5,
      message: "নতুন সদস্য যোগদান করেছেন",
      unread: false,
      time: "৫ ঘণ্টা আগে",
      type: "info",
      icon: UsersIcon,
    },
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

  // Mark notification as read
  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, unread: false } : notif
      )
    );
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notif) => ({ ...notif, unread: false }))
    );
  };

  // Clear all notifications
  const clearAllNotifications = () => {
    setNotifications([]);
  };

  // Get notification type styling
  const getNotificationStyle = (type) => {
    switch (type) {
      case "warning":
        return "bg-yellow-50 border-l-4 border-yellow-400";
      case "success":
        return "bg-green-50 border-l-4 border-green-400";
      case "reminder":
        return "bg-blue-50 border-l-4 border-blue-400";
      default:
        return "bg-gray-50 border-l-4 border-gray-400";
    }
  };

  const getNotificationIconColor = (type) => {
    switch (type) {
      case "warning":
        return "text-yellow-600";
      case "success":
        return "text-green-600";
      case "reminder":
        return "text-blue-600";
      default:
        return "text-gray-600";
    }
  };

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
              {/* Notifications Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="relative">
                    <BellIcon className="w-5 h-5" />
                    {unreadCount > 0 && (
                      <Badge className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center bg-red-500 text-white text-xs">
                        {unreadCount}
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-80 max-h-96 overflow-y-auto"
                  align="end"
                >
                  <DropdownMenuLabel className="flex items-center justify-between">
                    <span>নোটিফিকেশন</span>
                    {unreadCount > 0 && (
                      <Badge className="bg-red-500 text-white text-xs">
                        {unreadCount} নতুন
                      </Badge>
                    )}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-gray-500">
                      <BellIcon className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                      <p className="text-sm">কোন নোটিফিকেশন নেই</p>
                    </div>
                  ) : (
                    <>
                      {/* Action Buttons */}
                      {unreadCount > 0 && (
                        <div className="flex justify-between p-2 border-b">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={markAllAsRead}
                            className="text-xs text-blue-600 hover:text-blue-700"
                          >
                            সব পড়া হয়েছে
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={clearAllNotifications}
                            className="text-xs text-red-600 hover:text-red-700"
                          >
                            সব মুছুন
                          </Button>
                        </div>
                      )}

                      {/* Notifications List */}
                      <div className="max-h-64 overflow-y-auto">
                        {notifications.map((notification) => {
                          const IconComponent = notification.icon;
                          return (
                            <DropdownMenuItem
                              key={notification.id}
                              className="cursor-pointer p-0"
                              onClick={() => markAsRead(notification.id)}
                            >
                              <div
                                className={`w-full p-3 transition-colors hover:bg-gray-50 ${getNotificationStyle(
                                  notification.type
                                )}`}
                              >
                                <div className="flex items-start space-x-3">
                                  <div
                                    className={`flex-shrink-0 ${getNotificationIconColor(
                                      notification.type
                                    )}`}
                                  >
                                    <IconComponent className="w-5 h-5" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                      <p
                                        className={`text-sm ${
                                          notification.unread
                                            ? "font-semibold text-gray-900"
                                            : "text-gray-700"
                                        }`}
                                      >
                                        {notification.message}
                                      </p>
                                      {notification.unread && (
                                        <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 ml-2"></div>
                                      )}
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">
                                      {notification.time}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </DropdownMenuItem>
                          );
                        })}
                      </div>

                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard/notices" className="w-full">
                          <div className="flex items-center justify-center p-2 text-sm text-blue-600 hover:text-blue-700">
                            সব নোটিফিকেশন দেখুন
                          </div>
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <UserCircleIcon className="w-5 h-5 mr-2" />
                    প্রোফাইল
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>মাসুদ আহমেদ</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/profile">
                      <UserCircleIcon className="w-4 h-4 mr-2" />
                      প্রোফাইল দেখুন
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/settings">
                      <CogIcon className="w-4 h-4 mr-2" />
                      সেটিংস
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">
                    <ArrowRightOnRectangleIcon className="w-4 h-4 mr-2" />
                    লগআউট
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
