// SettingsContent.js

import { Card, CardContent } from "@/components/ui/card";
import SettingsTab from "./SettingsTab";
import { settingsConfig } from "@/lib/data";

/**
 * @component SettingsContent
 * @description Renders the active tab's setting form inside a card.
 * @param {string} activeTab - Currently selected tab key.
 * @param {object} settings - Current values for all settings.
 * @param {function} updateSetting - Handler to update a specific setting.
 */
export default function SettingsContent({
  activeTab,
  settings,
  updateSetting,
}) {
  return (
    <Card className="h-full flex flex-col !py-0 sm:!py-6">
      <CardContent className="flex-1 !px-0 sm:!px-6">
        {settingsConfig.map((tab) =>
          activeTab === tab.key ? (
            <SettingsTab
              key={tab.key}
              tab={tab}
              settings={settings}
              updateSetting={updateSetting}
            />
          ) : null
        )}
      </CardContent>
    </Card>
  );
}
