"use client";

import Image from "next/image";
import { useState } from "react";

// Main App component
const MainPage = () => {
  // State to manage the currently active section in the UI
  const [activeSection, setActiveSection] = useState("dashboard");

  // Dummy data for demonstration purposes
  const dummyMenu = [
    {
      day: "রবিবার",
      breakfast: "রুটি, সবজি",
      lunch: "ভাত, ডাল, ডিম ভাজি",
      dinner: "ভাত, সবজি, মাছ",
    },
    {
      day: "সোমবার",
      breakfast: "খিচুড়ি",
      lunch: "ভাত, ডাল, মুরগির মাংস",
      dinner: "রুটি, সবজি",
    },
    {
      day: "মঙ্গলবার",
      breakfast: "পরোটা, ডাল",
      lunch: "ভাত, ডাল, সবজি",
      dinner: "ভাত, ডাল, ডিম কারি",
    },
    {
      day: "বুধবার",
      breakfast: "নুডুলস",
      lunch: "ভাত, ডাল, মাছ",
      dinner: "রুটি, সবজি, মাংস",
    },
    {
      day: "বৃহস্পতিবার",
      breakfast: "ডিম টোস্ট",
      lunch: "ভাত, ডাল, সবজি",
      dinner: "ভাত, ডাল, মাছ",
    },
    {
      day: "শুক্রবার",
      breakfast: "বিরিয়ানি",
      lunch: "ভাত, ডাল, মুরগির মাংস",
      dinner: "রুটি, সবজি",
    },
    {
      day: "শনিবার",
      breakfast: "তেহারি",
      lunch: "ভাত, ডাল, ডিম কারি",
      dinner: "ভাত, সবজি, মাছ",
    },
  ];

  const dummyMembers = [
    { id: "M001", name: "আহমেদ", room: "101", contact: "017xxxxxxx1" },
    { id: "M002", name: "ফাহিম", room: "102", contact: "017xxxxxxx2" },
    { id: "M003", name: "সাদিয়া", room: "103", contact: "017xxxxxxx3" },
    { id: "M004", name: "নিলয়", room: "104", contact: "017xxxxxxx4" },
  ];

  const dummyBilling = [
    {
      id: "B001",
      member: "আহমেদ",
      month: "মে",
      totalBill: "৳ 3500",
      paid: "৳ 3500",
      due: "৳ 0",
    },
    {
      id: "B002",
      member: "ফাহিম",
      month: "মে",
      totalBill: "৳ 3200",
      paid: "৳ 2000",
      due: "৳ 1200",
    },
    {
      id: "B003",
      member: "সাদিয়া",
      month: "মে",
      totalBill: "৳ 3000",
      paid: "৳ 3000",
      due: "৳ 0",
    },
  ];

  // Function to render content based on the active section
  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              স্বাগতম, মিল ম্যানেজমেন্ট সিস্টেমে!
            </h2>
            <p className="text-gray-600">
              আপনার মেস/আবাসিক এলাকার খাবার ব্যবস্থাপনাকে সহজ করুন।
            </p>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-blue-100 p-4 rounded-lg shadow-sm">
                <p className="text-lg font-medium text-blue-800">
                  মোট সদস্য: {dummyMembers.length}
                </p>
              </div>
              <div className="bg-green-100 p-4 rounded-lg shadow-sm">
                <p className="text-lg font-medium text-green-800">
                  আজকের অর্ডার: 25টি
                </p>
              </div>
              <div className="bg-yellow-100 p-4 rounded-lg shadow-sm">
                <p className="text-lg font-medium text-yellow-800">
                  বকেয়া বিল: ৳ 1200
                </p>
              </div>
            </div>
          </div>
        );
      case "menu":
        return (
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              সাপ্তাহিক মেনু
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg overflow-hidden">
                <thead className="bg-gray-100 border-b border-gray-200">
                  <tr>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider rounded-tl-lg">
                      দিন
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                      সকালের নাস্তা
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                      দুপুরের খাবার
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider rounded-tr-lg">
                      রাতের খাবার
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {dummyMenu.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="py-3 px-4 whitespace-nowrap text-gray-700">
                        {item.day}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap text-gray-700">
                        {item.breakfast}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap text-gray-700">
                        {item.lunch}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap text-gray-700">
                        {item.dinner}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case "members":
        return (
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              সদস্য তালিকা
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg overflow-hidden">
                <thead className="bg-gray-100 border-b border-gray-200">
                  <tr>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider rounded-tl-lg">
                      আইডি
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                      নাম
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                      কক্ষ নং
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider rounded-tr-lg">
                      যোগাযোগ
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {dummyMembers.map((member) => (
                    <tr key={member.id} className="hover:bg-gray-50">
                      <td className="py-3 px-4 whitespace-nowrap text-gray-700">
                        {member.id}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap text-gray-700">
                        {member.name}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap text-gray-700">
                        {member.room}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap text-gray-700">
                        {member.contact}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case "billing":
        return (
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              বিলিং ও হিসাব
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg overflow-hidden">
                <thead className="bg-gray-100 border-b border-gray-200">
                  <tr>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider rounded-tl-lg">
                      বিল আইডি
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                      সদস্য
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                      মাস
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                      মোট বিল
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                      পরিশোধিত
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider rounded-tr-lg">
                      বকেয়া
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {dummyBilling.map((bill) => (
                    <tr key={bill.id} className="hover:bg-gray-50">
                      <td className="py-3 px-4 whitespace-nowrap text-gray-700">
                        {bill.id}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap text-gray-700">
                        {bill.member}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap text-gray-700">
                        {bill.month}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap text-gray-700">
                        {bill.totalBill}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap text-gray-700">
                        {bill.paid}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap text-gray-700">
                        {bill.due}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    // Main container for the entire application, using Inter font
    <div className="font-['Inter'] min-h-screen bg-gray-100 flex flex-col">
      {/* Header section */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 shadow-lg rounded-b-lg">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Image src="/App-logo.png" alt="Logo" width={50} height={50} /> মিল
            ম্যানেজমেন্ট সিস্টেম
          </h1>
          <nav>
            {/* Future authentication/user profile links could go here */}
          </nav>
        </div>
      </header>

      {/* Main content area, structured with a sidebar and main panel */}
      <div className="flex flex-1 container mx-auto mt-4 p-4 md:p-0">
        {/* Sidebar for navigation */}
        <aside className="w-full md:w-64 bg-white p-4 rounded-lg shadow-md mr-4 mb-4 md:mb-0 flex flex-col">
          <nav className="space-y-2">
            {/* Navigation links */}
            <button
              onClick={() => setActiveSection("dashboard")}
              className={`w-full text-left py-2 px-4 rounded-lg transition duration-200 ease-in-out
                ${
                  activeSection === "dashboard"
                    ? "bg-blue-500 text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              ড্যাশবোর্ড
            </button>
            <button
              onClick={() => setActiveSection("menu")}
              className={`w-full text-left py-2 px-4 rounded-lg transition duration-200 ease-in-out
                ${
                  activeSection === "menu"
                    ? "bg-blue-500 text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              মেনু
            </button>
            <button
              onClick={() => setActiveSection("members")}
              className={`w-full text-left py-2 px-4 rounded-lg transition duration-200 ease-in-out
                ${
                  activeSection === "members"
                    ? "bg-blue-500 text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              সদস্যগণ
            </button>
            <button
              onClick={() => setActiveSection("billing")}
              className={`w-full text-left py-2 px-4 rounded-lg transition duration-200 ease-in-out
                ${
                  activeSection === "billing"
                    ? "bg-blue-500 text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              বিলিং
            </button>
            {/* Add more navigation items as needed */}
          </nav>
        </aside>

        {/* Main content panel */}
        <main className="flex-1">{renderContent()}</main>
      </div>

      {/* Footer section */}
      <footer className="bg-gray-800 text-white p-4 mt-8 rounded-t-lg shadow-inner">
        <div className="container mx-auto text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} মিল ম্যানেজমেন্ট সিস্টেম।
            সর্বস্বত্ব সংরক্ষিত।
          </p>
        </div>
      </footer>
      <div>copyright 2025</div>
    </div>
  );
};

export default MainPage;
