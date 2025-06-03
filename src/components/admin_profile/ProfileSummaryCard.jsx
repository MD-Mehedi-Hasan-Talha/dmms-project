import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  MapPinIcon,
  CalendarIcon,
  CameraIcon,
} from "@heroicons/react/24/outline";
import { cn, formatDate } from "@/lib/utils";

export default function ProfileSummaryCard({ user, isEditing }) {
  const roleBadgeClass = cn("text-xs font-medium", {
    "bg-green-100 text-green-800": user.role === "Admin",
    "bg-blue-100 text-blue-800": user.role === "Member",
    "bg-gray-100 text-gray-800":
      user.role !== "Admin" && user.role !== "Member",
  });

  const getRoleInBengali = (role) => {
    if (role === "Admin") return "অ্যাডমিন";
    if (role === "Member") return "সদস্য";
    return role;
  };

  return (
    <Card className="sticky top-6">
      <CardContent className="p-6">
        <div className="text-center">
          <div className="relative inline-block">
            <Avatar className="w-24 h-24 mx-auto">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="text-2xl font-semibold bg-green-100 text-green-600">
                {user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            {isEditing && (
              <button className="absolute bottom-0 right-0 p-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors">
                <CameraIcon className="w-4 h-4" />
              </button>
            )}
          </div>
          <h2 className="text-xl font-bold text-gray-900 mt-4">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
          <div className="flex justify-center mt-3">
            <Badge className={roleBadgeClass}>
              {getRoleInBengali(user.role)}
            </Badge>
          </div>
          <div className="mt-4 pt-4 border-t text-sm text-gray-600 space-y-2">
            <div className="flex items-center justify-center space-x-2">
              <MapPinIcon className="w-4 h-4" />
              <span>{user.messName}</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <CalendarIcon className="w-4 h-4" />
              <span>যোগদান: {formatDate(user.joinedDate)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
