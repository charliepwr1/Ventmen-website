interface ToggleSwitchProps {
  label: string;
  description?: string;
  enabled: boolean;
  onToggle: () => void;
}

export default function ToggleSwitch({
  label,
  description,
  enabled,
  onToggle,
}: ToggleSwitchProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`w-full p-4 border-2 rounded-lg text-left transition-colors flex items-center justify-between ${
        enabled
          ? "border-orange bg-orange/5"
          : "border-cream-dark bg-white hover:border-orange/50"
      }`}
    >
      <div>
        <span className="block font-semibold text-navy">{label}</span>
        {description && (
          <span className="block text-xs text-charcoal/50 mt-0.5">
            {description}
          </span>
        )}
      </div>
      <div
        className={`w-12 h-7 rounded-full relative transition-colors shrink-0 ml-4 ${
          enabled ? "bg-orange" : "bg-gray-200"
        }`}
      >
        <div
          className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow transition-transform ${
            enabled ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </div>
    </button>
  );
}
