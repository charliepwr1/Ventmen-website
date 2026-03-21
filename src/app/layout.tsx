import type { Metadata } from "next";
import { Oswald, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { JsonLd } from '@/components/seo/JsonLd';
import { BUSINESS, SERVICE_AREAS, SERVICES, FOUNDERS } from '@/lib/constants/schema';

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "The Vent Men | Video-Verified Duct Cleaning in Calgary",
    template: "%s | The Vent Men",
  },
  description:
    "Calgary's trusted furnace and duct cleaning service. We show up on time, document everything on video, and prove your system is clean. Get your instant quote today.",
  keywords: [
    "duct cleaning Calgary",
    "furnace cleaning Calgary",
    "HVAC cleaning",
    "air duct cleaning",
    "video verified cleaning",
    "Calgary duct cleaners",
  ],
  authors: [{ name: "The Vent Men" }],
  metadataBase: new URL("https://theventmen.ca"),
  openGraph: {
    title: "The Vent Men | Video-Verified Duct Cleaning",
    description:
      "Furnace cleaning you can actually trust. We document everything on video.",
    url: "https://theventmen.ca",
    siteName: "The Vent Men",
    locale: "en_CA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'HVACBusiness',
    '@id': `${BUSINESS.url}/#organization`,
    name: BUSINESS.name,
    legalName: BUSINESS.legalName,
    url: BUSINESS.url,
    logo: BUSINESS.logo,
    image: BUSINESS.logo,
    description: BUSINESS.description,
    slogan: BUSINESS.slogan,
    foundingDate: BUSINESS.foundingDate,
    telephone: BUSINESS.telephone,
    email: BUSINESS.email,
    priceRange: BUSINESS.priceRange,
    currenciesAccepted: BUSINESS.currenciesAccepted,
    paymentAccepted: BUSINESS.paymentAccepted,
    address: {
      '@type': 'PostalAddress',
      ...BUSINESS.address,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: BUSINESS.geo.latitude,
      longitude: BUSINESS.geo.longitude,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '08:00',
      closes: '18:00',
    },
    areaServed: SERVICE_AREAS.map((area) => ({
      '@type': area.type,
      name: area.name,
      ...(area.sameAs ? { sameAs: area.sameAs } : {}),
    })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'HVAC Cleaning Services',
      itemListElement: SERVICES.map((svc) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: svc.name,
          description: svc.shortDescription,
          provider: { '@id': `${BUSINESS.url}/#organization` },
          areaServed: SERVICE_AREAS.map((area) => ({
            '@type': area.type,
            name: area.name,
          })),
        },
      })),
    },
    founder: FOUNDERS.map((f) => ({
      '@type': 'Person',
      name: f.name,
      jobTitle: f.role,
    })),
    ...(BUSINESS.sameAs.length > 0 ? { sameAs: BUSINESS.sameAs } : {}),
  };

  return (
    <html lang="en">
      <body className={`${oswald.variable} ${sourceSans.variable} antialiased`}>
        <JsonLd data={organizationSchema} />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
