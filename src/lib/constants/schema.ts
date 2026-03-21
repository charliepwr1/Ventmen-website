// src/lib/constants/schema.ts

/**
 * Centralized business data for Schema.org structured data.
 * Single source of truth -- update here, propagates to all pages.
 *
 * IMPORTANT: NAP (Name, Address, Phone) must be IDENTICAL to every
 * directory listing (Google Business Profile, Foursquare, Bing Places,
 * BBB, HomeStars, etc). Any inconsistency tanks AI visibility.
 */

export const BUSINESS = {
  name: 'The Vent Men',
  legalName: 'The Vent Men Ltd.',
  url: 'https://theventmen.ca',
  logo: 'https://theventmen.ca/logo.svg',
  description:
    'Premium furnace and duct cleaning in Calgary with before-and-after video documentation. Transparent pricing, commercial-grade equipment, professional service.',
  slogan: 'Ridiculously Serious About Clean Air',
  foundingDate: '2025',
  telephone: '+1-403-XXX-XXXX', // TODO: Replace with real number before deploy
  email: 'hello@theventmen.ca',
  priceRange: '$$',
  currenciesAccepted: 'CAD',
  paymentAccepted: 'Cash, Credit Card, Debit, E-Transfer',
  address: {
    streetAddress: '', // TODO: Add real address
    addressLocality: 'Calgary',
    addressRegion: 'AB',
    postalCode: '', // TODO: Add real postal code
    addressCountry: 'CA',
  },
  geo: {
    latitude: 51.0447, // Calgary coordinates
    longitude: -114.0719,
  },
  hours: [
    'Mo-Sa 08:00-18:00',
  ],
  // sameAs links -- CRITICAL: tells AI all your profiles are the same entity.
  // Omit from schema output when empty (empty array tells AI "no other profiles exist").
  // TODO: Add URLs as profiles are created:
  //   Google Business Profile, Yelp, Foursquare, BBB, HomeStars,
  //   Facebook, Instagram, LinkedIn, YouTube
  sameAs: [] as string[],
} as const;

export const SERVICE_AREAS = [
  {
    name: 'Calgary',
    slug: 'calgary',
    type: 'City' as const,
    province: 'Alberta',
    sameAs: 'https://en.wikipedia.org/wiki/Calgary',
    description: 'All Calgary neighborhoods including NW, NE, SW, SE, and surrounding communities.',
    driveTime: 'Based in Calgary',
    population: '1.3 million',
    isPrimary: true,
  },
  {
    name: 'Okotoks',
    slug: 'okotoks',
    type: 'City' as const,
    province: 'Alberta',
    sameAs: 'https://en.wikipedia.org/wiki/Okotoks',
    description: 'Serving all of Okotoks and surrounding rural areas.',
    driveTime: '30 minutes south of Calgary',
    population: '35,000+',
    isPrimary: false,
  },
  {
    name: 'Chestermere',
    slug: 'chestermere',
    type: 'City' as const,
    province: 'Alberta',
    sameAs: 'https://en.wikipedia.org/wiki/Chestermere',
    description: 'Full service coverage for Chestermere residents.',
    driveTime: '20 minutes east of Calgary',
    population: '24,000+',
    isPrimary: false,
  },
  {
    name: 'Cochrane',
    slug: 'cochrane',
    type: 'City' as const,
    province: 'Alberta',
    sameAs: 'https://en.wikipedia.org/wiki/Cochrane,_Alberta',
    description: 'Serving Cochrane and surrounding communities.',
    driveTime: '30 minutes northwest of Calgary',
    population: '36,000+',
    isPrimary: false,
  },
  {
    name: 'High River',
    slug: 'high-river',
    type: 'City' as const,
    province: 'Alberta',
    sameAs: 'https://en.wikipedia.org/wiki/High_River',
    description: 'Full coverage for High River.',
    driveTime: '45 minutes south of Calgary',
    population: '14,000+',
    isPrimary: false,
  },
  {
    name: 'Black Diamond',
    slug: 'black-diamond',
    type: 'City' as const,
    province: 'Alberta',
    sameAs: 'https://en.wikipedia.org/wiki/Black_Diamond,_Alberta',
    description: 'Serving Black Diamond and Turner Valley.',
    driveTime: '50 minutes southwest of Calgary',
    population: '2,700+',
    isPrimary: false,
  },
  {
    name: 'Langdon',
    slug: 'langdon',
    type: 'City' as const,
    province: 'Alberta',
    sameAs: 'https://en.wikipedia.org/wiki/Langdon,_Alberta',
    description: 'Full coverage for Langdon and surrounding area.',
    driveTime: '25 minutes east of Calgary',
    population: '5,500+',
    isPrimary: false,
  },
] as const;

export const SERVICES = [
  {
    name: 'Furnace Cleaning',
    slug: 'furnace-cleaning',
    shortDescription: 'Complete furnace cleaning including blower motor, filter, and heat exchanger inspection.',
    category: 'HVAC Cleaning',
  },
  {
    name: 'Duct Cleaning',
    slug: 'duct-cleaning',
    shortDescription: 'Professional air duct cleaning with before-and-after video documentation.',
    category: 'HVAC Cleaning',
  },
  {
    name: 'Dryer Vent Cleaning',
    slug: 'dryer-vent-cleaning',
    shortDescription: 'Dryer vent cleaning to prevent fire hazards and improve dryer efficiency.',
    category: 'HVAC Cleaning',
  },
  {
    name: 'Full HVAC System Cleaning',
    slug: 'full-system-cleaning',
    shortDescription: 'Complete system cleaning including furnace, ducts, dryer vent, HRV, and fresh air intake.',
    category: 'HVAC Cleaning',
  },
] as const;

export const FOUNDERS = [
  {
    name: 'Dan Zentner',
    role: 'Lead Technician & Co-Founder',
    description: '15 years of HVAC experience. Licensed contractor and Siksika Nation member.',
  },
  {
    name: 'Charlie Power',
    role: 'Operations & Co-Founder',
    description: 'Multi-business operator with expertise in operations, logistics, and customer experience.',
  },
] as const;
