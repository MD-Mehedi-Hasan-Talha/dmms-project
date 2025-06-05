import { Button } from "@/components/ui/button";

import { PlusIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";

export default function HeaderPayments({ setModalOpen, handleDownloadReport }) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          বিল ও পেমেন্ট ব্যবস্থাপনা
        </h1>
        <p className="text-gray-600">
          মাসিক বিল জেনারেশন এবং পেমেন্ট ট্র্যাকিং
        </p>
      </div>
      <div className="flex space-x-3">
        <Button variant="outline" onClick={handleDownloadReport}>
          <ArrowDownTrayIcon className="w-4 h-4 mr-2" />
          রিপোর্ট ডাউনলোড
        </Button>
        <Button
          className="bg-green-600 hover:bg-green-700"
          onClick={() => setModalOpen({ ...open, billGenerate: true })}
        >
          <PlusIcon className="w-4 h-4 mr-2" />
          বিল জেনারেট করুন
        </Button>
      </div>
    </div>
  );
}
