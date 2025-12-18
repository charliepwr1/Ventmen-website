export type Step = 1 | 2 | 3 | 4;

export type PackageType = "basic" | "pro" | "fullservice";

export type DryerVentType = "none" | "ground" | "second-floor" | "rooftop";

export type TimeframeType = "asap" | "this-week" | "next-week" | "flexible";

export type HouseType = "apartment" | "townhome" | "detached";

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

export interface Package {
  name: string;
  price: number;
  perVent: number;
  tagline: string;
  features: string[];
  recommended: boolean;
}

export interface Addon {
  price: number;
  label: string;
}

export type PackagesConfig = Record<PackageType, Package>;

export type AddonsConfig = {
  bypass: Addon;
  secondFurnace: Addon;
  secondFurnaceHE: Addon;
  dryerGround: Addon;
  dryerSecondFloor: Addon;
  dryerRooftop: Addon;
  sanitizing: Addon;
  hrv: Addon;
  humidifier: Addon;
};

export interface TimeframeOption {
  value: TimeframeType;
  label: string;
  desc: string;
}

export interface QuoteSubmission extends QuoteData {
  calculatedPrice: number;
  submittedAt: string;
}
