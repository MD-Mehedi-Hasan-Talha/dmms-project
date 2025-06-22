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

// data for app/dashboard/market-intelligence

// Enhanced Market Data with more suppliers and price history
const supplierComparison = [
  {
    name: "নিউ মার্কেট",
    location: "নিউ মার্কেট, ঢাকা",
    rating: 4.2,
    totalPurchases: 25,
    averagePrice: 95,
    reliability: 88,
    products: [
      { name: "চাল", price: 60, quality: "উন্নত", lastUpdated: "2024-01-25" },
      { name: "ডাল", price: 120, quality: "ভাল", lastUpdated: "2024-01-24" },
      {
        name: "তেল",
        price: 140,
        quality: "উন্নত",
        lastUpdated: "2024-01-23",
      },
    ],
    advantages: ["দাম স্থিতিশীল", "ভাল মানের পণ্য"],
    disadvantages: ["দূরত্ব বেশি"],
  },
  {
    name: "কারওয়ান বাজার",
    location: "কারওয়ান বাজার, ঢাকা",
    rating: 4.5,
    totalPurchases: 18,
    averagePrice: 87,
    reliability: 92,
    products: [
      { name: "চাল", price: 58, quality: "ভাল", lastUpdated: "2024-01-25" },
      {
        name: "ডাল",
        price: 115,
        quality: "উন্নত",
        lastUpdated: "2024-01-24",
      },
      { name: "সবজি", price: 35, quality: "তাজা", lastUpdated: "2024-01-25" },
    ],
    advantages: ["সাশ্রয়ী দাম", "তাজা সবজি"],
    disadvantages: ["ভিড় বেশি"],
  },
  {
    name: "স্থানীয় দোকান",
    location: "মহল্লার দোকান",
    rating: 3.8,
    totalPurchases: 32,
    averagePrice: 102,
    reliability: 75,
    products: [
      {
        name: "চাল",
        price: 62,
        quality: "মাঝারি",
        lastUpdated: "2024-01-25",
      },
      { name: "ডাল", price: 125, quality: "ভাল", lastUpdated: "2024-01-24" },
      { name: "মসলা", price: 80, quality: "ভাল", lastUpdated: "2024-01-23" },
    ],
    advantages: ["কাছে", "চেনা মানুষ"],
    disadvantages: ["দাম একটু বেশি"],
  },
];

// Product comparison across suppliers
const productComparison = [
  {
    name: "চাল (নাজিরশাইল)",
    unit: "কেজি",
    suppliers: [
      { name: "কারওয়ান বাজার", price: 58, quality: 4, availability: 5 },
      { name: "নিউ মার্কেট", price: 60, quality: 5, availability: 4 },
      { name: "স্থানীয় দোকান", price: 62, quality: 3, availability: 5 },
    ],
    priceHistory: [55, 56, 58, 59, 58],
    recommendation: "কারওয়ান বাজার থেকে কিনুন",
    savings: 120, // monthly savings if buy from recommended
  },
  {
    name: "মাছ (রুই)",
    unit: "কেজি",
    suppliers: [
      { name: "কাঁচা বাজার", price: 380, quality: 5, availability: 4 },
      { name: "স্থানীয় দোকান", price: 400, quality: 4, availability: 5 },
      { name: "পাইকারি বাজার", price: 360, quality: 4, availability: 3 },
    ],
    priceHistory: [350, 360, 370, 380, 375],
    recommendation: "পাইকারি বাজার থেকে কিনুন",
    savings: 400,
  },
  {
    name: "পেঁয়াজ",
    unit: "কেজি",
    suppliers: [
      { name: "কারওয়ান বাজার", price: 40, quality: 4, availability: 5 },
      { name: "নিউ মার্কেট", price: 45, quality: 4, availability: 4 },
      { name: "স্থানীয় দোকান", price: 48, quality: 3, availability: 5 },
    ],
    priceHistory: [50, 48, 45, 42, 40],
    recommendation: "কারওয়ান বাজার থেকে কিনুন",
    savings: 240,
  },
];

