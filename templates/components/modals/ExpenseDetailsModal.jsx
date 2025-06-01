"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ShoppingCartIcon,
  CalendarDaysIcon,
  UserIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  ReceiptPercentIcon,
} from "@heroicons/react/24/outline";
import { formatCurrency, formatDate } from "@/lib/utils";

export function ExpenseDetailsModal({ isOpen, onClose, expenseData }) {
  if (!expenseData) return null;

  const getExpenseTypeInfo = (type) => {
    const types = {
      bazaar: {
        label: "দৈনিক বাজার",
        color: "bg-green-100 text-green-800",
        icon: "🛒",
      },
      fixed: {
        label: "ফিক্সড খরচ",
        color: "bg-blue-100 text-blue-800",
        icon: "💼",
      },
      special: {
        label: "বিশেষ খরচ",
        color: "bg-purple-100 text-purple-800",
        icon: "🎉",
      },
      maintenance: {
        label: "রক্ষণাবেক্ষণ",
        color: "bg-orange-100 text-orange-800",
        icon: "🔧",
      },
    };
    return types[type] || types.bazaar;
  };

  const typeInfo = getExpenseTypeInfo(expenseData.type);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center">
            <DocumentTextIcon className="w-6 h-6 mr-2" />
            খরচের বিস্তারিত তথ্য
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header Info */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">{typeInfo.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {expenseData.description}
                    </h3>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <CalendarDaysIcon className="w-4 h-4 mr-1" />
                        {formatDate(new Date(expenseData.date))}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <UserIcon className="w-4 h-4 mr-1" />
                        {expenseData.addedBy}
                      </div>
                      <Badge className={typeInfo.color}>{typeInfo.label}</Badge>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-green-600">
                    {formatCurrency(expenseData.totalAmount)}
                  </div>
                  <div className="text-sm text-gray-500">মোট খরচ</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Items Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ReceiptPercentIcon className="w-5 h-5 mr-2" />
                পণ্যের বিস্তারিত ({expenseData.items.length}টি আইটেম)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        পণ্যের নাম
                      </th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-700">
                        পরিমাণ
                      </th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-700">
                        একক
                      </th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-700">
                        দর (প্রতি একক)
                      </th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-700">
                        মোট
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {expenseData.items.map((item, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="font-medium text-gray-900">
                            {item.name}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className="font-semibold">{item.quantity}</span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <Badge variant="secondary">{item.unit}</Badge>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <span className="text-gray-600">
                            {formatCurrency(item.unitPrice)}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <span className="font-bold text-gray-900">
                            {formatCurrency(item.total)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-gray-300 bg-gray-50">
                      <td
                        colSpan={4}
                        className="py-3 px-4 text-right font-bold"
                      >
                        সর্বমোট:
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className="text-xl font-bold text-green-600">
                          {formatCurrency(expenseData.totalAmount)}
                        </span>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {expenseData.items.length}
                </div>
                <div className="text-sm text-gray-600">মোট আইটেম</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {expenseData.items
                    .reduce((sum, item) => sum + item.quantity, 0)
                    .toFixed(1)}
                </div>
                <div className="text-sm text-gray-600">মোট পরিমাণ</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">
                  {formatCurrency(
                    expenseData.totalAmount / expenseData.items.length
                  )}
                </div>
                <div className="text-sm text-gray-600">
                  গড় খরচ (প্রতি আইটেম)
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Info */}
          {expenseData.description && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">অতিরিক্ত তথ্য</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{expenseData.description}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
