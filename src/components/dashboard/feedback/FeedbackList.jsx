import { Badge } from "@/components/ui/badge";

import {
  ChatBubbleLeftRightIcon,
  StarIcon,
  FaceSmileIcon,
  FaceFrownIcon,
  ClockIcon,
  UserIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { Card, CardContent } from "@/components/ui/card";
import { formatDateForFeedback } from "@/lib/utils copy";
import { Button } from "@/components/ui/button";

export default function FeedbackList({
  feedbackStatusOptions,
  filteredFeedbacks,
  feedbackCategoryOptions,
  handleEdit,
  setDeleteDialog,
}) {
  const getRatingIcon = (rating) => {
    if (rating >= 4) return FaceSmileIcon;
    if (rating >= 3) return StarIcon;
    return FaceFrownIcon;
  };

  const getStatusColor = (status) => {
    const statusData = feedbackStatusOptions.find((s) => s.value === status);
    return statusData?.color || "bg-gray-100 text-gray-800";
  };
  return (
    <div className="space-y-4">
      {filteredFeedbacks.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <ChatBubbleLeftRightIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              কোন ফিডব্যাক পাওয়া যায়নি
            </h3>
            <p className="text-gray-500">এই মুহূর্তে কোন ফিডব্যাক নেই।</p>
          </CardContent>
        </Card>
      ) : (
        filteredFeedbacks.map((feedback) => {
          const RatingIcons = getRatingIcon(feedback.rating);
          const categoryData = feedbackCategoryOptions.find(
            (c) => c.value === feedback.category
          );

          return (
            <Card key={feedback.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-lg">{categoryData?.icon}</span>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {feedback.title}
                      </h3>
                      <Badge className={getStatusColor(feedback.status)}>
                        {
                          feedbackStatusOptions.find(
                            (s) => s.value === feedback.status
                          )?.label
                        }
                      </Badge>
                      <div className="flex items-center gap-1">
                        {[...Array(feedback.rating)].map((_, i) => (
                          <RatingIcons
                            key={i}
                            className="h-4 w-4 text-yellow-400"
                          />
                        ))}
                        <span className="text-sm text-gray-500 ml-1">
                          ({feedback.rating})
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4 leading-relaxed">
                      {feedback.content}
                    </p>

                    {feedback.adminResponse && (
                      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
                        <div className="flex">
                          <div className="ml-3">
                            <p className="text-sm font-medium text-blue-800">
                              প্রশাসনিক উত্তর:
                            </p>
                            <p className="text-sm text-blue-700 mt-1">
                              {feedback.adminResponse}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <UserIcon className="h-4 w-4" />
                        {feedback.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <ClockIcon className="h-4 w-4" />
                        {formatDateForFeedback(feedback.date)}
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs px-2 py-1 bg-gray-100 rounded">
                          {categoryData?.label}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(feedback)}
                    >
                      <PencilIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setDeleteDialog({
                          open: true,
                          feedbackId: feedback.id,
                        })
                      }
                    >
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })
      )}
    </div>
  );
}
