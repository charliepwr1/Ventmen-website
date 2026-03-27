import type { QuoteData, PackageType } from "@/types";
import { PACKAGES, ADDONS } from "@/lib/constants";
import {
  calculatePriceForPackage,
  calculateDecoySavings,
  formatPrice,
} from "@/lib/utils/pricing";

interface Step4QuoteProps {
  data: QuoteData;
  updateData: (updates: Partial<QuoteData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step4Quote({
  data,
  updateData,
  onNext,
  onBack,
}: Step4QuoteProps) {
  // Card display prices: computed with FIXED data so they never shift
  // when toggling packages or optional extras
  const noAddons: Partial<QuoteData> = {
    wantsHRV: false,
    wantsSanitizing: false,
    wantsDryerVent: false,
    wantsHumidifier: false,
    wantsCentralVac: false,
  };

  // Standard card: base price only (package + extra vents + AC + furnaces)
  const standardCardPrice = calculatePriceForPackage(
    { ...data, ...noAddons },
    "standard"
  );

  // Deep Clean card: base price + its included freebies (HRV, sanitizing, dryer ground)
  // The pricing engine handles inclusions internally -- HRV/sanitizing/ground dryer
  // are free for deepclean, but 2nd floor/rooftop dryer pays the upgrade difference
  const deepCleanCardPrice = calculatePriceForPackage(
    {
      ...data,
      ...noAddons,
      wantsHRV: data.hasHRV,
      wantsSanitizing: true,
      wantsDryerVent: data.dryerVentLocation !== "none",
    },
    "deepclean"
  );

  const decoy = calculateDecoySavings(data);

  const handlePackageSelect = (pkg: PackageType) => {
    if (pkg === "deepclean") {
      updateData({
        package: pkg,
        wantsHRV: data.hasHRV,
        wantsSanitizing: true,
        wantsDryerVent: data.dryerVentLocation !== "none",
      });
    } else {
      updateData({
        package: pkg,
        wantsHRV: data.hasHRV,
        wantsSanitizing: false,
        wantsDryerVent: data.dryerVentLocation !== "none",
      });
    }
  };

  const isDeepClean = data.package === "deepclean";

  // Build list of extras included in Deep Clean (shown on Deep Clean card as value items,
  // shown on Standard card as "not included")
  const includedExtras: { label: string; value: number }[] = [];
  if (data.hasHRV) {
    includedExtras.push({ label: "HRV/ERV cleaning", value: ADDONS.hrv.price });
  }
  includedExtras.push({ label: "Benefect sanitization", value: ADDONS.sanitizing.price });
  if (data.dryerVentLocation !== "none") {
    const dryerPrice =
      data.dryerVentLocation === "ground"
        ? ADDONS.dryerGround.price
        : data.dryerVentLocation === "second-floor"
          ? ADDONS.dryerSecondFloor.price
          : ADDONS.dryerRooftop.price;
    const locationLabel =
      data.dryerVentLocation === "ground"
        ? "main floor"
        : data.dryerVentLocation === "second-floor"
          ? "2nd floor"
          : "rooftop";
    includedExtras.push({
      label: `Dryer vent cleaning (${locationLabel})`,
      value: dryerPrice,
    });
  }

  const showHumidifier = data.hasHumidifier;
  const showCentralVac = data.hasCentralVac;

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h1 className="font-display text-2xl font-bold text-navy text-center mb-2">
        Here&apos;s what we recommend
      </h1>
      <p className="text-charcoal/60 text-center text-sm mb-6">
        Based on your {data.houseType === "apartment" ? "condo" : data.houseType} with{" "}
        {data.vents} vents
      </p>

      {/* Package Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 max-w-3xl mx-auto">
        {/* Deep Clean Card (shown first) */}
        <button
          type="button"
          onClick={() => handlePackageSelect("deepclean")}
          className={`text-left border-2 rounded-lg overflow-hidden relative transition-all ${
            isDeepClean
              ? "border-orange shadow-lg scale-[1.02]"
              : "border-gray-200 hover:border-orange/50"
          }`}
        >
          {/* Best Value Badge */}
          <div className="absolute -top-0 left-1/2 -translate-x-1/2 bg-orange text-white text-[10px] font-bold uppercase px-3 py-1 rounded-b-md z-10">
            Best Value
          </div>

          {/* Header */}
          <div className="bg-navy text-white p-4 text-center pt-7">
            <div className="text-[10px] uppercase tracking-wider opacity-60">
              Recommended
            </div>
            <h3 className="font-display text-lg font-bold uppercase">
              {PACKAGES.deepclean.name}
            </h3>
            <div className="text-3xl font-extrabold text-orange mt-1">
              ${formatPrice(deepCleanCardPrice)}
            </div>
            <div className="text-xs opacity-50">+ GST</div>
          </div>

          {/* Features */}
          <div className="p-4 bg-white">
            <div className="text-xs text-charcoal/50 mb-2">
              Everything in Standard, plus:
            </div>
            <div className="space-y-1.5 text-sm">
              <div className="flex items-start gap-2">
                <span className="text-orange font-bold mt-0.5 shrink-0">&#10003;</span>
                <span className="text-navy">Double-pass cleaning with octopus whip</span>
              </div>
              {includedExtras.map((extra) => (
                <div key={extra.label} className="flex items-start gap-2">
                  <span className="text-orange font-bold mt-0.5 shrink-0">&#10003;</span>
                  <span className="text-navy">
                    {extra.label}{" "}
                    <span className="text-orange font-semibold">
                      (${formatPrice(extra.value)} value)
                    </span>
                  </span>
                </div>
              ))}
            </div>

            {/* Value callout */}
            {decoy.includedExtrasValue > 0 && (
              <div className="mt-3 p-2 bg-orange/5 rounded-md text-center text-xs text-navy">
                <span className="font-bold text-orange">
                  ${formatPrice(decoy.includedExtrasValue)} in extras included
                </span>{" "}
                at no additional cost
              </div>
            )}
          </div>

          {/* Selected indicator */}
          {isDeepClean && (
            <div className="bg-orange text-white text-center py-1.5 text-xs font-bold uppercase">
              Selected
            </div>
          )}
        </button>

        {/* Standard Card */}
        <button
          type="button"
          onClick={() => handlePackageSelect("standard")}
          className={`text-left border-2 rounded-lg overflow-hidden transition-all ${
            !isDeepClean
              ? "border-orange shadow-lg scale-[1.02]"
              : "border-gray-200 hover:border-orange/50"
          }`}
        >
          {/* Header */}
          <div className="bg-gray-100 p-4 text-center">
            <h3 className="font-display text-lg font-bold uppercase text-navy">
              {PACKAGES.standard.name}
            </h3>
            <div className="text-3xl font-extrabold text-navy mt-1">
              ${formatPrice(standardCardPrice)}
            </div>
            <div className="text-xs text-charcoal/50">+ GST</div>
          </div>

          {/* Features */}
          <div className="p-4 bg-white">
            <div className="space-y-1.5 text-sm">
              <div className="flex items-start gap-2">
                <span className="text-charcoal/30 mt-0.5 shrink-0">&#10003;</span>
                <span className="text-charcoal/70">Air gun on every supply vent</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-charcoal/30 mt-0.5 shrink-0">&#10003;</span>
                <span className="text-charcoal/70">Back skipper in trunk lines</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-charcoal/30 mt-0.5 shrink-0">&#10003;</span>
                <span className="text-charcoal/70">Furnace blower cleaning</span>
              </div>
            </div>

            {/* Not included -- show what extras would cost to add */}
            <div className="mt-3 p-2 bg-gray-50 rounded-md text-xs text-charcoal/50">
              <div className="font-semibold text-charcoal/60 mb-1">Not included:</div>
              {includedExtras.map((extra) => (
                <div key={extra.label} className="flex justify-between">
                  <span>{extra.label}</span>
                  <span className="text-charcoal/60">+${formatPrice(extra.value)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Selected indicator */}
          {!isDeepClean && (
            <div className="bg-orange text-white text-center py-1.5 text-xs font-bold uppercase">
              Selected
            </div>
          )}
        </button>
      </div>

      {/* Optional Extras -- sanitizing always shown, others conditional */}
      <div className="max-w-3xl mx-auto mb-6">
        <h3 className="font-display text-xs uppercase tracking-wide text-charcoal/60 mb-3">
          Optional extras
        </h3>
        <div className="space-y-2">
          {/* Sanitizing -- toggleable for Standard, shows "Included" for Deep Clean */}
          <div
            className={`flex items-center justify-between p-3 border-2 rounded-lg transition-colors ${
              isDeepClean
                ? "bg-navy/5 border-navy/20"
                : data.wantsSanitizing
                  ? "border-orange bg-orange/5"
                  : "border-cream-dark bg-white hover:border-orange/50"
            }`}
          >
            <button
              type="button"
              onClick={
                isDeepClean
                  ? undefined
                  : () => updateData({ wantsSanitizing: !data.wantsSanitizing })
              }
              disabled={isDeepClean}
              className="flex-1 text-left"
            >
              <span className="text-sm font-medium text-navy">
                Benefect Duct Sanitizing
              </span>
              <span className="block text-xs text-charcoal/50">
                Kills 99.99% of bacteria, mold, and fungi
              </span>
            </button>
            <span className="text-sm shrink-0 ml-3">
              {isDeepClean ? (
                <span className="text-xs font-bold text-orange">Included</span>
              ) : (
                <span className="text-charcoal/60">+${formatPrice(ADDONS.sanitizing.price)}</span>
              )}
            </span>
          </div>

          {/* Humidifier */}
          {showHumidifier && (
            <button
              type="button"
              onClick={() => updateData({ wantsHumidifier: !data.wantsHumidifier })}
              className={`w-full flex items-center justify-between p-3 border-2 rounded-lg transition-colors ${
                data.wantsHumidifier
                  ? "border-orange bg-orange/5"
                  : "border-cream-dark bg-white hover:border-orange/50"
              }`}
            >
              <span className="text-sm font-medium text-navy text-left">
                Humidifier pad replacement
              </span>
              <span className="text-sm text-charcoal/60 shrink-0 ml-3">
                +${formatPrice(ADDONS.humidifier.price)}
              </span>
            </button>
          )}

          {/* Central Vac */}
          {showCentralVac && (
            <button
              type="button"
              onClick={() => updateData({ wantsCentralVac: !data.wantsCentralVac })}
              className={`w-full flex items-center justify-between p-3 border-2 rounded-lg transition-colors ${
                data.wantsCentralVac
                  ? "border-orange bg-orange/5"
                  : "border-cream-dark bg-white hover:border-orange/50"
              }`}
            >
              <span className="text-sm font-medium text-navy text-left">
                Central vacuum cleaning
              </span>
              <span className="text-sm text-charcoal/60 shrink-0 ml-3">
                +${formatPrice(ADDONS.centralVac.price)}
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Trust Signals */}
      <div className="max-w-3xl mx-auto p-4 bg-green-50/50 rounded-lg mb-8">
        <div className="flex flex-col gap-2 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-orange">&#10003;</span>
            <span className="text-charcoal/70">Video documentation of every vent</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-orange">&#10003;</span>
            <span className="text-charcoal/70">
              No hidden fees -- price confirmed on-site
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-orange">&#10003;</span>
            <span className="text-charcoal/70">
              Licensed, insured, background-checked
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="max-w-lg mx-auto flex gap-4 items-center">
        <button
          type="button"
          onClick={onBack}
          className="text-charcoal/60 hover:text-navy transition-colors text-sm"
        >
          &larr; Back
        </button>
        <button type="button" onClick={onNext} className="btn btn-primary flex-1">
          Continue to Booking
        </button>
      </div>
    </div>
  );
}
