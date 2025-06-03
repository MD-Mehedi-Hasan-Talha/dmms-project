import StatisticsCard from "./StatisticsCard";

export default function UserStatistics({ stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Object.entries(stats).map(([key, data]) => (
        <StatisticsCard key={key} statKey={key} statData={data} />
      ))}
    </div>
  );
}