// Market intelligence data
const marketIntelligence = {
  priceAlerts: [
    {
      product: "চাল",
      status: "warning",
      message: "গত সপ্তাহে ৫% দাম বৃদ্ধি",
      suggestion: "পরবর্তী সপ্তাহে আরো বাড়তে পারে",
      action: "২-৩ দিনের স্টক করুন",
    },
    {
      product: "পেঁয়াজ",
      status: "success",
      message: "দাম ১২% কমেছে",
      suggestion: "স্টক করার ভাল সময়",
      action: "১ সপ্তাহের স্টক নিন",
    },
    {
      product: "তেল",
      status: "info",
      message: "দাম স্থিতিশীল",
      suggestion: "স্বাভাবিক কেনাকাটা চালিয়ে যান",
      action: "কোন বিশেষ ব্যবস্থা নেই",
    },
  ],
  seasonalTrends: [
    {
      season: "শীত",
      months: "ডিসেম্বর-ফেব্রুয়ারি",
      trends: [
        { category: "সবজি", change: -15, reason: "শীতকালীন সবজি বেশি" },
        { category: "মাছ", change: -8, reason: "মাছের মৌসুম" },
        { category: "ফল", change: -20, reason: "শীতকালীন ফল" },
      ],
    },
    {
      season: "গ্রীষ্ম",
      months: "মার্চ-মে",
      trends: [
        { category: "সবজি", change: +25, reason: "গ্রীষ্মে সবজি কম" },
        { category: "ফল", change: +10, reason: "গ্রীষ্মকালীন ফল বেশি" },
        { category: "পানীয়", change: +30, reason: "পানীয়ের চাহিদা বৃদ্ধি" },
      ],
    },
  ],
};

// Budget optimization suggestions
const budgetOptimization = {
  currentMonthly: 45000,
  optimizedBudget: 38500,
  potentialSavings: 6500,
  suggestions: [
    {
      action: "সাপ্লায়ার পরিবর্তন",
      savings: 2500,
      description: "কারওয়ান বাজার থেকে বেশি কেনাকাটা করুন",
      effort: "সহজ",
    },
    {
      action: "বাল্ক পারচেস",
      savings: 1800,
      description: "চাল-ডাল একসাথে বেশি পরিমাণে কিনুন",
      effort: "মাঝারি",
    },
    {
      action: "মৌসুমী কেনাকাটা",
      savings: 1500,
      description: "সবজি-ফল মৌসুম অনুযায়ী কিনুন",
      effort: "সহজ",
    },
    {
      action: "মেনু অপটিমাইজেশন",
      savings: 700,
      description: "সাশ্রয়ী পুষ্টিকর মেনু পরিকল্পনা",
      effort: "কঠিন",
    },
  ],
};

// Calendar data
const calendarEvents = [
  {
    id: 1,
    title: "মাসিক বিল জেনারেশন",
    date: "2024-01-30",
    time: "10:00",
    type: "billing",
    description: "জানুয়ারি মাসের সকল বিল প্রস্তুত করা হবে",
    status: "upcoming",
  },
  {
    id: 2,
    title: "সাপ্তাহিক মার্কেট",
    date: "2024-01-28",
    time: "09:00",
    type: "market",
    description: "সাপ্তাহিক বাজার করার দিন",
    status: "completed",
  },
  {
    id: 3,
    title: "মেস মিটিং",
    date: "2024-01-25",
    time: "18:00",
    type: "meeting",
    description: "মাসিক মেস সদস্যদের মিটিং",
    status: "completed",
  },
  {
    id: 4,
    title: "পেমেন্ট ডেডলাইন",
    date: "2024-02-05",
    time: "23:59",
    type: "payment",
    description: "জানুয়ারি মাসের বিল পরিশোধের শেষ তারিখ",
    status: "upcoming",
  },
  {
    id: 5,
    title: "নতুন সদস্য যোগদান",
    date: "2024-01-27",
    time: "14:00",
    type: "member",
    description: "রহিম সাহেব মেসে যোগদান করবেন",
    status: "completed",
  },
];

