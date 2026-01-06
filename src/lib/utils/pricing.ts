import type { QuoteData } from "@/types";
import { PACKAGES, ADDONS, INCLUDED_VENTS } from "@/lib/constants";

export function calculateQuotePrice(data: QuoteData): number {
  const pkg = PACKAGES[data.package];
  let total = pkg.price;

  // Extra vents (over included amount)
  if (data.vents > INCLUDED_VENTS) {
    total += (data.vents - INCLUDED_VENTS) * pkg.perVent;
  }

  // Bypass fee for high-efficiency furnace or A/C (only charge once)
  if (data.hasHighEfficiency || data.hasAC) {
    total += ADDONS.bypass.price;
  }

  // Second furnace (Full Service uses higher price)
  if (data.furnaces > 1) {
    const furnacePrice =
      data.package === "fullservice"
        ? ADDONS.secondFurnaceHE.price
        : ADDONS.secondFurnace.price;
    total += (data.furnaces - 1) * furnacePrice;
  }

  // HRV cleaning
  if (data.hasHRV) {
    total += ADDONS.hrv.price;
  }

  // Dryer vent (ground included in Full Service package)
  if (data.dryerVent === "ground" && data.package !== "fullservice") {
    total += ADDONS.dryerGround.price;
  } else if (data.dryerVent === "second-floor") {
    total += ADDONS.dryerSecondFloor.price;
  } else if (data.dryerVent === "rooftop") {
    total += ADDONS.dryerRooftop.price;
  }

  // Other add-ons
  if (data.sanitizing) total += ADDONS.sanitizing.price;
  if (data.humidifierService) total += ADDONS.humidifier.price;

  return total;
}

export function formatPrice(price: number): string {
  return price.toFixed(2);
}
