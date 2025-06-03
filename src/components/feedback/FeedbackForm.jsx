import { useState } from "react";

import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChatBubbleLeftRightIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  StarIcon,
  HeartIcon,
  FaceSmileIcon,
  FaceFrownIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  UserIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
export default function FeedbackForm() {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>
          {editingFeedback ? "ফিডব্যাক সম্পাদনা" : "নতুন ফিডব্যাক"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">বিষয় *</Label>
            <Input
              id="title"
              value={feedbackData.title}
              onChange={(e) =>
                setFeedbackData({
                  ...feedbackData,
                  title: e.target.value,
                })
              }
              placeholder="ফিডব্যাকের বিষয় লিখুন"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category">ক্যাটেগরি</Label>
              <Select
                value={feedbackData.category}
                onValueChange={(value) =>
                  setFeedbackData({ ...feedbackData, category: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {feedbackCategoryOptions.slice(1).map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.icon && (
                        <span className="mr-2">{option.icon}</span>
                      )}
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="rating">রেটিং</Label>
              <Select
                value={feedbackData.rating.toString()}
                onValueChange={(value) =>
                  setFeedbackData({
                    ...feedbackData,
                    rating: parseInt(value),
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <SelectItem key={rating} value={rating.toString()}>
                      <div className="flex items-center gap-2">
                        {[...Array(rating)].map((_, i) => (
                          <StarIconSolid
                            key={i}
                            className="h-3 w-3 text-yellow-400"
                          />
                        ))}
                        <span>({rating})</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="content">বিস্তারিত *</Label>
            <Textarea
              id="content"
              value={feedbackData.content}
              onChange={(e) =>
                setFeedbackData({
                  ...feedbackData,
                  content: e.target.value,
                })
              }
              placeholder="আপনার মতামত বিস্তারিত লিখুন"
              rows={4}
              required
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="anonymous"
              checked={feedbackData.anonymous}
              onChange={(e) =>
                setFeedbackData({
                  ...feedbackData,
                  anonymous: e.target.checked,
                })
              }
              className="rounded border-gray-300"
            />
            <Label htmlFor="anonymous">গোপনীয়ভাবে পাঠান</Label>
          </div>

          <div className="flex gap-2">
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {editingFeedback ? "আপডেট করুন" : "ফিডব্যাক পাঠান"}
            </Button>
            <Button type="button" variant="outline" onClick={resetForm}>
              বাতিল
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
