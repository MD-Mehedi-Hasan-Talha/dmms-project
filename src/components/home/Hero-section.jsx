import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";
import {
  HomeIcon,
  UsersIcon,
  ClockIcon,
  BanknotesIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

const stats = [
  {
    label: "সক্রিয় মেস",
    value: "২৫০+",
    icon: <HomeIcon className="w-6 h-6" />,
  },
  {
    label: "খুশি ব্যবহারকারী",
    value: "৫,০০০+",
    icon: <UsersIcon className="w-6 h-6" />,
  },
  {
    label: "মাসিক ট্রানজেকশন",
    value: "৳১০ লক্ষ+",
    icon: <BanknotesIcon className="w-6 h-6" />,
  },
  {
    label: "সময় বাঁচানো",
    value: "৮০%",
    icon: <ClockIcon className="w-6 h-6" />,
  },
];

export default function HeroSection() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto text-center">
        <div className="animate-fade-in-up">
          <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-200">
            🚀 বাংলাদেশের প্রথম ডিজিটাল মেস সমাধান
          </Badge>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            আধুনিক যুগের
            <span className="text-green-600 block">মেস ম্যানেজমেন্ট</span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            খাতা-কলমের ঝামেলা শেষ! স্মার্ট অ্যাপ দিয়ে করুন মেসের সম্পূর্ণ
            হিসাব-নিকাশ। বিকাশ, নগদ, রকেট সহ সকল পেমেন্ট সুবিধা।
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-lg px-8 py-6"
              asChild
            >
              <Link href="/register">
                ফ্রি ট্রাই করুন
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6"
              asChild
            >
              <Link href="/demo">ডেমো দেখুন</Link>
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex justify-center mb-2 text-green-600">
                {stat.icon}
              </div>
              <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                {stat.value}
              </div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
