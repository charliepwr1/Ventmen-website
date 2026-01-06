import type { Metadata } from "next";
import { QuoteBuilder } from "@/components/quote";
import { PACKAGES, ADDONS, TIMEFRAME_OPTIONS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Get a Quote",
  description:
    "Get an instant quote for duct cleaning in Calgary. Transparent pricing, no hidden fees. Choose your package and schedule your service today.",
};

export default function QuotePage() {
  return (
    <QuoteBuilder
      packages={PACKAGES}
      addons={ADDONS}
      timeframeOptions={TIMEFRAME_OPTIONS}
    />
  );
}
