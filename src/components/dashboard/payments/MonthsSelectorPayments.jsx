import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency, getMonthName } from "@/lib/utils";
export default function MonthsSelectorPayments({
  selectedMonthYear,
  setSelectedMonthYear,
  mealRate = 100,
  totalMeals = 0,
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {getMonthName(selectedMonthYear.month)} {selectedMonthYear.year}{" "}
              এর বিল
            </h2>
            <p className="text-sm text-gray-600">
              মিল রেট: {formatCurrency(mealRate)} | মোট মিল: {totalMeals}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <select
              className="p-2 border border-gray-300 rounded-md"
              value={selectedMonthYear.month}
              onChange={(e) =>
                setSelectedMonthYear((prev) => ({
                  ...prev,
                  month: parseInt(e.target.value),
                }))
              }
            >
              {[...Array(12)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {getMonthName(i + 1)}
                </option>
              ))}
            </select>
            <select
              className="p-2 border border-gray-300 rounded-md"
              value={selectedMonthYear.year}
              onChange={(e) =>
                setSelectedMonthYear((prev) => ({
                  ...prev,
                  year: parseInt(e.target.value),
                }))
              }
            >
              <option value="2025">২০২৫</option>
              <option value="2024">২০২৪</option>
            </select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
