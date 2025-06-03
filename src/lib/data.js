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
