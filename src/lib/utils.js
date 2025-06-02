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
