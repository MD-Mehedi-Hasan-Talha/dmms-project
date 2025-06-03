// SettingsHeader.js

import { Button } from "@/components/ui/button";
import { TrashIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

/**
 * @component SettingsHeader
 * @description Renders the page header with action buttons for reset and save.
 * @param {function} onSave - Handler for saving settings.
 * @param {function} onReset - Handler for resetting settings to defaults.
 */
export default function SettingsHeader({ onSave, onReset }) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">সেটিংস</h1>
        <p className="text-gray-600">সিস্টেম কনফিগারেশন এবং পছন্দসমূহ</p>
      </div>

      <div className="flex space-x-3">
        <Button variant="outline" onClick={onReset}>
          <TrashIcon className="w-4 h-4 mr-2" />
          রিসেট করুন
        </Button>

        <Button onClick={onSave} className="bg-green-600 hover:bg-green-700">
          <CheckCircleIcon className="w-4 h-4 mr-2" />
          সংরক্ষণ করুন
        </Button>
      </div>
    </div>
  );
}
