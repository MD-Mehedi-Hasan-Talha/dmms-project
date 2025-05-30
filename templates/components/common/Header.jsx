import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { HomeIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
            <HomeIcon className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">মেস ম্যানেজার</span>
        </Link>

        <nav className="hidden md:flex space-x-8">
          <a
            href="#features"
            className="text-gray-600 hover:text-green-600 transition-colors"
          >
            ফিচার
          </a>
          <a
            href="#pricing"
            className="text-gray-600 hover:text-green-600 transition-colors"
          >
            প্রাইসিং
          </a>
          <a
            href="#testimonials"
            className="text-gray-600 hover:text-green-600 transition-colors"
          >
            রিভিউ
          </a>
          <a
            href="#contact"
            className="text-gray-600 hover:text-green-600 transition-colors"
          >
            যোগাযোগ
          </a>
        </nav>

        <div className="flex space-x-4">
          <Button variant="outline" asChild>
            <Link href="/login">লগইন</Link>
          </Button>
          <Button className="bg-green-600 hover:bg-green-700" asChild>
            <Link href="/register">
              শুরু করুন
              <ArrowRightIcon className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
