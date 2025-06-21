import { cn, formatCurrency, getEfficiencyColor } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
export default function CostBreakdownTab({ costBreakdown }) {
  return (
    <TabsContent value="breakdown" className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>আজকের খরচ বিশ্লেষণ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <p className="text-sm text-gray-600">সকালের নাস্তা</p>
                  <p className="text-xl font-bold text-orange-600">
                    {formatCurrency(costBreakdown.daily.today.breakfast)}
                  </p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600">দুপুরের খাবার</p>
                  <p className="text-xl font-bold text-green-600">
                    {formatCurrency(costBreakdown.daily.today.lunch)}
                  </p>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600">রাতের খাবার</p>
                  <p className="text-xl font-bold text-blue-600">
                    {formatCurrency(costBreakdown.daily.today.dinner)}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">মোট খরচ:</span>
                  <span className="text-2xl font-bold">
                    {formatCurrency(costBreakdown.daily.today.total)}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>প্রতি মিল:</span>
                  <span>৳{costBreakdown.daily.today.perMeal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>সদস্য সংখ্যা:</span>
                  <span>{costBreakdown.daily.today.members} জন</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>সাপ্তাহিক ট্রেন্ড</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {costBreakdown.weekly.map((day, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <span className="font-medium">{day.day}</span>
                    <p className="text-sm text-gray-600">{day.meals} মিল</p>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold">
                      {formatCurrency(day.amount)}
                    </span>
                    <div className="flex items-center space-x-2">
                      <span
                        className={cn(
                          "text-sm",
                          getEfficiencyColor(day.efficiency)
                        )}
                      >
                        {day.efficiency}%
                      </span>
                      <Badge
                        className={cn(
                          "text-xs",
                          day.efficiency >= 90
                            ? "bg-green-100 text-green-800"
                            : day.efficiency >= 85
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        )}
                      >
                        {day.efficiency >= 90
                          ? "উন্নত"
                          : day.efficiency >= 85
                            ? "ভাল"
                            : "গড়"}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>মাসিক বাজেট ট্র্যাকিং</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600">মাসিক লক্ষ্য</p>
              <p className="text-2xl font-bold text-blue-600">
                {formatCurrency(costBreakdown.monthly.target)}
              </p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-gray-600">এ পর্যন্ত ব্যবহৃত</p>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(costBreakdown.monthly.current)}
              </p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <p className="text-sm text-gray-600">অবশিষ্ট</p>
              <p className="text-2xl font-bold text-orange-600">
                {formatCurrency(costBreakdown.monthly.remaining)}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex justify-between text-sm mb-2">
              <span>অগ্রগতি</span>
              <span>
                {Math.round(
                  (costBreakdown.monthly.current /
                    costBreakdown.monthly.target) *
                    100
                )}
                %
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-green-600 h-3 rounded-full"
                style={{
                  width: `${
                    (costBreakdown.monthly.current /
                      costBreakdown.monthly.target) *
                    100
                  }%`,
                }}
              />
            </div>
            <div className="flex justify-between text-sm mt-2 text-gray-600">
              <span>{costBreakdown.monthly.daysLeft} দিন বাকি</span>
              <span>
                দৈনিক বাজেট: {formatCurrency(costBreakdown.monthly.dailyBudget)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
}
