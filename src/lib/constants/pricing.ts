import type { PackagesConfig, AddonsConfig, TimeframeOption, HouseType } from "@/types";

export const INCLUDED_VENTS = 10;

export const PACKAGES: PackagesConfig = {
  basic: {
    name: "Basic",
    price: 159.95,
    perVent: 9.95,
    tagline: "Routine Maintenance",
    features: [
      "10 vents included",
      "Replace furnace filter",
      "Remove & clean blower motor",
      "High-pressure air cleaning",
    ],
    recommended: false,
  },
  pro: {
    name: "Pro",
    price: 219.95,
    perVent: 13.95,
    tagline: "Pets, Allergies & Renovations",
    features: [
      "10 vents included",
      "Replace furnace filter",
      "Remove & clean blower motor",
      "High-pressure air cleaning",
      "High-speed rotary brush cleaning",
    ],
    recommended: true,
  },
  fullservice: {
    name: "Full Service",
    price: 349.95,
    perVent: 14.95,
    tagline: "Complete Care Package",
    features: [
      "10 vents included",
      "Replace furnace filter",
      "Remove & clean blower motor",
      "High-pressure air cleaning",
      "High-speed rotary brush cleaning",
      "Reverse octopus whip cleaning",
      "Fresh air intake cleaning",
      "Ground floor dryer vent cleaning",
      "2-year Total Care Plan",
    ],
    recommended: false,
  },
};

export const ADDONS: AddonsConfig = {
  bypass: { price: 49.95, label: "High-Efficiency / A/C Bypass" },
  secondFurnace: { price: 79.95, label: "Second Furnace" },
  secondFurnaceHE: { price: 119.95, label: "Second Furnace (Full Service)" },
  dryerGround: { price: 59.95, label: "Dryer Vent (Ground Level)" },
  dryerSecondFloor: { price: 129.95, label: "Dryer Vent (2nd Floor)" },
  dryerRooftop: { price: 199.95, label: "Dryer Vent (Rooftop)" },
  sanitizing: { price: 79.95, label: "Duct Sanitizing" },
  hrv: { price: 59.95, label: "HRV Cleaning" },
  humidifier: { price: 69.95, label: "Humidifier Service" },
};

export const TIMEFRAME_OPTIONS: TimeframeOption[] = [
  { value: "asap", label: "As soon as possible", desc: "Within 1-2 days" },
  { value: "this-week", label: "This week", desc: "Within 3-7 days" },
  { value: "next-week", label: "Next week or two", desc: "1-2 weeks out" },
  { value: "flexible", label: "I'm flexible", desc: "Whenever works" },
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
