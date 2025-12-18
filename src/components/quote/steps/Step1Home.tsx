import type { QuoteData, HouseType } from "@/types";
import { HOUSE_TYPES, INCLUDED_VENTS, ADDONS } from "@/lib/constants";
import { VisualSelector, Stepper, ToggleCard } from "@/components/ui";

interface Step1HomeProps {
  data: QuoteData;
  updateData: (updates: Partial<QuoteData>) => void;
  onNext: () => void;
}

const houseTypeOptions = (Object.keys(HOUSE_TYPES) as HouseType[]).map(
  (key) => ({
    value: key,
    label: HOUSE_TYPES[key].label,
    icon: key === "apartment" ? "🏢" : key === "townhome" ? "🏘️" : "🏠",
  })
);

export default function Step1Home({
  data,
  updateData,
  onNext,
}: Step1HomeProps) {
  const handleHouseTypeChange = (type: HouseType) => {
    const config = HOUSE_TYPES[type];
    updateData({
      houseType: type,
      vents: config.defaultVents,
    });
  };

  const ventHelperText =
    data.vents <= INCLUDED_VENTS
      ? `${INCLUDED_VENTS} included`
      : `+${data.vents - INCLUDED_VENTS} extra`;

  return (
    <div className="w-full max-w-lg mx-auto">
      <h1 className="font-display text-2xl font-bold text-navy text-center mb-6">
        Tell Us About Your Home
      </h1>

      {/* House Type */}
      <div className="mb-6">
        <label className="block font-display text-xs uppercase tracking-wide text-charcoal/60 mb-2">
          Type of Home
        </label>
        <VisualSelector
          options={houseTypeOptions}
          value={data.houseType}
          onChange={handleHouseTypeChange}
        />
      </div>

      {/* Number of Vents */}
      <div className="mb-6">
        <Stepper
          label="Number of Vents"
          value={data.vents}
          onChange={(vents) => updateData({ vents })}
          min={1}
          max={50}
          helperText={ventHelperText}
        />
      </div>

      {/* Number of Furnaces */}
      <div className="mb-6">
        <label className="block font-display text-xs uppercase tracking-wide text-charcoal/60 mb-2">
          Number of Furnaces
        </label>
        <div className="flex gap-2">
          {[1, 2, 3].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => updateData({ furnaces: num })}
              className={`flex-1 py-3 border transition-colors font-bold ${
                data.furnaces === num
                  ? "bg-navy text-white border-navy"
                  : "bg-white text-navy border-cream-dark hover:border-orange"
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      {/* Home Features */}
      <div className="mb-6">
        <label className="block font-display text-xs uppercase tracking-wide text-charcoal/60 mb-2">
          Home Features
        </label>
        <div className="space-y-2">
          <ToggleCard
            selected={data.hasHighEfficiency}
            onClick={() =>
              updateData({ hasHighEfficiency: !data.hasHighEfficiency })
            }
            price={
              data.hasHighEfficiency ? `+$${ADDONS.bypass.price}` : undefined
            }
            tooltip="High-efficiency furnaces require bypass cleaning"
          >
            High-efficiency furnace
          </ToggleCard>

          <ToggleCard
            selected={data.hasAC}
            onClick={() => updateData({ hasAC: !data.hasAC })}
            price={
              !data.hasHighEfficiency && data.hasAC
                ? `+$${ADDONS.bypass.price}`
                : undefined
            }
            tooltip="Central A/C requires bypass cleaning"
          >
            Central A/C
          </ToggleCard>

          <ToggleCard
            selected={data.hasHRV}
            onClick={() => updateData({ hasHRV: !data.hasHRV })}
            price={data.hasHRV ? `+$${ADDONS.hrv.price}` : undefined}
            tooltip="Heat Recovery Ventilator cleaning"
          >
            HRV (Heat Recovery Ventilator)
          </ToggleCard>
        </div>
      </div>

      <button type="button" onClick={onNext} className="btn btn-primary w-full">
        Continue
      </button>
    </div>
  );
}
