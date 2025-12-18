# Quote Builder 4-Step Wizard Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Refactor the quote builder from a 3-step single-component flow to a research-backed 4-step wizard with reusable UI components.

**Architecture:** Break the monolithic QuoteBuilder into composable step components with shared state via React context or prop drilling. Create reusable UI primitives (VisualSelector, Stepper, ProgressBar, ExpandableSection) that match the design spec.

**Tech Stack:** Next.js 14, React, TypeScript, Tailwind CSS

---

## Task 1: Update Types for House Type

**Files:**
- Modify: `src/types/quote.ts`

**Step 1: Add house type to types**

Add the new type and update QuoteData:

```typescript
// Add after line 7 (after TimeframeType)
export type HouseType = "apartment" | "townhome" | "detached";

// Update QuoteData interface to include houseType as first field
export interface QuoteData {
  // Step 1: Home basics
  houseType: HouseType;
  vents: number;
  furnaces: number;
  hasHighEfficiency: boolean;
  hasAC: boolean;
  hasHRV: boolean;

  // Step 2: Package
  package: PackageType;

  // Step 3: Add-ons
  dryerVent: DryerVentType;
  sanitizing: boolean;
  humidifierService: boolean;

  // Step 4: Contact
  timeframe: TimeframeType | "";
  name: string;
  phone: string;
  email: string;
  address: string;
}
```

**Step 2: Update Step type**

Change from 3 steps to 4:

```typescript
export type Step = 1 | 2 | 3 | 4;
```

