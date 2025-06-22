import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function QuickStats({ events }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>এই মাসের পরিসংখ্যান</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">মোট ইভেন্ট</span>
            <span className="font-semibold">{events.length}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">সম্পন্ন</span>
            <span className="font-semibold text-green-600">
              {events.filter((e) => e.status === "completed").length}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">আসছে</span>
            <span className="font-semibold text-blue-600">
              {events.filter((e) => e.status === "upcoming").length}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
