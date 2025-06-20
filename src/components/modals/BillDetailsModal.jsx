"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Calendar,
  User,
  CreditCard,
  DollarSign,
  Download,
  Send,
} from "lucide-react";
import { formatCurrency, formatDate, getStatusInfo } from "@/lib/utils";

export function BillDetailsModal({ isOpen, onClose, billData }) {
  if (!billData) return null;

  const statusInfo = getStatusInfo(billData.status);
  const StatusIcon = statusInfo.icon;

  const paymentMethods = {
    bkash: { name: "বিকাশ", icon: "📱" },
    nagad: { name: "নগদ", icon: "💰" },
    rocket: { name: "রকেট", icon: "🚀" },
    bank: { name: "ব্যাংক", icon: "🏦" },
    cash: { name: "নগদ", icon: "💵" },
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center">
            <FileText className="w-6 h-6 mr-2" />
            বিলের বিস্তারিত তথ্য
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Member Info Header */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {billData.memberName}
                    </h3>
                    <p className="text-sm text-gray-600">
                      বিল ID: #{billData.id}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">
                    {formatCurrency(billData.totalAmount)}
                  </div>
                  <Badge className={statusInfo.color}>
                    <StatusIcon className="w-3 h-3 mr-1" />
                    {statusInfo.label}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bill Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="w-5 h-5 mr-2" />
                বিল ব্রেকডাউন
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b">
                  <div>
                    <span className="font-medium">মিল কস্ট</span>
                    <p className="text-sm text-gray-600">
                      {billData.totalMeals} মিল × ৳১৫০
                    </p>
                  </div>
                  <span className="font-semibold">
                    {formatCurrency(billData.mealCost)}
                  </span>
                </div>

                <div className="flex justify-between items-center py-3 border-b">
                  <div>
                    <span className="font-medium">অতিরিক্ত চার্জ</span>
                    <p className="text-sm text-gray-600">
                      {billData.extraCost > 0
                        ? "বাড়তি খরচ"
                        : billData.extraCost < 0
                          ? "ছাড়"
                          : "কোন অতিরিক্ত চার্জ নেই"}
                    </p>
                  </div>
                  <span
                    className={`font-semibold ${
                      billData.extraCost > 0
                        ? "text-red-600"
                        : billData.extraCost < 0
                          ? "text-green-600"
                          : "text-gray-600"
                    }`}
                  >
                    {billData.extraCost > 0 ? "+" : ""}
                    {formatCurrency(billData.extraCost)}
                  </span>
                </div>

                <div className="flex justify-between items-center py-3 border-t-2 border-gray-300 bg-gray-50 rounded px-4">
                  <span className="font-bold text-lg">সর্বমোট বিল</span>
                  <span className="font-bold text-xl text-blue-600">
                    {formatCurrency(billData.totalAmount)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="w-5 h-5 mr-2" />
                পেমেন্ট স্ট্যাটাস
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">পেইড অ্যামাউন্ট:</span>
                  <span className="font-semibold text-green-600">
                    {formatCurrency(billData.paidAmount)}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-700">বকেয়া অ্যামাউন্ট:</span>
                  <span
                    className={`font-semibold ${
                      billData.dueAmount > 0 ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {formatCurrency(billData.dueAmount)}
                  </span>
                </div>

                {billData.paymentDate && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">পেমেন্ট তারিখ:</span>
                    <span className="font-medium">
                      {formatDate(new Date(billData.paymentDate))}
                    </span>
                  </div>
                )}

                {billData.paymentMethod && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">পেমেন্ট মেথড:</span>
                    <div className="flex items-center">
                      <span className="mr-2">
                        {paymentMethods[billData.paymentMethod]?.icon}
                      </span>
                      <span className="font-medium">
                        {paymentMethods[billData.paymentMethod]?.name}
                      </span>
                    </div>
                  </div>
                )}

                {/* Payment Progress Bar */}
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>পেমেন্ট অগ্রগতি</span>
                    <span>
                      {Math.round(
                        (billData.paidAmount / billData.totalAmount) * 100
                      )}
                      %
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-green-600 h-3 rounded-full transition-all duration-300"
                      style={{
                        width: `${
                          (billData.paidAmount / billData.totalAmount) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>দ্রুত অ্যাকশন</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Button variant="outline" size="sm" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  PDF ডাউনলোড
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  <Send className="w-4 h-4 mr-2" />
                  SMS পাঠান
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  <Calendar className="w-4 h-4 mr-2" />
                  রিমাইন্ডার সেট
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Meal Details */}
          <Card>
            <CardHeader>
              <CardTitle>মিল বিবরণ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">মোট মিল:</span>
                  <span className="font-semibold ml-2">
                    {billData.totalMeals}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">প্রতি মিল রেট:</span>
                  <span className="font-semibold ml-2">৳১৫০</span>
                </div>
                <div>
                  <span className="text-gray-600">দৈনিক গড় মিল:</span>
                  <span className="font-semibold ml-2">
                    {(billData.totalMeals / 30).toFixed(1)}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">মাসিক খরচ:</span>
                  <span className="font-semibold ml-2">
                    {formatCurrency(billData.mealCost)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
