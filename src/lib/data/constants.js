import {
  BanknotesIcon,
  BellIcon,
  CalendarDaysIcon, // দ্বিতীয় ফাইল থেকে
  CalendarIcon,
  ChartBarIcon,
  CheckCircleIcon,
  ClockIcon,
  CurrencyDollarIcon, // দ্বিতীয় ফাইল থেকে
  DevicePhoneMobileIcon,
  DocumentTextIcon, // দ্বিতীয় ফাইল থেকে
  EnvelopeIcon,
  KeyIcon, // দ্বিতীয় ফাইল থেকে
  ShieldCheckIcon, // দ্বিতীয় ফাইল থেকে
  ShoppingCartIcon,
  UserCircleIcon,
  UserIcon, // দ্বিতীয় ফাইল থেকে
} from "@heroicons/react/24/outline";

// === মৌলিক তথ্য (Basic Information) ===

export const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export const ROLES = [
  { value: "admin", label: "প্রশাসক" },
  { value: "manager", label: "ম্যানেজার" },
  { value: "member", label: "সদস্য" },
];

// === ট্যাব কনফিগারেশন (Tab Configuration) ===
// এখানে আইকনসহ বিস্তারিত ট্যাব কনফিগারেশন রাখা হয়েছে।
export const TABS_CONFIG = [
  {
    id: "profile",
    value: "profile",
    label: "প্রোফাইল তথ্য",
    icon: UserCircleIcon,
  },
  { id: "activity", value: "activity", label: "কার্যক্রম", icon: ClockIcon },
  { id: "statistics", value: "stats", label: "পরিসংখ্যান", icon: ChartBarIcon },
  { id: "security", value: "security", label: "নিরাপত্তা", icon: KeyIcon },
  {
    id: "preferences",
    value: "preferences",
    label: "পছন্দসমূহ",
    icon: BellIcon,
  },
];

// === কার্যক্রম আইকন ও রঙ (Activity Icons & Colors) ===
// উভয় ফাইলের আইকনগুলোকে একত্রিত করা হয়েছে এবং একটি স্ট্যান্ডার্ড গঠন অনুসরণ করা হয়েছে।
// এখানে সরাসরি আইকন কম্পোনেন্ট এক্সপোর্ট করা হচ্ছে, JSX এলিমেন্ট নয়।

export const ACTIVITY_ICONS = {
  meal: ChartBarIcon,
  payment: BanknotesIcon, // BanknotesIcon ব্যবহার করা হলো CurrencyDollarIcon এর পরিবর্তে
  feedback: DocumentTextIcon,
  profile: UserIcon,
  expense: ShoppingCartIcon,
  default: CalendarIcon, // CalendarIcon ব্যবহার করা হলো ClockIcon এর পরিবর্তে
};

export const ACTIVITY_COLORS = {
  meal: "text-blue-500",
  payment: "text-green-500",
  feedback: "text-purple-600",
  profile: "text-purple-500",
  expense: "text-orange-500",
  default: "text-gray-500",
};

// === পরিসংখ্যান আইকন ও রঙ (Statistics Icons & Colors) ===

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

// === নিরাপত্তা অপশন (Security Options) ===
// এখানে JSX এলিমেন্টসহ এক্সপোর্ট করা হয়েছে কারণ আইকনের সাইজ নির্দিষ্ট।

export const SECURITY_OPTIONS = [
  {
    id: "2fa",
    icon: <ShieldCheckIcon className="w-5 h-5 text-green-600" />,
    title: "টু-ফ্যাক্টর অথেন্টিকেশন",
    description: "অতিরিক্ত নিরাপত্তার জন্য সক্রিয় করুন",
    buttonLabel: "সক্রিয় করুন",
  },
  {
    id: "sms",
    icon: <DevicePhoneMobileIcon className="w-5 h-5 text-blue-600" />,
    title: "SMS বিজ্ঞপ্তি",
    description: "গুরুত্বপূর্ণ আপডেটের জন্য SMS পান",
    buttonLabel: "সক্রিয়",
  },
  {
    id: "email",
    icon: <EnvelopeIcon className="w-5 h-5 text-purple-600" />,
    title: "ইমেইল বিজ্ঞপ্তি",
    description: "ইমেইলে নিয়মিত আপডেট পান",
    buttonLabel: "সক্রিয়",
  },
];

export const getExpenseTypeInfo = (type) => {
  const types = {
    bazaar: {
      label: "দৈনিক বাজার",
      color: "bg-green-100 text-green-800",
      icon: "🛒",
    },
    fixed: {
      label: "ফিক্সড খরচ",
      color: "bg-blue-100 text-blue-800",
      icon: "💼",
    },
    special: {
      label: "বিশেষ খরচ",
      color: "bg-purple-100 text-purple-800",
      icon: "🎉",
    },
    maintenance: {
      label: "রক্ষণাবেক্ষণ",
      color: "bg-orange-100 text-orange-800",
      icon: "🔧",
    },
    default: {
      label: "অন্যান্য খরচ",
      color: "bg-gray-100 text-gray-800",
      icon: "🧾",
    },
  };
  return types[type] || types.default;
};

export const getExpenseCategories = (expenses) => [
  { id: "all", name: "সকল ক্যাটাগরি", count: expenses.length },
  {
    id: "bazaar",
    name: "দৈনিক বাজার",
    count: expenses.filter((e) => e.type === "bazaar").length,
  },
  {
    id: "fixed",
    name: "ফিক্সড খরচ",
    count: expenses.filter((e) => e.type === "fixed").length,
  },
  {
    id: "special",
    name: "বিশেষ খরচ",
    count: expenses.filter((e) => e.type === "special").length,
  },
  {
    id: "maintenance",
    name: "রক্ষণাবেক্ষণ",
    count: expenses.filter((e) => e.type === "maintenance").length,
  },
];

export const initialMonthlyStats = {
  totalExpense: 45000,
  bazaarExpense: 32000,
  fixedExpense: 13000,
  averageDaily: 1500,
  transactionCount: 24,
};
