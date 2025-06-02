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
    type: "meal",
    description: "আজকের দুপুরের খাবার এন্ট্রি",
    date: "2025-05-29",
    time: "12:30 PM",
  },
  {
    id: 2,
    type: "payment",
    description: "মাসিক বিল পরিশোধ - ৳৩,৫০০",
    date: "2025-05-28",
    time: "10:15 AM",
  },
  {
    id: 3,
    type: "feedback",
    description: "খাবারের মান নিয়ে ফিডব্যাক দিয়েছেন",
    date: "2025-05-27",
    time: "6:45 PM",
  },
  {
    id: 4,
    type: "meal",
    description: "গতকালের রাতের খাবার এন্ট্রি",
    date: "2025-05-26",
    time: "8:20 PM",
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
