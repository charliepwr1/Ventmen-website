import type { PackagesConfig, AddonsConfig, TimeframeOption, HouseType } from "@/types";

export const INCLUDED_VENTS = 10;

export const PACKAGES: PackagesConfig = {
  standard: {
    name: "The Standard",
    price: 199,
    perVent: 11.95,
    tagline: "Professional Duct Cleaning",
    features: [
      "10 vents included",
      "Replace furnace filter",
      "Remove & clean blower motor",
      "Air gun on all supply vents",
      "Back skipper in trunk lines",
      "Truck-mounted HyperVac H2 vacuum",
      "No HE surcharge",
    ],
    recommended: false,
  },
  deepclean: {
    name: "The Deep Clean",
    price: 299,
    perVent: 13.95,
    tagline: "The Full Treatment",
    features: [
      "Everything in The Standard, plus:",
      "Second pass with forward skip tool on every vent",
      "Octopus whip in all trunk lines",
      "HRV / ERV cleaning included",
      "Benefect duct sanitization included",
      "Main floor dryer vent cleaning included",
    ],
    recommended: true,
  },
};

export const ADDONS: AddonsConfig = {
  acSurcharge: { price: 29.95, label: "AC Surcharge" },
  secondFurnace: { price: 99.95, label: "Additional Furnace" },
  dryerGround: { price: 69.95, label: "Dryer Vent (Main Floor)" },
  dryerSecondFloor: { price: 149.95, label: "Dryer Vent (2nd Floor)" },
  dryerRooftop: { price: 199.99, label: "Dryer Vent (Rooftop)" },
  sanitizing: { price: 79.95, label: "Duct Sanitizing (Benefect)" },
  hrv: { price: 59.95, label: "HRV / ERV Cleaning" },
  humidifier: { price: 34.95, label: "Humidifier Pad Replacement" },
  centralVac: { price: 65.00, label: "Central Vacuum Cleaning" },
};

export const TIMEFRAME_OPTIONS: TimeframeOption[] = [
  { value: "this-week", label: "This week", desc: "Subject to availability" },
  { value: "within-2-weeks", label: "Within 2 weeks", desc: "Flexible scheduling" },
  { value: "exploring", label: "Just exploring", desc: "Get a quote for later" },
];

export interface HouseTypeConfig {
  label: string;
  icon: string;
  defaultVents: number;
}

export const HOUSE_TYPES: Record<HouseType, HouseTypeConfig> = {
  apartment: {
    label: "Apartment / Condo",
    icon: "building",
    defaultVents: 12,
  },
  townhome: {
    label: "Townhome / Duplex",
    icon: "townhouse",
    defaultVents: 20,
  },
  detached: {
    label: "Detached House",
    icon: "house",
    defaultVents: 25,
  },
};
