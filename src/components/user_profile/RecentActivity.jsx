import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { ACTIVITY_ICONS, ACTIVITY_COLORS } from "@/lib/data/constants";

export default function RecentActivity({ activities }) {
  const getActivityIcon = (type) =>
    ACTIVITY_ICONS[type] || ACTIVITY_ICONS.default;
  const getActivityColor = (type) =>
    ACTIVITY_COLORS[type] || ACTIVITY_COLORS.default;

  return (
    <Card>
      <CardHeader>
        <CardTitle>সাম্প্রতিক কার্যক্রম</CardTitle>
        <CardDescription>আপনার সাম্প্রতিক কার্যক্রমের তালিকা</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = getActivityIcon(activity.type);
            return (
              <div
                key={activity.id}
                className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg"
              >
                <Icon
                  className={`h-8 w-8 ${getActivityColor(activity.type)}`}
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">
                    {activity.description}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatDate(activity.date)} - {activity.time}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
