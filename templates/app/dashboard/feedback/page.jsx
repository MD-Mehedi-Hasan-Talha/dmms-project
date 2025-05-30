"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import { ConfirmationDialog } from "@/components/modals";

export default function FeedbackPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [editingFeedback, setEditingFeedback] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    feedbackId: null,
  });

  const [feedbackData, setFeedbackData] = useState({
    title: "",
    content: "",
    category: "general",
    rating: 5,
    anonymous: false,
  });

  // Mock feedback data
  const [feedbacks, setFeedbacks] = useState([
    {
      id: 1,
      title: "রান্নার মানের উন্নতি প্রয়োজন",
      content:
        "গত কয়েকদিন ধরে খাবারের স্বাদ আগের মতো ভালো নেই। বিশেষ করে সবজি রান্নায় লবণের পরিমাণ কম থাকে।",
      category: "food",
      rating: 3,
      author: "রহিম উদ্দিন",
      anonymous: false,
      date: "2025-05-29",
      status: "pending",
      adminResponse: null,
    },
    {
      id: 2,
      title: "রান্নাঘরের পরিচ্ছন্নতা",
      content:
        "রান্নাঘরটি আরো পরিষ্কার রাখা প্রয়োজন। বিশেষ করে সন্ধ্যার পর ভালো করে পরিষ্কার করা হয় না।",
      category: "cleanliness",
      rating: 2,
      author: "Anonymous",
      anonymous: true,
      date: "2025-05-28",
      status: "resolved",
      adminResponse:
        "আপনার মতামতের জন্য ধন্যবাদ। আমরা পরিষ্কার-পরিচ্ছন্নতার বিষয়ে আরো সতর্ক হবো।",
    },
    {
      id: 3,
      title: "দুর্দান্ত সেবা!",
      content:
        "গত মাসে মেস ম্যানেজমেন্টের সেবা খুবই ভালো ছিল। সবাই অনেক সহযোগিতা করেছে।",
      category: "service",
      rating: 5,
      author: "করিম সাহেব",
      anonymous: false,
      date: "2025-05-27",
      status: "resolved",
      adminResponse:
        "আপনার প্রশংসার জন্য ধন্যবাদ। আমরা আরো ভালো সেবা দিতে চেষ্টা করবো।",
    },
    {
      id: 4,
      title: "বিলিং সিস্টেমের সমস্যা",
      content:
        "এই মাসের বিল ক্যালকুলেশনে কিছু ভুল আছে বলে মনে হচ্ছে। একবার চেক করে দেখবেন।",
      category: "billing",
      rating: 3,
      author: "নাসির হোসেন",
      anonymous: false,
      date: "2025-05-26",
      status: "in_progress",
      adminResponse: "আমরা বিষয়টি দেখছি। শীঘ্রই সমাধান করা হবে।",
    },
  ]);

  const categoryOptions = [
    { value: "all", label: "সব ক্যাটেগরি" },
    { value: "food", label: "খাবার", icon: "🍽️" },
    { value: "service", label: "সেবা", icon: "👥" },
    { value: "cleanliness", label: "পরিচ্ছন্নতা", icon: "🧽" },
    { value: "billing", label: "বিলিং", icon: "💰" },
    { value: "facility", label: "সুবিধা", icon: "🏠" },
    { value: "general", label: "সাধারণ", icon: "📝" },
  ];

  const statusOptions = [
    { value: "all", label: "সব স্ট্যাটাস" },
    {
      value: "pending",
      label: "অপেক্ষমাণ",
      color: "bg-yellow-100 text-yellow-800",
    },
    {
      value: "in_progress",
      label: "প্রক্রিয়াধীন",
      color: "bg-blue-100 text-blue-800",
    },
    {
      value: "resolved",
      label: "সমাধান হয়েছে",
      color: "bg-green-100 text-green-800",
    },
    {
      value: "rejected",
      label: "প্রত্যাখ্যাত",
      color: "bg-red-100 text-red-800",
    },
  ];

  const getRatingIcon = (rating) => {
    if (rating >= 4) return FaceSmileIcon;
    if (rating >= 3) return StarIcon;
    return FaceFrownIcon;
  };

  const getRatingColor = (rating) => {
    if (rating >= 4) return "text-green-600";
    if (rating >= 3) return "text-yellow-600";
    return "text-red-600";
  };

  const getStatusColor = (status) => {
    const statusData = statusOptions.find((s) => s.value === status);
    return statusData?.color || "bg-gray-100 text-gray-800";
  };

  const filteredFeedbacks = feedbacks.filter((feedback) => {
    const matchesSearch =
      feedback.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || feedback.category === selectedCategory;
    const matchesStatus =
      selectedStatus === "all" || feedback.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingFeedback) {
      setFeedbacks(
        feedbacks.map((feedback) =>
          feedback.id === editingFeedback.id
            ? {
                ...feedback,
                ...feedbackData,
                id: editingFeedback.id,
                author: editingFeedback.author,
                date: editingFeedback.date,
                status: editingFeedback.status,
                adminResponse: editingFeedback.adminResponse,
              }
            : feedback
        )
      );
      setEditingFeedback(null);
    } else {
      const newFeedback = {
        id: Date.now(),
        ...feedbackData,
        author: feedbackData.anonymous ? "Anonymous" : "বর্তমান ব্যবহারকারী",
        date: new Date().toISOString().split("T")[0],
        status: "pending",
        adminResponse: null,
      };
      setFeedbacks([newFeedback, ...feedbacks]);
    }

    resetForm();
  };

  const resetForm = () => {
    setFeedbackData({
      title: "",
      content: "",
      category: "general",
      rating: 5,
      anonymous: false,
    });
    setShowFeedbackForm(false);
    setEditingFeedback(null);
  };

  const handleEdit = (feedback) => {
    setFeedbackData({
      title: feedback.title,
      content: feedback.content,
      category: feedback.category,
      rating: feedback.rating,
      anonymous: feedback.anonymous,
    });
    setEditingFeedback(feedback);
    setShowFeedbackForm(true);
  };

  const handleDelete = (id) => {
    setFeedbacks(feedbacks.filter((feedback) => feedback.id !== id));
    setDeleteDialog({ open: false, feedbackId: null });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("bn-BD", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const feedbackStats = {
    total: feedbacks.length,
    pending: feedbacks.filter((f) => f.status === "pending").length,
    resolved: feedbacks.filter((f) => f.status === "resolved").length,
    avgRating:
      feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length || 0,
  };

  return (
    <div className="p-6">
      {/* Header */}
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
            className="mt-4 sm:mt-0"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            ফিডব্যাক দিন
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  মোট ফিডব্যাক
                </p>
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
                <p className="text-sm font-medium text-gray-600">
                  সমাধান হয়েছে
                </p>
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

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="ফিডব্যাক খুঁজুন..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger>
                <SelectValue placeholder="ক্যাটেগরি নির্বাচন করুন" />
              </SelectTrigger>
              <SelectContent>
                {categoryOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.icon && <span className="mr-2">{option.icon}</span>}
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="স্ট্যাটাস নির্বাচন করুন" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Feedback Form */}
      {showFeedbackForm && (
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
                      {categoryOptions.slice(1).map((option) => (
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
                <Button type="submit">
                  {editingFeedback ? "আপডেট করুন" : "ফিডব্যাক পাঠান"}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  বাতিল
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Feedback List */}
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
            const RatingIcon = getRatingIcon(feedback.rating);
            const categoryData = categoryOptions.find(
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
                            statusOptions.find(
                              (s) => s.value === feedback.status
                            )?.label
                          }
                        </Badge>
                        <div className="flex items-center gap-1">
                          {[...Array(feedback.rating)].map((_, i) => (
                            <StarIconSolid
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
                          {formatDate(feedback.date)}
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

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, feedbackId: null })}
        onConfirm={() => handleDelete(deleteDialog.feedbackId)}
        title="ফিডব্যাক মুছে ফেলুন"
        message="আপনি কি এই ফিডব্যাকটি মুছে ফেলতে চান? এটি পূর্বাবস্থায় ফেরানো যাবে না।"
        variant="danger"
      />
    </div>
  );
}
