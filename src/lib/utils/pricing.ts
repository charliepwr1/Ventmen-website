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
function calculatePriceForPackage(
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

export function formatPrice(price: number): string {
  return price.toFixed(2);
}
