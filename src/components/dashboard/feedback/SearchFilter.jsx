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
import { feedbackCategoryOptions, feedbackStatusOptions } from "@/lib/data";

export default function SearchFilter({ setFilterFeedbacks, filterFeedbacks }) {
  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="ফিডব্যাক খুঁজুন..."
              value={filterFeedbacks.searchTerm}
              onChange={(value) =>
                setFilterFeedbacks((prev) => ({
                  ...prev,
                  searchTerm: `${value.target.value}`,
                }))
              }
              className="pl-10"
              name="searchTerm"
            />
          </div>
          <Select
            value={filterFeedbacks.category}
            onValueChange={(value) =>
              setFilterFeedbacks((prev) => ({ ...prev, category: value }))
            }
            name="category"
          >
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
          <Select
            value={filterFeedbacks.status}
            onValueChange={(value) =>
              setFilterFeedbacks((prev) => ({ ...prev, status: value }))
            }
            name="status"
          >
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
