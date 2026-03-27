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
import { ProgressBar, TrustBadges } from "@/components/ui";
import {
  Step1Home,
  Step2HomeDetails,
  Step3HomeFeatures,
  Step4Quote,
  Step5Book,
} from "./steps";

interface QuoteBuilderProps {
  packages: PackagesConfig;
  addons: AddonsConfig;
  timeframeOptions: TimeframeOption[];
}

const STEP_LABELS = ["Home Type", "Details", "Features", "Your Quote", "Book"];

const initialQuoteData: QuoteData = {
  // Step 1
  houseType: "detached",
  // Step 2
  vents: 25,
  furnaces: 1,
  hasAC: false,
  // Step 3
  hasHRV: false,
  dryerVentLocation: "none",
  hasHumidifier: false,
  hasCentralVac: false,
  // Step 4
  package: "deepclean",
  wantsHRV: false,
  wantsSanitizing: false,
  wantsDryerVent: false,
  wantsHumidifier: false,
  wantsCentralVac: false,
  // Step 5
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

  const nextStep = () => {
    if (step < 5) setStep((step + 1) as Step);
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
          <div className="p-4 bg-white border border-cream-dark rounded-lg mb-6">
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
              totalSteps={5}
              stepLabels={STEP_LABELS}
            />
          </div>
          {step >= 4 && (
            <div className="text-right shrink-0">
              <span className="text-xs text-charcoal/60 uppercase tracking-wide">
                Your estimate
              </span>
              <span className="block font-display text-2xl font-bold text-orange">
                ${formattedPrice}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Trust Badges (Steps 1-3 only, before price reveal) */}
      {step < 4 && (
        <div className="py-4 px-6 bg-white border-b border-cream-dark">
          <TrustBadges className="max-w-5xl mx-auto" />
        </div>
      )}

      {/* Step Content */}
      <div className="flex-grow flex flex-col items-center px-4 py-8">
        {step === 1 && (
          <Step1Home data={data} updateData={updateData} onNext={nextStep} />
        )}

        {step === 2 && (
          <Step2HomeDetails
            data={data}
            updateData={updateData}
            onNext={nextStep}
            onBack={prevStep}
          />
        )}

        {step === 3 && (
          <Step3HomeFeatures
            data={data}
            updateData={updateData}
            onNext={nextStep}
            onBack={prevStep}
          />
        )}

        {step === 4 && (
          <Step4Quote
            data={data}
            updateData={updateData}
            onNext={nextStep}
            onBack={prevStep}
          />
        )}

        {step === 5 && (
          <Step5Book
            data={data}
            updateData={updateData}
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
