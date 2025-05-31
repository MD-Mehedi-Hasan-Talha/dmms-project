import { Button } from "@/components/ui/button";

import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-20 px-4 bg-green-600 text-white">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          আজই শুরু করুন আপনার ডিজিটাল মেস
        </h2>
        <p className="text-xl mb-8 opacity-90">
          ৩০ দিনের ফ্রি ট্রাই। কোন ক্রেডিট কার্ড লাগবে না।
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8 py-6"
            asChild
          >
            <Link href="/register">
              ফ্রি ট্রাই শুরু করুন
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-green-600 text-lg px-8 py-6"
          >
            ডেমো বুক করুন
          </Button>
        </div>
      </div>
    </section>
  );
}
