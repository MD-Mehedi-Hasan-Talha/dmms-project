import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { EVENT_TYPES } from "@/lib/data-file";

export default function AddEventDialog({
  isOpen,
  setIsOpen,
  newEvent,
  setNewEvent,
  handleAddEvent,
}) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-green-600 hover:bg-green-700">
          <span className="w-4 h-4 mr-2">+</span>
          নতুন ইভেন্ট
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>নতুন ইভেন্ট যোগ করুন</DialogTitle>
          <DialogDescription>
            ক্যালেন্ডারে একটি নতুন ইভেন্ট বা কার্যক্রম যোগ করুন
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label htmlFor="title" className="text-sm font-medium">
              ইভেন্টের নাম *
            </label>
            <Input
              id="title"
              placeholder="ইভেন্টের নাম লিখুন"
              value={newEvent.title}
              onChange={(e) =>
                setNewEvent({ ...newEvent, title: e.target.value })
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <label htmlFor="date" className="text-sm font-medium">
                তারিখ
              </label>
              <Input
                id="date"
                type="date"
                value={newEvent.date}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, date: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="time" className="text-sm font-medium">
                সময়
              </label>
              <Input
                id="time"
                type="time"
                value={newEvent.time}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, time: e.target.value })
                }
              />
            </div>
          </div>
          <div className="grid gap-2">
            <label htmlFor="type" className="text-sm font-medium">
              ইভেন্টের ধরন
            </label>
            <Select
              value={newEvent.type}
              onValueChange={(value) =>
                setNewEvent({ ...newEvent, type: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="ইভেন্টের ধরন নির্বাচন করুন" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(EVENT_TYPES).map(([key, type]) => (
                  <SelectItem key={key} value={key}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <label htmlFor="description" className="text-sm font-medium">
              বিবরণ
            </label>
            <Textarea
              id="description"
              placeholder="ইভেন্টের বিস্তারিত বিবরণ লিখুন"
              value={newEvent.description}
              onChange={(e) =>
                setNewEvent({ ...newEvent, description: e.target.value })
              }
              rows={3}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            বাতিল
          </Button>
          <Button
            onClick={() => handleAddEvent(new Date(newEvent.date))}
            className="bg-green-600 hover:bg-green-700"
          >
            ইভেন্ট যোগ করুন
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
