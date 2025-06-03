import {
  CogIcon,
  UserIcon,
  CurrencyDollarIcon,
  BellIcon,
  ShieldCheckIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

// Tabs for settings page
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

export { mockFeedbacks, feedbackCategoryOptions, feedbackStatusOptions };
