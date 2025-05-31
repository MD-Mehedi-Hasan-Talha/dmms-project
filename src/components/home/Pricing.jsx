import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            সাশ্রয়ী <span className="text-green-600">প্রাইসিং</span>
          </h2>
          <p className="text-xl text-gray-600">
            আপনার মেসের সাইজ অনুযায়ী পেমেন্ট প্ল্যান
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Card className="p-6 border-2 border-gray-200">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-xl">বেসিক</CardTitle>
              <div className="text-3xl font-bold">ফ্রি</div>
              <CardDescription>৫ জন পর্যন্ত</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <CheckCircleIcon className="w-5 h-5 text-green-600 mr-2" />
                  মিল ট্র্যাকিং
                </li>
                <li className="flex items-center">
                  <CheckCircleIcon className="w-5 h-5 text-green-600 mr-2" />
                  বেসিক রিপোর্ট
                </li>
                <li className="flex items-center">
                  <CheckCircleIcon className="w-5 h-5 text-green-600 mr-2" />
                  ইমেইল সাপোর্ট
                </li>
              </ul>
              <Button className="w-full mt-6" variant="outline">
                শুরু করুন
              </Button>
            </CardContent>
          </Card>

          <Card className="p-6 border-2 border-green-500 bg-green-50 relative">
            <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-600">
              জনপ্রিয়
            </Badge>
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-xl">প্রো</CardTitle>
              <div className="text-3xl font-bold">
                ৳৫০<span className="text-lg">/মাস</span>
              </div>
              <CardDescription>১৫ জন পর্যন্ত</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <CheckCircleIcon className="w-5 h-5 text-green-600 mr-2" />
                  সব বেসিক ফিচার
                </li>
                <li className="flex items-center">
                  <CheckCircleIcon className="w-5 h-5 text-green-600 mr-2" />
                  পেমেন্ট গেটওয়ে
                </li>
                <li className="flex items-center">
                  <CheckCircleIcon className="w-5 h-5 text-green-600 mr-2" />
                  বিস্তারিত রিপোর্ট
                </li>
                <li className="flex items-center">
                  <CheckCircleIcon className="w-5 h-5 text-green-600 mr-2" />
                  ২৪/৭ সাপোর্ট
                </li>
              </ul>
              <Button className="w-full mt-6 bg-green-600 hover:bg-green-700">
                শুরু করুন
              </Button>
            </CardContent>
          </Card>

          <Card className="p-6 border-2 border-gray-200">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-xl">এন্টারপ্রাইজ</CardTitle>
              <div className="text-3xl font-bold">
                ৳১০০<span className="text-lg">/মাস</span>
              </div>
              <CardDescription>আনলিমিটেড</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <CheckCircleIcon className="w-5 h-5 text-green-600 mr-2" />
                  সব প্রো ফিচার
                </li>
                <li className="flex items-center">
                  <CheckCircleIcon className="w-5 h-5 text-green-600 mr-2" />
                  মাল্টি মেস সাপোর্ট
                </li>
                <li className="flex items-center">
                  <CheckCircleIcon className="w-5 h-5 text-green-600 mr-2" />
                  API অ্যাক্সেস
                </li>
                <li className="flex items-center">
                  <CheckCircleIcon className="w-5 h-5 text-green-600 mr-2" />
                  ডেডিকেটেড সাপোর্ট
                </li>
              </ul>
              <Button className="w-full mt-6" variant="outline">
                যোগাযোগ করুন
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
