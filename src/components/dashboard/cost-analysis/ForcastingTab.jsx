import { formatCurrency } from "@/lib/utils";
import { ClockIcon, FireIcon } from "@heroicons/react/24/outline";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
export default function ForcastingTab() {
  return (
    <TabsContent value="forecasting" className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ClockIcon className="w-5 h-5" />
              <span>খরচ পূর্বাভাস</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {[
                { period: "আগামীকাল", amount: 1950, confidence: 95 },
                { period: "পরবর্তী সপ্তাহ", amount: 13500, confidence: 88 },
                { period: "মাস শেষে", amount: 44800, confidence: 82 },
              ].map((forecast, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{forecast.period}</span>
                    <span className="font-bold text-lg">
                      {formatCurrency(forecast.amount)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">নির্ভুলতা:</span>
                    <span className="text-green-600">
                      {forecast.confidence}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FireIcon className="w-5 h-5" />
              <span>হট স্পট</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-red-50 border-l-4 border-red-400 rounded">
                <h4 className="font-semibold text-red-800">দামে ঊর্ধ্বগতি</h4>
                <p className="text-sm text-red-700">
                  চাল ও তেলের দাম বাড়ছে। আগামী সপ্তাহে আরো বাড়তে পারে।
                </p>
              </div>

              <div className="p-3 bg-green-50 border-l-4 border-green-400 rounded">
                <h4 className="font-semibold text-green-800">
                  সাশ্রয়ের সুযোগ
                </h4>
                <p className="text-sm text-green-700">
                  পেঁয়াজ ও সবজির দাম কমেছে। স্টক করার ভাল সময়।
                </p>
              </div>

              <div className="p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
                <h4 className="font-semibold text-blue-800">মৌসুমী প্রভাব</h4>
                <p className="text-sm text-blue-700">
                  শীতকালে সবজির দাম কম থাকে। মেনু পরিকল্পনা অনুযায়ী কিনুন।
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </TabsContent>
  );
}
