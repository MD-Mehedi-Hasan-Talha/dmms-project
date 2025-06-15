"use client";

import { useState, useEffect } from "react";
import {
  CalendarDaysIcon,
  UserGroupIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  ClockIcon,
  ShoppingCartIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

// Mock data for demonstration
const mockMembers = [
  { id: 1, name: "আহমেদ আলী", phone: "01711111111", isActive: true },
  { id: 2, name: "মোহাম্মদ করিম", phone: "01722222222", isActive: true },
  { id: 3, name: "রহিম উদ্দিন", phone: "01733333333", isActive: true },
  { id: 4, name: "সালাম মিয়া", phone: "01744444444", isActive: true },
  { id: 5, name: "জাহিদ হাসান", phone: "01755555555", isActive: true },
  { id: 6, name: "ফারুক আহমেদ", phone: "01766666666", isActive: false },
];

const mockRoster = [
  {
    id: 1,
    date: "2024-01-15",
    memberId: 1,
    memberName: "আহমেদ আলী",
    status: "completed",
    amount: 1200,
  },
  {
    id: 2,
    date: "2024-01-16",
    memberId: 2,
    memberName: "মোহাম্মদ করিম",
    status: "completed",
    amount: 980,
  },
  {
    id: 3,
    date: "2024-01-17",
    memberId: 3,
    memberName: "রহিম উদ্দিন",
    status: "pending",
    amount: 0,
  },
  {
    id: 4,
    date: "2024-01-18",
    memberId: 4,
    memberName: "সালাম মিয়া",
    status: "assigned",
    amount: 0,
  },
  {
    id: 5,
    date: "2024-01-19",
    memberId: 5,
    memberName: "জাহিদ হাসান",
    status: "assigned",
    amount: 0,
  },
];

const weekDays = [
  "রবিবার",
  "সোমবার",
  "মঙ্গলবার",
  "বুধবার",
  "বৃহস্পতিবার",
  "শুক্রবার",
  "শনিবার",
];

export default function ShoppingRosterPage() {
  const [activeTab, setActiveTab] = useState("schedule");
  const [members, setMembers] = useState(mockMembers);
  const [roster, setRoster] = useState(mockRoster);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showAutoScheduleModal, setShowAutoScheduleModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedMember, setSelectedMember] = useState("");

  // Auto schedule settings
  const [autoScheduleSettings, setAutoScheduleSettings] = useState({
    startDate: "",
    endDate: "",
    rotationOrder: [],
    skipWeekends: false,
    skipSpecificDays: [],
  });
  const getStatusBadge = (status) => {
    const statusConfig = {
      completed: { color: "bg-green-100 text-green-800", text: "সম্পূর্ণ" },
      pending: { color: "bg-yellow-100 text-yellow-800", text: "অপেক্ষমাণ" },
      assigned: { color: "bg-blue-100 text-blue-800", text: "নির্ধারিত" },
      missed: { color: "bg-red-100 text-red-800", text: "মিস" },
    };

    const config = statusConfig[status] || statusConfig.assigned;
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${config.color} status-badge status-${status} print:text-black print:bg-gray-100`}
      >
        {config.text}
      </span>
    );
  };

  const handleAssignShopping = () => {
    if (!selectedDate || !selectedMember) return;

    const member = members.find((m) => m.id === parseInt(selectedMember));
    const newAssignment = {
      id: roster.length + 1,
      date: selectedDate,
      memberId: member.id,
      memberName: member.name,
      status: "assigned",
      amount: 0,
    };

    setRoster([...roster, newAssignment]);
    setShowAssignModal(false);
    setSelectedDate("");
    setSelectedMember("");
  };

  const handleAutoSchedule = () => {
    const { startDate, endDate, rotationOrder, skipWeekends } =
      autoScheduleSettings;
    if (!startDate || !endDate || rotationOrder.length === 0) return;

    const start = new Date(startDate);
    const end = new Date(endDate);
    const newRoster = [];
    let memberIndex = 0;

    for (
      let date = new Date(start);
      date <= end;
      date.setDate(date.getDate() + 1)
    ) {
      const dayOfWeek = date.getDay();

      // Skip weekends if enabled
      if (skipWeekends && (dayOfWeek === 0 || dayOfWeek === 6)) {
        continue;
      }

      const member = members.find((m) => m.id === rotationOrder[memberIndex]);
      if (member) {
        newRoster.push({
          id: roster.length + newRoster.length + 1,
          date: date.toISOString().split("T")[0],
          memberId: member.id,
          memberName: member.name,
          status: "assigned",
          amount: 0,
        });

        memberIndex = (memberIndex + 1) % rotationOrder.length;
      }
    }

    setRoster([...roster, ...newRoster]);
    setShowAutoScheduleModal(false);
    setAutoScheduleSettings({
      startDate: "",
      endDate: "",
      rotationOrder: [],
      skipWeekends: false,
      skipSpecificDays: [],
    });
  };

  const toggleMemberInRotation = (memberId) => {
    const { rotationOrder } = autoScheduleSettings;
    const index = rotationOrder.indexOf(memberId);

    if (index > -1) {
      setAutoScheduleSettings({
        ...autoScheduleSettings,
        rotationOrder: rotationOrder.filter((id) => id !== memberId),
      });
    } else {
      setAutoScheduleSettings({
        ...autoScheduleSettings,
        rotationOrder: [...rotationOrder, memberId],
      });
    }
  };

  const updateShoppingStatus = (rosterId, newStatus, amount = 0) => {
    setRoster(
      roster.map((item) =>
        item.id === rosterId
          ? {
              ...item,
              status: newStatus,
              amount: newStatus === "completed" ? amount : 0,
            }
          : item
      )
    );
  };

  const deleteRosterItem = (rosterId) => {
    setRoster(roster.filter((item) => item.id !== rosterId));
  };
  return (
    <>
      {/* Print Styles */}{" "}
      <style jsx global>{`
        @media print {
          /* Hide everything by default */
          body * {
            visibility: hidden;
          }

          /* Show only print container and its contents */
          .print-container,
          .print-container * {
            visibility: visible;
          }

          /* Print container styles */
          .print-container {
            position: absolute;
            left: 0;
            top: 0;
            width: 100% !important;
            padding: 15mm !important;
            margin: 0 !important;
            font-size: 11px !important;
            font-family: "SolaimanLipi", Arial, sans-serif !important;
            color: #000 !important;
            background: white !important;
          }

          /* Hide elements not needed in print */
          .no-print,
          .no-print * {
            display: none !important;
          }

          /* Print title styling */
          .print-title {
            text-align: center;
            font-size: 16px !important;
            font-weight: bold;
            margin-bottom: 15px !important;
            border-bottom: 2px solid #000;
            padding-bottom: 8px;
            color: #000 !important;
          }

          /* Header information */
          .print-header-info {
            display: flex !important;
            justify-content: space-between;
            margin-bottom: 15px !important;
            font-size: 10px !important;
            border-bottom: 1px solid #ccc;
            padding-bottom: 10px;
          }

          /* Table styles for print */
          .print-table {
            width: 100% !important;
            border-collapse: collapse !important;
            margin-top: 10px !important;
            font-size: 10px !important;
          }

          .print-table th,
          .print-table td {
            border: 1px solid #000 !important;
            padding: 6px 4px !important;
            text-align: left !important;
            font-size: 10px !important;
            line-height: 1.2 !important;
          }

          .print-table th {
            background-color: #f5f5f5 !important;
            font-weight: bold !important;
            text-align: center !important;
            color: #000 !important;
          }

          .print-table td {
            color: #000 !important;
          }

          /* Status badges for print */
          .status-completed {
            background: #d4edda !important;
            color: #155724 !important;
          }
          .status-pending {
            background: #fff3cd !important;
            color: #856404 !important;
          }
          .status-assigned {
            background: #cce7ff !important;
            color: #004085 !important;
          }
          .status-missed {
            background: #f8d7da !important;
            color: #721c24 !important;
          }

          .status-badge {
            padding: 2px 6px !important;
            border-radius: 3px !important;
            font-size: 9px !important;
            font-weight: bold !important;
            border: 1px solid !important;
          }

          /* Page settings */
          @page {
            size: A4;
            margin: 12mm;
          }

          /* Prevent page breaks inside table rows */
          .print-table tr {
            page-break-inside: avoid;
          }

          /* Statistics section for print */
          .print-stats {
            margin-top: 20px !important;
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 15px !important;
            font-size: 10px !important;
          }

          .print-stats h4 {
            font-size: 12px !important;
            margin-bottom: 8px !important;
            border-bottom: 1px solid #ccc;
            padding-bottom: 4px;
          }
        }
      `}</style>
      <div className="p-6 print-container">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 no-print">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <ShoppingCartIcon className="h-8 w-8 mr-3 text-blue-600" />
              বাজার রোস্টার
            </h1>
            <p className="text-gray-600 mt-1">
              সদস্যদের বাজারের পালা ও শিডিউল ব্যবস্থাপনা
            </p>
          </div>
          <button
            onClick={() => window.print()}
            className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <svg
              className="h-5 w-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
              />
            </svg>
            প্রিন্ট করুন
          </button>
        </div>

        {/* Print Header Info - Only visible when printing */}
        <div className="hidden print:block print-header-info">
          <div>
            <strong>মেস নাম:</strong> আমাদের মেস
          </div>
          <div>
            <strong>প্রিন্ট তারিখ:</strong>{" "}
            {new Date().toLocaleDateString("bn-BD")}
          </div>
        </div>

        {/* Print Title - Only visible when printing */}
        <div className="hidden print:block print-title">
          বাজার রোস্টার তালিকা
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("schedule")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "schedule"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <CalendarDaysIcon className="h-5 w-5 inline-block mr-2" />
              বাজার শিডিউল
            </button>
            <button
              onClick={() => setActiveTab("members")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "members"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <UserGroupIcon className="h-5 w-5 inline-block mr-2" />
              সদস্য ব্যবস্থাপনা
            </button>
          </nav>
        </div>

        {/* Schedule Tab */}
        {activeTab === "schedule" && (
          <div>
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mb-6">
              <button
                onClick={() => setShowAssignModal(true)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                নতুন বরাদ্দ
              </button>
              <button
                onClick={() => setShowAutoScheduleModal(true)}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <ClockIcon className="h-5 w-5 mr-2" />
                অটো শিডিউল
              </button>
            </div>{" "}
            {/* Roster Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 no-print">
                <h3 className="text-lg font-medium text-gray-900">
                  বাজার রোস্টার তালিকা
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 print-table">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider print:text-center print:text-black print:bg-gray-100">
                        তারিখ
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider print:text-center print:text-black print:bg-gray-100">
                        সদস্য
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider print:text-center print:text-black print:bg-gray-100">
                        অবস্থা
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider print:text-center print:text-black print:bg-gray-100">
                        খরচ (টাকা)
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider no-print">
                        অ্যাকশন
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {roster.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 print:text-black print:text-center">
                          {new Date(item.date).toLocaleDateString("bn-BD")}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 print:text-black">
                          {item.memberName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap print:text-black print:text-center">
                          {getStatusBadge(item.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 print:text-black print:text-center">
                          {item.amount > 0 ? `৳${item.amount}` : "-"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2 no-print">
                          {item.status === "assigned" && (
                            <>
                              <button
                                onClick={() => {
                                  const amount = prompt("বাজারের খরচ (টাকা):");
                                  if (amount && !isNaN(amount)) {
                                    updateShoppingStatus(
                                      item.id,
                                      "completed",
                                      parseInt(amount)
                                    );
                                  }
                                }}
                                className="text-green-600 hover:text-green-900"
                              >
                                <CheckCircleIcon className="h-5 w-5" />
                              </button>
                              <button
                                onClick={() =>
                                  updateShoppingStatus(item.id, "missed")
                                }
                                className="text-red-600 hover:text-red-900"
                              >
                                <XCircleIcon className="h-5 w-5" />
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => deleteRosterItem(item.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Members Tab */}
        {activeTab === "members" && (
          <div>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">
                  সদস্য তালিকা
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        নাম
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ফোন
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        অবস্থা
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        মোট বাজার
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        সর্বশেষ বাজার
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {members.map((member) => {
                      const memberRosters = roster.filter(
                        (r) => r.memberId === member.id
                      );
                      const completedRosters = memberRosters.filter(
                        (r) => r.status === "completed"
                      );
                      const lastShopping = memberRosters.sort(
                        (a, b) => new Date(b.date) - new Date(a.date)
                      )[0];

                      return (
                        <tr key={member.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {member.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {member.phone}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                member.isActive
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {member.isActive ? "সক্রিয়" : "নিষ্ক্রিয়"}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {completedRosters.length} বার
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {lastShopping
                              ? new Date(lastShopping.date).toLocaleDateString(
                                  "bn-BD"
                                )
                              : "কখনো না"}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Assign Shopping Modal */}
        {showAssignModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  নতুন বাজার বরাদ্দ
                </h3>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    তারিখ
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    সদস্য
                  </label>
                  <select
                    value={selectedMember}
                    onChange={(e) => setSelectedMember(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">সদস্য নির্বাচন করুন</option>
                    {members
                      .filter((m) => m.isActive)
                      .map((member) => (
                        <option key={member.id} value={member.id}>
                          {member.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowAssignModal(false)}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    বাতিল
                  </button>
                  <button
                    onClick={handleAssignShopping}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    বরাদ্দ করুন
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Auto Schedule Modal */}
        {showAutoScheduleModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-10 mx-auto p-5 border w-2/3 max-w-2xl shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  অটো শিডিউল তৈরি
                </h3>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      শুরুর তারিখ
                    </label>
                    <input
                      type="date"
                      value={autoScheduleSettings.startDate}
                      onChange={(e) =>
                        setAutoScheduleSettings({
                          ...autoScheduleSettings,
                          startDate: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      শেষের তারিখ
                    </label>
                    <input
                      type="date"
                      value={autoScheduleSettings.endDate}
                      onChange={(e) =>
                        setAutoScheduleSettings({
                          ...autoScheduleSettings,
                          endDate: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={autoScheduleSettings.skipWeekends}
                      onChange={(e) =>
                        setAutoScheduleSettings({
                          ...autoScheduleSettings,
                          skipWeekends: e.target.checked,
                        })
                      }
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">
                      সাপ্তাহিক ছুটি এড়িয়ে যান
                    </span>
                  </label>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    রোটেশন অর্ডার (ক্লিক করে সদস্য নির্বাচন করুন)
                  </label>
                  <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto border border-gray-200 rounded-md p-3">
                    {members
                      .filter((m) => m.isActive)
                      .map((member) => (
                        <label key={member.id} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={autoScheduleSettings.rotationOrder.includes(
                              member.id
                            )}
                            onChange={() => toggleMemberInRotation(member.id)}
                            className="mr-2"
                          />
                          <span className="text-sm text-gray-700">
                            {member.name}
                          </span>
                        </label>
                      ))}
                  </div>
                  {autoScheduleSettings.rotationOrder.length > 0 && (
                    <div className="mt-2 text-sm text-gray-600">
                      নির্বাচিত ক্রম:{" "}
                      {autoScheduleSettings.rotationOrder
                        .map((id) => members.find((m) => m.id === id)?.name)
                        .join(" → ")}
                    </div>
                  )}
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowAutoScheduleModal(false)}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    বাতিল
                  </button>
                  <button
                    onClick={handleAutoSchedule}
                    disabled={
                      !autoScheduleSettings.startDate ||
                      !autoScheduleSettings.endDate ||
                      autoScheduleSettings.rotationOrder.length === 0
                    }
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400"
                  >
                    শিডিউল তৈরি করুন
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
