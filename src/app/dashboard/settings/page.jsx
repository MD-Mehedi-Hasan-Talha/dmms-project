"use client";

import SettingsConfirmationModal from "@/components/dashboard/settings/SettingsConfirmationModal";
import SettingsContent from "@/components/dashboard/settings/SettingsContent";
import SettingsHeader from "@/components/dashboard/settings/SettingsHeader";
import SettingsSidebar from "@/components/dashboard/settings/SettingsSidebar";
import { useState } from "react";

// Application configuration: tab structure and settings schema
import { settingsConfig, settingsTabs } from "@/lib/data-file";

/**
 * SettingsPage Component
 * @description Handles the state and layout for the Settings page including tabs, data binding, and confirmation modal.
 */
export default function SettingsPage() {
  // ----------------------------- //
  // UI and Settings State
  // ----------------------------- //

  /** @state Currently active settings tab */
  const [activeTab, setActiveTab] = useState("general");

  /** @state Modal visibility toggle */
  const [showConfirmation, setShowConfirmation] = useState(false);

  /** @state Tracks current action type (e.g., save, reset) for confirmation modal */
  const [confirmAction, setConfirmAction] = useState("");

  /**
   * @state Main settings object
   * Holds settings values for all categories: general, financial, notifications, security
   */
  const [settings, setSettings] = useState({
    general: {
      messName: "আমাদের ডিজিটাল মেস",
      address: "ধানমন্ডি, ঢাকা-১২০৫",
      phone: "০১৭১২৩৪৫৬৭৮",
      email: "info@mess.com",
      currency: "BDT",
      language: "bn",
    },
    financial: {
      mealRate: 150,
      mealRateFlexible: true,
      autoCalculation: true,
      taxRate: 0,
      lateFee: 50,
      discountRate: 5,
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      paymentReminders: true,
      mealReminders: true,
      expenseAlerts: true,
      weeklyReports: true,
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: 30,
      passwordStrength: "medium",
      loginAttempts: 5,
    },
  });

  // ----------------------------- //
  // Handlers
  // ----------------------------- //

  /**
   * Updates a specific setting key within a category
   *
   * @param {string} category - The settings category (e.g., 'general')
   * @param {string} key - The specific setting key to update
   * @param {*} value - The new value for the setting
   */
  const updateSetting = (category, key, value) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value,
      },
    }));
  };

  /**
   * Triggers confirmation modal for saving settings
   */
  const handleSaveSettings = () => {
    setShowConfirmation(true);
    setConfirmAction("save");
  };

  /**
   * Triggers confirmation modal for resetting settings
   */
  const handleResetSettings = () => {
    setShowConfirmation(true);
    setConfirmAction("reset");
  };

  /**
   * Confirms the selected action (save or reset) from modal
   */
  const handleConfirm = () => {
    setShowConfirmation(false);
    console.log(`${confirmAction} action confirmed`);
    // You can implement actual logic for save/reset here
  };

  // ----------------------------- //
  // Render
  // ----------------------------- //

  return (
    <div className="space-y-6 items-stretch">
      {/* Header with Save/Reset actions */}
      <SettingsHeader
        onSave={handleSaveSettings}
        onReset={handleResetSettings}
      />

      {/* Main layout with Sidebar and Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-[400px]">
        {/* Sidebar: Tab navigation */}
        <div className="lg:col-span-1 h-full">
          <SettingsSidebar
            settingsTabs={settingsTabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>

        {/* Content: Form fields per tab */}
        <div className="lg:col-span-3 h-full">
          <SettingsContent
            settingsConfig={settingsConfig}
            activeTab={activeTab}
            settings={settings}
            updateSetting={updateSetting}
          />
        </div>
      </div>

      {/* Confirmation Modal for save/reset */}
      <SettingsConfirmationModal
        visible={showConfirmation}
        actionType={confirmAction}
        onCancel={() => setShowConfirmation(false)}
        onConfirm={handleConfirm}
      />
    </div>
  );
}
