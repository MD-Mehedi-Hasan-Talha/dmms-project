"use client";
import { CalendarDaysIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { formatDate } from "@/lib/utils";
import { todayMenu } from "@/lib/data/dashboardV2";

const MenuBoard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <CalendarDaysIcon className="w-5 h-5 mr-2" />
          আজকের মেনু
        </CardTitle>
        <CardDescription>
          {formatDate(new Date())} - আজকের খাবারের তালিকা
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <h3 className="font-semibold text-orange-800 mb-2">
              সকালের নাস্তা
            </h3>
            <p className="text-sm text-orange-600">{todayMenu.breakfast}</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <h3 className="font-semibold text-green-800 mb-2">দুপুরের খাবার</h3>
            <p className="text-sm text-green-600">{todayMenu.lunch}</p>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">রাতের খাবার</h3>
            <p className="text-sm text-blue-600">{todayMenu.dinner}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MenuBoard;
