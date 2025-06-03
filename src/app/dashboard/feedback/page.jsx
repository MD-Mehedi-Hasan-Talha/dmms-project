"use client";

import { useState } from "react";
import {
  mockFeedbacks,
  feedbackCategoryOptions,
  feedbackStatusOptions,
} from "@/lib/data/feedbackData";
import ConfirmationDialog from "@/components/modals/ConfirmationDialog";
import Header from "@/components/feedback/Header";
import Statistics from "@/components/feedback/Statistics";
import SearchFilter from "@/components/feedback/SearchFilter";
import FeedbackForm from "@/components/feedback/FeedbackForm";
import FeedbackList from "@/components/feedback/FeedbackList";

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

  const [feedbacks, setFeedbacks] = useState(mockFeedbacks);

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

  const feedbackStats = {
    total: feedbacks.length,
    pending: feedbacks.filter((f) => f.status === "pending").length,
    resolved: feedbacks.filter((f) => f.status === "resolved").length,
    avgRating:
      feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length || 0,
  };

  return (
    <>
      <div className="p-6 ">
        {/* Header */}
        <Header
          showFeedbackForm={showFeedbackForm}
          toggle={setShowFeedbackForm}
        />

        {/* Stats */}
        <Statistics feedbackStats={feedbackStats} />

        {/* Filters */}
        <SearchFilter
          feedbackStatusOptions={feedbackStatusOptions}
          feedbackCategoryOptions={feedbackCategoryOptions}
          searchTerm={searchTerm}
          selectedStatus={selectedStatus}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          setSearchTerm={setSearchTerm}
          setSelectedStatus={setSelectedStatus}
        />

        {/* Add/Edit Feedback Form */}
        {showFeedbackForm && (
          <FeedbackForm
            editingFeedback={editingFeedback}
            feedbackData={feedbackData}
            setFeedbackData={setFeedbackData}
            handleSubmit={handleSubmit}
            resetForm={resetForm}
            feedbackCategoryOptions={feedbackCategoryOptions}
          />
        )}

        {/* Feedback List */}
        <FeedbackList
          feedbackStatusOptions={feedbackStatusOptions}
          filteredFeedbacks={filteredFeedbacks}
          feedbackCategoryOptions={feedbackCategoryOptions}
          handleEdit={handleEdit}
          setDeleteDialog={setDeleteDialog}
        />

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
    </>
  );
}
