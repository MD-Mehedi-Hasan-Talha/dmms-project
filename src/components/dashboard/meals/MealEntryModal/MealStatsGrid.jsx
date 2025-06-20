import { getMealStats } from "@/lib/data-file"; // Import the function that generates stat items based on meal totals

// A component to display a grid of meal statistics using styled cards
const MealStatsGrid = ({ totals }) => {
  // Generate stats data from the totals prop using the utility function
  const stats = getMealStats(totals);

  return (
    // Responsive grid layout: 2 columns on small screens, 4 on medium+
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {/* Map through each stat item and render a styled card */}
      {stats.map((item, index) => (
        <div
          key={index}
          className={`${item.bg} p-4 rounded-lg text-center shadow-sm`}
        >
          {/* Emoji icon for visual context */}
          <div className="text-2xl mb-1">{item.icon}</div>

          {/* Label for the stat (e.g., Breakfast, Lunch) */}
          <div className={`font-semibold ${item.textColor}`}>{item.label}</div>

          {/* Numeric value of the stat */}
          <div className={`text-xl font-bold ${item.valueColor}`}>
            {item.value}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MealStatsGrid;
