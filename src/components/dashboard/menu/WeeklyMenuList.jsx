import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PencilIcon, TrashIcon } from "lucide-react";
import React from "react";

const WeeklyMenuList = ({
  menus,
  setMenus,
  setEditingMenu,
  setMenuData,
  setShowMenuForm,
  getMealIcon,
}) => {
  const handleEdit = (menu) => {
    setEditingMenu(menu);
    setMenuData({
      date: menu.date,
      breakfast: menu.breakfast,
      lunch: menu.lunch,
      dinner: menu.dinner,
      specialNote: menu.specialNote || "",
    });
    setShowMenuForm(true);
  };

  const handleDelete = (menuId) => {
    setMenus((prev) => prev.filter((menu) => menu.id !== menuId));
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>সাপ্তাহিক মেনু তালিকা</CardTitle>
        <CardDescription>সপ্তাহের সকল দিনের মেনু একনজরে দেখুন</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {menus.map((menu) => (
            <div
              key={menu.id}
              className={`border rounded-lg p-4 ${
                menu.isToday
                  ? "border-green-300 bg-green-50"
                  : "border-gray-200"
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">
                    {menu.dayName}
                    {menu.isToday && (
                      <Badge className="ml-2 bg-green-100 text-green-800">
                        আজ
                      </Badge>
                    )}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {new Date(menu?.date).toLocaleDateString("bn-BD")}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(menu)}
                  >
                    <PencilIcon className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-600 hover:text-red-700"
                    onClick={() => handleDelete(menu.id)}
                  >
                    <TrashIcon className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {getMealIcon("breakfast")}
                    <span className="text-sm font-medium">নাশতা</span>
                  </div>
                  <p className="text-sm text-gray-600">{menu.breakfast}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {getMealIcon("lunch")}
                    <span className="text-sm font-medium">দুপুর</span>
                  </div>
                  <p className="text-sm text-gray-600">{menu.lunch}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {getMealIcon("dinner")}
                    <span className="text-sm font-medium">রাত</span>
                  </div>
                  <p className="text-sm text-gray-600">{menu.dinner}</p>
                </div>
              </div>

              {menu.specialNote && (
                <div className="mt-3 p-2 bg-blue-50 border border-blue-200 rounded">
                  <p className="text-sm text-blue-800">
                    <span className="font-medium">বিশেষ নোট:</span>{" "}
                    {menu.specialNote}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeeklyMenuList;
