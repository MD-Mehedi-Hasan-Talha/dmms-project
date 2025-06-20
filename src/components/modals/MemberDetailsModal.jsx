"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  UserCircleIcon,
  PhoneIcon,
  EnvelopeIcon,
  CalendarIcon,
  CurrencyBangladeshiIcon,
} from "@heroicons/react/24/outline";

export function MemberDetailsModal({ isOpen, onClose, memberData }) {
  if (!memberData) return null;

  const getRoleBadge = (role) => {
    const roleMap = {
      admin: {
        label: "অ্যাডমিন",
        color:
          "bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200",
      },
      sub_admin: {
        label: "সাব-অ্যাডমিন",
        color:
          "bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-200",
      },
      member: {
        label: "সদস্য",
        color:
          "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200",
      },
      cook: {
        label: "রাঁধুনি",
        color:
          "bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-200",
      },
    };
    const roleInfo = roleMap[role] || roleMap.member;
    return <Badge className={roleInfo.color}>{roleInfo.label}</Badge>;
  };

  const getStatusBadge = (status) => {
    return status === "active" ? (
      <Badge className="bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200">
        সক্রিয়
      </Badge>
    ) : (
      <Badge className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
        নিষ্ক্রিয়
      </Badge>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            সদস্যের বিস্তারিত তথ্য
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Profile Section */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                  <UserCircleIcon className="w-10 h-10 text-gray-500" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900">
                    {memberData.name}
                  </h3>
                  <div className="flex items-center space-x-2 mt-1">
                    {getRoleBadge(memberData.role)}
                    {getStatusBadge(memberData.status)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card>
            <CardContent className="p-6">
              <h4 className="font-semibold text-gray-900 mb-4">
                যোগাযোগের তথ্য
              </h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <PhoneIcon className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">{memberData.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <EnvelopeIcon className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">{memberData.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CalendarIcon className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">
                    যোগদান:{" "}
                    {new Date(memberData.joinDate).toLocaleDateString("bn-BD")}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Financial Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {memberData.totalMeals}
                </div>
                <div className="text-sm text-gray-600">মোট মিল</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">
                  ৳{memberData.totalPaid}
                </div>
                <div className="text-sm text-gray-600">মোট পেমেন্ট</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <div
                  className={`text-2xl font-bold ${
                    memberData.due > 0 ? "text-red-600" : "text-green-600"
                  }`}
                >
                  ৳{memberData.due}
                </div>
                <div className="text-sm text-gray-600">বকেয়া</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
