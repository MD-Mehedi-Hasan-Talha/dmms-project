import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TabsContent } from "@/components/ui/tabs";

import { cn, formatCurrency } from "@/lib/utils";

export default function BudgetOptimizationTab({ budgetOptimization }) {
  return (
    <>
      <TabsContent value="optimization" className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>বাজেট সারসংক্ষেপ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">বর্তমান মাসিক খরচ</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(budgetOptimization.currentMonthly)}
                </p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600">অপটিমাইজড বাজেট</p>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(budgetOptimization.optimizedBudget)}
                </p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600">সম্ভাব্য সাশ্রয়</p>
                <p className="text-2xl font-bold text-blue-600">
                  {formatCurrency(budgetOptimization.potentialSavings)}
                </p>
                <p className="text-sm text-blue-600">
                  {Math.round(
                    (budgetOptimization.potentialSavings /
                      budgetOptimization.currentMonthly) *
                      100
                  )}
                  % কম
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>অপটিমাইজেশন সুপারিশ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {budgetOptimization.suggestions.map((suggestion, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold">{suggestion.action}</h4>
                      <Badge
                        className={cn(
                          suggestion.effort === "সহজ"
                            ? "bg-green-100 text-green-800"
                            : suggestion.effort === "মাঝারি"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        )}
                      >
                        {suggestion.effort}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      {suggestion.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        প্রত্যাশিত সাশ্রয়:
                      </span>
                      <span className="font-semibold text-green-600">
                        {formatCurrency(suggestion.savings)}/মাস
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </>
  );
}
