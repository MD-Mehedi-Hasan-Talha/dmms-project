import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalendarDaysIcon } from "lucide-react";
import React from "react";

const SpecialMenuBoard = ({ getMealIcon, menus }) => {
  const todaysMenu = menus.find((menu) => menu.isToday);
  return (
    <div>
      {todaysMenu && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center gap-2">
              <CalendarDaysIcon className="h-5 w-5" />
              আজকের বিশেষ মেনু - {todaysMenu.dayName}
            </CardTitle>
            <CardDescription className="text-green-600">
              {new Date(todaysMenu.date).toLocaleDateString("bn-BD")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg border">
                <div className="flex items-center gap-2 mb-2">
                  {getMealIcon("breakfast")}
                  <h3 className="font-semibold text-gray-800">নাশতা</h3>
                </div>
                <p className="text-gray-600">{todaysMenu.breakfast}</p>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <div className="flex items-center gap-2 mb-2">
                  {getMealIcon("lunch")}
                  <h3 className="font-semibold text-gray-800">দুপুরের খাবার</h3>
                </div>
                <p className="text-gray-600">{todaysMenu.lunch}</p>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <div className="flex items-center gap-2 mb-2">
                  {getMealIcon("dinner")}
                  <h3 className="font-semibold text-gray-800">রাতের খাবার</h3>
                </div>
                <p className="text-gray-600">{todaysMenu.dinner}</p>
              </div>
            </div>
            {todaysMenu.specialNote && (
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-800 font-medium">
                  <span className="font-semibold">বিশেষ নোট:</span>{" "}
                  {todaysMenu.specialNote}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SpecialMenuBoard;
