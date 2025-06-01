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
  CheckCircleIcon,
  XMarkIcon,
  UserGroupIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";

export function MealDetailsModal({
  isOpen,
  onClose,
  memberData,
  selectedDate,
}) {
  if (!memberData) return null;

  const getMealStatus = (member) => {
    const totalMeals = [member.breakfast, member.lunch, member.dinner].filter(
      Boolean
    ).length;
    if (totalMeals === 0)
      return { label: "অনুপস্থিত", color: "bg-red-100 text-red-800" };
    if (totalMeals === 3)
      return { label: "সম্পূর্ণ", color: "bg-green-100 text-green-800" };
    return { label: "আংশিক", color: "bg-yellow-100 text-yellow-800" };
  };

  const totalMeals = [
    memberData.breakfast,
    memberData.lunch,
    memberData.dinner,
  ].filter(Boolean).length;
  const status = getMealStatus(memberData);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center">
            <UserGroupIcon className="w-6 h-6 mr-2" />
            {memberData.name} - মিলের বিস্তারিত
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header Info */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {memberData.name}
                  </h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <CalendarDaysIcon className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">
                      {new Date(selectedDate).toLocaleDateString("bn-BD")}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={status.color}>{status.label}</Badge>
                  <div className="text-sm text-gray-600 mt-1">
                    মোট মিল: {totalMeals}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Meal Status */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card
              className={
                memberData.breakfast
                  ? "ring-2 ring-green-200"
                  : "ring-2 ring-red-200"
              }
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center justify-center">
                  <span className="text-xl mr-2">🌅</span>
                  সকালের নাস্তা
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 text-center">
                {memberData.breakfast ? (
                  <div className="text-green-600">
                    <CheckCircleIcon className="w-8 h-8 mx-auto mb-2" />
                    <div className="text-sm font-medium">উপস্থিত</div>
                  </div>
                ) : (
                  <div className="text-red-500">
                    <XMarkIcon className="w-8 h-8 mx-auto mb-2" />
                    <div className="text-sm font-medium">অনুপস্থিত</div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card
              className={
                memberData.lunch
                  ? "ring-2 ring-green-200"
                  : "ring-2 ring-red-200"
              }
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center justify-center">
                  <span className="text-xl mr-2">🍽️</span>
                  দুপুরের খাবার
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 text-center">
                {memberData.lunch ? (
                  <div className="text-green-600">
                    <CheckCircleIcon className="w-8 h-8 mx-auto mb-2" />
                    <div className="text-sm font-medium">উপস্থিত</div>
                  </div>
                ) : (
                  <div className="text-red-500">
                    <XMarkIcon className="w-8 h-8 mx-auto mb-2" />
                    <div className="text-sm font-medium">অনুপস্থিত</div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card
              className={
                memberData.dinner
                  ? "ring-2 ring-green-200"
                  : "ring-2 ring-red-200"
              }
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center justify-center">
                  <span className="text-xl mr-2">🌙</span>
                  রাতের খাবার
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 text-center">
                {memberData.dinner ? (
                  <div className="text-green-600">
                    <CheckCircleIcon className="w-8 h-8 mx-auto mb-2" />
                    <div className="text-sm font-medium">উপস্থিত</div>
                  </div>
                ) : (
                  <div className="text-red-500">
                    <XMarkIcon className="w-8 h-8 mx-auto mb-2" />
                    <div className="text-sm font-medium">অনুপস্থিত</div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Guest Info */}
          {memberData.guests > 0 && (
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-center space-x-3">
                  <span className="text-2xl">👥</span>
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-600">
                      {memberData.guests}
                    </div>
                    <div className="text-sm text-gray-600">অতিথি মিল</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Summary */}
          <Card className="bg-gray-50">
            <CardContent className="p-4">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-blue-600">
                    {totalMeals}
                  </div>
                  <div className="text-sm text-gray-600">মোট মিল</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-purple-600">
                    {memberData.guests}
                  </div>
                  <div className="text-sm text-gray-600">অতিথি মিল</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
