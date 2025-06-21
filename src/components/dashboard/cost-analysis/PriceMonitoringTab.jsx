import {
  cn,
  getPriceChangeColor,
  getPriceChangeIcon,
  getVolatilityColor,
} from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export default function PriceMonitoringTab({ priceMonitoring }) {
  return (
    <TabsContent value="monitoring" className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {priceMonitoring.map((item) => (
          <Card
            key={item.id}
            className="border-2 hover:border-green-300 transition-colors"
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{item.product}</CardTitle>
                <Badge className={getVolatilityColor(item.volatility)}>
                  {item.volatility} পরিবর্তনশীল
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-3xl font-bold text-gray-900">
                  ৳{item.currentPrice}
                </p>
                <div className="flex items-center justify-center space-x-2 mt-2">
                  {getPriceChangeIcon(item.change24h)}
                  <span
                    className={cn(
                      "font-medium",
                      getPriceChangeColor(item.change24h)
                    )}
                  >
                    {item.change24h > 0 ? "+" : ""}
                    {item.change24h.toFixed(2)}%
                  </span>
                  <span className="text-gray-500 text-sm">(২৪ ঘন্টা)</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">গতকাল:</span>
                  <p className="font-semibold">৳{item.yesterdayPrice}</p>
                </div>
                <div>
                  <span className="text-gray-600">৭ দিন আগে:</span>
                  <p className="font-semibold">৳{item.weekAgoPrice}</p>
                </div>
                <div>
                  <span className="text-gray-600">সর্বোচ্চ:</span>
                  <p className="font-semibold">৳{item.highestThisWeek}</p>
                </div>
                <div>
                  <span className="text-gray-600">সর্বনিম্ন:</span>
                  <p className="font-semibold">৳{item.lowestThisWeek}</p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-sm">সাপ্লায়ার দাম:</h4>
                {item.suppliers.map((supplier, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center p-2 bg-gray-50 rounded text-sm"
                  >
                    <div>
                      <span className="font-medium">{supplier.name}</span>
                      <p className="text-gray-600 text-xs">
                        {supplier.updated}
                      </p>
                    </div>
                    <span className="font-semibold">৳{supplier.price}</span>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">পূর্বাভাস:</span>
                  <span className="text-sm text-blue-600">
                    {item.confidence}% নিশ্চিত
                  </span>
                </div>
                <p className="text-sm text-blue-800">
                  আগামী সপ্তাহে দাম <strong>{item.prediction}</strong> পাবে
                </p>
              </div>

              {item.alerts.length > 0 && (
                <div className="space-y-2">
                  {item.alerts.map((alert, idx) => (
                    <div
                      key={idx}
                      className={cn(
                        "p-2 rounded text-sm",
                        alert.type === "warning"
                          ? "bg-yellow-50 text-yellow-800"
                          : "bg-green-50 text-green-800"
                      )}
                    >
                      {alert.message}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </TabsContent>
  );
}
