import {
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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
