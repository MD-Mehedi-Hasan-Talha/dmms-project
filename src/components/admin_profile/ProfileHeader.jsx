import { Button } from "@/components/ui/button";
import { PencilIcon } from "@heroicons/react/24/outline";

export default function ProfileHeader({ isEditing, onEditClick }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          ব্যবহারকারী প্রোফাইল
        </h1>
        <p className="text-gray-600 mt-1">
          আপনার ব্যক্তিগত তথ্য এবং মেস কার্যক্রম দেখুন
        </p>
      </div>
      {!isEditing && (
        <Button
          onClick={onEditClick}
          className="bg-green-600 hover:bg-green-700"
        >
          <PencilIcon className="w-4 h-4 mr-2" />
          প্রোফাইল সম্পাদনা
        </Button>
      )}
    </div>
  );
}
