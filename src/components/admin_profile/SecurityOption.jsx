import { Button } from "@/components/ui/button";

export default function SecurityOption({
  icon,
  title,
  description,
  buttonLabel,
}) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <div className="flex items-center space-x-3">
        {icon}
        <div>
          <p className="font-medium">{title}</p>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
      <Button variant="outline" size="sm">
        {buttonLabel}
      </Button>
    </div>
  );
}
