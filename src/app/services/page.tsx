import Link from "next/link";
import { PACKAGES, ADDONS, INCLUDED_VENTS } from "@/lib/constants/pricing";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services & Pricing | The Vent Men",
  description:
    "Transparent duct cleaning pricing in Calgary. The Standard and The Deep Clean packages. No hidden fees, video-verified results.",
};

const CheckIcon = () => (
  <svg className="w-5 h-5 text-orange flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

export default function ServicesPage() {
  const packageKeys = Object.keys(PACKAGES) as (keyof typeof PACKAGES)[];
  const addonKeys = Object.keys(ADDONS) as (keyof typeof ADDONS)[];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-navy text-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Services & Pricing
          </h1>
          <p className="text-xl text-cream/80 mb-6">
            Transparent pricing. No hidden fees. Video-verified results.
          </p>
          <div className="divider mx-auto bg-orange"></div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="bg-cream-dark py-6 px-6">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-8 text-sm text-charcoal">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-orange rounded-full"></span>
            Price You See = Price You Pay
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-orange rounded-full"></span>
            {INCLUDED_VENTS} Vents Included
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-orange rounded-full"></span>
            Same-Day Video Report
          </span>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-navy text-center mb-4">
            Choose Your Package
          </h2>
          <p className="text-charcoal/70 text-center mb-12 max-w-2xl mx-auto">
            All packages include {INCLUDED_VENTS} vents, furnace filter replacement, and our video verification process.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {packageKeys.map((key) => {
              const pkg = PACKAGES[key];
              return (
                <div
                  key={key}
                  className={`card relative ${
                    pkg.recommended ? "ring-2 ring-orange" : ""
                  }`}
                >
                  {pkg.recommended && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange text-white px-4 py-1 text-xs font-display uppercase tracking-wider">
                      Most Popular
                    </div>
                  )}
                  <div className="text-center mb-6">
                    <h3 className="font-display text-2xl font-bold text-navy mb-1">
                      {pkg.name}
                    </h3>
                    <p className="text-sm text-charcoal/60 mb-4">{pkg.tagline}</p>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="font-display text-4xl font-bold text-navy">
                        ${pkg.price}
                      </span>
                    </div>
                    <p className="text-xs text-charcoal/50 mt-1">
                      +${pkg.perVent}/vent over {INCLUDED_VENTS}
                    </p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckIcon />
                        <span className="text-charcoal/80 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/quote"
                    className={`btn w-full justify-center ${
                      pkg.recommended ? "btn-primary" : "btn-outline"
                    }`}
                  >
                    Get Quote
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-navy text-center mb-4">
            Add-On Services
          </h2>
          <p className="text-charcoal/70 text-center mb-12">
            Customize your cleaning with these additional services.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {addonKeys.map((key) => {
              const addon = ADDONS[key];
              return (
                <div
                  key={key}
                  className="flex items-center justify-between p-4 bg-cream border border-cream-dark"
                >
                  <span className="text-charcoal">{addon.label}</span>
                  <span className="font-display font-bold text-navy">
                    +${addon.price.toFixed(2)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* What to Expect Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-navy text-center mb-12">
            What to Expect
          </h2>

          <div className="space-y-8">
            {[
              {
                step: "1",
                title: "Confirmation",
                desc: "We'll call or text to confirm your appointment time.",
              },
              {
                step: "2",
                title: "Day-Of Reminder",
                desc: "Get a reminder text with your technician's photo and ETA.",
              },
              {
                step: "3",
                title: "Professional Service",
                desc: "Our technician arrives in uniform with professional equipment. Service takes 1.5-3 hours depending on package.",
              },
              {
                step: "4",
                title: "Walkthrough",
                desc: "We'll walk you through what we did and show you the before/after on camera.",
              },
              {
                step: "5",
                title: "Video Report",
                desc: "Receive your cleaning report via email the same day, including video documentation.",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-orange text-white font-display text-xl font-bold flex items-center justify-center">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-navy mb-1">
                    {item.title}
                  </h3>
                  <p className="text-charcoal/70">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Individual Service Pages -- AI needs these for specific query matching */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-center text-2xl font-bold uppercase tracking-wide text-navy md:text-3xl">
            Learn More About Our Services
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {[
              { href: '/services/furnace-cleaning', title: 'Furnace Cleaning', desc: 'Complete furnace cleaning including blower motor, filter, and heat exchanger inspection. From $199.' },
              { href: '/services/duct-cleaning', title: 'Duct Cleaning', desc: 'Professional air duct cleaning with before-and-after video documentation. From $199.' },
              { href: '/services/dryer-vent-cleaning', title: 'Dryer Vent Cleaning', desc: 'Prevent dryer fires and improve efficiency. From $69.95.' },
              { href: '/services/full-system-cleaning', title: 'The Deep Clean', desc: 'Everything included -- furnace, ducts, dryer vent, HRV, sanitization, and more. $299.' },
            ].map((svc) => (
              <Link key={svc.href} href={svc.href} className="card block p-6 transition-colors hover:border-orange">
                <h3 className="font-display text-lg font-semibold uppercase text-navy">{svc.title}</h3>
                <p className="mt-2 text-charcoal">{svc.desc}</p>
                <span className="mt-3 inline-block font-semibold text-orange">Learn more &rarr;</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-navy py-12 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-2xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-cream/70 mb-6">
            Get your personalized quote in under 2 minutes. No pressure, no
            surprises.
          </p>
          <Link href="/quote" className="btn btn-primary">
            Get My Quote
          </Link>
        </div>
      </section>
    </div>
  );
}
