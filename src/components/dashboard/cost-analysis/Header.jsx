import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { RefreshCwIcon } from "lucide-react";

export default function Header({
  mounted,
  lastUpdate,
  autoRefresh,
  setAutoRefresh,
  selectedTimeRange,
  setSelectedTimeRange,
}) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          খরচ বিশ্লেষণ ও দাম মনিটরিং
        </h1>
        <p className="text-gray-600 mt-1">
          রিয়েল-টাইম দাম ট্র্যাকিং এবং বিস্তারিত খরচ বিশ্লেষণ
        </p>
      </div>
      <div className="flex items-center space-x-3 text-gray-600">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">শেষ আপডেট:</span>{" "}
          <span className="text-sm font-medium">
            {mounted && lastUpdate
              ? lastUpdate.toLocaleTimeString("bn-BD")
              : "--:--:--"}
          </span>
        </div>
        <Button
          variant={autoRefresh ? "default" : "outline"}
          size="sm"
          onClick={() => setAutoRefresh(!autoRefresh)}
          className={cn("text-gray-600")}
        >
          <RefreshCwIcon
            className={cn("w-4 h-4 mr-2", autoRefresh && "animate-spin")}
          />
          অটো রিফ্রেশ
        </Button>
        <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1d">১ দিন</SelectItem>
            <SelectItem value="7d">৭ দিন</SelectItem>
            <SelectItem value="30d">৩০ দিন</SelectItem>
            <SelectItem value="90d">৯০ দিন</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
