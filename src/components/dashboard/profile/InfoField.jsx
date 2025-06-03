import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function InfoField({
  label,
  value,
  field,
  isEditing,
  onChange,
  isTextarea = false,
  ...props
}) {
  const Component = isTextarea ? Textarea : Input;

  return (
    <div>
      <label className="text-sm font-medium text-gray-700">{label}</label>
      {isEditing ? (
        <Component
          value={value}
          onChange={(e) => onChange(field, e.target.value)}
          className="mt-1"
          {...props}
        />
      ) : (
        <p className="mt-1 text-gray-900">{value}</p>
      )}
    </div>
  );
}