**Step 3: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: Errors about missing `houseType` property (we'll fix in later tasks)

**Step 4: Commit**

```bash
git add src/types/quote.ts
git commit -m "feat(types): add HouseType and update QuoteData for 4-step wizard"
```

---

## Task 2: Add House Type Constants

**Files:**
- Modify: `src/lib/constants/pricing.ts`

**Step 1: Add house type configuration with default vents**

Add after TIMEFRAME_OPTIONS:

```typescript
export interface HouseTypeConfig {
  label: string;
  icon: string;
  defaultVents: number;
}

export const HOUSE_TYPES: Record<HouseType, HouseTypeConfig> = {
  apartment: {
    label: "Apartment / Condo",
    icon: "building",
    defaultVents: 8,
  },
  townhome: {
    label: "Townhome / Duplex",
    icon: "townhouse",
    defaultVents: 12,
  },
  detached: {
    label: "Detached House",
    icon: "house",
    defaultVents: 15,
  },
};
```

**Step 2: Add import for HouseType**

Update import at top of file:

```typescript
import type { PackagesConfig, AddonsConfig, TimeframeOption, HouseType } from "@/types";
```

**Step 3: Export from index**

File `src/lib/constants/index.ts` already exports everything, so no change needed.

**Step 4: Verify TypeScript compiles**

Run: `npx tsc --noEmit`

**Step 5: Commit**

```bash
git add src/lib/constants/pricing.ts
git commit -m "feat(constants): add house type configuration with default vents"
```

---

## Task 3: Create ProgressBar Component

**Files:**
- Create: `src/components/ui/ProgressBar.tsx`
- Create: `src/components/ui/index.ts`

**Step 1: Create the ProgressBar component**

```typescript
// src/components/ui/ProgressBar.tsx
interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
}

export default function ProgressBar({
  currentStep,
  totalSteps,
  stepLabels,
}: ProgressBarProps) {
  return (
    <div className="w-full">
      {/* Mobile: Simple text */}
      <div className="sm:hidden text-center">
        <span className="text-sm text-charcoal/60">
          Step {currentStep} of {totalSteps}:{" "}
          <span className="text-navy font-medium">{stepLabels[currentStep - 1]}</span>
        </span>
      </div>

      {/* Desktop: Full progress bar */}
      <div className="hidden sm:flex items-center justify-center gap-2">
        {stepLabels.map((label, index) => {
          const stepNum = index + 1;
          const isCompleted = stepNum < currentStep;
          const isCurrent = stepNum === currentStep;

          return (
            <div key={label} className="flex items-center">
              {/* Step indicator */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                    isCompleted
                      ? "bg-orange text-white"
                      : isCurrent
                      ? "bg-navy text-white"
                      : "bg-cream-dark text-charcoal/50"
                  }`}
                >
                  {isCompleted ? "✓" : stepNum}
                </div>
                <span
                  className={`text-xs mt-1 ${
                    isCurrent ? "text-navy font-medium" : "text-charcoal/50"
                  }`}
                >
                  {label}
                </span>
              </div>

              {/* Connector line (not after last step) */}
              {index < totalSteps - 1 && (
                <div
                  className={`w-12 h-0.5 mx-2 ${
                    isCompleted ? "bg-orange" : "bg-cream-dark"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
```

**Step 2: Create UI index export**

```typescript
// src/components/ui/index.ts
export { default as ProgressBar } from "./ProgressBar";
```

**Step 3: Verify component renders**

Run: `npm run dev`
(We'll integrate into QuoteBuilder in a later task)

**Step 4: Commit**

```bash
git add src/components/ui/
git commit -m "feat(ui): create ProgressBar component for multi-step wizard"
```

---

## Task 4: Create VisualSelector Component

**Files:**
- Create: `src/components/ui/VisualSelector.tsx`
- Modify: `src/components/ui/index.ts`

**Step 1: Create the VisualSelector component**

```typescript
// src/components/ui/VisualSelector.tsx
import { ReactNode } from "react";

interface VisualSelectorOption<T extends string> {
  value: T;
  label: string;
  icon: ReactNode;
  description?: string;
}

interface VisualSelectorProps<T extends string> {
  options: VisualSelectorOption<T>[];
  value: T;
  onChange: (value: T) => void;
  columns?: 2 | 3;
}

export default function VisualSelector<T extends string>({
  options,
  value,
  onChange,
  columns = 3,
}: VisualSelectorProps<T>) {
  return (
    <div
      className={`grid gap-3 ${
        columns === 2 ? "grid-cols-2" : "grid-cols-1 sm:grid-cols-3"
      }`}
    >
      {options.map((option) => {
        const isSelected = value === option.value;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`p-4 border-2 transition-all text-center ${
              isSelected
                ? "border-orange bg-white shadow-md scale-[1.02]"
                : "border-cream-dark bg-white hover:border-orange/50"
            }`}
          >
            <div className="text-3xl mb-2">{option.icon}</div>
            <div className="font-display text-sm uppercase tracking-wide text-navy">
              {option.label}
            </div>
            {option.description && (
              <div className="text-xs text-charcoal/50 mt-1">
                {option.description}
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
```

**Step 2: Export from index**

```typescript
// src/components/ui/index.ts
export { default as ProgressBar } from "./ProgressBar";
export { default as VisualSelector } from "./VisualSelector";
```

**Step 3: Commit**

```bash
git add src/components/ui/
git commit -m "feat(ui): create VisualSelector component for house type selection"
```

---

## Task 5: Create Stepper Component

**Files:**
- Create: `src/components/ui/Stepper.tsx`
- Modify: `src/components/ui/index.ts`

**Step 1: Create the Stepper component**

```typescript
// src/components/ui/Stepper.tsx
interface StepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  label: string;
  helperText?: string;
}

export default function Stepper({
  value,
  onChange,
  min = 1,
  max = 50,
  label,
  helperText,
}: StepperProps) {
  const decrement = () => {
    if (value > min) onChange(value - 1);
  };

  const increment = () => {
    if (value < max) onChange(value + 1);
  };

  return (
    <div>
      <label className="block font-display text-xs uppercase tracking-wide text-charcoal/60 mb-2">
        {label}
      </label>
      <div className="flex items-center gap-3 bg-white border border-cream-dark p-3">
        <button
          type="button"
          onClick={decrement}
          disabled={value <= min}
          className="w-10 h-10 bg-cream text-navy font-bold text-xl hover:bg-orange hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          −
        </button>
        <span className="font-display text-2xl font-bold text-navy flex-1 text-center">
          {value}
        </span>
        <button
          type="button"
          onClick={increment}
          disabled={value >= max}
          className="w-10 h-10 bg-cream text-navy font-bold text-xl hover:bg-orange hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          +
        </button>
        {helperText && (
          <span className="text-xs text-charcoal/50 w-24">{helperText}</span>
        )}
      </div>
    </div>
  );
}
```

**Step 2: Export from index**

```typescript
// src/components/ui/index.ts
export { default as ProgressBar } from "./ProgressBar";
export { default as VisualSelector } from "./VisualSelector";
export { default as Stepper } from "./Stepper";
```

**Step 3: Commit**

```bash
git add src/components/ui/
git commit -m "feat(ui): create Stepper component for vent count input"
```

---

## Task 6: Create ExpandableSection Component

**Files:**
- Create: `src/components/ui/ExpandableSection.tsx`
- Modify: `src/components/ui/index.ts`

**Step 1: Create the ExpandableSection component**

```typescript
// src/components/ui/ExpandableSection.tsx
"use client";

import { useState, ReactNode } from "react";

interface ExpandableSectionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export default function ExpandableSection({
  title,
  children,
  defaultOpen = false,
}: ExpandableSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-t border-cream-dark">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-3 px-4 flex items-center justify-between text-sm text-charcoal/70 hover:text-navy transition-colors"
      >
        <span>{title}</span>
        <span
          className={`transform transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>
      {isOpen && (
        <div className="px-4 pb-4 text-sm text-charcoal/70">{children}</div>
      )}
    </div>
  );
}
```

**Step 2: Export from index**

```typescript
// src/components/ui/index.ts
export { default as ProgressBar } from "./ProgressBar";
export { default as VisualSelector } from "./VisualSelector";
export { default as Stepper } from "./Stepper";
export { default as ExpandableSection } from "./ExpandableSection";
```

**Step 3: Commit**

```bash
git add src/components/ui/
git commit -m "feat(ui): create ExpandableSection component for learn more content"
```

---

## Task 7: Create ToggleCard Component

**Files:**
- Create: `src/components/ui/ToggleCard.tsx`
- Modify: `src/components/ui/index.ts`

**Step 1: Create the ToggleCard component**

```typescript
// src/components/ui/ToggleCard.tsx
import { ReactNode } from "react";

interface ToggleCardProps {
  selected: boolean;
  onClick: () => void;
  children: ReactNode;
  price?: string;
  tooltip?: string;
}

export default function ToggleCard({
  selected,
  onClick,
  children,
  price,
  tooltip,
}: ToggleCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full p-3 border text-left transition-colors flex items-center justify-between text-sm ${
        selected
          ? "bg-navy text-white border-navy"
          : "bg-white text-navy border-cream-dark hover:border-orange"
      }`}
    >
      <div className="flex items-center gap-2">
        <span>{children}</span>
        {tooltip && (
          <span
            className={`text-xs ${selected ? "text-white/60" : "text-charcoal/40"}`}
            title={tooltip}
          >
            ?
          </span>
        )}
      </div>
      {price && (
        <span className={selected ? "text-white/70" : "text-charcoal/50"}>
          {price}
        </span>
      )}
    </button>
  );
}
```

**Step 2: Export from index**

```typescript
// src/components/ui/index.ts
export { default as ProgressBar } from "./ProgressBar";
export { default as VisualSelector } from "./VisualSelector";
export { default as Stepper } from "./Stepper";
export { default as ExpandableSection } from "./ExpandableSection";
export { default as ToggleCard } from "./ToggleCard";
```

**Step 3: Commit**

```bash
git add src/components/ui/
git commit -m "feat(ui): create ToggleCard component for home features toggles"
```

---

## Task 8: Create QuoteSummary Component

**Files:**
- Create: `src/components/quote/QuoteSummary.tsx`
- Modify: `src/components/quote/index.ts`

**Step 1: Create the QuoteSummary component**

```typescript
// src/components/quote/QuoteSummary.tsx
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
```

**Step 2: Export from index**

```typescript
// src/components/quote/index.ts
export { default as QuoteBuilder } from "./QuoteBuilder";
export { default as QuoteSummary } from "./QuoteSummary";
```

**Step 3: Commit**

```bash
git add src/components/quote/
git commit -m "feat(quote): create QuoteSummary component with itemized breakdown"
```

---

## Task 9: Create Step Components Structure

**Files:**
- Create: `src/components/quote/steps/Step1Home.tsx`
- Create: `src/components/quote/steps/Step2Package.tsx`
- Create: `src/components/quote/steps/Step3Addons.tsx`
- Create: `src/components/quote/steps/Step4Review.tsx`
- Create: `src/components/quote/steps/index.ts`

**Step 1: Create Step1Home component**

```typescript
// src/components/quote/steps/Step1Home.tsx
import type { QuoteData, HouseType } from "@/types";
import { HOUSE_TYPES, INCLUDED_VENTS, ADDONS } from "@/lib/constants";
import { VisualSelector, Stepper, ToggleCard } from "@/components/ui";

interface Step1HomeProps {
  data: QuoteData;
  updateData: (updates: Partial<QuoteData>) => void;
  onNext: () => void;
}

const houseTypeOptions = (Object.keys(HOUSE_TYPES) as HouseType[]).map(
  (key) => ({
    value: key,
    label: HOUSE_TYPES[key].label,
    icon: key === "apartment" ? "🏢" : key === "townhome" ? "🏘️" : "🏠",
  })
);

export default function Step1Home({
  data,
  updateData,
  onNext,
}: Step1HomeProps) {
  const handleHouseTypeChange = (type: HouseType) => {
    const config = HOUSE_TYPES[type];
    updateData({
      houseType: type,
      vents: config.defaultVents,
    });
  };

  const ventHelperText =
    data.vents <= INCLUDED_VENTS
      ? `${INCLUDED_VENTS} included`
      : `+${data.vents - INCLUDED_VENTS} extra`;

  return (
    <div className="w-full max-w-lg mx-auto">
      <h1 className="font-display text-2xl font-bold text-navy text-center mb-6">
        Tell Us About Your Home
      </h1>

      {/* House Type */}
      <div className="mb-6">
        <label className="block font-display text-xs uppercase tracking-wide text-charcoal/60 mb-2">
          Type of Home
        </label>
        <VisualSelector
          options={houseTypeOptions}
          value={data.houseType}
          onChange={handleHouseTypeChange}
        />
      </div>

      {/* Number of Vents */}
      <div className="mb-6">
        <Stepper
          label="Number of Vents"
          value={data.vents}
          onChange={(vents) => updateData({ vents })}
          min={1}
          max={50}
          helperText={ventHelperText}
        />
      </div>

      {/* Number of Furnaces */}
      <div className="mb-6">
        <label className="block font-display text-xs uppercase tracking-wide text-charcoal/60 mb-2">
          Number of Furnaces
        </label>
        <div className="flex gap-2">
          {[1, 2, 3].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => updateData({ furnaces: num })}
              className={`flex-1 py-3 border transition-colors font-bold ${
                data.furnaces === num
                  ? "bg-navy text-white border-navy"
                  : "bg-white text-navy border-cream-dark hover:border-orange"
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      {/* Home Features */}
      <div className="mb-6">
        <label className="block font-display text-xs uppercase tracking-wide text-charcoal/60 mb-2">
          Home Features
        </label>
        <div className="space-y-2">
          <ToggleCard
            selected={data.hasHighEfficiency}
            onClick={() =>
              updateData({ hasHighEfficiency: !data.hasHighEfficiency })
            }
            price={data.hasHighEfficiency ? `+$${ADDONS.bypass.price}` : undefined}
            tooltip="High-efficiency furnaces require bypass cleaning"
          >
            High-efficiency furnace
          </ToggleCard>

          <ToggleCard
            selected={data.hasAC}
            onClick={() => updateData({ hasAC: !data.hasAC })}
            price={!data.hasHighEfficiency && data.hasAC ? `+$${ADDONS.bypass.price}` : undefined}
            tooltip="Central A/C requires bypass cleaning"
          >
            Central A/C
          </ToggleCard>

          <ToggleCard
            selected={data.hasHRV}
            onClick={() => updateData({ hasHRV: !data.hasHRV })}
            price={data.hasHRV ? `+$${ADDONS.hrv.price}` : undefined}
            tooltip="Heat Recovery Ventilator cleaning"
          >
            HRV (Heat Recovery Ventilator)
          </ToggleCard>
        </div>
      </div>

      <button type="button" onClick={onNext} className="btn btn-primary w-full">
        Continue
      </button>
    </div>
  );
}
```

**Step 2: Create Step2Package component**

```typescript
// src/components/quote/steps/Step2Package.tsx
import type { QuoteData, PackageType, PackagesConfig, AddonsConfig } from "@/types";
import { INCLUDED_VENTS } from "@/lib/constants";
import { ExpandableSection } from "@/components/ui";

interface Step2PackageProps {
  data: QuoteData;
  updateData: (updates: Partial<QuoteData>) => void;
  packages: PackagesConfig;
  addons: AddonsConfig;
  onNext: () => void;
  onBack: () => void;
}

export default function Step2Package({
  data,
  updateData,
  packages,
  addons,
  onNext,
  onBack,
}: Step2PackageProps) {
  return (
    <div className="w-full max-w-5xl mx-auto">
      <h1 className="font-display text-2xl font-bold text-navy text-center mb-6">
        Choose Your Package
      </h1>

      {/* Package Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {(Object.keys(packages) as PackageType[]).map((key) => {
          const pkg = packages[key];
          const isSelected = data.package === key;
          const isPro = key === "pro";
          const isFullService = key === "fullservice";

          return (
            <button
              key={key}
              type="button"
              onClick={() => updateData({ package: key })}
              className={`text-left transition-all border-2 bg-white relative ${
                isSelected
                  ? "border-orange shadow-lg scale-[1.02]"
                  : "border-gray-200 hover:border-orange/50"
              } ${isPro ? "md:-mt-2 md:mb-2" : ""}`}
            >
              {/* Most Popular Badge */}
              {isPro && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange text-white text-xs font-bold uppercase px-3 py-1">
                  Most Popular
                </div>
              )}

              {/* Header */}
              <div
                className={`p-4 text-center ${
                  isFullService
                    ? "bg-orange text-white"
                    : isPro
                    ? "bg-navy text-white"
                    : "bg-gray-100 text-navy"
                }`}
              >
                <h3 className="font-display text-xl font-bold uppercase">
                  {pkg.name}
                </h3>
                <p
                  className={`text-sm ${
                    isFullService || isPro ? "text-white/80" : "text-charcoal/60"
                  }`}
                >
                  {pkg.tagline}
                </p>
              </div>

              {/* Price */}
              <div className="p-4 text-center border-b border-gray-100">
                <span className="text-orange font-display text-4xl font-bold">
                  ${pkg.price.toFixed(2).split(".")[0]}
                </span>
                <span className="text-orange font-display text-xl">
                  .{pkg.price.toFixed(2).split(".")[1]}
                </span>
                <span className="text-charcoal/50 text-sm ml-1">+ GST</span>
              </div>

              {/* Features List */}
              <div className="p-4 space-y-2 text-sm">
                <div className="flex items-start gap-2 text-charcoal/70">
                  <span className="text-orange mt-0.5">⊕</span>
                  <span>
                    {INCLUDED_VENTS} vents included, then ${pkg.perVent}/vent
                  </span>
                </div>

                <div className="flex items-start gap-2 text-charcoal/70">
                  <span className="text-orange mt-0.5">⟳</span>
                  <span>
                    High-efficiency or A/C Bypass: ${addons.bypass.price}
                  </span>
                </div>

                {pkg.features.slice(1).map((feature, idx) => {
                  const isHighlighted =
                    (key === "pro" &&
                      feature.toLowerCase().includes("rotary brush")) ||
                    (key === "fullservice" &&
                      (feature.toLowerCase().includes("octopus") ||
                        feature.toLowerCase().includes("fresh air") ||
                        feature.toLowerCase().includes("dryer") ||
                        feature.toLowerCase().includes("total care")));

                  return (
                    <div key={idx} className="flex items-start gap-2">
                      <span
                        className={`mt-0.5 ${
                          isHighlighted ? "text-orange" : "text-charcoal/40"
                        }`}
                      >
                        ✓
                      </span>
                      <span
                        className={
                          isHighlighted
                            ? "text-navy font-medium"
                            : "text-charcoal/70"
                        }
                      >
                        {feature}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Learn More */}
              <ExpandableSection title="Learn more">
                <p>
                  {key === "basic" &&
                    "Our Basic package is perfect for routine maintenance of homes that are cleaned regularly. Includes high-pressure air cleaning of all ducts and vents."}
                  {key === "pro" &&
                    "The Pro package adds high-speed rotary brush cleaning, which is essential for homes with pets, allergies, or recent renovations. This physically scrubs the duct walls for a deeper clean."}
                  {key === "fullservice" &&
                    "Our Complete Care package includes everything plus reverse octopus whip cleaning, fresh air intake cleaning, ground floor dryer vent, and a 2-year Total Care Plan with priority scheduling."}
                </p>
              </ExpandableSection>

              {/* Selected indicator */}
              {isSelected && (
                <div className="bg-orange text-white text-center py-2 text-sm font-bold uppercase">
                  Selected
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Navigation */}
      <div className="max-w-lg mx-auto flex gap-4">
        <button
          type="button"
          onClick={onBack}
          className="text-charcoal/60 hover:text-navy transition-colors text-sm"
        >
          ← Back
        </button>
        <button
          type="button"
          onClick={onNext}
          className="btn btn-primary flex-1"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
```

**Step 3: Create Step3Addons component**

```typescript
// src/components/quote/steps/Step3Addons.tsx
import type { QuoteData, DryerVentType, AddonsConfig } from "@/types";
import { ExpandableSection } from "@/components/ui";

interface Step3AddonsProps {
  data: QuoteData;
  updateData: (updates: Partial<QuoteData>) => void;
  addons: AddonsConfig;
  onNext: () => void;
  onBack: () => void;
}

export default function Step3Addons({
  data,
  updateData,
  addons,
  onNext,
  onBack,
}: Step3AddonsProps) {
  const dryerVentOptions: {
    value: DryerVentType;
    label: string;
    price: number;
  }[] = [
    { value: "none", label: "None", price: 0 },
    {
      value: "ground",
      label: "Ground Level",
      price: data.package === "fullservice" ? 0 : addons.dryerGround.price,
    },
    { value: "second-floor", label: "2nd Floor", price: addons.dryerSecondFloor.price },
    { value: "rooftop", label: "Rooftop", price: addons.dryerRooftop.price },
  ];

  // Recommendation logic based on home info
  const showSanitizingRecommendation = true; // Could be based on pets, allergies, etc.

  return (
    <div className="w-full max-w-lg mx-auto">
      <h1 className="font-display text-2xl font-bold text-navy text-center mb-6">
        Enhance Your Service
      </h1>

      {/* Recommended Section */}
      {showSanitizingRecommendation && !data.sanitizing && (
        <div className="mb-6 p-4 border-2 border-orange/30 bg-orange/5">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-orange">⭐</span>
            <span className="font-display text-sm uppercase tracking-wide text-navy">
              Recommended for Your Home
            </span>
          </div>
          <button
            type="button"
            onClick={() => updateData({ sanitizing: true })}
            className="w-full p-3 bg-white border border-cream-dark text-left flex items-center justify-between text-sm hover:border-orange transition-colors"
          >
            <div>
              <span className="block text-navy font-medium">Duct Sanitizing</span>
              <span className="text-xs text-charcoal/50">
                Kills bacteria, mold & odors
              </span>
            </div>
            <span className="text-orange font-bold">+${addons.sanitizing.price}</span>
          </button>
        </div>
      )}

      {/* Dryer Vent Section */}
      <div className="mb-6">
        <label className="block font-display text-xs uppercase tracking-wide text-charcoal/60 mb-2">
          Dryer Vent Cleaning
        </label>
        <div className="grid grid-cols-2 gap-2">
          {dryerVentOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => updateData({ dryerVent: option.value })}
              className={`p-3 border text-sm transition-colors ${
                data.dryerVent === option.value
                  ? "bg-navy text-white border-navy"
                  : "bg-white text-navy border-cream-dark hover:border-orange"
              }`}
            >
              <span className="block font-medium">{option.label}</span>
              {option.price > 0 && (
                <span className="block text-xs mt-1">${option.price}</span>
              )}
              {option.value === "ground" && data.package === "fullservice" && (
                <span className="block text-xs text-orange mt-1">Included</span>
              )}
            </button>
          ))}
        </div>
        <ExpandableSection title="Learn more about dryer vent cleaning">
          <p>
            Clogged dryer vents are a leading cause of house fires. We clean the
            entire vent run from your dryer to the exterior. Price varies by
            vent location and accessibility.
          </p>
        </ExpandableSection>
      </div>

      {/* Sanitizing (if not in recommended section) */}
      {(data.sanitizing || !showSanitizingRecommendation) && (
        <div className="mb-6">
          <button
            type="button"
            onClick={() => updateData({ sanitizing: !data.sanitizing })}
            className={`w-full p-3 border text-left transition-colors flex items-center justify-between text-sm ${
              data.sanitizing
                ? "bg-navy text-white border-navy"
                : "bg-white text-navy border-cream-dark hover:border-orange"
            }`}
          >
            <div>
              <span className="block">Duct Sanitizing</span>
              <span
                className={`text-xs ${
                  data.sanitizing ? "text-white/60" : "text-charcoal/50"
                }`}
              >
                Kills bacteria, mold & odors
              </span>
            </div>
            <span>+${addons.sanitizing.price}</span>
          </button>
        </div>
      )}

      {/* Humidifier Service */}
      <div className="mb-6">
        <button
          type="button"
          onClick={() =>
            updateData({ humidifierService: !data.humidifierService })
          }
          className={`w-full p-3 border text-left transition-colors flex items-center justify-between text-sm ${
            data.humidifierService
              ? "bg-navy text-white border-navy"
              : "bg-white text-navy border-cream-dark hover:border-orange"
          }`}
        >
          <div>
            <span className="block">Humidifier Service</span>
            <span
              className={`text-xs ${
                data.humidifierService ? "text-white/60" : "text-charcoal/50"
              }`}
            >
              Clean & inspect
            </span>
          </div>
          <span>+${addons.humidifier.price}</span>
        </button>
        <ExpandableSection title="Learn more about humidifier service">
          <p>
            We&apos;ll clean your furnace humidifier, replace the water panel if
            needed, and ensure it&apos;s working properly for the heating
            season.
          </p>
        </ExpandableSection>
      </div>

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
          onClick={onNext}
          className="btn btn-outline flex-1"
        >
          Skip Add-Ons
        </button>
        <button
          type="button"
          onClick={onNext}
          className="btn btn-primary flex-1"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
```

**Step 4: Create Step4Review component**

```typescript
// src/components/quote/steps/Step4Review.tsx
import type { QuoteData, TimeframeOption } from "@/types";
import { QuoteSummary } from "@/components/quote";

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
  const isFormValid = data.name && data.phone && data.email && data.address && data.timeframe;

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
          <span className="text-orange">✓</span> Price confirmed after inspection
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
```

**Step 5: Create steps index**

```typescript
// src/components/quote/steps/index.ts
export { default as Step1Home } from "./Step1Home";
export { default as Step2Package } from "./Step2Package";
export { default as Step3Addons } from "./Step3Addons";
export { default as Step4Review } from "./Step4Review";
```

**Step 6: Commit**

```bash
git add src/components/quote/steps/
git commit -m "feat(quote): create step components for 4-step wizard"
```

---

## Task 10: Refactor QuoteBuilder to Use Step Components

**Files:**
- Modify: `src/components/quote/QuoteBuilder.tsx`

**Step 1: Replace the monolithic component with step-based architecture**

Replace the entire contents of `QuoteBuilder.tsx`:

```typescript
// src/components/quote/QuoteBuilder.tsx
"use client";

import { useState, useTransition } from "react";
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
import {
  Step1Home,
  Step2Package,
  Step3Addons,
  Step4Review,
} from "./steps";

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
  const [submitResult, setSubmitResult] = useState<QuoteSubmissionResult | null>(
    null
  );

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
          <a href="/" className="btn btn-primary">
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] flex flex-col">
      {/* Quote Header with Progress and Price */}
      <div className="py-4 px-6 border-b border-cream-dark bg-cream sticky top-20 z-40">
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
```

**Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors

**Step 3: Test in browser**

Run: `npm run dev`
Navigate to `/quote` and verify the 4-step flow works.

**Step 4: Commit**

```bash
git add src/components/quote/QuoteBuilder.tsx
git commit -m "refactor(quote): implement 4-step wizard with modular step components"
```

---

## Task 11: Update Quote Index Exports

**Files:**
- Modify: `src/components/quote/index.ts`

**Step 1: Export all new components**

```typescript
// src/components/quote/index.ts
export { default as QuoteBuilder } from "./QuoteBuilder";
export { default as QuoteSummary } from "./QuoteSummary";
export * from "./steps";
```

**Step 2: Commit**

```bash
git add src/components/quote/index.ts
git commit -m "chore(quote): update exports for new components"
```

---

## Task 12: Final Testing and Cleanup

**Step 1: Run full type check**

```bash
npx tsc --noEmit
```

**Step 2: Run linter**

```bash
npm run lint
```

**Step 3: Test complete flow in browser**

1. Navigate to `/quote`
2. Step 1: Select house type, adjust vents, select furnaces, toggle features
3. Step 2: Select each package, verify prices update
4. Step 3: Add/remove add-ons
5. Step 4: Verify summary is accurate, select timeframe, fill contact form
6. Submit and verify success state

**Step 4: Final commit**

```bash
git add .
git commit -m "feat(quote): complete 4-step wizard implementation

- Add house type selection with smart vent defaults
- Create reusable UI components (ProgressBar, VisualSelector, Stepper, etc.)
- Implement QuoteSummary with itemized breakdown
- Refactor to modular step components
- Add expandable Learn More sections

Closes: quote-builder-redesign"
```

---

## Summary

This implementation plan creates:

1. **5 new UI components**: ProgressBar, VisualSelector, Stepper, ExpandableSection, ToggleCard
2. **4 step components**: Step1Home, Step2Package, Step3Addons, Step4Review
3. **1 summary component**: QuoteSummary with itemized breakdown
4. **Updated types**: HouseType, updated QuoteData and Step

The refactored QuoteBuilder is now:
- Modular and maintainable
- Research-backed 4-step flow
- Responsive (mobile-first)
- Accessible (aria labels, keyboard navigation)
- Educational (expandable learn more sections)
