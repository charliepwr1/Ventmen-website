export type Step = 1 | 2 | 3 | 4;

export type PackageType = "standard" | "deepclean";

export type DryerVentType = "none" | "ground" | "second-floor" | "rooftop";

export type TimeframeType = "asap" | "this-week" | "next-week" | "flexible";

export type HouseType = "apartment" | "townhome" | "detached";

export interface QuoteData {
  // Step 1: Home basics
  houseType: HouseType;
  vents: number;
  furnaces: number;

  // Step 2: Home features (facts about the home, not purchase decisions)
  hasAC: boolean;
  hasHRV: boolean;
  dryerVentLocation: DryerVentType;
  hasHumidifier: boolean;
  hasCentralVac: boolean;

  // Step 3: Package + add-on selections (purchase decisions)
  package: PackageType;
  wantsHRV: boolean;
  wantsSanitizing: boolean;
  wantsDryerVent: boolean;
  wantsHumidifier: boolean;
  wantsCentralVac: boolean;

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
  acSurcharge: Addon;
  secondFurnace: Addon;
  dryerGround: Addon;
  dryerSecondFloor: Addon;
  dryerRooftop: Addon;
  sanitizing: Addon;
  hrv: Addon;
  humidifier: Addon;
  centralVac: Addon;
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
