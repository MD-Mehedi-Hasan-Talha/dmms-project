"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

import { calendarEvents } from "@/lib/data-file";
import CalendarView from "@/components/dashboard/calendar/CalendarView";
import SelectedDateEvents from "@/components/dashboard/calendar/SelectedDateEvents";
import AddEventDialog from "@/components/dashboard/calendar/AddEventDialog";
import UpcomingEvents from "@/components/dashboard/calendar/UpcomingEvents";
import QuickStats from "@/components/dashboard/calendar/QuickStats";

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
          <AddEventDialog
            isOpen={isAddEventOpen}
            setIsOpen={setIsAddEventOpen}
            newEvent={newEvent}
            setNewEvent={setNewEvent}
            handleAddEvent={handleAddEvent}
          />
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
          <UpcomingEvents events={events} />

          {/* Quick Stats */}
          <QuickStats events={events} />
        </div>
      </div>
    </div>
  );
}
