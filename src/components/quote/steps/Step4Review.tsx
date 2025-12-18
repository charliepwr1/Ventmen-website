import type { QuoteData, TimeframeOption } from "@/types";
import QuoteSummary from "../QuoteSummary";

interface Step4ReviewProps {
  data: QuoteData;
  updateData: (updates: Partial<QuoteData>) => void;
  timeframeOptions: TimeframeOption[];
  onEdit: () => void;
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  submitError?: string;
}

export default function Step4Review({
  data,
  updateData,
  timeframeOptions,
  onEdit,
  onBack,
  onSubmit,
  isSubmitting,
  submitError,
}: Step4ReviewProps) {
  const isFormValid =
    data.name && data.phone && data.email && data.address && data.timeframe;

  return (
    <div className="w-full max-w-lg mx-auto">
      <h1 className="font-display text-2xl font-bold text-navy text-center mb-6">
        Review Your Quote
      </h1>

      {/* Quote Summary */}
      <div className="mb-6">
        <QuoteSummary data={data} onEdit={onEdit} />
      </div>

      {/* Timeframe Selection */}
      <div className="mb-6">
        <label className="block font-display text-xs uppercase tracking-wide text-charcoal/60 mb-2">
          When works for you?
        </label>
        <div className="space-y-2">
          {timeframeOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => updateData({ timeframe: option.value })}
              className={`w-full p-3 border text-left transition-colors ${
                data.timeframe === option.value
                  ? "bg-navy text-white border-navy"
                  : "bg-white text-navy border-cream-dark hover:border-orange"
              }`}
            >
              <span className="font-display uppercase tracking-wide text-sm">
                {option.label}
              </span>
              <span
                className={`block text-xs ${
                  data.timeframe === option.value
                    ? "text-white/70"
                    : "text-charcoal/60"
                }`}
              >
                {option.desc}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Contact Form */}
      <div className="mb-6">
        <label className="block font-display text-xs uppercase tracking-wide text-charcoal/60 mb-2">
          Your Information
        </label>
        <div className="space-y-3">
          <input
            type="text"
            value={data.name}
            onChange={(e) => updateData({ name: e.target.value })}
            placeholder="Your name"
            aria-label="Your name"
            className="w-full p-3 bg-white border border-cream-dark text-navy placeholder:text-charcoal/40 focus:border-orange focus:outline-none transition-colors"
          />
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => updateData({ phone: e.target.value })}
            placeholder="(403) 555-0123"
            aria-label="Phone number"
            className="w-full p-3 bg-white border border-cream-dark text-navy placeholder:text-charcoal/40 focus:border-orange focus:outline-none transition-colors"
          />
          <input
            type="email"
            value={data.email}
            onChange={(e) => updateData({ email: e.target.value })}
            placeholder="you@email.com"
            aria-label="Email address"
            className="w-full p-3 bg-white border border-cream-dark text-navy placeholder:text-charcoal/40 focus:border-orange focus:outline-none transition-colors"
          />
          <input
            type="text"
            value={data.address}
            onChange={(e) => updateData({ address: e.target.value })}
            placeholder="123 Main St, Calgary"
            aria-label="Service address"
            className="w-full p-3 bg-white border border-cream-dark text-navy placeholder:text-charcoal/40 focus:border-orange focus:outline-none transition-colors"
          />
        </div>
        <p className="text-xs text-charcoal/50 mt-2">
          We&apos;ll reach out to confirm your appointment
        </p>
      </div>

      {/* Trust Signals */}
      <div className="mb-6 flex flex-col gap-1 text-xs text-charcoal/60">
        <span className="flex items-center gap-2">
          <span className="text-orange">✓</span> Video verification included
        </span>
        <span className="flex items-center gap-2">
          <span className="text-orange">✓</span> No payment required today
        </span>
        <span className="flex items-center gap-2">
          <span className="text-orange">✓</span> Price confirmed after
          inspection
        </span>
      </div>

      {/* Error Message */}
      {submitError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm">
          {submitError}
        </div>
      )}

      {/* Navigation */}
      <div className="flex gap-4">
        <button
          type="button"
          onClick={onBack}
          className="text-charcoal/60 hover:text-navy transition-colors text-sm"
        >
          ← Back
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
