import { Card, CardContent } from "@/components/ui/card";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export default function SearchFilter({
  feedbackStatusOptions,
  searchTerm,
  selectedCategory,
  selectedStatus,
  setSearchTerm,
  setSelectedCategory,
  feedbackCategoryOptions,
  setSelectedStatus,
}) {
  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="ফিডব্যাক খুঁজুন..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="ক্যাটেগরি নির্বাচন করুন" />
            </SelectTrigger>
            <SelectContent>
              {feedbackCategoryOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.icon && <span className="mr-2">{option.icon}</span>}
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger>
              <SelectValue placeholder="স্ট্যাটাস নির্বাচন করুন" />
            </SelectTrigger>
            <SelectContent>
              {feedbackStatusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
