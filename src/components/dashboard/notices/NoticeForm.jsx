import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const NoticeForm = ({
  noticeData,
  setNoticeData,
  handleSubmit,
  resetForm,
  editingNotice,
  priorityOptions,
  typeOptions,
}) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>
          {editingNotice ? "নোটিশ সম্পাদনা" : "নতুন নোটিশ যোগ করুন"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="py-3" htmlFor="title">
                নোটিশের শিরোনাম *
              </Label>
              <Input
                id="title"
                value={noticeData.title}
                onChange={(e) =>
                  setNoticeData({ ...noticeData, title: e.target.value })
                }
                placeholder="নোটিশের শিরোনাম লিখুন"
                required
              />
            </div>
            <div>
              <Label className="py-3" htmlFor="expiryDate">
                মেয়াদ উত্তীর্ণের তারিখ *
              </Label>
              <Input
                id="expiryDate"
                type="date"
                value={noticeData.expiryDate}
                onChange={(e) =>
                  setNoticeData({ ...noticeData, expiryDate: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="py-3" htmlFor="priority">
                অগ্রাধিকার
              </Label>
              <Select
                value={noticeData.priority}
                onValueChange={(value) =>
                  setNoticeData({ ...noticeData, priority: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="অগ্রাধিকার নির্বাচন করুন" />
                </SelectTrigger>
                <SelectContent>
                  {priorityOptions.slice(1).map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="py-3" htmlFor="type">
                ধরন
              </Label>
              <Select
                value={noticeData.type}
                onValueChange={(value) =>
                  setNoticeData({ ...noticeData, type: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="ধরন নির্বাচন করুন" />
                </SelectTrigger>
                <SelectContent>
                  {typeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label className="py-3" htmlFor="content">
              নোটিশের বিস্তারিত *
            </Label>
            <Textarea
              id="content"
              value={noticeData.content}
              onChange={(e) =>
                setNoticeData({ ...noticeData, content: e.target.value })
              }
              placeholder="নোটিশের বিস্তারিত তথ্য লিখুন"
              rows={4}
              required
            />
          </div>

          <div className="flex gap-2">
            <Button type="submit">
              {editingNotice ? "আপডেট করুন" : "নোটিশ প্রকাশ করুন"}
            </Button>
            <Button type="button" variant="outline" onClick={resetForm}>
              বাতিল
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default NoticeForm;
