export const MOCK_USER_DATA = {
  id: 1,
  name: "মোহাম্মদ রহিম উদ্দিন",
  email: "rahim@example.com",
  phone: "০১৭১২৩৪৫৬৭৮",
  address: "ঢাকা, বাংলাদেশ",
  dateOfBirth: "1995-05-15",
  joinDate: "2025-01-01",
  role: "member",
  status: "active",
  emergencyContact: "০১৯৮৭৬৫৪৩২১",
  nidNumber: "১২৩৪৫৬৭৮৯০",
  occupation: "সফটওয়্যার ইঞ্জিনিয়ার",
  bloodGroup: "B+",
  profileImage: null,
};

export const MOCK_RECENT_ACTIVITIES = [
  {
    id: 1,
    action: "মিল এন্ট্রি",
    details: "দুপুরের খাবার",
    date: "2025-05-29",
    type: "meal",
  },
  {
    id: 2,
    action: "পেমেন্ট",
    details: "৳৩,৫০০ জমা",
    date: "2025-05-28",
    type: "payment",
  },
  {
    id: 3,
    action: "ফিডব্যাক",
    details: "খাবারের মান নিয়ে মতামত",
    date: "2025-05-27",
    type: "feedback",
  },
  {
    id: 4,
    action: "মিল এন্ট্রি",
    details: "রাতের খাবার",
    date: "2025-05-26",
    type: "meal",
  },
  {
    id: 5,
    action: "প্রোফাইল আপডেট",
    details: "ফোন নম্বর পরিবর্তন",
    date: "2025-05-25",
    type: "profile",
  },
  {
    id: 6,
    action: "বাজার খরচ",
    details: "সবজি কেনাকাটা",
    date: "2025-05-24",
    type: "expense",
  },
];

export const MOCK_USER_STATS = {
  totalMeals: { label: "মোট খাবার", value: 180 },
  thisMonthMeals: { label: "এই মাসের খাবার", value: 25 },
  totalPayments: { label: "মোট পেমেন্ট", value: 12500, isCurrency: true },
  lastPayment: { label: "শেষ পেমেন্ট", value: 3500, isCurrency: true },
  feedbackGiven: { label: "দেওয়া ফিডব্যাক", value: 8 },
  daysActive: { label: "সক্রিয় দিন", value: 120 },
};

export const MOCK_PREFERENCES = {
  emailNotifications: true,
  smsNotifications: false,
  mealReminders: true,
  paymentReminders: true,
  language: "bn",
  theme: "light",
};

export const MOCK_USER_PROFILE = {
  id: "USR001",
  name: "মাসুদ আহমেদ",
  email: "masud.ahmed@email.com",
  phone: "০১৭১২৩৪৫৬৭৮",
  role: "Admin",
  address: "ধানমন্ডি, ঢাকা",
  joinedDate: "2024-01-15",
  messName: "গ্রীন ভ্যালি মেস",
  avatar: "/api/placeholder/150/150",
  bio: "মেস ম্যানেজমেন্টের দায়িত্বে থাকা অভিজ্ঞ অ্যাডমিন।",
  nationalId: "১২৩৪৫৬১২৩৪৫৬৭",
  emergencyContact: "০১৯৮৭৬৫৪৩২১",
  bloodGroup: "B+",
  occupation: "সফটওয়্যার ইঞ্জিনিয়ার",
};

export const MOCK_STATS_DATA = {
  totalMeals: 45,
  totalPaid: 15000,
  totalDue: 2500,
  averageMealsPerDay: 1.5,
  monthlyAverage: 12000,
  lastPayment: "2024-01-20",
};

//Expence initail state data
export const initialExpensesData = [
  {
    id: 1,
    date: "2025-05-29",
    type: "bazaar",
    description: "দৈনিক বাজার",
    totalAmount: 1200,
    addedBy: "মাসুদ আহমেদ",
    items: [
      { name: "চাল", quantity: 3, unit: "কেজি", unitPrice: 60, total: 180 },
      { name: "মাছ", quantity: 2, unit: "কেজি", unitPrice: 350, total: 700 },
      { name: "সবজি", quantity: 1, unit: "কেজি", unitPrice: 80, total: 80 },
      { name: "ডাল", quantity: 1, unit: "কেজি", unitPrice: 120, total: 120 },
    ],
  },
  {
    id: 2,
    date: "2025-05-28",
    type: "fixed",
    description: "বাবুর্চি বেতন",
    totalAmount: 8000,
    addedBy: "রহিম উদ্দিন",
    items: [
      {
        name: "মাসিক বেতন",
        quantity: 1,
        unit: "মাস",
        unitPrice: 8000,
        total: 8000,
      },
    ],
  },
  {
    id: 3,
    date: "2025-05-27",
    type: "bazaar",
    description: "সাপ্তাহিক বাজার",
    totalAmount: 2500,
    addedBy: "করিম সাহেব",
    items: [
      { name: "মাংস", quantity: 3, unit: "কেজি", unitPrice: 650, total: 1950 },
      { name: "পেঁয়াজ", quantity: 2, unit: "কেজি", unitPrice: 40, total: 80 },
      { name: "রসুন", quantity: 0.5, unit: "কেজি", unitPrice: 200, total: 100 },
    ],
  },
];

export const weeklyMenu = [
  {
    id: 1,
    date: "2025-05-29",
    dayName: "বৃহস্পতিবার",
    breakfast: "পরোটা, ডিম ভাজি, চা",
    lunch: "ভাত, মুরগির মাংস, ডাল, সবজি",
    dinner: "ভাত, মাছ, ডাল, সবজি ভাজি",
    specialNote: "আজ বিশেষ মুরগির মাংস",
    isToday: true,
  },
  {
    id: 2,
    date: "2025-05-30",
    dayName: "শুক্রবার",
    breakfast: "রুটি, সবজি, চা",
    lunch: "পোলাও, কাবাব, রায়তা, সালাদ",
    dinner: "ভাত, গরুর মাংস, ডাল, আলু ভর্তা",
    specialNote: "জুমার বিশেষ পোলাও",
    isToday: false,
  },
  {
    id: 3,
    date: "2025-05-31",
    dayName: "শনিবার",
    breakfast: "খিচুড়ি, ভর্তা",
    lunch: "ভাত, চিকেন কারি, ডাল, সবজি",
    dinner: "ভাত, মাছ ভাজি, ডাল, শাক",
    specialNote: "",
    isToday: false,
  },
];
