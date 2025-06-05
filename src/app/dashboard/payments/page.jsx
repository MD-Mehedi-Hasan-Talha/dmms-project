"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CurrencyDollarIcon,
  DocumentTextIcon,
  CreditCardIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  PlusIcon,
  EyeIcon,
  ArrowDownTrayIcon,
  BanknotesIcon,
} from "@heroicons/react/24/outline";
import { formatCurrency, formatDate, getMonthName } from "@/lib/utils";
import { downloadPaymentReport } from "@/lib/reportUtils";
import { BillGenerateModal } from "@/components/modals/BillGenerateModal";
import { BillDetailsModal } from "@/components/modals/BillDetailsModal";
import { PaymentModal } from "@/components/modals/PaymentModal";
import {
  billingStats,
  getStatusInfo,
  memberBills,
  paymentMethods,
} from "@/lib/data";

export default function PaymentPage() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [billGenerateModalOpen, setBillGenerateModalOpen] = useState(false);
  const [billDetailsModalOpen, setBillDetailsModalOpen] = useState(false);
  const [selectedMemberForPayment, setSelectedMemberForPayment] =
    useState(null);
  const [selectedBillForView, setSelectedBillForView] = useState(null);
  const [payments, setPayments] = useState([]);

  // Mock members data for PaymentModal
  const members = memberBills.map((bill) => ({
    id: bill.id,
    name: bill.memberName,
    role: bill.id === 1 ? "admin" : "member",
  }));

  // Payment handlers
  const handlePaymentClick = (member) => {
    setSelectedMemberForPayment(member);
    setPaymentModalOpen(true);
  };

  const handlePaymentSubmit = (paymentData) => {
    setPayments((prev) => [...prev, paymentData]);

    // Update member bill status (in real app, this would be an API call)
    // For demo purposes, you could update the memberBills state if it was made stateful
    console.log("Payment recorded:", paymentData);
  };

  const handleBillGenerate = (billData) => {
    console.log("Bill generated:", billData);
    // In real app, this would call API to generate bills
  };

  const handleViewBill = (bill) => {
    setSelectedBillForView(bill);
    setBillDetailsModalOpen(true);
  };

  const handleDownloadReport = () => {
    downloadPaymentReport(
      memberBills,
      billingStats,
      selectedMonth,
      selectedYear
    );
  };

  const collectionRate = Math.round(
    (billingStats.totalCollected / billingStats.totalAmount) * 100
  );

  return (
    <>
      {" "}
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              বিল ও পেমেন্ট ব্যবস্থাপনা
            </h1>
            <p className="text-gray-600">
              মাসিক বিল জেনারেশন এবং পেমেন্ট ট্র্যাকিং
            </p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={handleDownloadReport}>
              <ArrowDownTrayIcon className="w-4 h-4 mr-2" />
              রিপোর্ট ডাউনলোড
            </Button>
            <Button
              className="bg-green-600 hover:bg-green-700"
              onClick={() => setBillGenerateModalOpen(true)}
            >
              <PlusIcon className="w-4 h-4 mr-2" />
              বিল জেনারেট করুন
            </Button>
          </div>
        </div>

        {/* Month Selector */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {getMonthName(selectedMonth)} {selectedYear} এর বিল
                </h2>
                <p className="text-sm text-gray-600">
                  মিল রেট: {formatCurrency(billingStats.mealRate)} | মোট মিল:{" "}
                  {billingStats.totalMeals}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <select
                  className="p-2 border border-gray-300 rounded-md"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                >
                  {[...Array(12)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {getMonthName(i + 1)}
                    </option>
                  ))}
                </select>
                <select
                  className="p-2 border border-gray-300 rounded-md"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                >
                  <option value="2025">২০২৫</option>
                  <option value="2024">২০২৪</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
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
                  <p className="text-xs text-green-600">
                    {collectionRate}% সংগ্রহ
                  </p>
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

        {/* Collection Progress */}
        <Card>
          <CardHeader>
            <CardTitle>পেমেন্ট অগ্রগতি</CardTitle>
            <CardDescription>মাসিক পেমেন্ট সংগ্রহের অবস্থা</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm font-medium">
                <span>
                  সংগৃহীত: {formatCurrency(billingStats.totalCollected)}
                </span>
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

        {/* Member Bills Table */}
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
                          <span className="font-semibold">
                            {bill.totalMeals}
                          </span>
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
                              bill.dueAmount > 0
                                ? "text-red-600"
                                : "text-green-600"
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

        {/* Payment Methods Summary */}
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
                    <div
                      key={key}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <span className="text-lg mr-2">{method.icon}</span>
                        <span className="font-medium">{method.name}</span>
                      </div>
                      <span className="font-bold">
                        {formatCurrency(amount)}
                      </span>
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

        {/* Recent Payments */}
        <Card>
          <CardHeader>
            <CardTitle>সাম্প্রতিক পেমেন্ট</CardTitle>
            <CardDescription>গত কয়েকদিনের পেমেন্ট ইতিহাস</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {memberBills
                .filter((bill) => bill.paymentDate)
                .sort(
                  (a, b) => new Date(b.paymentDate) - new Date(a.paymentDate)
                )
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
          </CardContent>{" "}
        </Card>
      </div>
      {/* Modals */}
      <PaymentModal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        onSubmit={handlePaymentSubmit}
        members={members}
        paymentData={
          selectedMemberForPayment
            ? {
                memberId: selectedMemberForPayment.id,
                memberName: selectedMemberForPayment.name,
              }
            : null
        }
      />
      <BillGenerateModal
        isOpen={billGenerateModalOpen}
        onClose={() => setBillGenerateModalOpen(false)}
        onSubmit={handleBillGenerate}
      />
      <BillDetailsModal
        isOpen={billDetailsModalOpen}
        onClose={() => {
          setBillDetailsModalOpen(false);
          setSelectedBillForView(null);
        }}
        billData={selectedBillForView}
      />
    </>
  );
}
