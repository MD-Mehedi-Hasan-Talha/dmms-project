import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowTrendingDownIcon,
  BuildingStorefrontIcon,
  CurrencyDollarIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { formatCurrency } from "@/lib/utils";

export default function QuickStats({
  priceDropCount,
  bestSupplier,
  monitorCount,
  budgetOptimization,
}) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">সম্ভাব্য সাশ্রয়</p>
                <p className="text-2xl font-bold">
                  {formatCurrency(budgetOptimization.potentialSavings)}
                </p>
              </div>
              <CurrencyDollarIcon className="w-8 h-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">সেরা সাপ্লায়ার</p>
                <p className="text-lg font-bold">{bestSupplier}</p>
              </div>
              <BuildingStorefrontIcon className="w-8 h-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">দাম কমেছে</p>
                <p className="text-lg font-bold">{priceDropCount} টি পণ্যে</p>
              </div>
              <ArrowTrendingDownIcon className="w-8 h-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100">মনিটর করুন</p>
                <p className="text-lg font-bold">{monitorCount} টি পণ্য</p>
              </div>
              <ExclamationTriangleIcon className="w-8 h-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
