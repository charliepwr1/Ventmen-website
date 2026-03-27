import type { QuoteData } from "@/types";
import { PACKAGES, ADDONS, INCLUDED_VENTS } from "@/lib/constants";
import { formatPrice } from "@/lib/utils/pricing";

interface QuoteSummaryProps {
  data: QuoteData;
  onEdit?: () => void;
}

interface LineItem {
  label: string;
  amount: number;
  isSubItem?: boolean;
}

export default function QuoteSummary({ data, onEdit }: QuoteSummaryProps) {
  const pkg = PACKAGES[data.package];
  const isDeepClean = data.package === "deepclean";
  const lineItems: LineItem[] = [];

  // Base package
  lineItems.push({ label: pkg.name, amount: pkg.price });

  // Extra vents
  if (data.vents > INCLUDED_VENTS) {
    const extraVents = data.vents - INCLUDED_VENTS;
    lineItems.push({
      label: `${data.vents} vents (${extraVents} extra x $${pkg.perVent})`,
      amount: extraVents * pkg.perVent,
      isSubItem: true,
    });
  }

  // AC surcharge
  if (data.hasAC) {
    lineItems.push({
      label: ADDONS.acSurcharge.label,
      amount: ADDONS.acSurcharge.price,
      isSubItem: true,
    });
  }

  // Extra furnaces
  if (data.furnaces > 1) {
    lineItems.push({
      label: `Additional furnace${data.furnaces > 2 ? "s" : ""} (${data.furnaces - 1})`,
      amount: (data.furnaces - 1) * ADDONS.secondFurnace.price,
      isSubItem: true,
    });
  }

  // HRV (included in Deep Clean)
  if (data.wantsHRV || isDeepClean) {
    lineItems.push({
      label: isDeepClean
        ? `${ADDONS.hrv.label} (included)`
        : ADDONS.hrv.label,
      amount: isDeepClean ? 0 : ADDONS.hrv.price,
    });
  }

  // Sanitizing (included in Deep Clean)
  if (data.wantsSanitizing || isDeepClean) {
    lineItems.push({
      label: isDeepClean
        ? `${ADDONS.sanitizing.label} (included)`
        : ADDONS.sanitizing.label,
      amount: isDeepClean ? 0 : ADDONS.sanitizing.price,
    });
  }

  // Dryer vent
  if (data.wantsDryerVent && data.dryerVentLocation !== "none") {
    const locationLabel =
      data.dryerVentLocation === "ground"
        ? "Main Floor"
        : data.dryerVentLocation === "second-floor"
          ? "2nd Floor"
          : "Rooftop";

    if (data.dryerVentLocation === "ground") {
      lineItems.push({
        label: isDeepClean
          ? `Dryer Vent - ${locationLabel} (included)`
          : `Dryer Vent - ${locationLabel}`,
        amount: isDeepClean ? 0 : ADDONS.dryerGround.price,
      });
    } else if (data.dryerVentLocation === "second-floor") {
      const price = isDeepClean
        ? ADDONS.dryerSecondFloor.price - ADDONS.dryerGround.price
        : ADDONS.dryerSecondFloor.price;
      lineItems.push({
        label: `Dryer Vent - ${locationLabel}${isDeepClean ? " (upgrade)" : ""}`,
        amount: price,
      });
    } else if (data.dryerVentLocation === "rooftop") {
      const price = isDeepClean
        ? ADDONS.dryerRooftop.price - ADDONS.dryerGround.price
        : ADDONS.dryerRooftop.price;
      lineItems.push({
        label: `Dryer Vent - ${locationLabel}${isDeepClean ? " (upgrade)" : ""}`,
        amount: price,
      });
    }
  }

  // Humidifier
  if (data.wantsHumidifier) {
    lineItems.push({
      label: ADDONS.humidifier.label,
      amount: ADDONS.humidifier.price,
    });
  }

  // Central vac
  if (data.wantsCentralVac) {
    lineItems.push({
      label: ADDONS.centralVac.label,
      amount: ADDONS.centralVac.price,
    });
  }

  const subtotal = lineItems.reduce((sum, item) => sum + item.amount, 0);
  const gst = subtotal * 0.05;
  const total = subtotal + gst;

  return (
    <div className="bg-white border border-cream-dark">
      <div className="p-4 border-b border-cream-dark">
        <h3 className="font-display text-sm uppercase tracking-wide text-charcoal/60">
          Your Quote
        </h3>
      </div>

      <div className="p-4 space-y-2">
        {lineItems.map((item, index) => (
          <div
            key={index}
            className={`flex justify-between text-sm ${
              item.isSubItem ? "pl-4 text-charcoal/60" : "text-navy"
            }`}
          >
            <span>{item.isSubItem ? `└ ${item.label}` : item.label}</span>
            <span>
              {item.amount > 0 ? `$${formatPrice(item.amount)}` : "Included"}
            </span>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-cream-dark space-y-1">
        <div className="flex justify-between text-sm text-charcoal/60">
          <span>Subtotal</span>
          <span>${formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm text-charcoal/60">
          <span>GST (5%)</span>
          <span>${formatPrice(gst)}</span>
        </div>
        <div className="flex justify-between font-display text-lg font-bold text-navy pt-2">
          <span>Total</span>
          <span className="text-orange">${formatPrice(total)}</span>
        </div>
      </div>

      {onEdit && (
        <div className="p-4 border-t border-cream-dark">
          <button
            type="button"
            onClick={onEdit}
            className="text-sm text-charcoal/60 hover:text-navy transition-colors underline"
          >
            Edit selections
          </button>
        </div>
      )}
    </div>
  );
}
