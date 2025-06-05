"use client";

import { useState } from "react";
import { SunIcon, MoonIcon, StarIcon } from "@heroicons/react/24/outline";
import { weeklyMenu } from "@/lib/data/mockData";
import MenuHeader from "@/components/dashboard/menu/MenuHeader";
import SpecialMenuBoard from "@/components/dashboard/menu/SpecialMenuBoard";
import WeeklyMenuList from "@/components/dashboard/menu/WeeklyMenuList";
import MenuFomModal from "@/components/dashboard/menu/MenuFomModal";

export default function MenuPage() {
  const [showMenuForm, setShowMenuForm] = useState(false);
  const [editingMenu, setEditingMenu] = useState(null);
  const [menuData, setMenuData] = useState({
    date: new Date().toISOString().split("T")[0],
    breakfast: "",
    lunch: "",
    dinner: "",
    specialNote: "",
  });

  const [menus, setMenus] = useState(weeklyMenu);

  const getMealIcon = (mealType) => {
    switch (mealType) {
      case "breakfast":
        return <SunIcon className="h-5 w-5 text-yellow-500" />;
      case "lunch":
        return <StarIcon className="h-5 w-5 text-orange-500" />;
      case "dinner":
        return <MoonIcon className="h-5 w-5 text-indigo-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <MenuHeader setShowMenuForm={setShowMenuForm} />
      <SpecialMenuBoard getMealIcon={getMealIcon} menus={menus} />
      <WeeklyMenuList
        menus={menus}
        setMenus={setMenus}
        setEditingMenu={setEditingMenu}
        setMenuData={setMenuData}
        setShowMenuForm={setShowMenuForm}
        getMealIcon={getMealIcon}
      />
      <MenuFomModal
        menuData={menuData}
        setMenuData={setMenuData}
        showMenuForm={showMenuForm}
        setEditingMenu={setEditingMenu}
        editingMenu={editingMenu}
        setMenus={setMenus}
        setShowMenuForm={setShowMenuForm}
      />
    </div>
  );
}
