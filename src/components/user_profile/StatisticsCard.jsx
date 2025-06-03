import { Card, CardContent } from "@/components/ui/card";
import { STATS_ICONS, STATS_COLORS } from "@/lib/data/constants";

export default function StatisticsCard({ statKey, statData }) {
  const Icon = STATS_ICONS[statKey];
  const color = STATS_COLORS[statKey];
  const displayValue = statData.isCurrency
    ? `৳${statData.value.toLocaleString()}`
    : statData.value;

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">
              {statData.label}
            </p>
            <p className="text-2xl font-bold text-gray-900">{displayValue}</p>
          </div>
          {Icon && <Icon className={`h-8 w-8 ${color}`} />}
        </div>
      </CardContent>
    </Card>
  );
}
