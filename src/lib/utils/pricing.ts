import type { QuoteData, PackageType } from "@/types";
import { PACKAGES, ADDONS, INCLUDED_VENTS } from "@/lib/constants";

/**
 * Calculate the total price for a specific package given the user's selections.
 * Used for the final quote and summary display.
 */
export function calculateQuotePrice(data: QuoteData): number {
  return calculatePriceForPackage(data, data.package);
}

/**
 * Calculate prices for BOTH packages simultaneously.
 * Used by Step 3 to show side-by-side comparison with real totals.
 */
export function calculateBothPackagePrices(data: QuoteData): {
  standard: number;
  deepClean: number;
} {
  return {
    standard: calculatePriceForPackage(data, "standard"),
    deepClean: calculatePriceForPackage(data, "deepclean"),
  };
}

/**
 * Core pricing engine. Calculates total for a given package type
 * using the user's home info and add-on selections.
 */
export function calculatePriceForPackage(
  data: QuoteData,
  pkg: PackageType
): number {
  const pkgConfig = PACKAGES[pkg];
  const isDeepClean = pkg === "deepclean";
  let total = pkgConfig.price;

  // Extra vents over included amount
  if (data.vents > INCLUDED_VENTS) {
    total += (data.vents - INCLUDED_VENTS) * pkgConfig.perVent;
  }

  // AC surcharge
  if (data.hasAC) {
    total += ADDONS.acSurcharge.price;
  }

  // Additional furnaces
  if (data.furnaces > 1) {
    total += (data.furnaces - 1) * ADDONS.secondFurnace.price;
  }

  // HRV cleaning: included in Deep Clean, add-on for Standard
  if (data.wantsHRV && !isDeepClean) {
    total += ADDONS.hrv.price;
  }

  // Sanitizing: included in Deep Clean, add-on for Standard
  if (data.wantsSanitizing && !isDeepClean) {
    total += ADDONS.sanitizing.price;
  }

  // Dryer vent cleaning
  if (data.wantsDryerVent && data.dryerVentLocation !== "none") {
    if (data.dryerVentLocation === "ground") {
      // Main floor: included in Deep Clean, add-on for Standard
      if (!isDeepClean) {
        total += ADDONS.dryerGround.price;
      }
    } else if (data.dryerVentLocation === "second-floor") {
      // 2nd floor: Deep Clean pays upgrade difference, Standard pays full price
      total += isDeepClean
        ? ADDONS.dryerSecondFloor.price - ADDONS.dryerGround.price
        : ADDONS.dryerSecondFloor.price;
    } else if (data.dryerVentLocation === "rooftop") {
      // Rooftop: Deep Clean pays upgrade difference, Standard pays full price
      total += isDeepClean
        ? ADDONS.dryerRooftop.price - ADDONS.dryerGround.price
        : ADDONS.dryerRooftop.price;
    }
  }

  // Humidifier pad replacement: same price for both packages
  if (data.wantsHumidifier) {
    total += ADDONS.humidifier.price;
  }

  // Central vacuum cleaning: same price for both packages
  if (data.wantsCentralVac) {
    total += ADDONS.centralVac.price;
  }

  return total;
}

/**
 * Calculate the decoy comparison: what Standard would cost if the customer
 * added all the extras that Deep Clean includes for free.
 * Used by Step 4 to render the value callout and strikethrough comparison.
 */
export function calculateDecoySavings(data: QuoteData): {
  standardWithAddons: number;
  deepClean: number;
  savings: number;
  includedExtrasValue: number;
  decoyLabel: string;
} {
  // Deep Clean total as-is (pricing engine handles inclusions)
  const deepClean = calculatePriceForPackage(data, "deepclean");

  // Base Standard price: vents + AC + furnaces only, no add-ons
  const baseStandard = calculatePriceForPackage(
    { ...data, wantsHRV: false, wantsSanitizing: false, wantsDryerVent: false, wantsHumidifier: false, wantsCentralVac: false },
    "standard"
  );

  // Calculate what Deep Clean-included extras would cost a la carte on Standard
  let includedExtrasValue = 0;
  const decoyParts: string[] = [];

  if (data.hasHRV) {
    includedExtrasValue += ADDONS.hrv.price;
    decoyParts.push("HRV");
  }

  // Sanitizing always counts -- everyone benefits
  includedExtrasValue += ADDONS.sanitizing.price;
  decoyParts.push("sanitizing");

  if (data.dryerVentLocation !== "none") {
    const dryerPrice =
      data.dryerVentLocation === "ground"
        ? ADDONS.dryerGround.price
        : data.dryerVentLocation === "second-floor"
          ? ADDONS.dryerSecondFloor.price
          : ADDONS.dryerRooftop.price;
    includedExtrasValue += dryerPrice;
    decoyParts.push("dryer vent");
  }

  // No shared add-ons (humidifier/centralVac) -- they're the same price
  // for both packages and cancel out in the savings math
  const standardWithAddons = baseStandard + includedExtrasValue;

  return {
    standardWithAddons,
    deepClean,
    savings: standardWithAddons - deepClean,
    includedExtrasValue,
    decoyLabel: decoyParts.join(" + "),
  };
}

export function formatPrice(price: number): string {
  return price.toFixed(2);
}
