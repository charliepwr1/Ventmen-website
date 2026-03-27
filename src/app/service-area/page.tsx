import Link from "next/link";
import type { Metadata } from "next";
import { SERVICE_AREAS } from "@/lib/constants/schema";

export const metadata: Metadata = {
  title: "Service Area | The Vent Men",
  description:
    "The Vent Men serves Calgary and surrounding areas including Okotoks, Chestermere, Cochrane, High River, Black Diamond, and Langdon.",
};

const serviceAreas = [
  {
    name: "Calgary",
    description: "All Calgary neighborhoods including NW, NE, SW, SE, and surrounding communities.",
    primary: true,
  },
  {
    name: "Okotoks",
    description: "Full service available in Okotoks and surrounding area.",
    primary: false,
  },
  {
    name: "Chestermere",
    description: "Covering all of Chestermere and lakeside communities.",
    primary: false,
  },
  {
    name: "Cochrane",
    description: "Service available throughout Cochrane and nearby areas.",
    primary: false,
  },
  {
    name: "High River",
    description: "Full coverage in High River and surrounding region.",
    primary: false,
  },
  {
    name: "Black Diamond",
    description: "Service available in Black Diamond and Turner Valley.",
    primary: false,
  },
  {
    name: "Langdon",
    description: "Covering Langdon and nearby communities.",
    primary: false,
  },
];

export default function ServiceAreaPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-navy text-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Service Area
          </h1>
          <p className="text-xl text-cream/80 mb-6">
            Serving Calgary and the surrounding region.
          </p>
          <div className="divider mx-auto bg-orange"></div>
        </div>
      </section>

      {/* Map Placeholder Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Map Placeholder */}
          <div className="aspect-video bg-cream-dark flex items-center justify-center mb-12">
            <div className="text-center">
              <svg className="w-16 h-16 mx-auto text-charcoal/30 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              <p className="text-charcoal/50 font-display uppercase tracking-wider text-sm">
                Interactive Map Coming Soon
              </p>
            </div>
          </div>

          {/* Areas List */}
          <h2 className="font-display text-2xl font-bold text-navy text-center mb-8">
            Areas We Serve
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceAreas.map((area) => (
              <div
                key={area.name}
                className={`card ${area.primary ? "ring-2 ring-orange" : ""}`}
              >
                <div className="flex items-start gap-3">
                  <span className="w-3 h-3 bg-orange rounded-full mt-1.5 flex-shrink-0"></span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-navy mb-1">
                      {area.name}
                    </h3>
                    <p className="text-charcoal/70 text-sm">{area.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Area Detail Pages */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-center text-2xl font-bold uppercase tracking-wide text-navy md:text-3xl">
            Service Area Details
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICE_AREAS.map((area) => (
              <Link
                key={area.slug}
                href={`/service-area/${area.slug}`}
                className="card block p-5 transition-colors hover:border-orange"
              >
                <h3 className="font-display font-semibold uppercase text-navy">{area.name}</h3>
                <p className="mt-1 text-sm text-charcoal">{area.driveTime}</p>
                <span className="mt-2 inline-block text-sm font-semibold text-orange">View details &rarr;</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Not Sure Section */}
      <section className="py-12 px-6 bg-cream-dark">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-2xl font-bold text-navy mb-4">
            Not Sure If We Serve Your Area?
          </h2>
          <p className="text-charcoal/70 mb-6">
            We&apos;re always expanding our service area. If you don&apos;t see your
            location listed, get a quote anyway—we&apos;ll let you know if we can help.
          </p>
          <Link href="/quote" className="btn btn-primary">
            Get a Quote
          </Link>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-2xl font-bold text-navy text-center mb-8">
            What to Expect
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-display font-bold text-navy mb-2">Same Week Booking</h3>
              <p className="text-charcoal/70 text-sm">
                Most appointments scheduled within 3-5 business days.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-display font-bold text-navy mb-2">Flexible Scheduling</h3>
              <p className="text-charcoal/70 text-sm">
                Morning, afternoon, or weekend appointments available.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-display font-bold text-navy mb-2">No Travel Fees</h3>
              <p className="text-charcoal/70 text-sm">
                Same pricing for all service areas listed above.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-navy py-12 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-2xl font-bold text-white mb-4">
            Ready to Book?
          </h2>
          <p className="text-cream/70 mb-6">
            Get your personalized quote in under 2 minutes. Same transparent pricing
            across all service areas.
          </p>
          <Link href="/quote" className="btn btn-primary">
            Get My Quote
          </Link>
        </div>
      </section>
    </div>
  );
}
