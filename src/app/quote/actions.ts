"use server";

import { quoteSubmissionSchema } from "@/lib/validations";
import { calculateQuotePrice, formatPrice } from "@/lib/utils/pricing";
import { PACKAGES, ADDONS } from "@/lib/constants";
import { sendToZapierQuote } from "@/lib/zapier";
import type { QuoteData } from "@/types";

export interface QuoteSubmissionResult {
  success: boolean;
  message: string;
  quoteId?: string;
}

function buildQuoteDescription(data: QuoteData, price: number): string {
  const pkg = PACKAGES[data.package];
  const lines: string[] = [
    `Package: ${pkg.name} ($${formatPrice(pkg.price)})`,
    `House Type: ${data.houseType}`,
    `Vents: ${data.vents}`,
    `Furnaces: ${data.furnaces}`,
  ];

  if (data.hasAC) lines.push("A/C: Yes");
  if (data.hasHRV) lines.push("Has HRV: Yes");
  if (data.dryerVentLocation !== "none")
    lines.push(`Dryer Vent Location: ${data.dryerVentLocation}`);
  if (data.hasHumidifier) lines.push("Has Humidifier: Yes");
  if (data.hasCentralVac) lines.push("Has Central Vac: Yes");

  lines.push("");
  lines.push("Add-Ons Selected:");
  if (data.wantsHRV) lines.push(`  - ${ADDONS.hrv.label}`);
  if (data.wantsSanitizing) lines.push(`  - ${ADDONS.sanitizing.label}`);
  if (data.wantsDryerVent) {
    const dryerLabels: Record<string, string> = {
      ground: ADDONS.dryerGround.label,
      "second-floor": ADDONS.dryerSecondFloor.label,
      rooftop: ADDONS.dryerRooftop.label,
    };
    lines.push(`  - ${dryerLabels[data.dryerVentLocation] || "Dryer Vent"}`);
  }
  if (data.wantsHumidifier) lines.push(`  - ${ADDONS.humidifier.label}`);
  if (data.wantsCentralVac) lines.push(`  - ${ADDONS.centralVac.label}`);

  lines.push("");
  lines.push(`Quoted Price: $${formatPrice(price)} + GST`);
  lines.push(`Preferred Timeframe: ${data.timeframe}`);

  return lines.join("\n");
}

export async function submitQuote(
  data: QuoteData
): Promise<QuoteSubmissionResult> {
  try {
    const validatedData = quoteSubmissionSchema.safeParse(data);

    if (!validatedData.success) {
      const errorMessages = validatedData.error.issues
        .map((issue) => issue.message)
        .join(", ");
      return {
        success: false,
        message: `Validation failed: ${errorMessages}`,
      };
    }

    const d = validatedData.data;
    const calculatedPrice = calculateQuotePrice(d);
    const quoteId = `QT-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
    const pkg = PACKAGES[d.package];

    await sendToZapierQuote({
      first_name: d.name.split(" ")[0],
      last_name: d.name.split(" ").slice(1).join(" ") || "",
      email: d.email,
      phone: d.phone,
      address: d.address,
      request_title: `${pkg.name} | ${d.vents} Vents | $${formatPrice(calculatedPrice)} | ${d.timeframe}`,
      request_details: buildQuoteDescription(d, calculatedPrice),
      quote_id: quoteId,
      package: d.package,
      vents: d.vents,
      furnaces: d.furnaces,
      quoted_price: formatPrice(calculatedPrice),
      timeframe: d.timeframe,
      source: "website_quote_builder",
    });

    return {
      success: true,
      message:
        "Quote submitted successfully! We'll be in touch within 24 hours.",
      quoteId,
    };
  } catch (error) {
    console.error("Quote submission error:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again or call us directly.",
    };
  }
}
