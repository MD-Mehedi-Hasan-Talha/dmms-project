import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

export default function MarketIntelligenceHeader({
  searchTerm,
  setSearchTerm,
  handleDownloadCSVReport,
  handleDownloadDetailedReport,
}) {
  return (
    <>
      {/* Modified orginal code to make it responsive */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
            উন্নত অ্যানালিটিক্স
          </h1>
          <p className="text-gray-600 mt-1 text-sm lg:text-base">
            গভীর বাজার বিশ্লেষণ এবং বাজেট অপটিমাইজেশন
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <div className="relative w-full sm:w-auto">
            <MagnifyingGlassIcon className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <Input
              placeholder="পণ্য খুঁজুন..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full sm:w-48"
            />
          </div>

          {/* Updated Download Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              onClick={handleDownloadCSVReport}
              className="border-green-600 text-green-600 hover:bg-green-50 w-full sm:w-auto"
            >
              <ArrowDownIcon className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">CSV ডাউনলোড</span>
              <span className="sm:hidden">CSV</span>
            </Button>
            <Button
              className="bg-green-600 hover:bg-green-700 w-full sm:w-auto"
              onClick={handleDownloadDetailedReport}
            >
              <ArrowDownIcon className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">বিস্তারিত রিপোর্ট</span>
              <span className="sm:hidden">রিপোর্ট</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
