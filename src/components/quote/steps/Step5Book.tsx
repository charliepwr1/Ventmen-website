import type { QuoteData } from "@/types";
import { PACKAGES, TIMEFRAME_OPTIONS } from "@/lib/constants";
import { calculateQuotePrice, formatPrice } from "@/lib/utils/pricing";

interface Step5BookProps {
  data: QuoteData;
  updateData: (updates: Partial<QuoteData>) => void;
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  submitError?: string;
}

export default function Step5Book({
  data,
  updateData,
  onBack,
  onSubmit,
  isSubmitting,
  submitError,
}: Step5BookProps) {
  const price = calculateQuotePrice(data);
  const pkg = PACKAGES[data.package];
  const isFormValid =
    data.name && data.phone && data.email && data.address && data.timeframe;

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Sticky Quote Summary */}
      <div className="bg-navy text-white p-4 rounded-lg flex justify-between items-center mb-6">
        <div>
          <div className="text-xs opacity-60">{pkg.name}</div>
          <div className="text-xs opacity-40">
            {data.vents} vents, {data.furnaces} furnace{data.furnaces > 1 ? "s" : ""}
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-extrabold text-orange">
            ${formatPrice(price)}
          </div>
          <div className="text-[10px] opacity-50">+ GST</div>
        </div>
      </div>

      <h1 className="font-display text-2xl font-bold text-navy text-center mb-2">
        Almost there!
      </h1>
      <p className="text-charcoal/60 text-center text-sm mb-6">
        Tell us how to reach you and when works best
      </p>

      {/* Timeframe */}
      <div className="mb-6">
        <label className="block font-display text-xs uppercase tracking-wide text-charcoal/60 mb-2">
          When works for you?
        </label>
        <div className="space-y-2">
          {TIMEFRAME_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => updateData({ timeframe: option.value })}
              className={`w-full p-3 border-2 rounded-lg text-left transition-colors ${
                data.timeframe === option.value
                  ? "bg-navy text-white border-navy"
                  : "bg-white text-navy border-cream-dark hover:border-orange/50"
              }`}
            >
              <span className="font-display text-sm font-semibold">
                {option.label}
              </span>
              <span
                className={`block text-xs ${
                  data.timeframe === option.value
                    ? "text-white/60"
                    : "text-charcoal/50"
                }`}
              >
                {option.desc}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Contact Fields */}
      <div className="mb-6">
        <label className="block font-display text-xs uppercase tracking-wide text-charcoal/60 mb-2">
          Your information
        </label>
        <div className="space-y-3">
          <input
            type="text"
            value={data.name}
            onChange={(e) => updateData({ name: e.target.value })}
            placeholder="Your name"
            aria-label="Your name"
            className="w-full p-3 bg-white border-2 border-cream-dark rounded-lg text-navy placeholder:text-charcoal/40 focus:border-orange focus:outline-none transition-colors"
          />
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => updateData({ phone: e.target.value })}
            placeholder="(403) 555-0123"
            aria-label="Phone number"
            className="w-full p-3 bg-white border-2 border-cream-dark rounded-lg text-navy placeholder:text-charcoal/40 focus:border-orange focus:outline-none transition-colors"
          />
          <input
            type="email"
            value={data.email}
            onChange={(e) => updateData({ email: e.target.value })}
            placeholder="you@email.com"
            aria-label="Email address"
            className="w-full p-3 bg-white border-2 border-cream-dark rounded-lg text-navy placeholder:text-charcoal/40 focus:border-orange focus:outline-none transition-colors"
          />
          <input
            type="text"
            value={data.address}
            onChange={(e) => updateData({ address: e.target.value })}
            placeholder="123 Main St, Calgary"
            aria-label="Service address"
            className="w-full p-3 bg-white border-2 border-cream-dark rounded-lg text-navy placeholder:text-charcoal/40 focus:border-orange focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Trust Signals */}
      <div className="mb-6 flex flex-col gap-1.5 text-xs text-charcoal/60">
        <span className="flex items-center gap-2">
          <span className="text-orange">&#10003;</span> No payment required today
        </span>
        <span className="flex items-center gap-2">
          <span className="text-orange">&#10003;</span> We&apos;ll confirm within 24
          hours
        </span>
        <span className="flex items-center gap-2">
          <span className="text-orange">&#10003;</span> Price verified on-site before any
          work begins
        </span>
      </div>

      {/* Error */}
      {submitError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {submitError}
        </div>
      )}

      {/* Navigation */}
      <div className="flex gap-4 items-center">
        <button
          type="button"
          onClick={onBack}
          className="text-charcoal/60 hover:text-navy transition-colors text-sm"
        >
          &larr; Back
        </button>
        <button
          type="button"
          onClick={onSubmit}
          disabled={!isFormValid || isSubmitting}
          className="btn btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Submitting..." : "Submit Quote Request"}
        </button>
      </div>
    </div>
  );
}
