"use client";

import { useState } from "react";
import { TABS } from "@/lib/data/constants";
import { MOCK_RECENT_ACTIVITIES, MOCK_USER_STATS } from "@/lib/data/mockData";

// Hooks
import { useUserData } from "@/app/hooks/useUserData";
import { usePasswordManager } from "@/app/hooks/usePasswordManager";
import { usePreferences } from "@/app/hooks/usePreferences";

// Components
import ProfileHeader from "./_components/ProfileHeader";
import ProfileForm from "./_components/ProfileForm";
import RecentActivity from "./_components/RecentActivity";
import UserStatistics from "./_components/UserStatistics";
import SecuritySettings from "./_components/SecuritySettings";
import PreferencesSettings from "./_components/PreferencesSettings";

export default function UserProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");

  const userDataProps = useUserData();
  const passwordManagerProps = usePasswordManager();
  const preferencesProps = usePreferences();

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileForm {...userDataProps} />;
      case "activity":
        return <RecentActivity activities={MOCK_RECENT_ACTIVITIES} />;
      case "statistics":
        return <UserStatistics stats={MOCK_USER_STATS} />;
      case "security":
        return <SecuritySettings {...passwordManagerProps} />;
      case "preferences":
        return <PreferencesSettings {...preferencesProps} />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          ব্যবহারকারী প্রোফাইল
        </h1>
        <p className="text-gray-600">
          আপনার প্রোফাইল তথ্য ও সেটিংস ব্যবস্থাপনা করুন
        </p>
      </div>

      <ProfileHeader user={userDataProps.userData} />

      <div className="mb-6">
        <nav className="flex space-x-2 sm:space-x-8 border-b border-gray-200">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 px-1 text-xs sm:text-sm border-b-2 font-medium ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {renderTabContent()}
    </div>
  );
}
