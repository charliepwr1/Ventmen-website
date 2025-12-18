import type { QuoteData } from "@/types";
import { PACKAGES, ADDONS, INCLUDED_VENTS } from "@/lib/constants";

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
  const lineItems: LineItem[] = [];

  // Base package
  lineItems.push({ label: `${pkg.name} Package`, amount: pkg.price });

  // Extra vents
  if (data.vents > INCLUDED_VENTS) {
    const extraVents = data.vents - INCLUDED_VENTS;
    lineItems.push({
      label: `${data.vents} vents (${extraVents} extra × $${pkg.perVent})`,
      amount: extraVents * pkg.perVent,
      isSubItem: true,
    });
  }

  // Bypass fee
  if (data.hasHighEfficiency || data.hasAC) {
    lineItems.push({
      label: "High-efficiency / A/C bypass",
      amount: ADDONS.bypass.price,
      isSubItem: true,
    });
  }

  // Extra furnaces
  if (data.furnaces > 1) {
    const furnacePrice =
      data.package === "fullservice"
        ? ADDONS.secondFurnaceHE.price
        : ADDONS.secondFurnace.price;
    lineItems.push({
      label: `Additional furnace${data.furnaces > 2 ? "s" : ""} (${data.furnaces - 1})`,
      amount: (data.furnaces - 1) * furnacePrice,
      isSubItem: true,
    });
  }

  // HRV
  if (data.hasHRV) {
    lineItems.push({
      label: ADDONS.hrv.label,
      amount: ADDONS.hrv.price,
    });
  }

  // Dryer vent
  if (data.dryerVent === "ground" && data.package !== "fullservice") {
    lineItems.push({
      label: ADDONS.dryerGround.label,
      amount: ADDONS.dryerGround.price,
    });
  } else if (data.dryerVent === "second-floor") {
    lineItems.push({
      label: ADDONS.dryerSecondFloor.label,
      amount: ADDONS.dryerSecondFloor.price,
    });
  } else if (data.dryerVent === "rooftop") {
    lineItems.push({
      label: ADDONS.dryerRooftop.label,
      amount: ADDONS.dryerRooftop.price,
    });
  } else if (data.dryerVent === "ground" && data.package === "fullservice") {
    lineItems.push({
      label: `${ADDONS.dryerGround.label} (included)`,
      amount: 0,
    });
  }

  // Sanitizing
  if (data.sanitizing) {
    lineItems.push({
      label: ADDONS.sanitizing.label,
      amount: ADDONS.sanitizing.price,
    });
  }

  // Humidifier
  if (data.humidifierService) {
    lineItems.push({
      label: ADDONS.humidifier.label,
      amount: ADDONS.humidifier.price,
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
              {item.amount > 0 ? `$${item.amount.toFixed(2)}` : "Included"}
            </span>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-cream-dark space-y-1">
        <div className="flex justify-between text-sm text-charcoal/60">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-charcoal/60">
          <span>GST (5%)</span>
          <span>${gst.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-display text-lg font-bold text-navy pt-2">
          <span>Total</span>
          <span className="text-orange">${total.toFixed(2)}</span>
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
