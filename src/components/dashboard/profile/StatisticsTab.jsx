import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartBarIcon } from "@heroicons/react/24/outline";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function StatisticsTab({ stats }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">মিল পরিসংখ্যান</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">মোট মিল</span>
                <span className="font-semibold">{stats.totalMeals} টি</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">দৈনিক গড় মিল</span>
                <span className="font-semibold">
                  {stats.averageMealsPerDay} টি
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full"
                  style={{ width: `${(stats.totalMeals / 60) * 100}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500">
                এই মাসে {stats.totalMeals}/৬০ মিল
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">আর্থিক পরিসংখ্যান</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">মোট পরিশোধ</span>
                <span className="font-semibold text-green-600">
                  {formatCurrency(stats.totalPaid)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">বকেয়া</span>
                <span className="font-semibold text-red-600">
                  {formatCurrency(stats.totalDue)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">মাসিক গড়</span>
                <span className="font-semibold">
                  {formatCurrency(stats.monthlyAverage)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">শেষ পেমেন্ট</span>
                <span className="font-semibold">
                  {formatDate(stats.lastPayment)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">মাসিক খরচের ট্রেন্ড</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <ChartBarIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">চার্ট লোড হচ্ছে...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
