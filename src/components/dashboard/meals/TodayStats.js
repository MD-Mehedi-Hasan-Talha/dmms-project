import { Card, CardContent } from "@/components/ui/card";

import { statsConfig } from "@/lib/data-file";

const TodayStats = ({ todayStats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {statsConfig.map(({ icon, label, key }, index) => {
        // @ Check if the last card should span 2 columns on medium screens when the total count is odd
        const isLastOddMd =
          statsConfig.length % 2 === 1 && index === statsConfig.length - 1;

        return (
          <Card
            key={key}
            // @ Conditionally apply column span for layout adjustment
            className={isLastOddMd ? "md:col-span-2 lg:col-span-1" : ""}
          >
            <CardContent className="p-6">
              <div className="flex items-center">
                {/* @ Display the icon */}
                <div className="text-2xl mr-3">{icon}</div>
                <div>
                  {/* @ Display the label */}
                  <p className="text-sm font-medium text-gray-600">{label}</p>
                  {/* @ Display the corresponding stat value */}
                  <p className="text-2xl font-bold text-gray-900">
                    {todayStats[key]}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default TodayStats;
