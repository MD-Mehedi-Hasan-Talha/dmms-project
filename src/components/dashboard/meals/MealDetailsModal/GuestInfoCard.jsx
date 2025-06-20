import { Card, CardContent } from "@/components/ui/card";

export default function GuestInfoCard({ guests }) {
  // If there are no guests or guests is less than or equal to 0, don't render anything
  if (guests <= 0) return null;

  return (
    <Card>
      <CardContent className="p-4">
        {/* Container to center the icon and text with spacing */}
        <div className="flex items-center justify-center space-x-3">
          {/* Guest icon */}
          <span className="text-2xl">👥</span>

          {/* Guest count and label */}
          <div className="text-center">
            {/* Number of guests with styling */}
            <div className="text-lg font-bold text-purple-600">{guests}</div>
            {/* Label for the number */}
            <div className="text-sm text-gray-600">অতিথি মিল</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
