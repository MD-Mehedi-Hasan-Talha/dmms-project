// SettingsSidebar.js

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

/**
 * @component SettingsSidebar
 * @description Renders a vertical menu of all settings tabs.
 * @param {object} settingsTabs - Configuration of available tabs.
 * @param {string} activeTab - Currently selected tab key.
 * @param {function} setActiveTab - Setter to change the active tab.
 */
export default function SettingsSidebar({
  settingsTabs,
  activeTab,
  setActiveTab,
}) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>সেটিংস মেনু</CardTitle>
      </CardHeader>

      <CardContent className="p-0 flex-1">
        <div className="space-y-1">
          {Object.entries(settingsTabs).map(([key, tab]) => {
            const TabIcon = tab.icon;

            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`w-full flex items-center px-4 py-3 text-left hover:bg-gray-50 ${
                  activeTab === key
                    ? "bg-green-50 border-r-2 border-green-500 text-green-700"
                    : "text-gray-700"
                }`}
              >
                <TabIcon className="w-5 h-5 mr-3" />
                {tab.name}
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
