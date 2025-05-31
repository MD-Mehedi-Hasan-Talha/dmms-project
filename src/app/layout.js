import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "মেস ম্যানেজার - ডিজিটাল মেস ম্যানেজমেন্ট সিস্টেম",
  description:
    "বাংলাদেশের প্রথম সম্পূর্ণ ডিজিটাল মেস ম্যানেজমেন্ট সমাধান। সহজ মিল ট্র্যাকিং, স্মার্ট বিলিং এবং নিরাপদ পেমেন্ট।",
  keywords: "মেস, ম্যানেজমেন্ট, বিলিং, পেমেন্ট, বিকাশ, নগদ, বাংলাদেশ",
  authors: [{ name: "Mess Manager Team" }],
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
