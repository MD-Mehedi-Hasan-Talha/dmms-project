import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import {
  ChartBarIcon,
  CheckCircleIcon,
  CurrencyDollarIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { ArrowUpIcon } from "lucide-react";
import { ArrowDownIcon } from "lucide-react";

export default function QuickStats({ costBreakdown, costMetrics }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* Today's Cost */}
      <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">আজকের খরচ</p>
              <p className="text-2xl font-bold">
                {formatCurrency(costBreakdown.daily.today.total)}
              </p>
              <div className="flex items-center mt-1">
                {costBreakdown.daily.change > 0 ? (
                  <ArrowUpIcon className="w-4 h-4 text-blue-200 mr-1" />
                ) : (
                  <ArrowDownIcon className="w-4 h-4 text-blue-200 mr-1" />
                )}
                <span className="text-blue-200 text-sm">
                  {Math.abs(costBreakdown.daily.change).toFixed(1)}%
                </span>
              </div>
            </div>
            <CurrencyDollarIcon className="w-8 h-8 text-blue-200" />
          </div>
        </CardContent>
      </Card>
      {/*  Expense efficiency  */}
      <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">খরচ দক্ষতা</p>
              <p className="text-2xl font-bold">
                {costMetrics.efficiency.overall}%
              </p>
              <p className="text-green-200 text-sm">লক্ষ্যমাত্রার চেয়ে ভাল</p>
            </div>
            <CheckCircleIcon className="w-8 h-8 text-green-200" />
          </div>
        </CardContent>
      </Card>
      {/* Wastage */}
      <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">অপচয়</p>
              <p className="text-2xl font-bold">
                {costMetrics.wastage.percentage}%
              </p>
              <p className="text-purple-200 text-sm">
                {formatCurrency(costMetrics.wastage.amount)}
              </p>
            </div>
            <ExclamationTriangleIcon className="w-8 h-8 text-purple-200" />
          </div>
        </CardContent>
      </Card>
      {/* Monthly budget */}
      <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100">মাসিক বাজেট</p>
              <p className="text-2xl font-bold">
                {Math.round(
                  (costBreakdown.monthly.current /
                    costBreakdown.monthly.target) *
                    100
                )}
                %
              </p>
              <p className="text-orange-200 text-sm">ব্যবহৃত</p>
            </div>
            <ChartBarIcon className="w-8 h-8 text-orange-200" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
