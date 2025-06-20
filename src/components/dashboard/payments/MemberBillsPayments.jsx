import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCurrency, formatDate, getStatusInfo } from "@/lib/utils";
import { CreditCardIcon, EyeIcon } from "@heroicons/react/24/outline";

import { memberBills, paymentMethods } from "@/lib/data-file";
export default function MemberBillsPayments({
  handleViewBill,
  handlePaymentClick,
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>সদস্যদের বিল</CardTitle>
        <CardDescription>
          প্রতিটি সদস্যের বিল ও পেমেন্ট স্ট্যাটাস
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  সদস্য
                </th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700">
                  মিল সংখ্যা
                </th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">
                  মিল কস্ট
                </th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">
                  অতিরিক্ত
                </th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">
                  মোট বিল
                </th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">
                  পেইড
                </th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">
                  বকেয়া
                </th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700">
                  স্ট্যাটাস
                </th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700">
                  পেমেন্ট মেথড
                </th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700">
                  অ্যাকশন
                </th>
              </tr>
            </thead>
            <tbody>
              {memberBills.map((bill) => {
                const statusInfo = getStatusInfo(bill.status);
                const StatusIcon = statusInfo.icon;
                const paymentInfo = bill.paymentMethod
                  ? paymentMethods[bill.paymentMethod]
                  : null;

                return (
                  <tr key={bill.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="font-semibold text-gray-900">
                        {bill.memberName}
                      </div>
                      {bill.paymentDate && (
                        <div className="text-xs text-gray-500">
                          পেমেন্ট: {formatDate(new Date(bill.paymentDate))}
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="font-semibold">{bill.totalMeals}</span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className="font-medium">
                        {formatCurrency(bill.mealCost)}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span
                        className={`font-medium ${
                          bill.extraCost > 0
                            ? "text-red-600"
                            : bill.extraCost < 0
                              ? "text-green-600"
                              : "text-gray-600"
                        }`}
                      >
                        {bill.extraCost > 0 ? "+" : ""}
                        {formatCurrency(bill.extraCost)}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className="font-bold text-gray-900">
                        {formatCurrency(bill.totalAmount)}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className="font-semibold text-green-600">
                        {formatCurrency(bill.paidAmount)}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span
                        className={`font-semibold ${
                          bill.dueAmount > 0 ? "text-red-600" : "text-green-600"
                        }`}
                      >
                        {formatCurrency(bill.dueAmount)}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <Badge className={statusInfo.color}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {statusInfo.label}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-center">
                      {paymentInfo ? (
                        <Badge className={paymentInfo.color}>
                          <span className="mr-1">{paymentInfo.icon}</span>
                          {paymentInfo.name}
                        </Badge>
                      ) : (
                        <span className="text-gray-400 text-sm">-</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex justify-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewBill(bill)}
                        >
                          <EyeIcon className="w-4 h-4 mr-1" />
                          দেখুন
                        </Button>
                        {bill.dueAmount > 0 && (
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() =>
                              handlePaymentClick({
                                id: bill.id,
                                name: bill.memberName,
                                role: bill.id === 1 ? "admin" : "member",
                              })
                            }
                          >
                            <CreditCardIcon className="w-4 h-4 mr-1" />
                            পেমেন্ট
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
