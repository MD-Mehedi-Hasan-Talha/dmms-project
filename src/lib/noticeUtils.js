// lib/noticeUtils.js
import {
  BellIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

export const getPriorityIcon = (priority) => {
  const icons = {
    urgent: ExclamationTriangleIcon,
    high: BellIcon,
    normal: InformationCircleIcon,
    low: CheckCircleIcon,
  };
  return icons[priority] || InformationCircleIcon;
};

export const getPriorityColor = (priority) => {
  const colors = {
    urgent: "bg-red-100 text-red-800 border-red-200",
    high: "bg-orange-100 text-orange-800 border-orange-200",
    normal: "bg-blue-100 text-blue-800 border-blue-200",
    low: "bg-gray-100 text-gray-800 border-gray-200",
  };
  return colors[priority] || "bg-gray-100 text-gray-800 border-gray-200";
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("bn-BD", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const isExpiringSoon = (expiryDate) => {
  const today = new Date();
  const expiry = new Date(expiryDate);
  const diffDays = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
  return diffDays <= 3 && diffDays > 0;
};

export const isExpired = (expiryDate) => new Date(expiryDate) < new Date();
