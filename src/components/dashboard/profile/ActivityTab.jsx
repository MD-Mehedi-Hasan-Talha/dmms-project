import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ACTIVITY_ICONS } from "@/lib/data/constants";

import { formatDate } from "@/lib/utils";

export default function ActivityTab({ activities }) {
  const getActivityIcon = (type) =>
    ACTIVITY_ICONS[type] || ACTIVITY_ICONS.default;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">সাম্প্রতিক কার্যক্রম</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = getActivityIcon(activity.type);

            return (
              <div
                key={activity.id}
                className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex-shrink-0">
                  <Icon className="w-5 h-5 text-gray-700" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-gray-900">
                      {activity.action}
                    </p>
                    <span className="text-sm text-gray-500">
                      {formatDate(activity.date)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{activity.details}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
