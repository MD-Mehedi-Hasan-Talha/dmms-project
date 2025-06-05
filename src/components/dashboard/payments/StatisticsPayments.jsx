import { Card, CardContent } from "@/components/ui/card";
import {
  CurrencyDollarIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { formatCurrency } from "@/lib/utils";
export default function StatisticsPayments({ billingStats }) {
  const collectionRate = Math.round(
    (billingStats.totalCollected / billingStats.totalAmount) * 100
  );
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <CurrencyDollarIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">মোট বিল</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(billingStats.totalAmount)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircleIcon className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">সংগৃহীত</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(billingStats.totalCollected)}
              </p>
              <p className="text-xs text-green-600">{collectionRate}% সংগ্রহ</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <ExclamationTriangleIcon className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">বকেয়া</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(billingStats.totalDue)}
              </p>
              <p className="text-xs text-red-600">
                {billingStats.dueMembers} জনের বকেয়া
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <DocumentTextIcon className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">মিল রেট</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(billingStats.mealRate)}
              </p>
              <p className="text-xs text-gray-600">প্রতি মিল</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
