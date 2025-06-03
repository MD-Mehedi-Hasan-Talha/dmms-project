import { Input } from "@/components/ui/input";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function PasswordInput({
  label,
  isVisible,
  onToggle,
  placeholder,
}) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="relative mt-1">
        <Input
          type={isVisible ? "text" : "password"}
          placeholder={placeholder}
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
          onClick={onToggle}
        >
          {isVisible ? (
            <EyeSlashIcon className="w-5 h-5 text-gray-400" />
          ) : (
            <EyeIcon className="w-5 h-5 text-gray-400" />
          )}
        </button>
      </div>
    </div>
  );
}
