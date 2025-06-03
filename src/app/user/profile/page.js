"use client";

import { useState } from "react";
import { TABS_CONFIG } from "@/lib/data/constants";
import { MOCK_RECENT_ACTIVITIES, MOCK_USER_STATS } from "@/lib/data/mockData";

// Hooks
import { useUserData } from "@/hooks/useUserData";
import { usePasswordManager } from "@/hooks/usePasswordManager";
import { usePreferences } from "@/hooks/usePreferences";

// Components
import ProfileHeader from "../../../components/user_profile/ProfileHeader";
import ProfileForm from "../../../components/user_profile/ProfileForm";
import RecentActivity from "../../../components/user_profile/RecentActivity";
import UserStatistics from "../../../components/user_profile/UserStatistics";
import SecuritySettings from "../../../components/user_profile/SecuritySettings";
import PreferencesSettings from "../../../components/user_profile/PreferencesSettings";

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
        <nav className="flex overflow-x-auto whitespace-nowrap border-b border-gray-200 no-scrollbar space-x-2 sm:space-x-8">
          {TABS_CONFIG.map((tab) => {
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
                <Icon className="h-4 w-4 shrink-0" />
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
