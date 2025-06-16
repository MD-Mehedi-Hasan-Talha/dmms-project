import { Card, CardContent } from "@/components/ui/card";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { Badge } from "@/components/ui/badge";

export default function MealDetailsHeader({ name, date, status, totalMeals }) {
  return (
    <Card>
      <CardContent className="p-6">
        {/* Container to hold name/date on the left and status/total meals on the right */}
        <div className="flex items-center justify-between">
          {/* Left side: User's name and date */}
          <div>
            {/* Name displayed as a heading */}
            <h3 className="text-lg font-semibold text-gray-900">{name}</h3>

            {/* Date with calendar icon */}
            <div className="flex items-center space-x-2 mt-1">
              <CalendarDaysIcon className="w-4 h-4 text-gray-500" />
              {/* Format date to Bengali locale */}
              <span className="text-gray-600">
                {new Date(date).toLocaleDateString("bn-BD")}
              </span>
            </div>
          </div>

          {/* Right side: Status badge and total meals */}
          <div className="text-right">
            {/* Status badge with dynamic color and label */}
            <Badge className={status.color}>{status.label}</Badge>

            {/* Display total meals */}
            <div className="text-sm text-gray-600 mt-1">
              মোট মিল: {totalMeals}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
