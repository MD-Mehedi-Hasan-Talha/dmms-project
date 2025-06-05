import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DocumentTextIcon,
  CalendarDaysIcon,
  ArrowDownTrayIcon,
  BanknotesIcon,
} from "@heroicons/react/24/outline";
import { formatCurrency } from "@/lib/utils";

import { memberBills, paymentMethods } from "@/lib/data";
export default function PaymentMethodsSummaryPayments() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>পেমেন্ট মেথড অনুসারে</CardTitle>
          <CardDescription>বিভিন্ন মাধ্যমে পেমেন্ট বিতরণ</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(paymentMethods).map(([key, method]) => {
              const amount = memberBills
                .filter((bill) => bill.paymentMethod === key)
                .reduce((sum, bill) => sum + bill.paidAmount, 0);

              if (amount === 0) return null;

              return (
                <div key={key} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-lg mr-2">{method.icon}</span>
                    <span className="font-medium">{method.name}</span>
                  </div>
                  <span className="font-bold">{formatCurrency(amount)}</span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>দ্রুত অ্যাকশন</CardTitle>
          <CardDescription>সাধারণ বিল ব্যবস্থাপনা কাজ</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <BanknotesIcon className="w-4 h-4 mr-2" />
              সব সদস্যকে রিমাইন্ডার পাঠান
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <DocumentTextIcon className="w-4 h-4 mr-2" />
              মাসিক বিল রিপোর্ট তৈরি করুন
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <CalendarDaysIcon className="w-4 h-4 mr-2" />
              পেমেন্ট ডেডলাইন সেট করুন
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <ArrowDownTrayIcon className="w-4 h-4 mr-2" />
              এক্সেল ফরম্যাটে এক্সপোর্ট করুন
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
