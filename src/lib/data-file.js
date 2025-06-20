import {
  BellIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
  ClockIcon,
  CogIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  ShieldCheckIcon,
  ShoppingCartIcon,
  UserGroupIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

// Tabs for settings pages
export const settingsTabs = {
  general: { name: "সাধারণ", icon: CogIcon },
  financial: { name: "আর্থিক", icon: CurrencyDollarIcon },
  notifications: { name: "নোটিফিকেশন", icon: BellIcon },
  security: { name: "নিরাপত্তা", icon: ShieldCheckIcon },
  users: { name: "ব্যবহারকারী", icon: UserIcon },
  backup: { name: "ব্যাকআপ", icon: DocumentTextIcon },
};

export const settingsConfig = [
  {
    key: "general",
    title: "সাধারণ সেটিংস",
    description: "মেস ব্যবস্থাপনার মৌলিক তথ্য",
    fields: [
      { label: "মেসের নাম", type: "text", name: "messName" },
      { label: "ফোন নম্বর", type: "text", name: "phone" },
      { label: "ঠিকানা", type: "text", name: "address" },
      { label: "ইমেইল", type: "email", name: "email" },
      {
        label: "ভাষা",
        type: "select",
        name: "language",
        options: [
          { value: "bn", label: "বাংলা" },
          { value: "en", label: "English" },
        ],
      },
    ],
  },
  {
    key: "financial",
    title: "আর্থিক সেটিংস",
    description: "মিল রেট এবং আর্থিক নীতিমালা",
    fields: [
      { label: "মিল রেট (টাকা)", type: "number", name: "mealRate" },
      { label: "বিলম্ব ফি (টাকা)", type: "number", name: "lateFee" },
      { label: "ছাড়ের হার (%)", type: "number", name: "discountRate" },
      { label: "ট্যাক্স রেট (%)", type: "number", name: "taxRate" },
      {
        label: "মিল রেট নমনীয় করুন",
        type: "checkbox",
        name: "mealRateFlexible",
      },
      {
        label: "স্বয়ংক্রিয় হিসাব",
        type: "checkbox",
        name: "autoCalculation",
      },
    ],
  },
  {
    key: "notifications",
    title: "নোটিফিকেশন সেটিংস",
    description: "সতর্কতা এবং রিমাইন্ডার পছন্দসমূহ",
    fields: [
      {
        label: "ইমেইল নোটিফিকেশন",
        type: "checkbox",
        name: "emailNotifications",
        description: "ইমেইলের মাধ্যমে আপডেট পান",
      },
      {
        label: "SMS নোটিফিকেশন",
        type: "checkbox",
        name: "smsNotifications",
        description: "SMS এর মাধ্যমে জরুরি সতর্কতা",
      },
      {
        label: "পেমেন্ট রিমাইন্ডার",
        type: "checkbox",
        name: "paymentReminders",
        description: "বকেয়া পেমেন্টের রিমাইন্ডার",
      },
      {
        label: "মিল রিমাইন্ডার",
        type: "checkbox",
        name: "mealReminders",
        description: "দৈনিক মিল এন্ট্রির রিমাইন্ডার",
      },
      {
        label: "খরচ সতর্কতা",
        type: "checkbox",
        name: "expenseAlerts",
        description: "বাজেট সীমা অতিক্রমের সতর্কতা",
      },
      {
        label: "সাপ্তাহিক রিপোর্ট",
        type: "checkbox",
        name: "weeklyReports",
        description: "সাপ্তাহিক সারসংক্ষেপ রিপোর্ট",
      },
      {
        label: "অ্যাকাউন্ট লগইন সতর্কতা",
        type: "checkbox",
        name: "loginAlerts",
        description: "নতুন ডিভাইস থেকে লগইন হলে সতর্কতা পান",
      },
      {
        label: "সার্ভার ডাউনটাইম নোটিফিকেশন",
        type: "checkbox",
        name: "serverDowntime",
        description: "সার্ভার ডাউন হলে রিয়েল টাইম সতর্কতা",
      },
      {
        label: "ডেটা ব্যাকআপ রিমাইন্ডার",
        type: "checkbox",
        name: "backupReminders",
        description: "নিয়মিত ব্যাকআপের রিমাইন্ডার",
      },
      {
        label: "নতুন ফিচার আপডেট",
        type: "checkbox",
        name: "featureUpdates",
        description: "নতুন ফিচার রিলিজের আপডেট",
      },
      {
        label: "নিরাপত্তা সতর্কতা",
        type: "checkbox",
        name: "securityAlerts",
        description: "অসাধারণ কার্যকলাপে নিরাপত্তা সতর্কতা",
      },
    ],
  },
  {
    key: "security",
    title: "নিরাপত্তা সেটিংস",
    description: "অ্যাকাউন্ট নিরাপত্তা এবং গোপনীয়তা",
    fields: [
      {
        label: "দুই-ধাপ প্রমাণীকরণ",
        type: "checkbox",
        name: "twoFactorAuth",
        description: "অতিরিক্ত নিরাপত্তার জন্য সক্রিয় করুন",
      },
      {
        label: "সেশন টাইমআউট (মিনিট)",
        type: "number",
        name: "sessionTimeout",
      },
      {
        label: "লগইন চেষ্টার সীমা",
        type: "number",
        name: "loginAttempts",
      },
      {
        label: "পাসওয়ার্ড শক্তি",
        type: "select",
        name: "passwordStrength",
        options: [
          { value: "low", label: "দুর্বল" },
          { value: "medium", label: "মাঝারি" },
          { value: "high", label: "শক্তিশালী" },
        ],
      },
    ],
    hasPasswordChangeButton: true,
  },
  {
    key: "users",
    title: "ব্যবহারকারী ব্যবস্থাপনা",
    description: "সিস্টেম ব্যবহারকারী এবং অনুমতিসমূহ",
    fields: [
      {
        type: "custom-header",
        label: "নতুন ব্যবহারকারী যোগ করুন",
        button: {
          label: "যোগ করুন",
          icon: "UserIcon",
          variant: "green",
        },
      },
      {
        type: "role",
        label: "অ্যাডমিন",
        description: "সম্পূর্ণ নিয়ন্ত্রণ এবং অ্যাক্সেস",
        badge: {
          text: "উচ্চ ক্ষমতা",
          color: "red",
        },
      },
      {
        type: "role",
        label: "ম্যানেজার",
        description: "দৈনন্দিন কার্যক্রম ব্যবস্থাপনা",
        badge: {
          text: "মাঝারি ক্ষমতা",
          color: "blue",
        },
      },
      {
        type: "role",
        label: "সদস্য",
        description: "শুধুমাত্র নিজের তথ্য দেখা",
        badge: {
          text: "সীমিত ক্ষমতা",
          color: "green",
        },
      },
    ],
  },
  {
    key: "backup",
    title: "ডেটা ব্যাকআপ",
    description: "ডেটা নিরাপত্তা এবং ব্যাকআপ ব্যবস্থাপনা",
    actions: [
      {
        label: "ডেটা ব্যাকআপ তৈরি করুন",
        icon: "DocumentTextIcon",
        onClick: "backupData",
        variant: "primary",
      },
      {
        label: "ডেটা এক্সপোর্ট করুন",
        icon: "DocumentTextIcon",
        onClick: "exportData",
        variant: "outline",
      },
    ],
    fields: [
      { label: "দৈনিক ব্যাকআপ", type: "checkbox", name: "dailyBackup" },
      {
        label: "সাপ্তাহিক ব্যাকআপ",
        type: "checkbox",
        name: "weeklyBackup",
        defaultChecked: true,
      },
      {
        label: "মাসিক ব্যাকআপ",
        type: "checkbox",
        name: "monthlyBackup",
        defaultChecked: true,
      },
    ],
    lastBackup: "২৫ জানুয়ারি, ২০২৫ - ১০:৩০ AM",
  },
];

// Mock feedback data
const mockFeedbacks = [
  {
    id: 1,
    title: "রান্নার মানের উন্নতি প্রয়োজন",
    content:
      "গত কয়েকদিন ধরে খাবারের স্বাদ আগের মতো ভালো নেই। বিশেষ করে সবজি রান্নায় লবণের পরিমাণ কম থাকে।",
    category: "food",
    rating: 3,
    author: "রহিম উদ্দিন",
    anonymous: false,
    date: "2025-05-29",
    status: "pending",
    adminResponse: null,
  },
  {
    id: 2,
    title: "রান্নাঘরের পরিচ্ছন্নতা",
    content:
      "রান্নাঘরটি আরো পরিষ্কার রাখা প্রয়োজন। বিশেষ করে সন্ধ্যার পর ভালো করে পরিষ্কার করা হয় না।",
    category: "cleanliness",
    rating: 2,
    author: "Anonymous",
    anonymous: true,
    date: "2025-05-28",
    status: "resolved",
    adminResponse:
      "আপনার মতামতের জন্য ধন্যবাদ। আমরা পরিষ্কার-পরিচ্ছন্নতার বিষয়ে আরো সতর্ক হবো।",
  },
  {
    id: 3,
    title: "দুর্দান্ত সেবা!",
    content:
      "গত মাসে মেস ম্যানেজমেন্টের সেবা খুবই ভালো ছিল। সবাই অনেক সহযোগিতা করেছে।",
    category: "service",
    rating: 5,
    author: "করিম সাহেব",
    anonymous: false,
    date: "2025-05-27",
    status: "resolved",
    adminResponse:
      "আপনার প্রশংসার জন্য ধন্যবাদ। আমরা আরো ভালো সেবা দিতে চেষ্টা করবো।",
  },
  {
    id: 4,
    title: "বিলিং সিস্টেমের সমস্যা",
    content:
      "এই মাসের বিল ক্যালকুলেশনে কিছু ভুল আছে বলে মনে হচ্ছে। একবার চেক করে দেখবেন।",
    category: "billing",
    rating: 3,
    author: "নাসির হোসেন",
    anonymous: false,
    date: "2025-05-26",
    status: "in_progress",
    adminResponse: "আমরা বিষয়টি দেখছি। শীঘ্রই সমাধান করা হবে।",
  },
];

const feedbackCategoryOptions = [
  { value: "all", label: "সব ক্যাটেগরি" },
  { value: "food", label: "খাবার", icon: "🍽️" },
  { value: "service", label: "সেবা", icon: "👥" },
  { value: "cleanliness", label: "পরিচ্ছন্নতা", icon: "🧽" },
  { value: "billing", label: "বিলিং", icon: "💰" },
  { value: "facility", label: "সুবিধা", icon: "🏠" },
  { value: "general", label: "সাধারণ", icon: "📝" },
];

//members page mock data
export const membersData = [
  {
    id: 1,
    name: "মাসুদ আহমেদ",
    phone: "01712345678",
    email: "masud@email.com",
    role: "admin",
    joinDate: "2024-01-15",
    status: "active",
    totalMeals: 45,
    totalPaid: 6750,
    due: 0,
  },
  {
    id: 2,
    name: "রহিম উদ্দিন",
    phone: "01798765432",
    email: "rahim@email.com",
    role: "member",
    joinDate: "2024-02-01",
    status: "active",
    totalMeals: 42,
    totalPaid: 6000,
    due: 300,
  },
  {
    id: 3,
    name: "করিম সাহেব",
    phone: "01856789123",
    email: "karim@email.com",
    role: "member",
    joinDate: "2024-01-20",
    status: "active",
    totalMeals: 38,
    totalPaid: 5700,
    due: 0,
  },
  {
    id: 4,
    name: "নাসির হোসেন",
    phone: "01634567890",
    email: "nasir@email.com",
    role: "sub_admin",
    joinDate: "2024-02-10",
    status: "active",
    totalMeals: 40,
    totalPaid: 5800,
    due: 200,
  },
  {
    id: 5,
    name: "আলী হাসান",
    phone: "01923456789",
    email: "ali@email.com",
    role: "member",
    joinDate: "2024-03-01",
    status: "inactive",
    totalMeals: 15,
    totalPaid: 2250,
    due: 0,
  },
];

const feedbackStatusOptions = [
  { value: "all", label: "সব স্ট্যাটাস" },
  {
    value: "pending",
    label: "অপেক্ষমাণ",
    color: "bg-yellow-100 text-yellow-800",
  },
  {
    value: "in_progress",
    label: "প্রক্রিয়াধীন",
    color: "bg-blue-100 text-blue-800",
  },
  {
    value: "resolved",
    label: "সমাধান হয়েছে",
    color: "bg-green-100 text-green-800",
  },
  {
    value: "rejected",
    label: "প্রত্যাখ্যাত",
    color: "bg-red-100 text-red-800",
  },
];

//report page mokup data
export const reportData = {
  monthly: {
    totalMembers: 12,
    totalMeals: 1250,
    totalRevenue: 187500,
    totalExpenses: 165300,
    profit: 22200,
    mealRate: 150,
    avgMealsPerMember: 104,
    collectionRate: 92,
  },
  expenses: {
    bazaar: 85200,
    utility: 32500,
    rent: 25000,
    gas: 15600,
    maintenance: 6800,
    other: 200,
  },
  memberStats: [
    { name: "মাসুদ আহমেদ", meals: 28, amount: 4200, paid: 4200, due: 0 },
    { name: "রহিম উদ্দিন", meals: 25, amount: 3750, paid: 3000, due: 750 },
    { name: "করিম সাহেব", meals: 30, amount: 4500, paid: 4500, due: 0 },
    { name: "নাসির হোসেন", meals: 22, amount: 3300, paid: 0, due: 3300 },
  ],
};

export const reportTypes = {
  monthly: { name: "মাসিক রিপোর্ট", icon: CalendarDaysIcon },
  financial: { name: "আর্থিক রিপোর্ট", icon: CurrencyDollarIcon },
  meals: { name: "মিল রিপোর্ট", icon: UserGroupIcon },
  expenses: { name: "খরচ রিপোর্ট", icon: ShoppingCartIcon },
  members: { name: "সদস্য রিপোর্ট", icon: UserGroupIcon },
};

export const monthlyTrends = [
  {
    month: "অক্টোবর",
    meals: 1180,
    revenue: 177000,
    expenses: 158400,
    profit: 18600,
  },
  {
    month: "নভেম্বর",
    meals: 1220,
    revenue: 183000,
    expenses: 162200,
    profit: 20800,
  },
  {
    month: "ডিসেম্বর",
    meals: 1250,
    revenue: 187500,
    expenses: 165300,
    profit: 22200,
  },
  {
    month: "জানুয়ারি",
    meals: 1180,
    revenue: 177000,
    expenses: 168500,
    profit: 8500,
  },
];

const expenseRatio = Math.round(
  (reportData.monthly.totalExpenses / reportData.monthly.totalRevenue) * 100
);

export const profitMargin = Math.round(
  (reportData.monthly.profit / reportData.monthly.totalRevenue) * 100
);

export const categoryNames = {
  bazaar: "বাজার",
  utility: "ইউটিলিটি",
  rent: "ভাড়া",
  gas: "গ্যাস",
  maintenance: "রক্ষণাবেক্ষণ",
  other: "অন্যান্য",
};

// src/lib/data.js

//mock data fomr meale page
// Mock data
const members = [
  {
    id: 1,
    name: "মাসুদ আহমেদ",
    breakfast: true,
    lunch: true,
    dinner: true,
    guests: 0,
  },
  {
    id: 2,
    name: "রহিম উদ্দিন",
    breakfast: false,
    lunch: true,
    dinner: true,
    guests: 1,
  },
  {
    id: 3,
    name: "করিম সাহেব",
    breakfast: true,
    lunch: false,
    dinner: true,
    guests: 0,
  },
  {
    id: 4,
    name: "নাসির হোসেন",
    breakfast: true,
    lunch: true,
    dinner: false,
    guests: 0,
  },
  {
    id: 5,
    name: "আলী হাসান",
    breakfast: false,
    lunch: false,
    dinner: false,
    guests: 0,
  },
];

const todayStats = {
  totalBreakfast: members.filter((m) => m.breakfast).length,
  totalLunch: members.filter((m) => m.lunch).length,
  totalDinner: members.filter((m) => m.dinner).length,
  totalGuests: members.reduce((sum, m) => sum + m.guests, 0),
  absentMembers: members.filter((m) => !m.breakfast && !m.lunch && !m.dinner)
    .length,
};

const weeklyMealData = [
  { date: "২৫ মে", breakfast: 8, lunch: 10, dinner: 9 },
  { date: "২৬ মে", breakfast: 7, lunch: 9, dinner: 10 },
  { date: "২৭ মে", breakfast: 9, lunch: 10, dinner: 8 },
  { date: "২৮ মে", breakfast: 8, lunch: 8, dinner: 9 },
  {
    date: "২৯ মে",
    breakfast: todayStats.totalBreakfast,
    lunch: todayStats.totalLunch,
    dinner: todayStats.totalDinner,
  },
];

const statsConfig = [
  { icon: "🌅", label: "সকালের নাস্তা", key: "totalBreakfast" },
  { icon: "🍽️", label: "দুপুরের খাবার", key: "totalLunch" },
  { icon: "🌙", label: "রাতের খাবার", key: "totalDinner" },
  { icon: "👥", label: "অতিথি মিল", key: "totalGuests" },
  { icon: "❌", label: "অনুপস্থিত", key: "absentMembers" },
];
// mealStatsMock.js
const getMealStats = (totals) => [
  {
    icon: "🌅",
    label: "নাশতা",
    value: totals.breakfast,
    bg: "bg-orange-50",
    textColor: "text-orange-800",
    valueColor: "text-orange-600",
  },
  {
    icon: "🍽️",
    label: "দুপুরের খাবার",
    value: totals.lunch,
    bg: "bg-blue-50",
    textColor: "text-blue-800",
    valueColor: "text-blue-600",
  },
  {
    icon: "🌙",
    label: "রাতের খাবার",
    value: totals.dinner,
    bg: "bg-purple-50",
    textColor: "text-purple-800",
    valueColor: "text-purple-600",
  },
  {
    icon: "👥",
    label: "গেস্ট",
    value: totals.guests,
    bg: "bg-green-50",
    textColor: "text-green-800",
    valueColor: "text-green-600",
  },
];

// mockNotices.js or at the top of your component file
const mockNotices = [
  {
    id: 1,
    title: "মাসিক বিল পরিশোধের সময়সীমা",
    content:
      "সকল সদস্যদের জানানো হচ্ছে যে এই মাসের বিল ৩০ তারিখের মধ্যে পরিশোধ করতে হবে। বিলম্বের জন্য জরিমানা প্রযোজ্য হবে।",
    priority: "high",
    type: "payment",
    author: "প্রশাসক",
    date: "2025-05-29",
    expiryDate: "2025-05-30",
    isActive: true,
  },
  {
    id: 2,
    title: "নতুন রান্নার নিয়মাবলী",
    content:
      "রান্নাঘরে নতুন কিছু নিয়ম চালু করা হয়েছে। সবাই অনুগ্রহ করে নিয়মগুলো মেনে চলুন।",
    priority: "normal",
    type: "general",
    author: "ম্যানেজার",
    date: "2025-05-28",
    expiryDate: "2025-06-15",
    isActive: true,
  },
  {
    id: 3,
    title: "ঈদের ছুটির তালিকা",
    content:
      "আগামী ঈদের জন্য যারা ছুটি নিবেন তাদের নাম আগাম জানাতে হবে। মিল বন্ধ থাকবে ৩ দিন।",
    priority: "normal",
    type: "holiday",
    author: "প্রশাসক",
    date: "2025-05-27",
    expiryDate: "2025-06-20",
    isActive: true,
  },
  {
    id: 4,
    title: "গ্যাস সংযোগ রক্ষণাবেক্ষণ",
    content:
      "আগামীকাল বিকাল ২টা থেকে ৪টা পর্যন্ত গ্যাস সংযোগ বন্ধ থাকবে। সেই অনুযায়ী খাবার প্রস্তুতির ব্যবস্থা নিন।",
    priority: "urgent",
    type: "maintenance",
    author: "রক্ষণাবেক্ষণ টিম",
    date: "2025-05-29",
    expiryDate: "2025-05-30",
    isActive: true,
  },
];

const memberBills = [
  {
    id: 1,
    memberName: "মাসুদ আহমেদ",
    totalMeals: 28,
    mealCost: 4200,
    extraCost: 0,
    totalAmount: 4200,
    paidAmount: 4200,
    dueAmount: 0,
    status: "paid",
    paymentDate: "2025-05-25",
    paymentMethod: "bkash",
  },
  {
    id: 2,
    memberName: "রহিম উদ্দিন",
    totalMeals: 25,
    mealCost: 3750,
    extraCost: 200,
    totalAmount: 3950,
    paidAmount: 3000,
    dueAmount: 950,
    status: "partial",
    paymentDate: "2025-05-20",
    paymentMethod: "nagad",
  },
  {
    id: 3,
    memberName: "করিম সাহেব",
    totalMeals: 30,
    mealCost: 4500,
    extraCost: -300,
    totalAmount: 4200,
    paidAmount: 4200,
    dueAmount: 0,
    status: "paid",
    paymentDate: "2025-05-22",
    paymentMethod: "rocket",
  },
  {
    id: 4,
    memberName: "নাসির হোসেন",
    totalMeals: 22,
    mealCost: 3300,
    extraCost: 150,
    totalAmount: 3450,
    paidAmount: 0,
    dueAmount: 3450,
    status: "due",
    paymentDate: null,
    paymentMethod: null,
  },
];

const billingStats = {
  totalAmount: 42000,
  totalCollected: 38500,
  totalDue: 3500,
  mealRate: 150,
  totalMeals: 280,
  paidMembers: 8,
  dueMembers: 4,
};

const paymentMethods = {
  bkash: {
    name: "বিকাশ",
    icon: ":mobile_phone:",
    color: "bg-pink-100 text-pink-800",
  },
  nagad: {
    name: "নগদ",
    icon: ":moneybag:",
    color: "bg-orange-100 text-orange-800",
  },
  rocket: {
    name: "রকেট",
    icon: ":rocket:",
    color: "bg-purple-100 text-purple-800",
  },
  bank: { name: "ব্যাংক", icon: ":bank:", color: "bg-blue-100 text-blue-800" },
  cash: { name: "নগদ", icon: ":dollar:", color: "bg-green-100 text-green-800" },
};

const priorityOptions = [
  { value: "all", label: "সব অগ্রাধিকার" },
  { value: "urgent", label: "জরুরি", color: "bg-red-100 text-red-800" },
  {
    value: "high",
    label: "গুরুত্বপূর্ণ",
    color: "bg-orange-100 text-orange-800",
  },
  { value: "normal", label: "সাধারণ", color: "bg-blue-100 text-blue-800" },
  {
    value: "low",
    label: "কম গুরুত্বপূর্ণ",
    color: "bg-gray-100 text-gray-800",
  },
];

const typeOptions = [
  { value: "general", label: "সাধারণ", icon: InformationCircleIcon },
  { value: "payment", label: "পেমেন্ট", icon: ExclamationTriangleIcon },
  { value: "maintenance", label: "রক্ষণাবেক্ষণ", icon: ClockIcon },
  { value: "holiday", label: "ছুটির দিন", icon: CheckCircleIcon },
];

export {
  billingStats,
  expenseRatio,
  feedbackCategoryOptions,
  feedbackStatusOptions,
  getMealStats,
  memberBills,
  members,
  mockFeedbacks,
  mockNotices,
  paymentMethods,
  priorityOptions,
  statsConfig,
  todayStats,
  typeOptions,
  weeklyMealData,
};
