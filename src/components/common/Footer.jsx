import { Button } from "@/components/ui/button";
import { HomeIcon, PhoneIcon, EnvelopeIcon } from "@heroicons/react/24/outline";

export default function Footer() {
  return (
    <footer id="contact" className="py-16 px-4 bg-gray-900 text-white">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <HomeIcon className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">মেস ম্যানেজার</span>
            </div>
            <p className="text-gray-400 mb-4">
              বাংলাদেশের প্রথম সম্পূর্ণ ডিজিটাল মেস ম্যানেজমেন্ট সমাধান।
            </p>
            <div className="flex space-x-4">
              <Button
                variant="outline"
                size="sm"
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                <PhoneIcon className="w-4 h-4 mr-2" />
                ০১৭xxxxxxxx
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                <EnvelopeIcon className="w-4 h-4 mr-2" />
                support@messmanager.bd
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">প্রোডাক্ট</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  ফিচার
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  প্রাইসিং
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  ডেমো
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  API
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">সাপোর্ট</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  হেল্প সেন্টার
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  গাইড
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  যোগাযোগ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  স্ট্যাটাস
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">কোম্পানি</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  আমাদের সম্পর্কে
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  ক্যারিয়ার
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  প্রাইভেসি
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  শর্তাবলী
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; ২০২৫ মেস ম্যানেজার। সকল অধিকার সংরক্ষিত।</p>
        </div>
      </div>
    </footer>
  );
}
