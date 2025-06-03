import { Button } from "@/components/ui/button";
import { PlusIcon } from "@heroicons/react/24/outline";
export default function Header() {
  return (
    <div className="mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            ফিডব্যাক সিস্টেম
          </h1>
          <p className="text-gray-600">আপনার মতামত ও পরামর্শ জানান</p>
        </div>
        <Button
          onClick={() => setShowFeedbackForm(true)}
          className="mt-4 sm:mt-0 bg-green-600 hover:bg-green-700 text-white"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          ফিডব্যাক দিন
        </Button>
      </div>
    </div>
  );
}
