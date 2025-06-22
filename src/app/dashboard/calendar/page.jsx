"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CalendarIcon,
  ClockIcon,
  PlusIcon,
  BellIcon,
} from "@heroicons/react/24/outline";
import {
  cn,
  generateCalendarDays,
  getBengaliDate,
  getDayEvents,
  getEventTypeColor,
  getEventTypeIcon,
} from "@/lib/utils";
import { calendarEvents, EVENT_TYPES } from "@/lib/data-file";
import CalendarView from "@/components/dashboard/calendar/CalendarView";
import SelectedDateEvents from "@/components/dashboard/calendar/SelectedDateEvents";
import { date } from "zod";

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [events, setEvents] = useState(calendarEvents || []);

  // New Event Form State
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: new Date().toISOString().split("T")[0],
    time: "10:00",
    type: "other",
    description: "",
    status: "upcoming",
  });

  // Add Event Handler
  const handleAddEvent = (selectedDate) => {
    if (!newEvent.title.trim()) {
      alert("ইভেন্টের নাম লিখুন");
      return;
    }

    const newEventData = {
      id: Date.now(),
      ...newEvent,
      title: newEvent.title.trim() || "নতুন ইভেন্ট নাম",
      date: selectedDate.toISOString().split("T")[0],
    };

    setEvents([...events, newEventData]);
    setNewEvent({
      title: "",
      date: new Date().toISOString().split("T")[0],
      time: "10:00",
      type: "other",
      description: "",
      status: "upcoming",
    });
    setIsAddEventOpen(false);

    // Show success message
    alert("নতুন ইভেন্ট সফলভাবে যোগ করা হয়েছে!");
  };

  // Delete Event Handler
  const handleDeleteEvent = (eventId) => {
    if (confirm("আপনি কি এই ইভেন্টটি মুছে ফেলতে চান?")) {
      setEvents(events.filter((event) => event.id !== eventId));
    }
  };

  // Mark Event as Complete
  const handleCompleteEvent = (eventId) => {
    setEvents(
      events.map((event) =>
        event.id === eventId ? { ...event, status: "completed" } : event
      )
    );
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(today);
  };

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

          {/* Add Event Dialog */}
          <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
            <DialogTrigger asChild>
              <Button className="bg-green-600 hover:bg-green-700">
                <PlusIcon className="w-4 h-4 mr-2" />
                নতুন ইভেন্ট
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>নতুন ইভেন্ট যোগ করুন</DialogTitle>
                <DialogDescription>
                  ক্যালেন্ডারে একটি নতুন ইভেন্ট বা কার্যক্রম যোগ করুন
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label htmlFor="title" className="text-sm font-medium">
                    ইভেন্টের নাম *
                  </label>
                  <Input
                    id="title"
                    placeholder="ইভেন্টের নাম লিখুন"
                    value={newEvent.title}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, title: e.target.value })
                    }
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <label htmlFor="date" className="text-sm font-medium">
                      তারিখ
                    </label>
                    <Input
                      id="date"
                      type="date"
                      value={newEvent.date}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, date: e.target.value })
                      }
                    />
                  </div>

                  <div className="grid gap-2">
                    <label htmlFor="time" className="text-sm font-medium">
                      সময়
                    </label>
                    <Input
                      id="time"
                      type="time"
                      value={newEvent.time}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, time: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <label htmlFor="type" className="text-sm font-medium">
                    ইভেন্টের ধরন
                  </label>
                  <Select
                    value={newEvent.type}
                    onValueChange={(value) =>
                      setNewEvent({ ...newEvent, type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="ইভেন্টের ধরন নির্বাচন করুন" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(EVENT_TYPES).map(([key, type]) => (
                        <SelectItem key={key} value={key}>
                          {type.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <label htmlFor="description" className="text-sm font-medium">
                    বিবরণ
                  </label>
                  <Textarea
                    id="description"
                    placeholder="ইভেন্টের বিস্তারিত বিবরণ লিখুন"
                    value={newEvent.description}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, description: e.target.value })
                    }
                    rows={3}
                  />
                </div>
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsAddEventOpen(false)}
                >
                  বাতিল
                </Button>
                <Button
                  onClick={() => handleAddEvent(new Date(newEvent.date))}
                  className="bg-green-600 hover:bg-green-700"
                >
                  ইভেন্ট যোগ করুন
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar Main View */}
        <CalendarView
          events={events}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Selected Date Events */}
          <SelectedDateEvents
            selectedDate={selectedDate}
            events={events}
            handleDeleteEvent={handleDeleteEvent}
            handleCompleteEvent={handleCompleteEvent}
            handleAddEvent={handleAddEvent}
          />

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
