import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DAYS, MONTHS } from "@/lib/data-file";
import {
  generateCalendarDays,
  getDayEvents,
  cn,
  getEventTypeColor,
  getEventTypeIcon,
} from "@/lib/utils";
import {
  CheckCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

export default function CalendarView({
  events,
  selectedDate,
  setSelectedDate,
}) {
  const [viewMode, setViewMode] = useState("month");

  const [currentDate, setCurrentDate] = useState(new Date());

  const calendarDays = generateCalendarDays(currentDate);
  const today = new Date();
  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  return (
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
                variant={viewMode === "month" ? "default" : "secondary"}
                size="sm"
                onClick={() => setViewMode("month")}
              >
                মাস
              </Button>
              <Button
                variant={viewMode === "week" ? "default" : "secondary"}
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
              const isCurrentMonth = day.getMonth() === currentDate.getMonth();
              const isToday = day.toDateString() === today.toDateString();
              const isSelected =
                day.toDateString() === selectedDate.toDateString();
              const dayEvents = getDayEvents(day, events);

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
  );
}
