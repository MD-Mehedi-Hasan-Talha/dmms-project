"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CalendarIcon,
  ClockIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  PlusIcon,
  BellIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { cn, getBengaliDate, formatCurrency } from "@/lib/utils";


const MONTHS = [
  "জানুয়ারি",
  "ফেব্রুয়ারি",
  "মার্চ",
  "এপ্রিল",
  "মে",
  "জুন",
  "জুলাই",
  "আগস্ট",
  "সেপ্টেম্বর",
  "অক্টোবর",
  "নভেম্বর",
  "ডিসেম্বর",
];

const DAYS = ["রবি", "সোম", "মঙ্গল", "বুধ", "বৃহ", "শুক্র", "শনি"];

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState("month"); // month, week, day

  // Mock events data
  const events = [
    {
      id: 1,
      title: "মাসিক বিল জেনারেশন",
      date: "2024-01-30",
      time: "10:00",
      type: "billing",
      description: "জানুয়ারি মাসের সকল বিল প্রস্তুত করা হবে",
      status: "upcoming",
    },
    {
      id: 2,
      title: "সাপ্তাহিক মার্কেট",
      date: "2024-01-28",
      time: "09:00",
      type: "market",
      description: "সাপ্তাহিক বাজার করার দিন",
      status: "completed",
    },
    {
      id: 3,
      title: "মেস মিটিং",
      date: "2024-01-25",
      time: "18:00",
      type: "meeting",
      description: "মাসিক মেস সদস্যদের মিটিং",
      status: "completed",
    },
    {
      id: 4,
      title: "পেমেন্ট ডেডলাইন",
      date: "2024-02-05",
      time: "23:59",
      type: "payment",
      description: "জানুয়ারি মাসের বিল পরিশোধের শেষ তারিখ",
      status: "upcoming",
    },
    {
      id: 5,
      title: "নতুন সদস্য যোগদান",
      date: "2024-01-27",
      time: "14:00",
      type: "member",
      description: "রহিম সাহেব মেসে যোগদান করবেন",
      status: "completed",
    },
  ];

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    const current = new Date(startDate);

    for (let i = 0; i < 42; i++) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    return days;
  };

  const getDayEvents = (date) => {
    const dateStr = date.toISOString().split("T")[0];
    return events.filter((event) => event.date === dateStr);
  };

  const getEventTypeIcon = (type) => {
    switch (type) {
      case "billing":
        return <CurrencyDollarIcon className="w-4 h-4" />;
      case "market":
        return <UserGroupIcon className="w-4 h-4" />;
      case "meeting":
        return <UserGroupIcon className="w-4 h-4" />;
      case "payment":
        return <CurrencyDollarIcon className="w-4 h-4" />;
      case "member":
        return <UserGroupIcon className="w-4 h-4" />;
      default:
        return <CalendarIcon className="w-4 h-4" />;
    }
  };

  const getEventTypeColor = (type, status) => {
    const baseColors = {
      billing: "bg-blue-100 text-blue-700 border-blue-200",
      market: "bg-green-100 text-green-700 border-green-200",
      meeting: "bg-purple-100 text-purple-700 border-purple-200",
      payment: "bg-red-100 text-red-700 border-red-200",
      member: "bg-yellow-100 text-yellow-700 border-yellow-200",
    };

    if (status === "completed") {
      return "bg-gray-100 text-gray-600 border-gray-200 opacity-75";
    }

    return baseColors[type] || "bg-gray-100 text-gray-700 border-gray-200";
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(today);
  };

  const calendarDays = generateCalendarDays();
  const selectedDateEvents = getDayEvents(selectedDate);
  const today = new Date();

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">ক্যালেন্ডার</h1>
          <p className="text-gray-600 mt-1">
            মেস কার্যক্রম এবং ইভেন্ট ট্র্যাকিং
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={goToToday}>
            আজ
          </Button>
          <Button className="bg-green-600 hover:bg-green-700">
            <PlusIcon className="w-4 h-4 mr-2" />
            নতুন ইভেন্ট
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar Main View */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => navigateMonth(-1)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <ChevronLeftIcon className="w-5 h-5" />
                  </button>
                  <h2 className="text-xl font-semibold">
                    {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
                  </h2>
                  <button
                    onClick={() => navigateMonth(1)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <ChevronRightIcon className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant={viewMode === "month" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("month")}
                  >
                    মাস
                  </Button>
                  <Button
                    variant={viewMode === "week" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("week")}
                  >
                    সপ্তাহ
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1 mb-4">
                {DAYS.map((day) => (
                  <div
                    key={day}
                    className="p-2 text-center text-sm font-medium text-gray-500 bg-gray-50"
                  >
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((day, index) => {
                  const isCurrentMonth =
                    day.getMonth() === currentDate.getMonth();
                  const isToday = day.toDateString() === today.toDateString();
                  const isSelected =
                    day.toDateString() === selectedDate.toDateString();
                  const dayEvents = getDayEvents(day);

                  return (
                    <div
                      key={index}
                      onClick={() => setSelectedDate(day)}
                      className={cn(
                        "min-h-[80px] p-2 border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors",
                        !isCurrentMonth && "bg-gray-50 text-gray-400",
                        isToday && "bg-blue-50 border-blue-300",
                        isSelected && "bg-green-50 border-green-300"
                      )}
                    >
                      <div
                        className={cn(
                          "text-sm font-medium mb-1",
                          isToday && "text-blue-600",
                          isSelected && "text-green-600"
                        )}
                      >
                        {day.getDate()}
                      </div>

                      {/* Events for this day */}
                      <div className="space-y-1">
                        {dayEvents.slice(0, 2).map((event) => (
                          <div
                            key={event.id}
                            className={cn(
                              "text-xs p-1 rounded border",
                              getEventTypeColor(event.type, event.status)
                            )}
                          >
                            <div className="flex items-center space-x-1">
                              {getEventTypeIcon(event.type)}
                              <span className="truncate">{event.title}</span>
                              {event.status === "completed" && (
                                <CheckCircleIcon className="w-3 h-3" />
                              )}
                            </div>
                          </div>
                        ))}
                        {dayEvents.length > 2 && (
                          <div className="text-xs text-gray-500">
                            +{dayEvents.length - 2} আরও
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Selected Date Events */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CalendarIcon className="w-5 h-5" />
                <span>{getBengaliDate(selectedDate.toISOString())}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedDateEvents.length > 0 ? (
                <div className="space-y-3">
                  {selectedDateEvents.map((event) => (
                    <div key={event.id} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          {getEventTypeIcon(event.type)}
                          <span className="font-medium text-sm">
                            {event.title}
                          </span>
                        </div>
                        {event.status === "completed" && (
                          <CheckCircleIcon className="w-4 h-4 text-green-600" />
                        )}
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-gray-600 mb-2">
                        <ClockIcon className="w-3 h-3" />
                        <span>{event.time}</span>
                      </div>
                      <p className="text-xs text-gray-600">
                        {event.description}
                      </p>
                      <Badge
                        className={cn(
                          "mt-2 text-xs",
                          event.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-blue-100 text-blue-800"
                        )}
                      >
                        {event.status === "completed" ? "সম্পন্ন" : "আসছে"}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <CalendarIcon className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-500 text-sm">
                    এই দিনে কোন ইভেন্ট নেই
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BellIcon className="w-5 h-5" />
                <span>আসছে</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {events
                  .filter((event) => event.status === "upcoming")
                  .slice(0, 5)
                  .map((event) => (
                    <div
                      key={event.id}
                      className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg"
                    >
                      <div
                        className={cn(
                          "p-2 rounded",
                          getEventTypeColor(event.type, event.status)
                        )}
                      >
                        {getEventTypeIcon(event.type)}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{event.title}</p>
                        <p className="text-xs text-gray-600">
                          {getBengaliDate(event.date)} - {event.time}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>এই মাসের পরিসংখ্যান</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">মোট ইভেন্ট</span>
                  <span className="font-semibold">{events.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">সম্পন্ন</span>
                  <span className="font-semibold text-green-600">
                    {events.filter((e) => e.status === "completed").length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">আসছে</span>
                  <span className="font-semibold text-blue-600">
                    {events.filter((e) => e.status === "upcoming").length}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
