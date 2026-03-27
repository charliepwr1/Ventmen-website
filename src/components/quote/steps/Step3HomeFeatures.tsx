import type { QuoteData, DryerVentType } from "@/types";
import { ToggleSwitch } from "@/components/ui";

interface Step3HomeFeaturesProps {
  data: QuoteData;
  updateData: (updates: Partial<QuoteData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const dryerLocationOptions: { value: DryerVentType; label: string }[] = [
  { value: "none", label: "None / Not sure" },
  { value: "ground", label: "Main floor" },
  { value: "second-floor", label: "2nd floor" },
  { value: "rooftop", label: "Rooftop" },
];

export default function Step3HomeFeatures({
  data,
  updateData,
  onNext,
  onBack,
}: Step3HomeFeaturesProps) {
  const handleToggleHRV = () => {
    const newValue = !data.hasHRV;
    updateData({ hasHRV: newValue, wantsHRV: newValue });
  };

  const handleDryerLocationChange = (location: DryerVentType) => {
    updateData({
      dryerVentLocation: location,
      wantsDryerVent: location !== "none",
    });
  };

  const handleToggleHumidifier = () => {
    const newValue = !data.hasHumidifier;
    updateData({ hasHumidifier: newValue, wantsHumidifier: newValue });
  };

  const handleToggleCentralVac = () => {
    const newValue = !data.hasCentralVac;
    updateData({ hasCentralVac: newValue, wantsCentralVac: newValue });
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <h1 className="font-display text-2xl font-bold text-navy text-center mb-2">
        What else does your home have?
      </h1>
      <p className="text-charcoal/60 text-center text-sm mb-6">
        We&apos;ll recommend services based on your answers
      </p>

      <div className="flex flex-col gap-3">
        {/* HRV */}
        <ToggleSwitch
          label="HRV / ERV"
          description="If you have one, we can clean it too"
          enabled={data.hasHRV}
          onToggle={handleToggleHRV}
        />

        {/* Dryer Vent Location */}
        <div className="p-4 border-2 border-cream-dark rounded-lg">
          <div className="font-semibold text-navy mb-1">
            Dryer vent exit location
          </div>
          <div className="text-xs text-charcoal/50 mb-3">
            Lint buildup is a leading cause of house fires
          </div>
          <div className="grid grid-cols-2 gap-2">
            {dryerLocationOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleDryerLocationChange(option.value)}
                className={`p-3 border-2 rounded-lg text-sm transition-colors ${
                  data.dryerVentLocation === option.value
                    ? "bg-navy text-white border-navy"
                    : "bg-white text-navy border-cream-dark hover:border-orange/50"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Humidifier */}
        <ToggleSwitch
          label="Furnace Humidifier"
          description="We can replace the water panel"
          enabled={data.hasHumidifier}
          onToggle={handleToggleHumidifier}
        />

        {/* Central Vac */}
        <ToggleSwitch
          label="Central Vacuum"
          description="We can clean the central vac lines"
          enabled={data.hasCentralVac}
          onToggle={handleToggleCentralVac}
        />
      </div>

      {/* Navigation */}
      <div className="flex gap-4 items-center mt-8">
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
