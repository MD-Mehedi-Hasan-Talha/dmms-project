"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  Trash2,
  CheckCircle,
  XCircle,
  Info,
  HelpCircle,
} from "lucide-react";

const ConfirmationDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  type = "warning", // 'warning', 'danger', 'info', 'success'
  confirmText = "নিশ্চিত করুন",
  cancelText = "বাতিল",
  loading = false,
}) => {
  const getIcon = () => {
    switch (type) {
      case "danger":
        return <Trash2 className="h-8 w-8 text-red-500" />;
      case "warning":
        return <AlertTriangle className="h-8 w-8 text-yellow-500" />;
      case "success":
        return <CheckCircle className="h-8 w-8 text-green-500" />;
      case "info":
        return <Info className="h-8 w-8 text-blue-500" />;
      default:
        return <HelpCircle className="h-8 w-8 text-gray-500" />;
    }
  };

  const getButtonStyle = () => {
    switch (type) {
      case "danger":
        return "bg-red-600 hover:bg-red-700 text-white";
      case "warning":
        return "bg-yellow-600 hover:bg-yellow-700 text-white";
      case "success":
        return "bg-green-600 hover:bg-green-700 text-white";
      case "info":
        return "bg-blue-600 hover:bg-blue-700 text-white";
      default:
        return "bg-gray-600 hover:bg-gray-700 text-white";
    }
  };

  const getBorderStyle = () => {
    switch (type) {
      case "danger":
        return "border-red-200 bg-red-50";
      case "warning":
        return "border-yellow-200 bg-yellow-50";
      case "success":
        return "border-green-200 bg-green-50";
      case "info":
        return "border-blue-200 bg-blue-50";
      default:
        return "border-gray-200 bg-gray-50";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">{title}</DialogTitle>
        </DialogHeader>

        <div className="text-center space-y-4">
          {/* Icon */}
          <div className="flex justify-center">{getIcon()}</div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>

          {/* Message */}
          <div className={`p-4 rounded-lg border ${getBorderStyle()}`}>
            <p className="text-gray-700 text-sm leading-relaxed">{message}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={loading}
            >
              {cancelText}
            </Button>
            <Button
              type="button"
              onClick={onConfirm}
              className={`flex-1 ${getButtonStyle()}`}
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  অপেক্ষা করুন...
                </div>
              ) : (
                confirmText
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Predefined confirmation dialogs for common actions
export const DeleteConfirmation = ({
  isOpen,
  onClose,
  onConfirm,
  itemName,
  itemType = "আইটেম",
}) => (
  <ConfirmationDialog
    isOpen={isOpen}
    onClose={onClose}
    onConfirm={onConfirm}
    type="danger"
    title="মুছে ফেলার নিশ্চিতকরণ"
    message={`আপনি কি নিশ্চিত যে আপনি "${itemName}" ${itemType}টি মুছে ফেলতে চান? এই কাজটি পূর্বাবস্থায় ফেরানো যাবে না।`}
    confirmText="হ্যাঁ, মুছে দিন"
    cancelText="না, রাখুন"
  />
);

export const LogoutConfirmation = ({ isOpen, onClose, onConfirm }) => (
  <ConfirmationDialog
    isOpen={isOpen}
    onClose={onClose}
    onConfirm={onConfirm}
    type="warning"
    title="লগআউট নিশ্চিতকরণ"
    message="আপনি কি নিশ্চিত যে আপনি লগআউট করতে চান? আপনার অসংরক্ষিত কাজ হারিয়ে যেতে পারে।"
    confirmText="হ্যাঁ, লগআউট করুন"
    cancelText="না, থাকুন"
  />
);

export const ResetConfirmation = ({
  isOpen,
  onClose,
  onConfirm,
  dataType = "ডেটা",
}) => (
  <ConfirmationDialog
    isOpen={isOpen}
    onClose={onClose}
    onConfirm={onConfirm}
    type="warning"
    title="রিসেট নিশ্চিতকরণ"
    message={`আপনি কি নিশ্চিত যে আপনি সমস্ত ${dataType} রিসেট করতে চান? এই কাজটি পূর্বাবস্থায় ফেরানো যাবে না।`}
    confirmText="হ্যাঁ, রিসেট করুন"
    cancelText="না, রাখুন"
  />
);

export const SaveConfirmation = ({
  isOpen,
  onClose,
  onConfirm,
  hasChanges = true,
}) => (
  <ConfirmationDialog
    isOpen={isOpen}
    onClose={onClose}
    onConfirm={onConfirm}
    type={hasChanges ? "warning" : "info"}
    title="পরিবর্তন সংরক্ষণ"
    message={
      hasChanges
        ? "আপনার কিছু পরিবর্তন রয়েছে যা সংরক্ষিত হয়নি। আপনি কি সেগুলো সংরক্ষণ করতে চান?"
        : "আপনি কি নিশ্চিত যে আপনি এই তথ্য সংরক্ষণ করতে চান?"
    }
    confirmText="হ্যাঁ, সংরক্ষণ করুন"
    cancelText="না, সংরক্ষণ করবেন না"
  />
);

export const StatusChangeConfirmation = ({
  isOpen,
  onClose,
  onConfirm,
  itemName,
  currentStatus,
  newStatus,
}) => (
  <ConfirmationDialog
    isOpen={isOpen}
    onClose={onClose}
    onConfirm={onConfirm}
    type="info"
    title="স্ট্যাটাস পরিবর্তন"
    message={`আপনি কি নিশ্চিত যে আপনি "${itemName}" এর স্ট্যাটাস "${currentStatus}" থেকে "${newStatus}" এ পরিবর্তন করতে চান?`}
    confirmText="হ্যাঁ, পরিবর্তন করুন"
    cancelText="না, রাখুন"
  />
);

export const BulkActionConfirmation = ({
  isOpen,
  onClose,
  onConfirm,
  action,
  itemCount,
  itemType = "আইটেম",
}) => (
  <ConfirmationDialog
    isOpen={isOpen}
    onClose={onClose}
    onConfirm={onConfirm}
    type="warning"
    title={`বাল্ক ${action} নিশ্চিতকরণ`}
    message={`আপনি কি নিশ্চিত যে আপনি ${itemCount}টি ${itemType} ${action} করতে চান? এই কাজটি সমস্ত নির্বাচিত আইটেমের উপর প্রয়োগ হবে।`}
    confirmText={`হ্যাঁ, ${action} করুন`}
    cancelText="না, বাতিল করুন"
  />
);

export default ConfirmationDialog;
