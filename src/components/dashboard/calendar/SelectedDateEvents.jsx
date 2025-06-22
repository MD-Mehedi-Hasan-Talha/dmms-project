import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getBengaliDate, getDayEvents, getEventTypeIcon } from "@/lib/utils";
import { CalendarIcon, ClockIcon, PlusIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

export default function SelectedDateEvents({
  selectedDate,
  events,
  handleAddEvent,
  handleCompleteEvent,
  handleDeleteEvent,
}) {
  const selectedDateEvents = getDayEvents(selectedDate, events);

  return (
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
                    <span className="font-medium text-sm">{event.title}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {event.status === "upcoming" && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleCompleteEvent(event.id)}
                        className="h-6 text-xs"
                      >
                        ✓
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteEvent(event.id)}
                      className="h-6 text-xs text-red-600 hover:text-red-700"
                    >
                      ✕
                    </Button>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-600 mb-2">
                  <ClockIcon className="w-3 h-3" />
                  <span>{event.time}</span>
                </div>
                <p className="text-xs text-gray-600">{event.description}</p>
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
            <p className="text-gray-500 text-sm">এই দিনে কোন ইভেন্ট নেই</p>
            <Button
              size="sm"
              variant="outline"
              className="mt-2"
              onClick={() => {
                handleAddEvent(selectedDate);
              }}
            >
              <PlusIcon className="w-3 h-3 mr-1" />
              ইভেন্ট যোগ করুন
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
