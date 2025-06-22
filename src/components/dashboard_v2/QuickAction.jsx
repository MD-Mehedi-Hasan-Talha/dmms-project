import { ChartBarIcon, PlusIcon, UsersIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

const QuickAction = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>দ্রুত অ্যাকশন</CardTitle>
        <CardDescription>সচরাচর ব্যবহৃত ফিচার</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button className="w-full justify-start" variant="outline">
          <PlusIcon className="w-4 h-4 mr-2" />
          মিল এন্ট্রি করুন
        </Button>
        <Button className="w-full justify-start" variant="outline">
          <PlusIcon className="w-4 h-4 mr-2" />
          বাজার এন্ট্রি করুন
        </Button>
        <Button className="w-full justify-start" variant="outline">
          <UsersIcon className="w-4 h-4 mr-2" />
          নতুন সদস্য যোগ করুন
        </Button>
        <Button className="w-full justify-start" variant="outline">
          <ChartBarIcon className="w-4 h-4 mr-2" />
          মাসিক রিপোর্ট
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuickAction;
