import {
  ChartBarIcon,
  CheckCircleIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  UsersIcon,
} from "lucide-react";
import {
  CurrencyDollarIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

const stats = {
  totalMembers: 12,
  activeMembers: 10,
  totalMeals: 280,
  todayMeals: 18,
  monthlyExpense: 42000,
  dailyExpense: 1400,
  mealRate: 150,
  totalDue: 3500,
  lastMonthMealRate: 145,
};

const mealRateChange = (
  ((stats.mealRate - stats.lastMonthMealRate) / stats.lastMonthMealRate) *
  100
).toFixed(1);

export const statsData = [
  {
    title: "সদস্য সংখ্যা",
    value: `${stats.activeMembers}/${stats.totalMembers}`,
    subtext: `${stats.activeMembers} জন সক্রিয়`,
    icon: UsersIcon,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-100",
  },
  {
    title: "আজকের মিল",
    value: stats.todayMeals,
    subtext: `মোট: ${stats.totalMeals} (এই মাসে)`,
    icon: CurrencyDollarIcon,
    iconColor: "text-green-600",
    iconBg: "bg-green-100",
  },
  {
    title: "মিল রেট",
    value: `৳${stats.mealRate}`,
    subtext: `${mealRateChange}% গত মাস থেকে`,
    icon: parseFloat(mealRateChange) > 0 ? TrendingUpIcon : TrendingDownIcon,
    iconColor:
      parseFloat(mealRateChange) > 0 ? "text-red-500" : "text-green-500",
    iconBg: "bg-purple-100",
    isChange: true,
  },
  {
    title: "মোট বকেয়া",
    value: `৳${stats.totalDue}`,
    subtext: "৩ জনের বকেয়া আছে",
    icon: ExclamationTriangleIcon,
    iconColor: "text-red-600",
    iconBg: "bg-red-100",
  },
];

export const todayMenu = {
  breakfast: "পরোটা ও ডিম",
  lunch: "ভাত, মাছের তরকারি, ডাল",
  dinner: "খিচুড়ি ও আলুর তরকারি",
};

export const upcomingTasks = [
  {
    id: 1,
    task: "মাসিক বিল জেনারেশন",
    dueDate: "২৯ মে, ২০২৫",
    priority: "high",
    status: "pending",
  },
  {
    id: 2,
    task: "গ্যাস বিল পেমেন্ট",
    dueDate: "৩০ মে, ২০২৫",
    priority: "medium",
    status: "pending",
  },
  {
    id: 3,
    task: "নতুন সদস্য অনবোর্ডিং",
    dueDate: "১ জুন, ২০২৫",
    priority: "low",
    status: "in_progress",
  },
];

export const recentActivities = [
  {
    id: 1,
    type: "meal",
    message: "রহিম উদ্দিন আজকের লাঞ্চ এন্ট্রি করেছেন",
    time: "১০ মিনিট আগে",
    icon: CurrencyDollarIcon,
    color: "text-green-600",
  },
  {
    id: 2,
    type: "expense",
    message: "নতুন বাজার এন্ট্রি: ৳১,২০০",
    time: "৩০ মিনিট আগে",
    icon: ChartBarIcon,
    color: "text-blue-600",
  },
  {
    id: 3,
    type: "payment",
    message: "করিম সাহেব ৳২,৫০০ পেমেন্ট করেছেন",
    time: "১ ঘন্টা আগে",
    icon: CheckCircleIcon,
    color: "text-purple-600",
  },
  {
    id: 4,
    type: "member",
    message: "নাসির হোসেন নতুন সদস্য হিসেবে যোগ দিয়েছেন",
    time: "২ ঘন্টা আগে",
    icon: UsersIcon,
    color: "text-orange-600",
  },
];
