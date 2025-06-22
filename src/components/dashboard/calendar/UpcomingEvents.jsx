import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BellIcon } from "@heroicons/react/24/outline";
import {
  cn,
  getBengaliDate,
  getEventTypeColor,
  getEventTypeIcon,
} from "@/lib/utils";

export default function UpcomingEvents({ events }) {
  return (
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
  );
}
