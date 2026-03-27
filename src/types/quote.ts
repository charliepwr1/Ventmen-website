export type Step = 1 | 2 | 3 | 4 | 5;

export type PackageType = "standard" | "deepclean";

export type DryerVentType = "none" | "ground" | "second-floor" | "rooftop";

export type TimeframeType = "this-week" | "within-2-weeks" | "exploring";

export type HouseType = "apartment" | "townhome" | "detached";

export interface QuoteData {
  // Step 1: Home type (auto-sets vents to default)
  houseType: HouseType;
  // Step 2: Home details
  vents: number;
  furnaces: number;
  hasAC: boolean;

  // Step 3: Home features (facts about the home, not purchase decisions)
  hasHRV: boolean;
  dryerVentLocation: DryerVentType;
  hasHumidifier: boolean;
  hasCentralVac: boolean;

  // Step 4: Package + add-on selections (purchase decisions)
  package: PackageType;
  wantsHRV: boolean;
  wantsSanitizing: boolean;
  wantsDryerVent: boolean;
  wantsHumidifier: boolean;
  wantsCentralVac: boolean;

  // Step 5: Booking + contact
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
