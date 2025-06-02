"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Data and Constants
import { TABS_CONFIG } from "@/lib/data/constants";
import { MOCK_STATS_DATA, MOCK_RECENT_ACTIVITIES } from "@/lib/data/mockData";

// Hooks

// Components
import ProfileHeader from "./_components/ProfileHeader";
import ProfileSummaryCard from "./_components/ProfileSummaryCard";
import ProfileInfoTab from "./_components/ProfileInfoTab";
import StatisticsTab from "./_components/StatisticsTab";
import ActivityTab from "./_components/ActivityTab";
import SecurityTab from "./_components/SecurityTab";
import { usePasswordManager } from "@/app/hooks/usePasswordManager";
import { useUserData } from "@/app/hooks/useUserData";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");
  const {
    userData,
    isEditing,
    setIsEditing,
    handleValueChange,
    handleSave,
    handleCancel,
  } = useUserData();
  const { showPassword, toggleShowPassword, handleChangePassword } =
    usePasswordManager();

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <ProfileHeader
        isEditing={isEditing}
        onEditClick={() => setIsEditing(true)}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <ProfileSummaryCard user={userData} isEditing={isEditing} />
        </div>
        <div className="lg:col-span-2">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-4">
              {TABS_CONFIG.map((tab) => (
                <TabsTrigger key={tab.value} value={tab.value}>
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value="profile">
              <ProfileInfoTab
                user={userData}
                isEditing={isEditing}
                onValueChange={handleValueChange}
                onSave={handleSave}
                onCancel={handleCancel}
              />
            </TabsContent>
            <TabsContent value="stats">
              <StatisticsTab stats={MOCK_STATS_DATA} />
            </TabsContent>
            <TabsContent value="activity">
              <ActivityTab activities={MOCK_RECENT_ACTIVITIES} />
            </TabsContent>
            <TabsContent value="security">
              <SecurityTab
                showPassword={showPassword}
                toggleShowPassword={toggleShowPassword}
                onPasswordChange={handleChangePassword}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
