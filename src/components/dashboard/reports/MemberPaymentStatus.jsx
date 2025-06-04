import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

/**
 * @component MemberPaymentStatus
 * @desc Displays a detailed table of members' meal counts, billing, payments, dues, and payment rates.
 *
 * @props
 * - memberStats: Array of member payment info objects { name, meals, amount, paid, due }
 * - getBengaliNumber: Function to convert numbers to Bengali numerals
 * - formatCurrency: Function to format numbers as currency strings
 */
const MemberPaymentStatus = ({
  memberStats,
  getBengaliNumber,
  formatCurrency,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>সদস্যদের পেমেন্ট স্ট্যাটাস</CardTitle>
        <CardDescription>সদস্য অনুসারে মিল ও পেমেন্ট তথ্য</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          {/* @table - Member payment summary */}
          <table className="w-full">
            <thead>
              <tr className="border-b">
                {/* @tableHeader - Member related columns */}
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  সদস্য
                </th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700">
                  মিল সংখ্যা
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
                  পেমেন্ট হার
                </th>
              </tr>
            </thead>
            <tbody>
              {memberStats.map((member, index) => {
                // @calc - Calculate payment rate percentage
                const paymentRate = Math.round(
                  (member.paid / member.amount) * 100
                );

                return (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    {/* @memberName - Display member's name */}
                    <td className="py-4 px-4 font-medium">{member.name}</td>

                    {/* @mealsCount - Bengali formatted meal count */}
                    <td className="py-4 px-4 text-center font-medium">
                      {getBengaliNumber(member.meals)}
                    </td>

                    {/* @amount - Total bill amount formatted as currency */}
                    <td className="py-4 px-4 text-right font-medium">
                      {formatCurrency(member.amount)}
                    </td>

                    {/* @paid - Amount paid by member in green */}
                    <td className="py-4 px-4 text-right font-medium text-green-600">
                      {formatCurrency(member.paid)}
                    </td>

                    {/* @due - Due amount, red if > 0, green otherwise */}
                    <td className="py-4 px-4 text-right font-medium">
                      <span
                        className={
                          member.due > 0 ? "text-red-600" : "text-green-600"
                        }
                      >
                        {formatCurrency(member.due)}
                      </span>
                    </td>

                    {/* @paymentRate - Badge with colored background depending on payment % */}
                    <td className="py-4 px-4 text-center">
                      <Badge
                        className={
                          paymentRate === 100
                            ? "bg-green-100 text-green-800"
                            : paymentRate > 50
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }
                      >
                        {getBengaliNumber(paymentRate)}%
                      </Badge>
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
};

export default MemberPaymentStatus;
