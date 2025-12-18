import { ReactNode } from "react";

interface ToggleCardProps {
  selected: boolean;
  onClick: () => void;
  children: ReactNode;
  price?: string;
  tooltip?: string;
}

export default function ToggleCard({
  selected,
  onClick,
  children,
  price,
  tooltip,
}: ToggleCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full p-3 border text-left transition-colors flex items-center justify-between text-sm ${
        selected
          ? "bg-navy text-white border-navy"
          : "bg-white text-navy border-cream-dark hover:border-orange"
      }`}
    >
      <div className="flex items-center gap-2">
        <span>{children}</span>
        {tooltip && (
          <span
            className={`text-xs ${selected ? "text-white/60" : "text-charcoal/40"}`}
            title={tooltip}
          >
            ?
          </span>
        )}
      </div>
      {price && (
        <span className={selected ? "text-white/70" : "text-charcoal/50"}>
          {price}
        </span>
      )}
    </button>
  );
}
