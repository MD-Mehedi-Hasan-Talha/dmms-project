import { Card, CardContent } from "@/components/ui/card";
import {
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";

export default function Statistics({ feedbackStats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">মোট ফিডব্যাক</p>
              <p className="text-2xl font-bold text-gray-900">
                {feedbackStats.total}
              </p>
            </div>
            <ChatBubbleLeftRightIcon className="h-8 w-8 text-blue-600" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">অপেক্ষমাণ</p>
              <p className="text-2xl font-bold text-yellow-600">
                {feedbackStats.pending}
              </p>
            </div>
            <ClockIcon className="h-8 w-8 text-yellow-600" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">সমাধান হয়েছে</p>
              <p className="text-2xl font-bold text-green-600">
                {feedbackStats.resolved}
              </p>
            </div>
            <CheckCircleIcon className="h-8 w-8 text-green-600" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">গড় রেটিং</p>
              <p className="text-2xl font-bold text-blue-600">
                {feedbackStats.avgRating.toFixed(1)}
              </p>
            </div>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIconSolid
                  key={star}
                  className={`h-4 w-4 ${
                    star <= feedbackStats.avgRating
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
