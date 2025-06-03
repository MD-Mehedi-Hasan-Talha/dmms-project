import { Button } from "@/components/ui/button";

/**
 * SettingsConfirmationModal Component
 * @description Displays a confirmation modal for 'save' or 'reset' actions.
 *
 * @param {boolean} visible - Controls modal visibility
 * @param {string} actionType - Type of action to confirm ('save' or 'reset')
 * @param {function} onCancel - Handler to invoke when user cancels the action
 * @param {function} onConfirm - Handler to invoke when user confirms the action
 */
export default function SettingsConfirmationModal({
  visible,
  actionType,
  onCancel,
  onConfirm,
}) {
  // Do not render the modal if it's not visible
  if (!visible) return null;

  // Determine modal content based on the action type
  const isSave = actionType === "save";
  const headingText = isSave ? "সংরক্ষণ নিশ্চিত করুন" : "রিসেট নিশ্চিত করুন";
  const bodyText = isSave
    ? "আপনি কি সত্যিই এই পরিবর্তনগুলি সংরক্ষণ করতে চান?"
    : "আপনি কি সত্যিই সকল সেটিংস রিসেট করতে চান?";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      {/* Modal Box */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        {/* Modal Title */}
        <h2 className="text-xl font-bold mb-4">{headingText}</h2>

        {/* Modal Description */}
        <p className="mb-6">{bodyText}</p>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          {/* Cancel Button */}
          <Button
            onClick={onCancel}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            বাতিল
          </Button>

          {/* Confirm Button */}
          <Button
            onClick={onConfirm}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            নিশ্চিত করুন
          </Button>
        </div>
      </div>
    </div>
  );
}
