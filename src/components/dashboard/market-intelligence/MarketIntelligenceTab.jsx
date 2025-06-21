import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { TabsContent } from "@/components/ui/tabs";
import {
  CalendarIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";
import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";
export default function MarketIntelligenceTab({ marketIntelligence }) {
  return (
    <>
      <TabsContent value="intelligence" className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ExclamationTriangleIcon className="w-5 h-5" />
                <span>মূল্য সতর্কতা</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {marketIntelligence.priceAlerts.map((alert, index) => (
                <div
                  key={index}
                  className={cn(
                    "p-4 rounded-lg border-l-4",
                    alert.status === "warning"
                      ? "bg-yellow-50 border-yellow-400"
                      : alert.status === "success"
                        ? "bg-green-50 border-green-400"
                        : "bg-blue-50 border-blue-400"
                  )}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold">{alert.product}</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {alert.message}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {alert.suggestion}
                      </p>
                    </div>
                    {alert.status === "warning" && (
                      <ExclamationTriangleIcon className="w-5 h-5 text-yellow-600" />
                    )}
                    {alert.status === "success" && (
                      <CheckCircleIcon className="w-5 h-5 text-green-600" />
                    )}
                    {alert.status === "info" && (
                      <EyeIcon className="w-5 h-5 text-blue-600" />
                    )}
                  </div>
                  <div className="mt-3 p-2 bg-white rounded border">
                    <span className="text-sm font-medium">করণীয়: </span>
                    <span className="text-sm">{alert.action}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CalendarIcon className="w-5 h-5" />
                <span>মৌসুমী ট্রেন্ড</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {marketIntelligence.seasonalTrends.map((season, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold">{season.season}</h4>
                    <span className="text-sm text-gray-600">
                      {season.months}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {season.trends.map((trend, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2 bg-gray-50 rounded"
                      >
                        <div>
                          <span className="font-medium">{trend.category}</span>
                          <p className="text-xs text-gray-600">
                            {trend.reason}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          {trend.change > 0 ? (
                            <TrendingUpIcon className="w-4 h-4 text-red-500" />
                          ) : (
                            <TrendingDownIcon className="w-4 h-4 text-green-500" />
                          )}
                          <span
                            className={cn(
                              "font-semibold",
                              trend.change > 0
                                ? "text-red-600"
                                : "text-green-600"
                            )}
                          >
                            {trend.change > 0 ? "+" : ""}
                            {trend.change}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </>
  );
}
