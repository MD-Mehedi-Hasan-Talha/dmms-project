export default function StatsCard({ color, costBreakdown, Icon }) {
  // TODO: Implement common card later
  return (
    <Card
      className={`bg-gradient-to-r from-${color}-500 to-${color}-600 text-white`}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100">আজকের খরচ</p>
            <p className="text-2xl font-bold">
              {formatCurrency(data.daily.today.total)}
            </p>
            <div className="flex items-center mt-1">
              {data.daily.change > 0 ? (
                <ArrowUpIcon className="w-4 h-4 text-blue-200 mr-1" />
              ) : (
                <ArrowDownIcon className="w-4 h-4 text-blue-200 mr-1" />
              )}
              <span className="text-blue-200 text-sm">
                {Math.abs(data.daily.change).toFixed(1)}%
              </span>
            </div>
          </div>
          <Icon className="w-8 h-8 text-blue-200" />
        </div>
      </CardContent>
    </Card>
  );
}
