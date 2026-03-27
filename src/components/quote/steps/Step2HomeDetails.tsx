import type { QuoteData } from "@/types";
import { INCLUDED_VENTS } from "@/lib/constants";
import { Stepper, ToggleSwitch } from "@/components/ui";

interface Step2HomeDetailsProps {
  data: QuoteData;
  updateData: (updates: Partial<QuoteData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const ventRangeByType: Record<string, string> = {
  apartment: "Most condos have 8-15",
  townhome: "Most townhomes have 15-25",
  detached: "Most detached homes have 20-35",
};

export default function Step2HomeDetails({
  data,
  updateData,
  onNext,
  onBack,
}: Step2HomeDetailsProps) {
  const ventRange = ventRangeByType[data.houseType] || "Most homes have 15-30";

  const ventHelperText =
    data.vents <= INCLUDED_VENTS
      ? `${INCLUDED_VENTS} included in every package`
      : `${INCLUDED_VENTS} included + ${data.vents - INCLUDED_VENTS} extra`;

  return (
    <div className="w-full max-w-lg mx-auto">
      <h1 className="font-display text-2xl font-bold text-navy text-center mb-6">
        Tell us about your home
      </h1>

      {/* Vent Count */}
      <div className="mb-4">
        <Stepper
          label="Number of Vents"
          value={data.vents}
          onChange={(vents) => updateData({ vents })}
          min={1}
          max={50}
          helperText={ventHelperText}
        />
        <p className="text-xs text-charcoal/50 mt-2 text-center">
          Not sure? {ventRange}. We&apos;ll confirm on-site.
        </p>
      </div>

      {/* Vent photo placeholders */}
      <div className="flex gap-3 justify-center mb-6">
        <div className="w-[120px] h-[90px] border-2 border-dashed border-gray-200 rounded-md flex flex-col items-center justify-center bg-gray-50">
          <span className="text-xs text-charcoal/40 text-center leading-tight">
            Supply<br />vent
          </span>
          <span className="text-[10px] text-charcoal/30">[photo]</span>
        </div>
        <div className="w-[120px] h-[90px] border-2 border-dashed border-gray-200 rounded-md flex flex-col items-center justify-center bg-gray-50">
          <span className="text-xs text-charcoal/40 text-center leading-tight">
            Cold air<br />return
          </span>
          <span className="text-[10px] text-charcoal/30">[photo]</span>
        </div>
      </div>
      <p className="text-xs text-charcoal/40 text-center mb-6">
        Count both types
      </p>

      {/* Furnaces */}
      <div className="mb-6">
        <label className="block font-display text-xs uppercase tracking-wide text-charcoal/60 mb-2">
          Furnaces
        </label>
        <div className="flex gap-2">
          {[1, 2, 3].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => updateData({ furnaces: num })}
              className={`flex-1 py-3 border-2 rounded-lg transition-colors font-bold ${
                data.furnaces === num
                  ? "bg-navy text-white border-navy"
                  : "bg-white text-navy border-cream-dark hover:border-orange/50"
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      {/* AC Toggle */}
      <div className="mb-8">
        <ToggleSwitch
          label="Central A/C"
          description="Air conditioning system"
          enabled={data.hasAC}
          onToggle={() => updateData({ hasAC: !data.hasAC })}
        />
      </div>

      {/* Navigation */}
      <div className="flex gap-4 items-center">
        <button
          type="button"
          onClick={onBack}
          className="text-charcoal/60 hover:text-navy transition-colors text-sm"
        >
          &larr; Back
        </button>
        <button type="button" onClick={onNext} className="btn btn-primary flex-1">
          Continue
        </button>
      </div>
    </div>
  );
}
