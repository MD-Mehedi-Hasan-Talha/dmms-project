import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  SpeakerWaveIcon,
  ExclamationTriangleIcon,
  PencilIcon,
  TrashIcon,
  ClockIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

const NoticeList = ({
  filteredNotices,
  priorityOptions,
  getPriorityIcon,
  getPriorityColor,
  getTypeIcon,
  isExpired,
  isExpiringSoon,
  formatDate,
  handleEdit,
  setDeleteDialog,
}) => {
  return (
    <div className="space-y-4">
      {filteredNotices.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <SpeakerWaveIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              কোন নোটিশ পাওয়া যায়নি
            </h3>
            <p className="text-gray-500">এই মুহূর্তে কোন সক্রিয় নোটিশ নেই।</p>
          </CardContent>
        </Card>
      ) : (
        filteredNotices.map((notice) => {
          const PriorityIcon = getPriorityIcon(notice.priority);
          const TypeIcon = getTypeIcon(notice.type);

          return (
            <Card
              key={notice.id}
              className={`${
                isExpired(notice.expiryDate)
                  ? "border-red-200 bg-red-50"
                  : isExpiringSoon(notice.expiryDate)
                    ? "border-yellow-200 bg-yellow-50"
                    : ""
              }`}
            >
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <TypeIcon className="h-5 w-5 text-gray-600" />
                      <h3 className="text-lg font-semibold text-gray-900">
                        {notice.title}
                      </h3>
                      <Badge className={getPriorityColor(notice.priority)}>
                        <PriorityIcon className="h-3 w-3 mr-1" />
                        {
                          priorityOptions.find(
                            (p) => p.value === notice.priority
                          )?.label
                        }
                      </Badge>
                      {isExpiringSoon(notice.expiryDate) && (
                        <Badge className="bg-yellow-100 text-yellow-800">
                          শীঘ্রই মেয়াদ শেষ
                        </Badge>
                      )}
                      {isExpired(notice.expiryDate) && (
                        <Badge className="bg-red-100 text-red-800">
                          মেয়াদ শেষ
                        </Badge>
                      )}
                    </div>

                    <p className="text-gray-700 mb-4 leading-relaxed">
                      {notice.content}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <UserIcon className="h-4 w-4" />
                        {notice.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <ClockIcon className="h-4 w-4" />
                        {formatDate(notice.date)}
                      </div>
                      <div className="flex items-center gap-1">
                        <ExclamationTriangleIcon className="h-4 w-4" />
                        মেয়াদ: {formatDate(notice.expiryDate)}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(notice)}
                    >
                      <PencilIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setDeleteDialog({ open: true, noticeId: notice.id })
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
};

export default NoticeList;
