import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount, currency = "৳") {
  return `${currency} ${amount.toLocaleString("bn-BD")}`;
}

export function formatDate(date, locale = "bn-BD") {
  return new Date(date).toLocaleDateString(locale);
}
export function formatDateForFeedback(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("bn-BD", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatDateTime(date, locale = "bn-BD") {
  return new Date(date).toLocaleString(locale);
}

export function calculateMealRate(totalExpense, totalMeals) {
  if (totalMeals === 0) return 0;
  return Math.round(totalExpense / totalMeals);
}

export function calculateMemberBill(mealCount, mealRate, extraCost = 0) {
  return mealCount * mealRate + extraCost;
}

export function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "সুপ্রভাত";
  if (hour < 17) return "শুভ বিকাল";
  if (hour < 21) return "শুভ সন্ধ্যা";
  return "শুভ রাত্রি";
}

export function getDaysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

export function getMonthName(monthNumber, locale = "bn-BD") {
  const months = [
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
  return months[monthNumber - 1];
}

export function getDayName(dayNumber, locale = "bn-BD") {
  const days = [
    "রবিবার",
    "সোমবার",
    "মঙ্গলবার",
    "বুধবার",
    "বৃহস্পতিবার",
    "শুক্রবার",
    "শনিবার",
  ];
  return days[dayNumber];
}

export function getBengaliNumber(number) {
  const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return number
    .toString()
    .split("")
    .map((digit) => (isNaN(digit) ? digit : bengaliDigits[parseInt(digit)]))
    .join("");
}

export function getBengaliDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = getMonthName(date.getMonth() + 1);
  const year = date.getFullYear();
  return `${getBengaliNumber(day)} ${month} ${getBengaliNumber(year)}`;
}
