interface StepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  label: string;
  helperText?: string;
}

export default function Stepper({
  value,
  onChange,
  min = 1,
  max = 50,
  label,
  helperText,
}: StepperProps) {
  const decrement = () => {
    if (value > min) onChange(value - 1);
  };

  const increment = () => {
    if (value < max) onChange(value + 1);
  };

  return (
    <div>
      <label className="block font-display text-xs uppercase tracking-wide text-charcoal/60 mb-2">
        {label}
      </label>
      <div className="flex items-center gap-3 bg-white border border-cream-dark p-3">
        <button
          type="button"
          onClick={decrement}
          disabled={value <= min}
          className="w-10 h-10 bg-cream text-navy font-bold text-xl hover:bg-orange hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          −
        </button>
        <span className="font-display text-2xl font-bold text-navy flex-1 text-center">
          {value}
        </span>
        <button
          type="button"
          onClick={increment}
          disabled={value >= max}
          className="w-10 h-10 bg-cream text-navy font-bold text-xl hover:bg-orange hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          +
        </button>
        {helperText && (
          <span className="text-xs text-charcoal/50 w-24">{helperText}</span>
        )}
      </div>
    </div>
  );
}
