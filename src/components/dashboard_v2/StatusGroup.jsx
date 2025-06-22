"use client";
import { statsData } from "@/lib/data/dashboardV2";
import { Card, CardContent } from "../ui/card";

const StatusGroup = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsData.map((item, index) => {
        const Icon = item.icon;

        return (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {item.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {item.value}
                  </p>
                  <div className="flex items-center mt-1">
                    {item.isChange && (
                      <Icon className={`w-4 h-4 mr-1 ${item.iconColor}`} />
                    )}
                    <p
                      className={`text-xs ${
                        item.isChange ? item.iconColor : "text-gray-500"
                      }`}
                    >
                      {item.subtext}
                    </p>
                  </div>
                </div>
                <div className={`p-3 rounded-full ${item.iconBg}`}>
                  <Icon className={`w-6 h-6 ${item.iconColor}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default StatusGroup;
