import type { QuoteData, DryerVentType } from "@/types";
import { ToggleCard } from "@/components/ui";

interface Step2HomeFeaturesProps {
  data: QuoteData;
  updateData: (updates: Partial<QuoteData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const dryerLocationOptions: { value: DryerVentType; label: string }[] = [
  { value: "none", label: "No dryer vent / Not sure" },
  { value: "ground", label: "Main floor" },
  { value: "second-floor", label: "2nd floor" },
  { value: "rooftop", label: "Rooftop" },
];

export default function Step2HomeFeatures({
  data,
  updateData,
  onNext,
  onBack,
}: Step2HomeFeaturesProps) {
  const handleDryerLocationChange = (location: DryerVentType) => {
    updateData({
      dryerVentLocation: location,
      // Clear dryer vent desire if no dryer vent exists
      wantsDryerVent: location === "none" ? false : data.wantsDryerVent,
    });
  };

  // Pre-seed add-on wants when toggling home features
  const handleToggleHRV = () => {
    const newValue = !data.hasHRV;
    updateData({
      hasHRV: newValue,
      wantsHRV: newValue, // pre-seed: if they have it, they probably want it cleaned
    });
  };

  const handleToggleHumidifier = () => {
    const newValue = !data.hasHumidifier;
    updateData({
      hasHumidifier: newValue,
      wantsHumidifier: newValue,
    });
  };

  const handleToggleCentralVac = () => {
    const newValue = !data.hasCentralVac;
    updateData({
      hasCentralVac: newValue,
      wantsCentralVac: newValue,
    });
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <h1 className="font-display text-2xl font-bold text-navy text-center mb-2">
        What does your home have?
      </h1>
      <p className="text-charcoal/60 text-center text-sm mb-6">
        This helps us recommend the right services for you.
      </p>

      {/* AC */}
      <div className="mb-4">
        <ToggleCard
          selected={data.hasAC}
          onClick={() => updateData({ hasAC: !data.hasAC })}
        >
          Central air conditioning (A/C)
        </ToggleCard>
      </div>

      {/* HRV */}
      <div className="mb-4">
        <ToggleCard
          selected={data.hasHRV}
          onClick={handleToggleHRV}
          tooltip="Heat Recovery Ventilator -- common in newer Calgary homes"
        >
          HRV / ERV (Heat Recovery Ventilator)
        </ToggleCard>
      </div>

      {/* Dryer Vent Location */}
      <div className="mb-4">
        <label className="block font-display text-xs uppercase tracking-wide text-charcoal/60 mb-2">
          Where does your dryer vent exit?
        </label>
        <div className="grid grid-cols-2 gap-2">
          {dryerLocationOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleDryerLocationChange(option.value)}
              className={`p-3 border text-sm transition-colors ${
                data.dryerVentLocation === option.value
                  ? "bg-navy text-white border-navy"
                  : "bg-white text-navy border-cream-dark hover:border-orange"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Humidifier */}
      <div className="mb-4">
        <ToggleCard
          selected={data.hasHumidifier}
          onClick={handleToggleHumidifier}
        >
          Furnace humidifier
        </ToggleCard>
      </div>

      {/* Central Vac */}
      <div className="mb-6">
        <ToggleCard
          selected={data.hasCentralVac}
          onClick={handleToggleCentralVac}
        >
          Central vacuum system
        </ToggleCard>
      </div>

      {/* Navigation */}
      <div className="flex gap-4">
        <button
          type="button"
          onClick={onBack}
          className="text-charcoal/60 hover:text-navy transition-colors text-sm"
        >
          ← Back
        </button>
        <button
          type="button"
          onClick={onNext}
          className="btn btn-primary flex-1"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
