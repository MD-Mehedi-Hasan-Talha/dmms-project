import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

const WeeklyOverview = ({ weeklyMealData, todayStats }) => {
  return (
    <div className="space-y-6">
      {/* Weekly Chart Section */}
      <Card>
        <CardHeader>
          <CardTitle>সাপ্তাহিক মিল চার্ট</CardTitle>
          <CardDescription>গত ৫ দিনের মিলের তুলনা</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Loop through each day's meal data */}
            {weeklyMealData.map((day, index) => (
              <div key={index} className="space-y-2">
                {/* Date and total meals for the day */}
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{day.date}</span>
                  <span className="text-gray-500">
                    মোট: {day.breakfast + day.lunch + day.dinner}
                  </span>
                </div>
                {/* Display individual meal counts with colors and icons */}
                <div className="grid grid-cols-3 gap-1">
                  <div className="bg-orange-100 rounded px-2 py-1 text-center text-xs">
                    🌅 {day.breakfast}
                  </div>
                  <div className="bg-green-100 rounded px-2 py-1 text-center text-xs">
                    🍽️ {day.lunch}
                  </div>
                  <div className="bg-blue-100 rounded px-2 py-1 text-center text-xs">
                    🌙 {day.dinner}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats Section */}
      <Card>
        <CardHeader>
          <CardTitle>দ্রুত পরিসংখ্যান</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Total meals today */}
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">আজকের মোট মিল</span>
            <span className="font-semibold">
              {todayStats.totalBreakfast +
                todayStats.totalLunch +
                todayStats.totalDinner}
            </span>
          </div>
          {/* Highest attendance meal */}
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">সর্বোচ্চ উপস্থিতি</span>
            <span className="font-semibold">
              দুপুরের খাবার ({todayStats.totalLunch})
            </span>
          </div>
          {/* Average daily meal (hardcoded as 28) */}
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">গড় দৈনিক মিল</span>
            <span className="font-semibold">২৮</span>
          </div>
          {/* Total meals this month (hardcoded as 812) */}
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">এ মাসের মোট</span>
            <span className="font-semibold">৮১২</span>
          </div>
        </CardContent>
      </Card>

      {/* Today's Menu Section */}
      <Card>
        <CardHeader>
          <CardTitle>আজকের মেনু</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Breakfast menu */}
          <div className="flex items-center space-x-3 p-2 bg-orange-50 rounded-lg">
            <span className="text-xl">🌅</span>
            <div>
              <p className="text-sm font-medium">সকালের নাস্তা</p>
              <p className="text-xs text-gray-600">পরোটা ও ডিম</p>
            </div>
          </div>
          {/* Lunch menu */}
          <div className="flex items-center space-x-3 p-2 bg-green-50 rounded-lg">
            <span className="text-xl">🍽️</span>
            <div>
              <p className="text-sm font-medium">দুপুরের খাবার</p>
              <p className="text-xs text-gray-600">ভাত, মাছ, ডাল</p>
            </div>
          </div>
          {/* Dinner menu */}
          <div className="flex items-center space-x-3 p-2 bg-blue-50 rounded-lg">
            <span className="text-xl">🌙</span>
            <div>
              <p className="text-sm font-medium">রাতের খাবার</p>
              <p className="text-xs text-gray-600">খিচুড়ি ও সবজি</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeeklyOverview;
