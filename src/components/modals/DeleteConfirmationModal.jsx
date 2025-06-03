"use client";

import ConfirmationDialog from "./ConfirmationDialog";

export default function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  itemName,
  itemType = "আইটেম",
}) {
  return (
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
}
