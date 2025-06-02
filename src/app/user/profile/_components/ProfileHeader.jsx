import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  UserCircleIcon,
  CameraIcon,
  EnvelopeIcon,
  PhoneIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";
import { formatDate } from "@/lib/utils";
import { ROLES } from "@/lib/data/constants";

export default function ProfileHeader({ user }) {
  const roleLabel = ROLES.find((r) => r.value === user.role)?.label;
  const statusLabel = user.status === "active" ? "সক্রিয়" : "নিষ্ক্রিয়";
  const statusBadgeClass =
    user.status === "active"
      ? "bg-blue-100 text-blue-800"
      : "bg-red-100 text-red-800";

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="relative">
            <div className="h-24 w-24 rounded-full bg-gray-300 flex items-center justify-center">
              {user.profileImage ? (
                <img
                  src={user.profileImage}
                  alt="Profile"
                  className="h-24 w-24 rounded-full object-cover"
                />
              ) : (
                <UserCircleIcon className="h-16 w-16 text-gray-400" />
              )}
            </div>
            <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700">
              <CameraIcon className="h-4 w-4" />
            </button>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
            <p className="text-gray-600 mb-2">{user.occupation}</p>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
              <Badge className="bg-green-100 text-green-800">{roleLabel}</Badge>
              <Badge className={statusBadgeClass}>{statusLabel}</Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <EnvelopeIcon className="h-4 w-4 text-gray-400" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneIcon className="h-4 w-4 text-gray-400" />
                <span>{user.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarDaysIcon className="h-4 w-4 text-gray-400" />
                <span>যোগদান: {formatDate(user.joinDate)}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