// Cost analysis data
const priceMonitoringData = [
  {
    id: 1,
    product: "চাল (নাজিরশাইল)",
    currentPrice: 62,
    yesterdayPrice: 60,
    weekAgoPrice: 58,
    change24h: 3.33,
    change7d: 6.9,
    highestThisWeek: 63,
    lowestThisWeek: 58,
    averagePrice: 60.5,
    volatility: "মাঝারি",
    prediction: "বৃদ্ধি",
    confidence: 78,
    suppliers: [
      { name: "কারওয়ান বাজার", price: 60, updated: "২ ঘন্টা আগে" },
      { name: "নিউ মার্কেট", price: 62, updated: "১ ঘন্টা আগে" },
      { name: "স্থানীয়", price: 65, updated: "৩০ মিনিট আগে" },
    ],
    alerts: [{ type: "warning", message: "দাম গত ২৪ ঘন্টায় ৩% বেড়েছে" }],
  },
  {
    id: 2,
    product: "পেঁয়াজ",
    currentPrice: 38,
    yesterdayPrice: 42,
    weekAgoPrice: 45,
    change24h: -9.52,
    change7d: -15.56,
    highestThisWeek: 45,
    lowestThisWeek: 38,
    averagePrice: 41.5,
    volatility: "উচ্চ",
    prediction: "কমে",
    confidence: 85,
    suppliers: [
      { name: "ফরিদপুর", price: 38, updated: "১ ঘন্টা আগে" },
      { name: "পাবনা", price: 40, updated: "২ ঘন্টা আগে" },
      { name: "স্থানীয়", price: 42, updated: "৪ ঘন্টা আগে" },
    ],
    alerts: [{ type: "success", message: "দাম ১৫% কমেছে, স্টক করার ভাল সময়" }],
  },
  {
    id: 3,
    product: "মুরগি",
    currentPrice: 185,
    yesterdayPrice: 180,
    weekAgoPrice: 175,
    change24h: 2.78,
    change7d: 5.71,
    highestThisWeek: 190,
    lowestThisWeek: 175,
    averagePrice: 182.5,
    volatility: "কম",
    prediction: "স্থিতিশীল",
    confidence: 92,
    suppliers: [
      { name: "স্থানীয় খামার", price: 180, updated: "১ ঘন্টা আগে" },
      { name: "ব্রয়লার ফার্ম", price: 185, updated: "৩০ মিনিট আগে" },
      { name: "লাইভ বার্ড", price: 190, updated: "২ ঘন্টা আগে" },
    ],
    alerts: [],
  },
];

// Cost breakdown analysis
const costBreakdown = {
  daily: {
    today: {
      breakfast: 450,
      lunch: 800,
      dinner: 650,
      total: 1900,
      perMeal: 63.33,
      members: 10,
    },
    yesterday: {
      breakfast: 420,
      lunch: 750,
      dinner: 600,
      total: 1770,
      perMeal: 59,
      members: 10,
    },
    change: 7.34,
  },
  weekly: [
    { day: "শনিবার", amount: 1900, meals: 30, efficiency: 95 },
    { day: "রবিবার", amount: 1800, meals: 28, efficiency: 92 },
    { day: "সোমবার", amount: 2100, meals: 32, efficiency: 88 },
    { day: "মঙ্গলবার", amount: 1950, meals: 31, efficiency: 90 },
    { day: "বুধবার", amount: 1750, meals: 27, efficiency: 94 },
    { day: "বৃহস্পতিবার", amount: 2000, meals: 30, efficiency: 89 },
    { day: "শুক্রবার", amount: 1850, meals: 29, efficiency: 91 },
  ],
  monthly: {
    target: 45000,
    current: 38500,
    remaining: 6500,
    daysLeft: 8,
    dailyBudget: 812.5,
    onTrack: true,
  },
};

// Advanced cost metrics
const costMetrics = {
  efficiency: {
    overall: 91,
    breakfast: 94,
    lunch: 89,
    dinner: 90,
    trends: {
      improving: ["breakfast", "dinner"],
      declining: ["lunch"],
    },
  },
  wastage: {
    percentage: 3.2,
    amount: 1440,
    trend: "decreasing",
    categories: [
      { name: "সবজি", percentage: 4.5, amount: 540 },
      { name: "ভাত", percentage: 2.8, amount: 420 },
      { name: "মাছ-মাংস", percentage: 2.1, amount: 315 },
      { name: "ডাল", percentage: 1.5, amount: 165 },
    ],
  },
  procurement: {
    score: 87,
    bestTime: "সকাল ৮-১০টা",
    bestDays: ["মঙ্গলবার", "বুধবার"],
    seasonalFactor: 1.05,
  },
};

// Price alerts and notifications
const priceAlerts = [
  {
    id: 1,
    type: "urgent",
    product: "চাল",
    message: "দাম হঠাৎ ৫% বেড়েছে",
    action: "আজই ১ সপ্তাহের স্টক নিন",
    time: "১৫ মিনিট আগে",
  },
  {
    id: 2,
    type: "opportunity",
    product: "পেঁয়াজ",
    message: "দাম সর্বনিম্ন পর্যায়ে",
    action: "২-৩ সপ্তাহের স্টক নেওয়ার সুযোগ",
    time: "১ ঘন্টা আগে",
  },
  {
    id: 3,
    type: "info",
    product: "তেল",
    message: "দাম স্থিতিশীল রয়েছে",
    action: "স্বাভাবিক কেনাকাটা চালিয়ে যান",
    time: "২ ঘন্টা আগে",
  },
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
  supplierComparison,
  productComparison,
  marketIntelligence,
  budgetOptimization,
  priceMonitoringData,
  costBreakdown,
  costMetrics,
  priceAlerts,
  calendarEvents,
};
