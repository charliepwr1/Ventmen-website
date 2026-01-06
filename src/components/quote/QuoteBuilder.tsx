"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import type {
  QuoteData,
  PackagesConfig,
  AddonsConfig,
  TimeframeOption,
  Step,
} from "@/types";
import { calculateQuotePrice, formatPrice } from "@/lib/utils/pricing";
import { submitQuote, type QuoteSubmissionResult } from "@/app/quote/actions";
import { ProgressBar } from "@/components/ui";
import { Step1Home, Step2Package, Step3Addons, Step4Review } from "./steps";

interface QuoteBuilderProps {
  packages: PackagesConfig;
  addons: AddonsConfig;
  timeframeOptions: TimeframeOption[];
}

const STEP_LABELS = ["Your Home", "Package", "Add-Ons", "Review"];

const initialQuoteData: QuoteData = {
  houseType: "detached",
  vents: 15,
  furnaces: 1,
  hasHighEfficiency: false,
  hasAC: false,
  hasHRV: false,
  package: "pro",
  dryerVent: "none",
  sanitizing: false,
  humidifierService: false,
  timeframe: "",
  name: "",
  phone: "",
  email: "",
  address: "",
};

export default function QuoteBuilder({
  packages,
  addons,
  timeframeOptions,
}: QuoteBuilderProps) {
  const [step, setStep] = useState<Step>(1);
  const [data, setData] = useState<QuoteData>(initialQuoteData);
  const [isPending, startTransition] = useTransition();
  const [submitResult, setSubmitResult] =
    useState<QuoteSubmissionResult | null>(null);

  const updateData = (updates: Partial<QuoteData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  const goToStep = (targetStep: Step) => {
    setStep(targetStep);
  };

  const nextStep = () => {
    if (step < 4) setStep((step + 1) as Step);
  };

  const prevStep = () => {
    if (step > 1) setStep((step - 1) as Step);
  };

  const price = calculateQuotePrice(data);
  const formattedPrice = formatPrice(price);

  const handleSubmit = () => {
    startTransition(async () => {
      const result = await submitQuote(data);
      setSubmitResult(result);
    });
  };

  // Success state
  if (submitResult?.success) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="font-display text-2xl font-bold text-navy mb-4">
            Quote Submitted!
          </h1>
          <p className="text-charcoal/70 mb-2">{submitResult.message}</p>
          {submitResult.quoteId && (
            <p className="text-sm text-charcoal/50 mb-6">
              Reference: {submitResult.quoteId}
            </p>
          )}
          <div className="p-4 bg-white border border-cream-dark mb-6">
            <span className="text-sm text-charcoal/60">Your quote total</span>
            <span className="block font-display text-3xl font-bold text-orange">
              ${formattedPrice}
            </span>
            <span className="text-xs text-charcoal/40">+ GST</span>
          </div>
          <Link href="/" className="btn btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] flex flex-col">
      {/* Quote Header with Progress and Price */}
      <div className="py-4 px-6 border-b border-cream-dark bg-cream sticky top-0 z-40">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <div className="flex-1">
            <ProgressBar
              currentStep={step}
              totalSteps={4}
              stepLabels={STEP_LABELS}
            />
          </div>
          <div className="text-right shrink-0">
            <span className="text-xs text-charcoal/60 uppercase tracking-wide">
              Your estimate
            </span>
            <span className="block font-display text-2xl font-bold text-orange">
              ${formattedPrice}
            </span>
          </div>
        </div>
      </div>

      {/* Step Content */}
      <div className="flex-grow flex flex-col items-center px-4 py-8">
        {step === 1 && (
          <Step1Home data={data} updateData={updateData} onNext={nextStep} />
        )}

        {step === 2 && (
          <Step2Package
            data={data}
            updateData={updateData}
            packages={packages}
            addons={addons}
            onNext={nextStep}
            onBack={prevStep}
          />
        )}

        {step === 3 && (
          <Step3Addons
            data={data}
            updateData={updateData}
            addons={addons}
            onNext={nextStep}
            onBack={prevStep}
          />
        )}

        {step === 4 && (
          <Step4Review
            data={data}
            updateData={updateData}
            timeframeOptions={timeframeOptions}
            onEdit={() => goToStep(1)}
            onBack={prevStep}
            onSubmit={handleSubmit}
            isSubmitting={isPending}
            submitError={
              submitResult && !submitResult.success
                ? submitResult.message
                : undefined
            }
          />
        )}
      </div>
    </div>
  );
}
