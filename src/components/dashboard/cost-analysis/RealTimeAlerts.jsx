import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BellIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

export default function RealTimeAlerts({ alerts }) {
  return (
    <Card className="mb-6 border-orange-200 bg-orange-50">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2 text-orange-800">
          <BellIcon className="w-5 h-5" />
          <span>রিয়েল-টাইম সতর্কতা</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {alerts.slice(0, 3).map((alert) => (
            <div
              key={alert.id}
              className={cn(
                "p-3 rounded-lg border-l-4",
                alert.type === "urgent"
                  ? "bg-red-100 border-red-400"
                  : alert.type === "opportunity"
                    ? "bg-green-100 border-green-400"
                    : "bg-blue-100 border-blue-400"
              )}
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold">{alert.product}</h4>
                <span className="text-xs text-gray-500">{alert.time}</span>
              </div>
              <p className="text-sm text-gray-700 mb-2">{alert.message}</p>
              <p className="text-xs font-medium text-gray-600">
                {alert.action}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
