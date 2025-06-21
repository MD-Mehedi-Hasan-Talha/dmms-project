import {
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Badge } from "@/components/ui/badge";
import { TrendingUpIcon } from "lucide-react";
import { TrendingDownIcon } from "lucide-react";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

//তারিখ ফরম্যাট করার জন্য একটি ডেডিকেটেড ফাংশন
export const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("bn-BD", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export function formatCurrency(amount) {
  // amount যদি সংখ্যা হয় তাহলে বাংলা টাকায় ফরম্যাট করবে
  if (typeof amount !== "number") return amount;

  // Intl.NumberFormat দিয়ে বাংলায় টাকা ফরম্যাটিং (৳ চিহ্নসহ)
  return new Intl.NumberFormat("bn-BD", {
    style: "currency",
    currency: "BDT",
    minimumFractionDigits: 0, // দশমিক সংখ্যা দেখাতে চাইলে এখানে পরিবর্তন করতে পারেন
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getMonthName(monthNumber, locale = "bn-BD") {
  const bengaliMonths = [
    "জানুয়ারি",
    "ফেব্রুয়ারি",
    "মার্চ",
    "এপ্রিল",
    "মে",
    "জুন",
    "জুলাই",
    "আগস্ট",
    "সেপ্টেম্বর",
    "অক্টোবর",
    "নভেম্বর",
    "ডিসেম্বর",
  ];
  const englishMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  if (locale === "en" && monthNumber >= 1 && monthNumber <= 12) {
    return englishMonths[monthNumber - 1];
  }
  return bengaliMonths[monthNumber - 1];
}

export function getBengaliNumber(number) {
  const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return number
    .toString()
    .split("")
    .map((digit) => (isNaN(digit) ? digit : bengaliDigits[parseInt(digit)]))
    .join("");
}

export function formatDateForFeedback(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("bn-BD", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "সুপ্রভাত";
  if (hour < 17) return "শুভ বিকাল";
  if (hour < 21) return "শুভ সন্ধ্যা";
  return "শুভ রাত্রি";
}

// common status info for payments page

export const getStatusInfo = (status) => {
  const statusMap = {
    paid: {
      label: "পরিশোধিত",
      color: "bg-green-100 text-green-800",
      icon: CheckCircleIcon,
    },
    partial: {
      label: "আংশিক",
      color: "bg-yellow-100 text-yellow-800",
      icon: ClockIcon,
    },
    due: {
      label: "বকেয়া",
      color: "bg-red-100 text-red-800",
      icon: ExclamationTriangleIcon,
    },
    overdue: {
      label: "অতিরিক্ত বকেয়া",
      color: "bg-red-200 text-red-900",
      icon: ExclamationTriangleIcon,
    },
  };
  return statusMap[status] || statusMap.due;
};

//members page utils
export const getMemberRoleBadge = (role) => {
  const roleMap = {
    admin: {
      label: "অ্যাডমিন",
      color: "bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200",
    },
    sub_admin: {
      label: "সাব-অ্যাডমিন",
      color:
        "bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-200",
    },
    member: {
      label: "সদস্য",
      color:
        "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200",
    },
    cook: {
      label: "রাঁধুনি",
      color:
        "bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-200",
    },
  };
  const roleInfo = roleMap[role] || roleMap.member;
  return <Badge className={roleInfo.color}>{roleInfo.label}</Badge>;
};

export const getMemberStatusBadge = (status) => {
  return status === "active" ? (
    <Badge className="bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200">
      সক্রিয়
    </Badge>
  ) : (
    <Badge className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
      নিষ্ক্রিয়
    </Badge>
  );
};

// Market-intelligence untils
export const getSupplierRating = (rating) => {
  return "★".repeat(Math.floor(rating)) + "☆".repeat(5 - Math.floor(rating));
};

export const getQualityBadge = (quality) => {
  const score = typeof quality === "number" ? quality : 3;
  if (score >= 4.5) return "bg-green-100 text-green-800";
  if (score >= 3.5) return "bg-yellow-100 text-yellow-800";
  return "bg-red-100 text-red-800";
};

export const getQualityText = (quality) => {
  const score = typeof quality === "number" ? quality : 3;
  if (score >= 4.5) return "উন্নত";
  if (score >= 3.5) return "ভাল";
  return "মাঝারি";
};

export const getPriceChangeColor = (change) => {
  if (change > 0) return "text-red-600";
  if (change < 0) return "text-green-600";
  return "text-gray-600";
};

export const getPriceChangeIcon = (change) => {
  if (change > 0) return <TrendingUpIcon className="w-4 h-4 text-red-500" />;
  if (change < 0)
    return <TrendingDownIcon className="w-4 h-4 text-green-500" />;
  return <div className="w-4 h-4 bg-gray-400 rounded-full"></div>;
};

export const getVolatilityColor = (volatility) => {
  switch (volatility) {
    case "উচ্চ":
      return "bg-red-100 text-red-800";
    case "মাঝারি":
      return "bg-yellow-100 text-yellow-800";
    case "কম":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const getEfficiencyColor = (efficiency) => {
  if (efficiency >= 90) return "text-green-600";
  if (efficiency >= 80) return "text-yellow-600";
  return "text-red-600";
};
