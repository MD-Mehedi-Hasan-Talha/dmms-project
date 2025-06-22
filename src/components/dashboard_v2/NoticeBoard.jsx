import { upcomingTasks } from "@/lib/data/dashboardV2";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "lucide-react";
import { Button } from "../ui/button";

const NoticeBoard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>আসন্ন কাজ</CardTitle>
        <CardDescription>করণীয় কাজের তালিকা</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {upcomingTasks?.map((task) => (
            <div
              key={task.id}
              className="p-3 border border-gray-200 rounded-lg"
            >
              <div className="flex items-start justify-between mb-2">
                <p className="text-sm font-medium text-gray-900">{task.task}</p>
                <Badge
                  className={`text-xs ${
                    task?.priority === "high"
                      ? "bg-red-100 text-red-800"
                      : task.priority === "medium"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                  }`}
                >
                  {task.priority === "high"
                    ? "জরুরি"
                    : task.priority === "medium"
                      ? "মাঝারি"
                      : "সাধারণ"}
                </Badge>
              </div>
              <p className="text-xs text-gray-500 mb-2">
                শেষ তারিখ: {task.dueDate}
              </p>
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs">
                  {task.status === "pending"
                    ? "অপেক্ষমাণ"
                    : task.status === "in_progress"
                      ? "চলমান"
                      : "সম্পন্ন"}
                </Badge>
                <Button size="sm" variant="outline">
                  দেখুন
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default NoticeBoard;
