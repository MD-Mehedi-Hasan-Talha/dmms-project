import { formatCurrency, getEfficiencyColor } from "@/lib/utils";
import { TrendingDownIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import {
  AdjustmentsHorizontalIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
export default function EffiencyAnalysisTab({ costMetrics }) {
  return (
    <TabsContent value="efficiency" className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AdjustmentsHorizontalIcon className="w-5 h-5" />
              <span>খরচ দক্ষতা</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-4">
                  <span className="text-2xl font-bold text-green-600">
                    {costMetrics.efficiency.overall}%
                  </span>
                </div>
                <h3 className="text-lg font-semibold">সামগ্রিক দক্ষতা</h3>
                <p className="text-gray-600">লক্ষ্যমাত্রার চেয়ে ভাল</p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>সকালের নাস্তা</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{
                          width: `${costMetrics.efficiency.breakfast}%`,
                        }}
                      />
                    </div>
                    <span
                      className={getEfficiencyColor(
                        costMetrics.efficiency.breakfast
                      )}
                    >
                      {costMetrics.efficiency.breakfast}%
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>দুপুরের খাবার</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-yellow-600 h-2 rounded-full"
                        style={{
                          width: `${costMetrics.efficiency.lunch}%`,
                        }}
                      />
                    </div>
                    <span
                      className={getEfficiencyColor(
                        costMetrics.efficiency.lunch
                      )}
                    >
                      {costMetrics.efficiency.lunch}%
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>রাতের খাবার</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{
                          width: `${costMetrics.efficiency.dinner}%`,
                        }}
                      />
                    </div>
                    <span
                      className={getEfficiencyColor(
                        costMetrics.efficiency.dinner
                      )}
                    >
                      {costMetrics.efficiency.dinner}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ExclamationTriangleIcon className="w-5 h-5" />
              <span>অপচয় বিশ্লেষণ</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <p className="text-3xl font-bold text-red-600">
                  {costMetrics.wastage.percentage}%
                </p>
                <p className="text-red-800 font-medium">
                  {formatCurrency(costMetrics.wastage.amount)}
                </p>
                <p className="text-sm text-red-600">মাসিক অপচয়</p>
              </div>

              <div className="space-y-3">
                {costMetrics.wastage.categories.map((category, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">
                        {category.name}
                      </span>
                      <span className="text-sm text-gray-600">
                        {category.percentage}% (
                        {formatCurrency(category.amount)})
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-red-500 h-2 rounded-full"
                        style={{ width: `${category.percentage * 10}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingDownIcon className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-800">
                    অপচয় কমছে
                  </span>
                </div>
                <p className="text-xs text-green-700">
                  গত মাসের তুলনায় ০.৮% কম অপচয় হয়েছে
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </TabsContent>
  );
}
