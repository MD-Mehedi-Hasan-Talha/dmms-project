// SettingsTab.js

"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { KeyIcon, UserIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

/**
 * @component SettingsTab
 * @description Dynamically renders form fields for a given settings tab.
 * @param {object} tab - Tab config including fields, title, description.
 * @param {object} settings - Current values for all tabs.
 * @param {function} updateSetting - State updater for settings.
 */
export default function SettingsTab({ tab, settings, updateSetting }) {
  const tabSettings = settings?.[tab.key] || {};

  return (
    <Card className="min-h-[0px] max-h-[700px] overflow-auto border sm:border rounded-lg !py-4 sm:!py-6">
      <CardHeader>
        <CardTitle>{tab.title}</CardTitle>
        <CardDescription>{tab.description}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tab.fields.map((field, index) => {
            const fieldKey = field.name || `${field.type}-${index}`;

            // Section Header + Button
            if (field.type === "custom-header") {
              return (
                <div
                  key={fieldKey}
                  className="flex justify-between items-center"
                >
                  <span className="font-medium">{field.label}</span>
                  <Button
                    size="sm"
                    className={`bg-${field.button.variant}-600 hover:bg-${field.button.variant}-700`}
                  >
                    {field.button.icon === "UserIcon" && (
                      <UserIcon className="w-4 h-4 mr-2" />
                    )}
                    {field.button.label}
                  </Button>
                </div>
              );
            }

            // Static Role Display
            if (field.type === "role") {
              return (
                <div
                  key={fieldKey}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <div className="font-medium">{field.label}</div>
                    <div className="text-sm text-gray-600">
                      {field.description}
                    </div>
                  </div>
                  <Badge
                    className={`bg-${field.badge.color}-100 text-${field.badge.color}-800`}
                  >
                    {field.badge.text}
                  </Badge>
                </div>
              );
            }

            if (!field.name) return null;

            // Handle different input types with fallbacks
            const value =
              field.type === "checkbox"
                ? (tabSettings[field.name] ?? false)
                : (tabSettings[field.name] ?? "");

            // Select Dropdown
            if (field.type === "select") {
              return (
                <div key={fieldKey}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {field.label}
                  </label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={value}
                    onChange={(e) =>
                      updateSetting(tab.key, field.name, e.target.value)
                    }
                  >
                    {field.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              );
            }

            // Checkbox Input
            if (field.type === "checkbox") {
              return (
                <div
                  key={fieldKey}
                  className="flex items-center justify-between border-b border-gray-200 p-3"
                >
                  <div>
                    <div className="font-medium">{field.label}</div>
                    {field.description && (
                      <div className="text-sm text-gray-600">
                        {field.description}
                      </div>
                    )}
                  </div>
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) =>
                      updateSetting(tab.key, field.name, e.target.checked)
                    }
                    className="rounded"
                  />
                </div>
              );
            }

            // Default Input (text, number, password, etc.)
            return (
              <div key={fieldKey}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {field.label}
                </label>
                <Input
                  type={field.type}
                  value={value}
                  onChange={(e) => {
                    const val =
                      field.type === "number"
                        ? parseInt(e.target.value)
                        : e.target.value;
                    updateSetting(tab.key, field.name, val);
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Password Change Button */}
        {tab.hasPasswordChangeButton && (
          <div className="pt-4 border-t">
            <Button variant="outline" className="w-full">
              <KeyIcon className="w-4 h-4 mr-2" />
              পাসওয়ার্ড পরিবর্তন করুন
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
