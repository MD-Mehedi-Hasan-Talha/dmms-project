"use client";

import { Card, CardContent } from "@/components/ui/card";

import { UsersIcon } from "@heroicons/react/24/outline";

export default function MembersStats({
  members,
  activeMembers,
  totalDue,
  totalMeals,
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <UsersIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">মোট সদস্য</p>
              <p className="text-2xl font-bold text-gray-900">
                {members.length}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <UsersIcon className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">সক্রিয় সদস্য</p>
              <p className="text-2xl font-bold text-gray-900">
                {activeMembers}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <UsersIcon className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">মোট মিল</p>
              <p className="text-2xl font-bold text-gray-900">{totalMeals}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <UsersIcon className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">মোট বকেয়া</p>
              <p className="text-2xl font-bold text-gray-900">৳{totalDue}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
