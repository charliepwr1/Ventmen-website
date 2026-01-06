import type {
  QuoteData,
  PackageType,
  PackagesConfig,
  AddonsConfig,
} from "@/types";
import { INCLUDED_VENTS } from "@/lib/constants";
import { ExpandableSection } from "@/components/ui";

interface Step2PackageProps {
  data: QuoteData;
  updateData: (updates: Partial<QuoteData>) => void;
  packages: PackagesConfig;
  addons: AddonsConfig;
  onNext: () => void;
  onBack: () => void;
}

export default function Step2Package({
  data,
  updateData,
  packages,
  addons,
  onNext,
  onBack,
}: Step2PackageProps) {
  return (
    <div className="w-full max-w-5xl mx-auto">
      <h1 className="font-display text-2xl font-bold text-navy text-center mb-6">
        Choose Your Package
      </h1>

      {/* Package Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {(Object.keys(packages) as PackageType[]).map((key) => {
          const pkg = packages[key];
          const isSelected = data.package === key;
          const isPro = key === "pro";
          const isFullService = key === "fullservice";

          return (
            <div
              key={key}
              className={`text-left transition-all border-2 bg-white relative ${
                isSelected
                  ? "border-orange shadow-lg scale-[1.02]"
                  : "border-gray-200 hover:border-orange/50"
              } ${isPro ? "md:-mt-2 md:mb-2" : ""}`}
            >
              {/* Most Popular Badge */}
              {isPro && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange text-white text-xs font-bold uppercase px-3 py-1">
                  Most Popular
                </div>
              )}

              {/* Clickable Card Area */}
              <button
                type="button"
                onClick={() => updateData({ package: key })}
                className="w-full text-left"
              >
                {/* Header */}
                <div
                  className={`p-4 text-center ${
                    isFullService
                      ? "bg-orange text-white"
                      : isPro
                        ? "bg-navy text-white"
                        : "bg-gray-100 text-navy"
                  }`}
                >
                  <h3 className="font-display text-xl font-bold uppercase">
                    {pkg.name}
                  </h3>
                  <p
                    className={`text-sm ${
                      isFullService || isPro ? "text-white/80" : "text-charcoal/60"
                    }`}
                  >
                    {pkg.tagline}
                  </p>
                </div>

                {/* Price */}
                <div className="p-4 text-center border-b border-gray-100">
                  <span className="text-orange font-display text-4xl font-bold">
                    ${pkg.price.toFixed(2).split(".")[0]}
                  </span>
                  <span className="text-orange font-display text-xl">
                    .{pkg.price.toFixed(2).split(".")[1]}
                  </span>
                  <span className="text-charcoal/50 text-sm ml-1">+ GST</span>
                </div>

                {/* Features List */}
                <div className="p-4 space-y-2 text-sm">
                  <div className="flex items-start gap-2 text-charcoal/70">
                    <span className="text-orange mt-0.5">⊕</span>
                    <span>
                      {INCLUDED_VENTS} vents included, then ${pkg.perVent}/vent
                    </span>
                  </div>

                  <div className="flex items-start gap-2 text-charcoal/70">
                    <span className="text-orange mt-0.5">⟳</span>
                    <span>
                      High-efficiency or A/C Bypass: ${addons.bypass.price}
                    </span>
                  </div>

                  {pkg.features.slice(1).map((feature, idx) => {
                    const isHighlighted =
                      (key === "pro" &&
                        feature.toLowerCase().includes("rotary brush")) ||
                      (key === "fullservice" &&
                        (feature.toLowerCase().includes("octopus") ||
                          feature.toLowerCase().includes("fresh air") ||
                          feature.toLowerCase().includes("dryer") ||
                          feature.toLowerCase().includes("total care")));

                    return (
                      <div key={idx} className="flex items-start gap-2">
                        <span
                          className={`mt-0.5 ${
                            isHighlighted ? "text-orange" : "text-charcoal/40"
                          }`}
                        >
                          ✓
                        </span>
                        <span
                          className={
                            isHighlighted
                              ? "text-navy font-medium"
                              : "text-charcoal/70"
                          }
                        >
                          {feature}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </button>

              {/* Learn More - Outside the button */}
              <ExpandableSection title="Learn more">
                <p>
                  {key === "basic" &&
                    "Our Basic package is perfect for routine maintenance of homes that are cleaned regularly. Includes high-pressure air cleaning of all ducts and vents."}
                  {key === "pro" &&
                    "The Pro package adds high-speed rotary brush cleaning, which is essential for homes with pets, allergies, or recent renovations. This physically scrubs the duct walls for a deeper clean."}
                  {key === "fullservice" &&
                    "Our Complete Care package includes everything plus reverse octopus whip cleaning, fresh air intake cleaning, ground floor dryer vent, and a 2-year Total Care Plan with priority scheduling."}
                </p>
              </ExpandableSection>

              {/* Selected indicator */}
              {isSelected && (
                <div className="bg-orange text-white text-center py-2 text-sm font-bold uppercase">
                  Selected
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Navigation */}
      <div className="max-w-lg mx-auto flex gap-4">
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
