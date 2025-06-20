import { Card, CardContent } from "@/components/ui/card";

export default function MealSummaryCard({ totalMeals, guests }) {
  return (
    // Card container with a light gray background
    <Card className="bg-gray-50">
      {/* Card content with padding */}
      <CardContent className="p-4">
        {/* Grid layout with 2 columns and gap between them, centered text */}
        <div className="grid grid-cols-2 gap-4 text-center">
          {/* Total Meals Section */}
          <div>
            {/* Display total meals with large blue bold text */}
            <div className="text-lg font-bold text-blue-600">{totalMeals}</div>
            {/* Label below the number */}
            <div className="text-sm text-gray-600">মোট মিল</div>
          </div>

          {/* Guest Meals Section */}
          <div>
            {/* Display guest meals with large purple bold text */}
            <div className="text-lg font-bold text-purple-600">{guests}</div>
            {/* Label below the number */}
            <div className="text-sm text-gray-600">অতিথি মিল</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
