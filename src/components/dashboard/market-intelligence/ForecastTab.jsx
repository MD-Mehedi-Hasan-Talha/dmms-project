import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { TabsContent } from "@/components/ui/tabs";
import { ClockIcon } from "@heroicons/react/24/outline";
import { formatCurrency } from "@/lib/utils";

export default function ForecastTab({}) {
  return (
    <>
      <TabsContent value="forecast" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ClockIcon className="w-5 h-5" />
              <span>ভবিষ্যত পূর্বাভাস ও পরিকল্পনা</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold">আগামী ৩ মাসের পূর্বাভাস:</h4>
                <div className="space-y-3">
                  {[
                    {
                      month: "ফেব্রুয়ারি ২০২৪",
                      amount: 42000,
                      confidence: 92,
                    },
                    { month: "মার্চ ২০২৪", amount: 48000, confidence: 87 },
                    { month: "এপ্রিল ২০২৪", amount: 52000, confidence: 82 },
                  ].map((forecast, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{forecast.month}</span>
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
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">পরিকল্পনা ও প্রস্তুতি:</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                    <h5 className="font-medium text-yellow-800">
                      রমজান প্রস্তুতি
                    </h5>
                    <p className="text-sm text-yellow-700">
                      এপ্রিল মাসে খরচ ১৫% বাড়বে। আগাম বাজেট বরাদ্দ করুন।
                    </p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
                    <h5 className="font-medium text-green-800">
                      শীতকালীন সাশ্রয়
                    </h5>
                    <p className="text-sm text-green-700">
                      ফেব্রুয়ারিতে সবজির দাম কম থাকবে। বেশি সবজি ব্যবহার করুন।
                    </p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                    <h5 className="font-medium text-blue-800">
                      স্টক পরিকল্পনা
                    </h5>
                    <p className="text-sm text-blue-700">
                      চাল-ডালের দাম বাড়ার সম্ভাবনা। ১৫ দিনের স্টক রাখুন।
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </>
  );
}
