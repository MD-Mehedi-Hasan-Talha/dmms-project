import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { memberBills, paymentMethods } from "@/lib/data-file";
import { formatCurrency, formatDate } from "@/lib/utils";
export default function RecentPayments() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>সাম্প্রতিক পেমেন্ট</CardTitle>
        <CardDescription>গত কয়েকদিনের পেমেন্ট ইতিহাস</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {memberBills
            .filter((bill) => bill.paymentDate)
            .sort((a, b) => new Date(b.paymentDate) - new Date(a.paymentDate))
            .slice(0, 5)
            .map((bill) => {
              const paymentInfo = paymentMethods[bill.paymentMethod];
              return (
                <div
                  key={bill.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-lg">{paymentInfo.icon}</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        {bill.memberName}
                      </div>
                      <div className="text-sm text-gray-600">
                        {formatDate(new Date(bill.paymentDate))} •{" "}
                        {paymentInfo.name}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-600">
                      +{formatCurrency(bill.paidAmount)}
                    </div>
                    {bill.status === "partial" && (
                      <div className="text-xs text-red-600">
                        বকেয়া: {formatCurrency(bill.dueAmount)}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      </CardContent>
    </Card>
  );
}
