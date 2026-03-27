import type { QuoteData, PackageType, PackagesConfig, AddonsConfig } from "@/types";
import { INCLUDED_VENTS } from "@/lib/constants";
import { calculateBothPackagePrices, formatPrice } from "@/lib/utils/pricing";
import { ExpandableSection } from "@/components/ui";

interface Step3PackageProps {
  data: QuoteData;
  updateData: (updates: Partial<QuoteData>) => void;
  packages: PackagesConfig;
  addons: AddonsConfig;
  onNext: () => void;
  onBack: () => void;
}

interface AddonToggleProps {
  label: string;
  description?: string;
  active: boolean;
  onToggle: () => void;
  standardPrice: number;
  deepCleanPrice: number | "included";
  selectedPackage: PackageType;
  disabled?: boolean;
}

function AddonToggle({
  label,
  description,
  active,
  onToggle,
  standardPrice,
  deepCleanPrice,
  selectedPackage,
  disabled,
}: AddonToggleProps) {
  const isDeepClean = selectedPackage === "deepclean";
  const isIncluded = isDeepClean && deepCleanPrice === "included";
  const displayPrice = isDeepClean
    ? deepCleanPrice === "included"
      ? null
      : deepCleanPrice
    : standardPrice;

  return (
    <button
      type="button"
      onClick={disabled ? undefined : onToggle}
      disabled={disabled}
      className={`w-full p-3 border text-left transition-colors flex items-center justify-between text-sm ${
        active || isIncluded
          ? "bg-navy text-white border-navy"
          : "bg-white text-navy border-cream-dark hover:border-orange"
      } ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
    >
      <div>
        <span className="block font-medium">{label}</span>
        {description && (
          <span
            className={`text-xs ${
              active || isIncluded ? "text-white/60" : "text-charcoal/50"
            }`}
          >
            {description}
          </span>
        )}
      </div>
      <span className="text-right shrink-0 ml-2">
        {isIncluded ? (
          <span
            className={`text-xs font-bold ${
              active ? "text-orange" : "text-orange"
            }`}
          >
            Included
          </span>
        ) : displayPrice != null && displayPrice > 0 ? (
          <span>+${formatPrice(displayPrice)}</span>
        ) : null}
      </span>
    </button>
  );
}

export default function Step3Package({
  data,
  updateData,
  packages,
  addons,
  onNext,
  onBack,
}: Step3PackageProps) {
  const prices = calculateBothPackagePrices(data);
  const extraVents = Math.max(0, data.vents - INCLUDED_VENTS);
  const standardSavings = prices.standard - prices.deepClean;
  const showSavingsCallout =
    data.package === "standard" && standardSavings >= 0;

  // Dryer vent prices depend on location
  const dryerStandardPrice =
    data.dryerVentLocation === "ground"
      ? addons.dryerGround.price
      : data.dryerVentLocation === "second-floor"
        ? addons.dryerSecondFloor.price
        : data.dryerVentLocation === "rooftop"
          ? addons.dryerRooftop.price
          : 0;

  const dryerDeepCleanPrice =
    data.dryerVentLocation === "ground"
      ? ("included" as const)
      : data.dryerVentLocation === "second-floor"
        ? addons.dryerSecondFloor.price - addons.dryerGround.price
        : data.dryerVentLocation === "rooftop"
          ? addons.dryerRooftop.price - addons.dryerGround.price
          : 0;

  // Build add-on lists: "recommended" (based on home features) vs "additional"
  const hasDryerVent = data.dryerVentLocation !== "none";

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h1 className="font-display text-2xl font-bold text-navy text-center mb-6">
        Choose Your Package
      </h1>

      {/* Package Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 max-w-3xl mx-auto">
        {(Object.keys(packages) as PackageType[]).map((key) => {
          const pkg = packages[key];
          const isSelected = data.package === key;
          const isDeepClean = key === "deepclean";
          const total = isDeepClean ? prices.deepClean : prices.standard;

          return (
            <button
              key={key}
              type="button"
              onClick={() => updateData({ package: key })}
              className={`text-left transition-all border-2 bg-white relative ${
                isSelected
                  ? "border-orange shadow-lg scale-[1.02]"
                  : "border-gray-200 hover:border-orange/50"
              }`}
            >
              {/* Best Value Badge */}
              {isDeepClean && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange text-white text-xs font-bold uppercase px-3 py-1 z-10">
                  Best Value
                </div>
              )}

              {/* Header */}
              <div
                className={`p-4 text-center ${
                  isDeepClean
                    ? "bg-navy text-white"
                    : "bg-gray-100 text-navy"
                }`}
              >
                <h3 className="font-display text-lg font-bold uppercase">
                  {pkg.name}
                </h3>
                <p
                  className={`text-xs ${
                    isDeepClean ? "text-white/70" : "text-charcoal/60"
                  }`}
                >
                  {pkg.tagline}
                </p>
              </div>

              {/* Total Price */}
              <div className="p-4 text-center border-b border-gray-100">
                <span className="text-orange font-display text-3xl font-bold">
                  ${formatPrice(total)}
                </span>
                <span className="text-charcoal/50 text-xs ml-1">+ GST</span>
                <div className="mt-1 text-xs text-charcoal/50">
                  Base ${pkg.price} + {extraVents > 0 ? `${extraVents} extra vents` : `${data.vents} vents included`}
                </div>
              </div>

              {/* Features */}
              <div className="p-4 space-y-1.5 text-sm">
                {pkg.features.map((feature, idx) => {
                  const isHighlighted =
                    isDeepClean &&
                    (feature.toLowerCase().includes("octopus") ||
                      feature.toLowerCase().includes("hrv") ||
                      feature.toLowerCase().includes("sanitiz") ||
                      feature.toLowerCase().includes("dryer"));

                  return (
                    <div key={idx} className="flex items-start gap-2">
                      <span
                        className={`mt-0.5 text-xs ${
                          idx === 0 && isDeepClean
                            ? "opacity-0"
                            : isHighlighted
                              ? "text-orange"
                              : "text-charcoal/40"
                        }`}
                      >
                        ✓
                      </span>
                      <span
                        className={
                          idx === 0 && isDeepClean
                            ? "text-navy font-bold text-xs uppercase tracking-wide"
                            : isHighlighted
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

              {/* Selected Indicator */}
              {isSelected && (
                <div className="bg-orange text-white text-center py-1.5 text-xs font-bold uppercase">
                  Selected
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Savings Callout */}
      {showSavingsCallout && (
        <div className="max-w-3xl mx-auto mb-6 p-4 border-2 border-orange/40 bg-orange/5 text-center">
          <p className="text-navy font-medium text-sm">
            {standardSavings > 0 ? (
              <>
                The Deep Clean includes everything you&apos;ve selected and{" "}
                <span className="font-bold text-orange">
                  saves you ${formatPrice(standardSavings)}
                </span>
              </>
            ) : (
              <>
                The Deep Clean includes HRV cleaning, sanitization, and dryer
                vent at no extra cost
              </>
            )}
          </p>
          <button
            type="button"
            onClick={() => updateData({ package: "deepclean" })}
            className="mt-2 text-sm font-bold text-orange hover:text-orange/80 underline transition-colors"
          >
            Switch to The Deep Clean
          </button>
        </div>
      )}

      {/* Add-Ons Section */}
      <div className="max-w-3xl mx-auto">
        {/* Recommended based on home features */}
        {(data.hasHRV || hasDryerVent || data.hasHumidifier || data.hasCentralVac) && (
          <div className="mb-6">
            <h3 className="font-display text-xs uppercase tracking-wide text-charcoal/60 mb-3">
              Recommended for your home
            </h3>
            <div className="space-y-2">
              {data.hasHRV && (
                <AddonToggle
                  label="HRV / ERV Cleaning"
                  description="Clean your heat recovery ventilator"
                  active={data.wantsHRV}
                  onToggle={() => updateData({ wantsHRV: !data.wantsHRV })}
                  standardPrice={addons.hrv.price}
                  deepCleanPrice="included"
                  selectedPackage={data.package}
                  disabled={data.package === "deepclean"}
                />
              )}

              {hasDryerVent && (
                <AddonToggle
                  label={`Dryer Vent Cleaning (${
                    data.dryerVentLocation === "ground"
                      ? "main floor"
                      : data.dryerVentLocation === "second-floor"
                        ? "2nd floor"
                        : "rooftop"
                  })`}
                  description="Prevent dryer fires, improve efficiency"
                  active={data.wantsDryerVent}
                  onToggle={() =>
                    updateData({ wantsDryerVent: !data.wantsDryerVent })
                  }
                  standardPrice={dryerStandardPrice}
                  deepCleanPrice={dryerDeepCleanPrice}
                  selectedPackage={data.package}
                  disabled={
                    data.package === "deepclean" &&
                    data.dryerVentLocation === "ground"
                  }
                />
              )}

              {data.hasHumidifier && (
                <AddonToggle
                  label="Humidifier Pad Replacement"
                  description="Replace water panel"
                  active={data.wantsHumidifier}
                  onToggle={() =>
                    updateData({ wantsHumidifier: !data.wantsHumidifier })
                  }
                  standardPrice={addons.humidifier.price}
                  deepCleanPrice={addons.humidifier.price}
                  selectedPackage={data.package}
                />
              )}

              {data.hasCentralVac && (
                <AddonToggle
                  label="Central Vacuum Cleaning"
                  description="Clean central vac system"
                  active={data.wantsCentralVac}
                  onToggle={() =>
                    updateData({ wantsCentralVac: !data.wantsCentralVac })
                  }
                  standardPrice={addons.centralVac.price}
                  deepCleanPrice={addons.centralVac.price}
                  selectedPackage={data.package}
                />
              )}
            </div>
          </div>
        )}

        {/* Additional services (not tied to home features) */}
        <div className="mb-6">
          <h3 className="font-display text-xs uppercase tracking-wide text-charcoal/60 mb-3">
            Additional services
          </h3>
          <div className="space-y-2">
            <AddonToggle
              label="Benefect Duct Sanitizing"
              description="Kills 99.99% of bacteria, mold, and fungi"
              active={data.wantsSanitizing}
              onToggle={() =>
                updateData({ wantsSanitizing: !data.wantsSanitizing })
              }
              standardPrice={addons.sanitizing.price}
              deepCleanPrice="included"
              selectedPackage={data.package}
              disabled={data.package === "deepclean"}
            />

            {/* Show HRV here if they don't have one (still available as add-on) */}
            {!data.hasHRV && (
              <AddonToggle
                label="HRV / ERV Cleaning"
                description="Heat recovery ventilator cleaning"
                active={data.wantsHRV}
                onToggle={() => updateData({ wantsHRV: !data.wantsHRV })}
                standardPrice={addons.hrv.price}
                deepCleanPrice="included"
                selectedPackage={data.package}
                disabled={data.package === "deepclean"}
              />
            )}

            {/* Show humidifier here if they don't have one */}
            {!data.hasHumidifier && (
              <AddonToggle
                label="Humidifier Pad Replacement"
                description="Replace water panel"
                active={data.wantsHumidifier}
                onToggle={() =>
                  updateData({ wantsHumidifier: !data.wantsHumidifier })
                }
                standardPrice={addons.humidifier.price}
                deepCleanPrice={addons.humidifier.price}
                selectedPackage={data.package}
              />
            )}

            {/* Show central vac here if they don't have one */}
            {!data.hasCentralVac && (
              <AddonToggle
                label="Central Vacuum Cleaning"
                description="Clean central vac system"
                active={data.wantsCentralVac}
                onToggle={() =>
                  updateData({ wantsCentralVac: !data.wantsCentralVac })
                }
                standardPrice={addons.centralVac.price}
                deepCleanPrice={addons.centralVac.price}
                selectedPackage={data.package}
              />
            )}
          </div>
        </div>

        <ExpandableSection title="What's the difference between the packages?">
          <p className="text-sm text-charcoal/70 mb-2">
            <strong>The Standard</strong> uses air guns on every supply vent and
            a back skipper in trunk lines. It is a thorough professional cleaning.
          </p>
          <p className="text-sm text-charcoal/70">
            <strong>The Deep Clean</strong> adds a second pass with a forward
            skip tool on every vent, plus an octopus whip in all trunk lines.
            It also includes HRV/ERV cleaning, Benefect sanitization, and main
            floor dryer vent cleaning at no extra charge.
          </p>
        </ExpandableSection>
      </div>

      {/* Navigation */}
      <div className="max-w-lg mx-auto flex gap-4 mt-8">
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
