import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

const MenuFomModal = ({
  menuData,
  setMenuData,
  showMenuForm,
  setEditingMenu,
  editingMenu,
  setMenus,
  setShowMenuForm,
}) => {
  const resetForm = () => {
    setMenuData({
      date: new Date().toISOString().split("T")[0],
      breakfast: "",
      lunch: "",
      dinner: "",
      specialNote: "",
    });
    setEditingMenu(null);
    setShowMenuForm(false);
  };

  const getDayName = (dateString) => {
    const days = [
      "রবিবার",
      "সোমবার",
      "মঙ্গলবার",
      "বুধবার",
      "বৃহস্পতিবার",
      "শুক্রবার",
      "শনিবার",
    ];
    const date = new Date(dateString);
    return days[date.getDay()];
  };

  const handleInputChange = (field, value) => {
    setMenuData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingMenu) {
      // Update existing menu
      setMenus((prev) =>
        prev.map((menu) =>
          menu.id === editingMenu.id
            ? { ...menu, ...menuData, dayName: getDayName(menuData.date) }
            : menu
        )
      );
    } else {
      // Add new menu
      const newMenu = {
        id: Date.now(),
        ...menuData,
        dayName: getDayName(menuData.date),
        isToday: menuData.date === new Date().toISOString().split("T")[0],
      };
      setMenus((prev) => [...prev, newMenu]);
    }

    resetForm();
  };

  return (
    <div>
      {showMenuForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">
                {editingMenu ? "মেনু সম্পাদনা" : "নতুন মেনু যোগ করুন"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="date">তারিখ *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={menuData.date}
                    onChange={(e) => handleInputChange("date", e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="breakfast">নাশতা *</Label>
                  <Textarea
                    id="breakfast"
                    placeholder="নাশতার মেনু লিখুন..."
                    value={menuData.breakfast}
                    onChange={(e) =>
                      handleInputChange("breakfast", e.target.value)
                    }
                    required
                    rows={2}
                  />
                </div>

                <div>
                  <Label htmlFor="lunch">দুপুরের খাবার *</Label>
                  <Textarea
                    id="lunch"
                    placeholder="দুপুরের খাবারের মেনু লিখুন..."
                    value={menuData.lunch}
                    onChange={(e) => handleInputChange("lunch", e.target.value)}
                    required
                    rows={2}
                  />
                </div>

                <div>
                  <Label htmlFor="dinner">রাতের খাবার *</Label>
                  <Textarea
                    id="dinner"
                    placeholder="রাতের খাবারের মেনু লিখুন..."
                    value={menuData.dinner}
                    onChange={(e) =>
                      handleInputChange("dinner", e.target.value)
                    }
                    required
                    rows={2}
                  />
                </div>

                <div>
                  <Label htmlFor="specialNote">বিশেষ নোট (ঐচ্ছিক)</Label>
                  <Textarea
                    id="specialNote"
                    placeholder="কোনো বিশেষ নোট বা তথ্য..."
                    value={menuData.specialNote}
                    onChange={(e) =>
                      handleInputChange("specialNote", e.target.value)
                    }
                    rows={2}
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={resetForm}
                    className="flex-1"
                  >
                    বাতিল
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    {editingMenu ? "আপডেট করুন" : "সংরক্ষণ করুন"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuFomModal;
