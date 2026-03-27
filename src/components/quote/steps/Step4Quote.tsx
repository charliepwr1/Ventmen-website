import { useState } from "react";
import type { QuoteData, PackageType } from "@/types";
import { PACKAGES, ADDONS, INCLUDED_VENTS } from "@/lib/constants";
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

interface AddonItem {
  id: string;
  label: string;
  description: string;
  standardPrice: number;
  deepCleanPrice: number;
  includedInDeepClean: boolean;
  includedValue: number;
  wanted: boolean;
  onToggle: () => void;
}

export default function Step4Quote({
  data,
  updateData,
  onNext,
  onBack,
}: Step4QuoteProps) {
  const [showBreakdown, setShowBreakdown] = useState(false);
  const isDeepClean = data.package === "deepclean";

  // --- Package switch ---
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
        wantsHRV: false,
        wantsSanitizing: false,
        wantsDryerVent: data.dryerVentLocation !== "none",
      });
    }
  };

  // --- Pricing ---
  // Selected package: live price that updates with add-on toggles
  const selectedPrice = calculatePriceForPackage(data, data.package);

  // Unselected package: fixed base price (no optional add-ons)
  const noAddons: Partial<QuoteData> = {
    wantsHRV: false,
    wantsSanitizing: false,
    wantsDryerVent: false,
    wantsHumidifier: false,
    wantsCentralVac: false,
  };

  const standardBasePrice = calculatePriceForPackage(
    { ...data, ...noAddons },
    "standard"
  );

  const deepCleanBasePrice = calculatePriceForPackage(
    {
      ...data,
      ...noAddons,
      wantsHRV: data.hasHRV,
      wantsSanitizing: true,
      wantsDryerVent: data.dryerVentLocation !== "none",
    },
    "deepclean"
  );

  // Toggle bar: selected = live, unselected = base
  const standardDisplayPrice = isDeepClean ? standardBasePrice : selectedPrice;
  const deepCleanDisplayPrice = isDeepClean ? selectedPrice : deepCleanBasePrice;

  const decoy = calculateDecoySavings(data);

  // --- Build add-on items ---
  const addonItems: AddonItem[] = [];

  // Sanitizing - always shown
  addonItems.push({
    id: "sanitizing",
    label: "Benefect Duct Sanitizing",
    description: "Hospital-grade, kills 99.99% of bacteria & mold",
    standardPrice: ADDONS.sanitizing.price,
    deepCleanPrice: 0,
    includedInDeepClean: true,
    includedValue: ADDONS.sanitizing.price,
    wanted: data.wantsSanitizing,
    onToggle: () => updateData({ wantsSanitizing: !data.wantsSanitizing }),
  });

  // HRV - always shown
  addonItems.push({
    id: "hrv",
    label: "HRV / ERV Cleaning",
    description: "Clean and service your heat recovery ventilator",
    standardPrice: ADDONS.hrv.price,
    deepCleanPrice: 0,
    includedInDeepClean: true,
    includedValue: ADDONS.hrv.price,
    wanted: data.wantsHRV,
    onToggle: () => updateData({ wantsHRV: !data.wantsHRV }),
  });

  // Dryer vent - always shown
  {
    const hasLocation = data.dryerVentLocation !== "none";
    const fullPrice = !hasLocation
      ? ADDONS.dryerGround.price
      : data.dryerVentLocation === "ground"
        ? ADDONS.dryerGround.price
        : data.dryerVentLocation === "second-floor"
          ? ADDONS.dryerSecondFloor.price
          : ADDONS.dryerRooftop.price;

    const upgradePrice = !hasLocation
      ? 0
      : data.dryerVentLocation === "ground"
        ? 0
        : data.dryerVentLocation === "second-floor"
          ? ADDONS.dryerSecondFloor.price - ADDONS.dryerGround.price
          : ADDONS.dryerRooftop.price - ADDONS.dryerGround.price;

    const locationLabel = !hasLocation
      ? ""
      : data.dryerVentLocation === "ground"
        ? " (main floor)"
        : data.dryerVentLocation === "second-floor"
          ? " (2nd floor)"
          : " (rooftop)";

    addonItems.push({
      id: "dryer",
      label: `Dryer Vent Cleaning${locationLabel}`,
      description: hasLocation
        ? "Lint buildup is a leading cause of house fires"
        : "From $69.95 -- exact price confirmed on-site",
      standardPrice: fullPrice,
      deepCleanPrice: upgradePrice,
      includedInDeepClean: hasLocation && data.dryerVentLocation === "ground",
      includedValue: ADDONS.dryerGround.price,
      wanted: data.wantsDryerVent,
      onToggle: () => {
        if (!hasLocation && !data.wantsDryerVent) {
          // Default to main floor when toggling on without a location
          updateData({ wantsDryerVent: true, dryerVentLocation: "ground" });
        } else {
          updateData({ wantsDryerVent: !data.wantsDryerVent });
        }
      },
    });
  }

  // Humidifier - always shown
  addonItems.push({
    id: "humidifier",
    label: "Humidifier Pad Replacement",
    description: "Fresh water panel for your furnace humidifier",
    standardPrice: ADDONS.humidifier.price,
    deepCleanPrice: ADDONS.humidifier.price,
    includedInDeepClean: false,
    includedValue: 0,
    wanted: data.wantsHumidifier,
    onToggle: () => updateData({ wantsHumidifier: !data.wantsHumidifier }),
  });

  // Central vac - always shown
  addonItems.push({
    id: "centralVac",
    label: "Central Vacuum Cleaning",
    description: "Clean all central vac lines and ports",
      standardPrice: ADDONS.centralVac.price,
      deepCleanPrice: ADDONS.centralVac.price,
      includedInDeepClean: false,
      includedValue: 0,
      wanted: data.wantsCentralVac,
      onToggle: () => updateData({ wantsCentralVac: !data.wantsCentralVac }),
    });

  // --- Price breakdown lines ---
  const pkg = isDeepClean ? PACKAGES.deepclean : PACKAGES.standard;
  const breakdownLines: { label: string; amount: number; included?: boolean }[] =
    [];

  breakdownLines.push({
    label: `${pkg.name} (${INCLUDED_VENTS} vents included)`,
    amount: pkg.price,
  });

  if (data.vents > INCLUDED_VENTS) {
    const extra = data.vents - INCLUDED_VENTS;
    breakdownLines.push({
      label: `${extra} extra vent${extra > 1 ? "s" : ""} x $${formatPrice(pkg.perVent)}`,
      amount: extra * pkg.perVent,
    });
  }

  if (data.hasAC) {
    breakdownLines.push({
      label: "AC surcharge",
      amount: ADDONS.acSurcharge.price,
    });
  }

  if (data.furnaces > 1) {
    breakdownLines.push({
      label: `${data.furnaces - 1} additional furnace${data.furnaces > 2 ? "s" : ""}`,
      amount: (data.furnaces - 1) * ADDONS.secondFurnace.price,
    });
  }

  // Add-on lines from toggled items
  for (const addon of addonItems) {
    if (!addon.wanted) continue;
    const isIncluded = isDeepClean && addon.includedInDeepClean;
    const price = isDeepClean ? addon.deepCleanPrice : addon.standardPrice;

    if (isIncluded) {
      breakdownLines.push({ label: addon.label, amount: 0, included: true });
    } else if (price > 0) {
      breakdownLines.push({ label: addon.label, amount: price });
    }
  }

  // --- Feature highlights for selected package ---
  const features = isDeepClean
    ? [
        "Everything in The Standard, plus:",
        "Second pass with forward skip tool on every vent",
        "Octopus whip in all trunk lines",
      ]
    : [
        "Air gun on all supply vents",
        "Back skipper in trunk lines",
        "Remove & clean blower motor",
      ];

  return (
    <div className="w-full max-w-lg mx-auto">
      <h1 className="font-display text-2xl font-bold text-navy text-center mb-2">
        Here&apos;s what we recommend
      </h1>
      <p className="text-charcoal/60 text-center text-sm mb-6">
        Based on your{" "}
        {data.houseType === "apartment" ? "condo" : data.houseType} with{" "}
        {data.vents} vents
      </p>

      {/* Package Toggle Bar */}
      <div className="flex rounded-lg border-2 border-cream-dark overflow-hidden mb-6">
        <button
          type="button"
          onClick={() => handlePackageSelect("deepclean")}
          className={`flex-1 py-3 px-2 text-center transition-colors relative ${
            isDeepClean
              ? "bg-navy text-white"
              : "bg-white text-navy hover:bg-gray-50"
          }`}
        >
          {isDeepClean && (
            <span className="absolute -top-0 left-1/2 -translate-x-1/2 bg-orange text-white text-[8px] font-bold uppercase px-2 py-0.5 rounded-b-sm">
              Best Value
            </span>
          )}
          <span className="block text-xs font-semibold uppercase tracking-wide opacity-70 mt-1">
            {PACKAGES.deepclean.name}
          </span>
          <span
            className={`block text-xl font-extrabold ${isDeepClean ? "text-orange" : ""}`}
          >
            ${formatPrice(deepCleanDisplayPrice)}
          </span>
        </button>
        <div className="w-px bg-cream-dark" />
        <button
          type="button"
          onClick={() => handlePackageSelect("standard")}
          className={`flex-1 py-3 px-2 text-center transition-colors ${
            !isDeepClean
              ? "bg-navy text-white"
              : "bg-white text-navy hover:bg-gray-50"
          }`}
        >
          <span className="block text-xs font-semibold uppercase tracking-wide opacity-70">
            {PACKAGES.standard.name}
          </span>
          <span
            className={`block text-xl font-extrabold ${!isDeepClean ? "text-orange" : ""}`}
          >
            ${formatPrice(standardDisplayPrice)}
          </span>
        </button>
      </div>

      {/* What's Included Panel */}
      <div className="border-2 border-cream-dark rounded-lg overflow-hidden mb-6">
        <div className="p-4">
          <div className="space-y-2 text-sm">
            {features.map((feature) => (
              <div key={feature} className="flex items-start gap-2">
                <span
                  className={`mt-0.5 shrink-0 font-bold ${isDeepClean ? "text-orange" : "text-charcoal/40"}`}
                >
                  &#10003;
                </span>
                <span className={isDeepClean ? "text-navy" : "text-charcoal/70"}>
                  {feature}
                </span>
              </div>
            ))}
          </div>

          {/* Deep Clean value callout */}
          {isDeepClean && decoy.includedExtrasValue > 0 && (
            <div className="mt-4 p-2.5 bg-orange/5 rounded-md text-center text-sm text-navy">
              <span className="font-bold text-orange">
                ${formatPrice(decoy.includedExtrasValue)} in extras included
              </span>{" "}
              at no additional cost
            </div>
          )}
        </div>

        {/* Price Breakdown Toggle */}
        <div className="border-t border-cream-dark">
          <button
            type="button"
            onClick={() => setShowBreakdown(!showBreakdown)}
            className="w-full px-4 py-2.5 text-xs text-charcoal/60 hover:text-navy flex items-center justify-center gap-1.5 transition-colors"
          >
            <span>{showBreakdown ? "Hide" : "See"} price breakdown</span>
            <svg
              className={`w-3 h-3 transition-transform ${showBreakdown ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {showBreakdown && (
            <div className="px-4 pb-4 space-y-1.5 text-xs">
              {breakdownLines.map((line) => (
                <div key={line.label} className="flex justify-between">
                  <span className="text-charcoal/60">{line.label}</span>
                  {line.included ? (
                    <span className="text-orange font-semibold">Included</span>
                  ) : (
                    <span className="text-charcoal/70 font-medium">
                      ${formatPrice(line.amount)}
                    </span>
                  )}
                </div>
              ))}
              <div className="flex justify-between pt-1.5 border-t border-cream-dark font-bold text-sm">
                <span className="text-navy">Total</span>
                <span className="text-navy">${formatPrice(selectedPrice)}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add-ons Section */}
      <div className="mb-6">
        <h3 className="font-display text-xs uppercase tracking-wide text-charcoal/60 mb-3">
          Add-ons
        </h3>
        <div className="space-y-2">
          {addonItems.map((addon) => {
            const isIncluded = isDeepClean && addon.includedInDeepClean;
            const displayPrice = isDeepClean
              ? addon.deepCleanPrice
              : addon.standardPrice;

            if (isIncluded) {
              return (
                <div
                  key={addon.id}
                  className="flex items-center justify-between p-3 border-2 rounded-lg bg-navy/5 border-navy/20"
                >
                  <div>
                    <span className="text-sm font-medium text-navy/60">
                      {addon.label}
                    </span>
                    <span className="block text-xs text-charcoal/40">
                      {addon.description}
                    </span>
                  </div>
                  <div className="text-right shrink-0 ml-3">
                    <span className="text-xs font-bold text-orange">
                      Included
                    </span>
                    <span className="block text-[10px] text-charcoal/40">
                      ${formatPrice(addon.includedValue)} value
                    </span>
                  </div>
                </div>
              );
            }

            return (
              <button
                key={addon.id}
                type="button"
                onClick={addon.onToggle}
                className={`w-full flex items-center justify-between p-3 border-2 rounded-lg transition-colors ${
                  addon.wanted
                    ? "border-orange bg-orange/5"
                    : "border-cream-dark bg-white hover:border-orange/50"
                }`}
              >
                <div className="text-left">
                  <span className="text-sm font-medium text-navy">
                    {addon.label}
                  </span>
                  <span className="block text-xs text-charcoal/50">
                    {addon.description}
                  </span>
                </div>
                <span className="text-sm text-charcoal/60 shrink-0 ml-3">
                  +${formatPrice(displayPrice)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Trust Signals */}
      <div className="p-4 bg-green-50/50 rounded-lg mb-8">
        <div className="flex flex-col gap-2 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-orange">&#10003;</span>
            <span className="text-charcoal/70">
              Video documentation of every vent
            </span>
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
      <div className="flex gap-4 items-center">
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
