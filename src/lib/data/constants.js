import {
  UserCircleIcon,
  ClockIcon,
  ChartBarIcon,
  KeyIcon,
  BellIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

export const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export const ROLES = [
  { value: "admin", label: "প্রশাসক" },
  { value: "manager", label: "ম্যানেজার" },
  { value: "member", label: "সদস্য" },
];

export const TABS = [
  { id: "profile", label: "প্রোফাইল তথ্য", icon: UserCircleIcon },
  { id: "activity", label: "কার্যক্রম", icon: ClockIcon },
  { id: "statistics", label: "পরিসংখ্যান", icon: ChartBarIcon },
  { id: "security", label: "নিরাপত্তা", icon: KeyIcon },
  { id: "preferences", label: "পছন্দসমূহ", icon: BellIcon },
];

export const ACTIVITY_ICONS = {
  meal: ChartBarIcon,
  payment: CurrencyDollarIcon,
  feedback: DocumentTextIcon,
  default: ClockIcon,
};

export const ACTIVITY_COLORS = {
  meal: "text-green-600",
  payment: "text-blue-600",
  feedback: "text-purple-600",
  default: "text-gray-600",
};

export const STATS_ICONS = {
  totalMeals: ChartBarIcon,
  thisMonthMeals: CalendarDaysIcon,
  totalPayments: CurrencyDollarIcon,
  lastPayment: CheckCircleIcon,
  feedbackGiven: DocumentTextIcon,
  daysActive: ClockIcon,
};

export const STATS_COLORS = {
  totalMeals: "text-green-600",
  thisMonthMeals: "text-blue-600",
  totalPayments: "text-purple-600",
  lastPayment: "text-green-600",
  feedbackGiven: "text-orange-600",
  daysActive: "text-red-600",
};
