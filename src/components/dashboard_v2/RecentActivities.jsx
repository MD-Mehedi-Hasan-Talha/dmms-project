import { recentActivities } from "@/lib/data/dashboardV2";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ClockIcon } from "lucide-react";

const RecentActivities = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>সাম্প্রতিক কার্যক্রম</CardTitle>
        <CardDescription>গত কয়েক ঘন্টার গুরুত্বপূর্ণ আপডেট</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentActivities?.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg"
            >
              <div className={`p-2 rounded-full bg-gray-100 ${activity.color}`}>
                <activity.icon className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {activity.message}
                </p>
                <p className="text-xs text-gray-500 flex items-center mt-1">
                  <ClockIcon className="w-3 h-3 mr-1" />
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivities;
