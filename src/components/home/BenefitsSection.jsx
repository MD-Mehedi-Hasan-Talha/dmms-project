import { Card } from "@/components/ui/card";

import {
  DevicePhoneMobileIcon,
  ShieldCheckIcon,
  DocumentChartBarIcon,
} from "@heroicons/react/24/outline";

export default function BenefitsSection() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            আমাদের <span className="text-green-600">বিশেষত্ব</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center p-6 border-0 shadow-lg">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <DevicePhoneMobileIcon className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">মোবাইল ফ্রেন্ডলি</h3>
            <p className="text-gray-600">
              যেকোনো ফোন থেকে সহজেই ব্যবহার করুন। অফলাইনেও কাজ করে।
            </p>
          </Card>

          <Card className="text-center p-6 border-0 shadow-lg">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheckIcon className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">সম্পূর্ণ নিরাপদ</h3>
            <p className="text-gray-600">
              আপনার সকল তথ্য ১০০% নিরাপদ। ব্যাংক লেভেল সিকিউরিটি।
            </p>
          </Card>

          <Card className="text-center p-6 border-0 shadow-lg">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <DocumentChartBarIcon className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">স্বচ্ছ হিসাব</h3>
            <p className="text-gray-600">
              সকল হিসাব-নিকাশ স্বচ্ছ ও সঠিক। কোন গোপনীয়তা নেই।
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
