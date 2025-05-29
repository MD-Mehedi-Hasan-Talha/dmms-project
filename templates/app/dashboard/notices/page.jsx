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
  SpeakerWaveIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  BellIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  CheckCircleIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  ClockIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { ConfirmationDialog } from "@/components/modals";

export default function NoticesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("all");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingNotice, setEditingNotice] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    noticeId: null,
  });

  const [noticeData, setNoticeData] = useState({
    title: "",
    content: "",
    priority: "normal",
    type: "general",
    expiryDate: "",
  });

  // Mock notices data
  const [notices, setNotices] = useState([
    {
      id: 1,
      title: "মাসিক বিল পরিশোধের সময়সীমা",
      content:
        "সকল সদস্যদের জানানো হচ্ছে যে এই মাসের বিল ৩০ তারিখের মধ্যে পরিশোধ করতে হবে। বিলম্বের জন্য জরিমানা প্রযোজ্য হবে।",
      priority: "high",
      type: "payment",
      author: "প্রশাসক",
      date: "2025-05-29",
      expiryDate: "2025-05-30",
      isActive: true,
    },
    {
      id: 2,
      title: "নতুন রান্নার নিয়মাবলী",
      content:
        "রান্নাঘরে নতুন কিছু নিয়ম চালু করা হয়েছে। সবাই অনুগ্রহ করে নিয়মগুলো মেনে চলুন।",
      priority: "normal",
      type: "general",
      author: "ম্যানেজার",
      date: "2025-05-28",
      expiryDate: "2025-06-15",
      isActive: true,
    },
    {
      id: 3,
      title: "ঈদের ছুটির তালিকা",
      content:
        "আগামী ঈদের জন্য যারা ছুটি নিবেন তাদের নাম আগাম জানাতে হবে। মিল বন্ধ থাকবে ৩ দিন।",
      priority: "normal",
      type: "holiday",
      author: "প্রশাসক",
      date: "2025-05-27",
      expiryDate: "2025-06-20",
      isActive: true,
    },
    {
      id: 4,
      title: "গ্যাস সংযোগ রক্ষণাবেক্ষণ",
      content:
        "আগামীকাল বিকাল ২টা থেকে ৪টা পর্যন্ত গ্যাস সংযোগ বন্ধ থাকবে। সেই অনুযায়ী খাবার প্রস্তুতির ব্যবস্থা নিন।",
      priority: "urgent",
      type: "maintenance",
      author: "রক্ষণাবেক্ষণ টিম",
      date: "2025-05-29",
      expiryDate: "2025-05-30",
      isActive: true,
    },
  ]);

  const priorityOptions = [
    { value: "all", label: "সব অগ্রাধিকার" },
    { value: "urgent", label: "জরুরি", color: "bg-red-100 text-red-800" },
    {
      value: "high",
      label: "গুরুত্বপূর্ণ",
      color: "bg-orange-100 text-orange-800",
    },
    { value: "normal", label: "সাধারণ", color: "bg-blue-100 text-blue-800" },
    {
      value: "low",
      label: "কম গুরুত্বপূর্ণ",
      color: "bg-gray-100 text-gray-800",
    },
  ];

  const typeOptions = [
    { value: "general", label: "সাধারণ", icon: InformationCircleIcon },
    { value: "payment", label: "পেমেন্ট", icon: ExclamationTriangleIcon },
    { value: "maintenance", label: "রক্ষণাবেক্ষণ", icon: ClockIcon },
    { value: "holiday", label: "ছুটির দিন", icon: CheckCircleIcon },
  ];

  const getPriorityIcon = (priority) => {
    const icons = {
      urgent: ExclamationTriangleIcon,
      high: BellIcon,
      normal: InformationCircleIcon,
      low: CheckCircleIcon,
    };
    return icons[priority] || InformationCircleIcon;
  };

  const getPriorityColor = (priority) => {
    const colors = {
      urgent: "bg-red-100 text-red-800 border-red-200",
      high: "bg-orange-100 text-orange-800 border-orange-200",
      normal: "bg-blue-100 text-blue-800 border-blue-200",
      low: "bg-gray-100 text-gray-800 border-gray-200",
    };
    return colors[priority] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const getTypeIcon = (type) => {
    const typeData = typeOptions.find((t) => t.value === type);
    return typeData?.icon || InformationCircleIcon;
  };

  const filteredNotices = notices.filter((notice) => {
    const matchesSearch =
      notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notice.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority =
      selectedPriority === "all" || notice.priority === selectedPriority;
    return matchesSearch && matchesPriority && notice.isActive;
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingNotice) {
      setNotices(
        notices.map((notice) =>
          notice.id === editingNotice.id
            ? {
                ...notice,
                ...noticeData,
                id: editingNotice.id,
                author: editingNotice.author,
                date: editingNotice.date,
              }
            : notice
        )
      );
      setEditingNotice(null);
    } else {
      const newNotice = {
        id: Date.now(),
        ...noticeData,
        author: "প্রশাসক",
        date: new Date().toISOString().split("T")[0],
        isActive: true,
      };
      setNotices([newNotice, ...notices]);
    }

    resetForm();
  };

  const resetForm = () => {
    setNoticeData({
      title: "",
      content: "",
      priority: "normal",
      type: "general",
      expiryDate: "",
    });
    setShowAddForm(false);
    setEditingNotice(null);
  };

  const handleEdit = (notice) => {
    setNoticeData({
      title: notice.title,
      content: notice.content,
      priority: notice.priority,
      type: notice.type,
      expiryDate: notice.expiryDate,
    });
    setEditingNotice(notice);
    setShowAddForm(true);
  };

  const handleDelete = (id) => {
    setNotices(
      notices.map((notice) =>
        notice.id === id ? { ...notice, isActive: false } : notice
      )
    );
    setDeleteDialog({ open: false, noticeId: null });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("bn-BD", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const isExpiringSoon = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 3 && diffDays > 0;
  };

  const isExpired = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    return expiry < today;
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              নোটিশ বোর্ড
            </h1>
            <p className="text-gray-600">মেস সংক্রান্ত সকল ঘোষণা ও বিজ্ঞপ্তি</p>
          </div>
          <Button onClick={() => setShowAddForm(true)} className="mt-4 sm:mt-0">
            <PlusIcon className="h-4 w-4 mr-2" />
            নতুন নোটিশ
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="নোটিশ খুঁজুন..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select
              value={selectedPriority}
              onValueChange={setSelectedPriority}
            >
              <SelectTrigger>
                <SelectValue placeholder="অগ্রাধিকার নির্বাচন করুন" />
              </SelectTrigger>
              <SelectContent>
                {priorityOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Notice Form */}
      {showAddForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>
              {editingNotice ? "নোটিশ সম্পাদনা" : "নতুন নোটিশ যোগ করুন"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">নোটিশের শিরোনাম *</Label>
                  <Input
                    id="title"
                    value={noticeData.title}
                    onChange={(e) =>
                      setNoticeData({ ...noticeData, title: e.target.value })
                    }
                    placeholder="নোটিশের শিরোনাম লিখুন"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="expiryDate">মেয়াদ উত্তীর্ণের তারিখ *</Label>
                  <Input
                    id="expiryDate"
                    type="date"
                    value={noticeData.expiryDate}
                    onChange={(e) =>
                      setNoticeData({
                        ...noticeData,
                        expiryDate: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="priority">অগ্রাধিকার</Label>
                  <Select
                    value={noticeData.priority}
                    onValueChange={(value) =>
                      setNoticeData({ ...noticeData, priority: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {priorityOptions.slice(1).map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="type">ধরন</Label>
                  <Select
                    value={noticeData.type}
                    onValueChange={(value) =>
                      setNoticeData({ ...noticeData, type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {typeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="content">নোটিশের বিস্তারিত *</Label>
                <Textarea
                  id="content"
                  value={noticeData.content}
                  onChange={(e) =>
                    setNoticeData({ ...noticeData, content: e.target.value })
                  }
                  placeholder="নোটিশের বিস্তারিত তথ্য লিখুন"
                  rows={4}
                  required
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit">
                  {editingNotice ? "আপডেট করুন" : "নোটিশ প্রকাশ করুন"}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  বাতিল
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Notices List */}
      <div className="space-y-4">
        {filteredNotices.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <SpeakerWaveIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                কোন নোটিশ পাওয়া যায়নি
              </h3>
              <p className="text-gray-500">
                এই মুহূর্তে কোন সক্রিয় নোটিশ নেই।
              </p>
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
                  <div className="flex items-start justify-between">
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

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, noticeId: null })}
        onConfirm={() => handleDelete(deleteDialog.noticeId)}
        title="নোটিশ মুছে ফেলুন"
        message="আপনি কি এই নোটিশটি মুছে ফেলতে চান? এটি পূর্বাবস্থায় ফেরানো যাবে না।"
        variant="danger"
      />
    </div>
  );
}
