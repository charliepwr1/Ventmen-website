import { ReactNode } from "react";

interface VisualSelectorOption<T extends string> {
  value: T;
  label: string;
  icon: ReactNode;
  description?: string;
}

interface VisualSelectorProps<T extends string> {
  options: VisualSelectorOption<T>[];
  value: T;
  onChange: (value: T) => void;
  columns?: 2 | 3;
}

export default function VisualSelector<T extends string>({
  options,
  value,
  onChange,
  columns = 3,
}: VisualSelectorProps<T>) {
  return (
    <div
      className={`grid gap-3 ${
        columns === 2 ? "grid-cols-2" : "grid-cols-1 sm:grid-cols-3"
      }`}
    >
      {options.map((option) => {
        const isSelected = value === option.value;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`p-4 border-2 transition-all text-center ${
              isSelected
                ? "border-orange bg-white shadow-md scale-[1.02]"
                : "border-cream-dark bg-white hover:border-orange/50"
            }`}
          >
            <div className="text-3xl mb-2">{option.icon}</div>
            <div className="font-display text-sm uppercase tracking-wide text-navy">
              {option.label}
            </div>
            {option.description && (
              <div className="text-xs text-charcoal/50 mt-1">
                {option.description}
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
