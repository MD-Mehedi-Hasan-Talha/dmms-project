import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { members } from "@/lib/data-file";
import {
  CalendarDaysIcon,
  CheckCircleIcon,
  EyeIcon,
  PencilIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const TodayMealStatus = ({
  selectedDate,
  setSelectedDate,
  setSelectedMemberForEdit,
  setMealEntryModalOpen,
  setSelectedMemberForView,
  setMealDetailsModalOpen,
}) => {
  //@ Function to open meal entry modal for editing
  const handleEditMemberMeal = (member) => {
    setSelectedMemberForEdit(member);
    setMealEntryModalOpen(true);
  };

  //@ Function to open modal to view meal details
  const handleViewMemberMeal = (member) => {
    setSelectedMemberForView(member);
    setMealDetailsModalOpen(true);
  };

  //@ Function to calculate meal status badge
  const getMealStatus = (member) => {
    const totalMeals = [member.breakfast, member.lunch, member.dinner].filter(
      Boolean
    ).length;

    if (totalMeals === 0)
      return { label: "অনুপস্থিত", color: "bg-red-100 text-red-800" };
    if (totalMeals === 3)
      return { label: "সম্পূর্ণ", color: "bg-green-100 text-green-800" };
    return { label: "আংশিক", color: "bg-yellow-100 text-yellow-800" };
  };

  return (
    <div className="lg:col-span-2">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:justify-between justify-between md:items-center space-y-4 md:space-y-0">
            <div>
              <CardTitle className="flex items-center">
                <CalendarDaysIcon className="w-5 h-5 mr-2" />
                আজকের মিল স্ট্যাটাস
              </CardTitle>
              <CardDescription>
                {new Date(selectedDate).toLocaleDateString("bn-BD")} - সদস্যদের
                মিলের বিস্তারিত
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-auto"
              />
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-left py-3 px-4 font-semibold text-gray-700">
                    সদস্য
                  </TableHead>
                  <TableHead className="text-center py-3 px-4 font-semibold text-gray-700">
                    🌅 নাস্তা
                  </TableHead>
                  <TableHead className="text-center py-3 px-4 font-semibold text-gray-700">
                    🍽️ দুপুর
                  </TableHead>
                  <TableHead className="text-center py-3 px-4 font-semibold text-gray-700">
                    🌙 রাত
                  </TableHead>
                  <TableHead className="text-center py-3 px-4 font-semibold text-gray-700">
                    👥 অতিথি
                  </TableHead>
                  <TableHead className="text-center py-3 px-4 font-semibold text-gray-700">
                    স্ট্যাটাস
                  </TableHead>
                  <TableHead className="text-center py-3 px-4 font-semibold text-gray-700">
                    অ্যাকশন
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {members.map((member) => {
                  const status = getMealStatus(member);
                  return (
                    <TableRow key={member.id} className="hover:bg-gray-50">
                      <TableCell className="py-4 px-4">
                        <div className="font-semibold text-gray-900">
                          {member.name}
                        </div>
                      </TableCell>

                      <TableCell className="py-4 px-4 text-center">
                        {member.breakfast ? (
                          <CheckCircleIcon className="w-5 h-5 text-green-600 mx-auto" />
                        ) : (
                          <XMarkIcon className="w-5 h-5 text-red-500 mx-auto" />
                        )}
                      </TableCell>

                      <TableCell className="py-4 px-4 text-center">
                        {member.lunch ? (
                          <CheckCircleIcon className="w-5 h-5 text-green-600 mx-auto" />
                        ) : (
                          <XMarkIcon className="w-5 h-5 text-red-500 mx-auto" />
                        )}
                      </TableCell>

                      <TableCell className="py-4 px-4 text-center">
                        {member.dinner ? (
                          <CheckCircleIcon className="w-5 h-5 text-green-600 mx-auto" />
                        ) : (
                          <XMarkIcon className="w-5 h-5 text-red-500 mx-auto" />
                        )}
                      </TableCell>

                      <TableCell className="py-4 px-4 text-center">
                        <span className="font-semibold">{member.guests}</span>
                      </TableCell>

                      <TableCell className="py-4 px-4 text-center">
                        <Badge className={status.color}>{status.label}</Badge>
                      </TableCell>

                      <TableCell className="py-4 px-4 text-center">
                        <div className="flex justify-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditMemberMeal(member)}
                            title="মিল এন্ট্রি সম্পাদনা করুন"
                          >
                            <PencilIcon className="w-4 h-4" />
                          </Button>

                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleViewMemberMeal(member)}
                            title="বিস্তারিত দেখুন"
                          >
                            <EyeIcon className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TodayMealStatus;
