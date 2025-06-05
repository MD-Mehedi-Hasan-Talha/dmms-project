import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { formatCurrency } from "@/lib/utils";

export default function CollectionProgressPayments({ billingStats }) {
  const collectionRate = Math.round(
    (billingStats.totalCollected / billingStats.totalAmount) * 100
  );
  return (
    <Card>
      <CardHeader>
        <CardTitle>পেমেন্ট অগ্রগতি</CardTitle>
        <CardDescription>মাসিক পেমেন্ট সংগ্রহের অবস্থা</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between text-sm font-medium">
            <span>সংগৃহীত: {formatCurrency(billingStats.totalCollected)}</span>
            <span>বকেয়া: {formatCurrency(billingStats.totalDue)}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-green-600 h-4 rounded-full transition-all duration-300"
              style={{ width: `${collectionRate}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-600">
            <span>০%</span>
            <span className="font-medium">{collectionRate}% সংগৃহীত</span>
            <span>১০০%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
