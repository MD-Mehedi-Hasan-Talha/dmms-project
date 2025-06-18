import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const NoticeBoardHeader = ({ onAddNotice }) => {
  return (
    <div className="mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">নোটিশ বোর্ড</h1>
          <p className="text-gray-600">মেস সংক্রান্ত সকল ঘোষণা ও বিজ্ঞপ্তি</p>
        </div>
        <Button
          onClick={onAddNotice}
          className="mt-4 sm:mt-0 bg-green-600 hover:bg-green-700 text-white"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          নতুন নোটিশ
        </Button>
      </div>
    </div>
  );
};

export default NoticeBoardHeader;
