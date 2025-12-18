import type { QuoteData, DryerVentType, AddonsConfig } from "@/types";
import { ExpandableSection } from "@/components/ui";

interface Step3AddonsProps {
  data: QuoteData;
  updateData: (updates: Partial<QuoteData>) => void;
  addons: AddonsConfig;
  onNext: () => void;
  onBack: () => void;
}

export default function Step3Addons({
  data,
  updateData,
  addons,
  onNext,
  onBack,
}: Step3AddonsProps) {
  const dryerVentOptions: {
    value: DryerVentType;
    label: string;
    price: number;
  }[] = [
    { value: "none", label: "None", price: 0 },
    {
      value: "ground",
      label: "Ground Level",
      price: data.package === "fullservice" ? 0 : addons.dryerGround.price,
    },
    {
      value: "second-floor",
      label: "2nd Floor",
      price: addons.dryerSecondFloor.price,
    },
    { value: "rooftop", label: "Rooftop", price: addons.dryerRooftop.price },
  ];

  // Recommendation logic based on home info
  const showSanitizingRecommendation = !data.sanitizing;

  return (
    <div className="w-full max-w-lg mx-auto">
      <h1 className="font-display text-2xl font-bold text-navy text-center mb-6">
        Enhance Your Service
      </h1>

      {/* Recommended Section */}
      {showSanitizingRecommendation && (
        <div className="mb-6 p-4 border-2 border-orange/30 bg-orange/5">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-orange">⭐</span>
            <span className="font-display text-sm uppercase tracking-wide text-navy">
              Recommended for Your Home
            </span>
          </div>
          <button
            type="button"
            onClick={() => updateData({ sanitizing: true })}
            className="w-full p-3 bg-white border border-cream-dark text-left flex items-center justify-between text-sm hover:border-orange transition-colors"
          >
            <div>
              <span className="block text-navy font-medium">
                Duct Sanitizing
              </span>
              <span className="text-xs text-charcoal/50">
                Kills bacteria, mold & odors
              </span>
            </div>
            <span className="text-orange font-bold">
              +${addons.sanitizing.price}
            </span>
          </button>
        </div>
      )}

      {/* Dryer Vent Section */}
      <div className="mb-6">
        <label className="block font-display text-xs uppercase tracking-wide text-charcoal/60 mb-2">
          Dryer Vent Cleaning
        </label>
        <div className="grid grid-cols-2 gap-2">
          {dryerVentOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => updateData({ dryerVent: option.value })}
              className={`p-3 border text-sm transition-colors ${
                data.dryerVent === option.value
                  ? "bg-navy text-white border-navy"
                  : "bg-white text-navy border-cream-dark hover:border-orange"
              }`}
            >
              <span className="block font-medium">{option.label}</span>
              {option.price > 0 && (
                <span className="block text-xs mt-1">${option.price}</span>
              )}
              {option.value === "ground" && data.package === "fullservice" && (
                <span className="block text-xs text-orange mt-1">Included</span>
              )}
            </button>
          ))}
        </div>
        <ExpandableSection title="Learn more about dryer vent cleaning">
          <p>
            Clogged dryer vents are a leading cause of house fires. We clean the
            entire vent run from your dryer to the exterior. Price varies by
            vent location and accessibility.
          </p>
        </ExpandableSection>
      </div>

      {/* Sanitizing (if already added) */}
      {data.sanitizing && (
        <div className="mb-6">
          <button
            type="button"
            onClick={() => updateData({ sanitizing: false })}
            className="w-full p-3 border text-left transition-colors flex items-center justify-between text-sm bg-navy text-white border-navy"
          >
            <div>
              <span className="block">Duct Sanitizing</span>
              <span className="text-xs text-white/60">
                Kills bacteria, mold & odors
              </span>
            </div>
            <span>+${addons.sanitizing.price}</span>
          </button>
        </div>
      )}

      {/* Humidifier Service */}
      <div className="mb-6">
        <button
          type="button"
          onClick={() =>
            updateData({ humidifierService: !data.humidifierService })
          }
          className={`w-full p-3 border text-left transition-colors flex items-center justify-between text-sm ${
            data.humidifierService
              ? "bg-navy text-white border-navy"
              : "bg-white text-navy border-cream-dark hover:border-orange"
          }`}
        >
          <div>
            <span className="block">Humidifier Service</span>
            <span
              className={`text-xs ${
                data.humidifierService ? "text-white/60" : "text-charcoal/50"
              }`}
            >
              Clean & inspect
            </span>
          </div>
          <span>+${addons.humidifier.price}</span>
        </button>
        <ExpandableSection title="Learn more about humidifier service">
          <p>
            We&apos;ll clean your furnace humidifier, replace the water panel if
            needed, and ensure it&apos;s working properly for the heating
            season.
          </p>
        </ExpandableSection>
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
