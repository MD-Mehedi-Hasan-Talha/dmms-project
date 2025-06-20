import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CheckCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function MealStatusCard({ icon, label, present }) {
  return (
    // Card with conditional ring color based on presence status
    <Card className={present ? "ring-2 ring-green-200" : "ring-2 ring-red-200"}>
      {/* Card header containing label and icon */}
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center justify-center">
          {/* Display the passed icon with some right margin */}
          <span className="text-xl mr-2">{icon}</span>
          {/* Label describing the meal/status */}
          {label}
        </CardTitle>
      </CardHeader>

      {/* Card content showing presence status */}
      <CardContent className="pt-0 text-center">
        {present ? (
          // If present, show green check icon and "উপস্থিত" text
          <div className="text-green-600">
            <CheckCircleIcon className="w-8 h-8 mx-auto mb-2" />
            <div className="text-sm font-medium">উপস্থিত</div>
          </div>
        ) : (
          // If absent, show red cross icon and "অনুপস্থিত" text
          <div className="text-red-500">
            <XMarkIcon className="w-8 h-8 mx-auto mb-2" />
            <div className="text-sm font-medium">অনুপস্থিত</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
