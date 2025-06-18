"use client";

import { useState, useMemo } from "react";
import ConfirmationDialog from "@/components/modals/ConfirmationDialog";
import NoticeBoardHeader from "@/components/dashboard/notices/NoticeBoardHeader";
import NoticeBoardFilters from "@/components/dashboard/notices/NoticeBoardFilters";
import NoticeForm from "@/components/dashboard/notices/NoticeForm";
import NoticeList from "@/components/dashboard/notices/NoticeList";

import { mockNotices, priorityOptions, typeOptions } from "@/lib/data";
import {
  getPriorityIcon,
  getPriorityColor,
  formatDate,
  isExpiringSoon,
  isExpired,
} from "@/lib/noticeUtils";

export default function NoticesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("all");
  const [notices, setNotices] = useState(mockNotices);
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

  const filteredNotices = useMemo(() => {
    return notices.filter(({ title, content, priority, isActive }) => {
      const matchesSearch =
        title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        content.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPriority =
        selectedPriority === "all" || priority === selectedPriority;
      return matchesSearch && matchesPriority && isActive;
    });
  }, [notices, searchTerm, selectedPriority]);

  const resetForm = () => {
    setNoticeData({
      title: "",
      content: "",
      priority: "normal",
      type: "general",
      expiryDate: "",
    });
    setEditingNotice(null);
    setShowAddForm(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingNotice) {
      setNotices((prev) =>
        prev.map((n) =>
          n.id === editingNotice.id ? { ...n, ...noticeData } : n
        )
      );
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
    setNotices((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isActive: false } : n))
    );
    setDeleteDialog({ open: false, noticeId: null });
  };

  return (
    <div className="p-6">
      <NoticeBoardHeader onAddNotice={() => setShowAddForm(true)} />

      <NoticeBoardFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedPriority={selectedPriority}
        setSelectedPriority={setSelectedPriority}
        priorityOptions={priorityOptions}
      />

      {showAddForm && (
        <NoticeForm
          noticeData={noticeData}
          setNoticeData={setNoticeData}
          handleSubmit={handleSubmit}
          resetForm={resetForm}
          editingNotice={editingNotice}
          priorityOptions={priorityOptions}
          typeOptions={typeOptions}
        />
      )}

      <NoticeList
        filteredNotices={filteredNotices}
        priorityOptions={priorityOptions}
        getPriorityIcon={getPriorityIcon}
        getPriorityColor={getPriorityColor}
        getTypeIcon={(type) => typeOptions.find((t) => t.value === type)?.icon}
        isExpired={isExpired}
        isExpiringSoon={isExpiringSoon}
        formatDate={formatDate}
        handleEdit={handleEdit}
        setDeleteDialog={setDeleteDialog}
      />

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
