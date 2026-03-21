import Link from "next/link";
import type { Metadata } from "next";
import { JsonLd } from '@/components/seo/JsonLd';
import { BUSINESS, FOUNDERS } from '@/lib/constants/schema';

export const metadata: Metadata = {
  title: "About Us | The Vent Men",
  description:
    "Meet Dan and Charlie, the founders of The Vent Men. Calgary-based, indigenous-owned duct cleaning with 15+ years of HVAC experience.",
};

const teamMembers = [
  {
    name: "Dan Zentner",
    role: "Co-Founder & Technical Lead",
    bio: "Dan brings 15 years of HVAC installation experience to The Vent Men. As a member of Siksika Nation and a licensed HVAC contractor, he's built deep relationships across Calgary's heating and cooling industry. Dan oversees all technical operations and quality control, ensuring every job meets his exacting standards.",
    highlights: [
      "15 years HVAC experience",
      "Licensed contractor",
      "Siksika Nation member",
      "Quality-focused approach",
    ],
  },
  {
    name: "Charlie Power",
    role: "Co-Founder & Operations",
    bio: "Charlie spent a decade as a professional athlete with the Calgary Stampeders, learning discipline, teamwork, and the value of showing up prepared. Now he brings that same mindset to business, managing operations, systems, and customer experience. He's set up multiple successful businesses and knows what it takes to build something that lasts.",
    highlights: [
      "Former Calgary Stampeder",
      "Multi-business owner",
      "Operations expert",
      "Customer experience focus",
    ],
  },
];

const values = [
  {
    title: "Video-Verified",
    description:
      "Every job is documented on video. You'll see the before and after—no guesswork, no trust required.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: "Transparent Pricing",
    description:
      "The price we quote is the price you pay. No hidden fees, no surprise charges, no awkward conversations.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Commercial Training, Residential Service",
    description:
      "We bring commercial-grade equipment and professional standards to residential cleaning. The difference is in the details.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
  {
    title: "Calgary Born & Based",
    description:
      "We're not a franchise. We live here, work here, and our reputation depends on every single job.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

export default function AboutPage() {
  const founderSchemas = FOUNDERS.map((f) => ({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: f.name,
    jobTitle: f.role,
    worksFor: { '@id': `${BUSINESS.url}/#organization` },
  }));

  return (
    <div className="min-h-screen">
      <JsonLd data={founderSchemas} />

      {/* Hero Section */}
      <section className="bg-navy text-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            About Us
          </h1>
          <p className="text-xl text-cream/80 mb-6">
            Two Calgarians who got tired of watching an industry cut corners.
          </p>
          <div className="divider mx-auto bg-orange"></div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-navy mb-6 text-center">
            Our Story
          </h2>
          <div className="space-y-6 text-charcoal/80 leading-relaxed">
            <p>
              The duct cleaning industry has a reputation problem. Bait-and-switch pricing.
              &ldquo;$49 whole-house specials&rdquo; that balloon to hundreds. Technicians who
              rush through jobs and hope you don&apos;t notice.
            </p>
            <p>
              We noticed. After 15 years in Calgary&apos;s HVAC industry, Dan had seen enough.
              He teamed up with Charlie—fresh off a decade in professional football and running
              multiple businesses—to build something different.
            </p>
            <p>
              The Vent Men is what we wished existed: a duct cleaning company that shows up
              on time, charges what they quote, documents everything on video, and actually
              cares whether your ducts are clean when they leave.
            </p>
            <p>
              We&apos;re majority indigenous-owned, Calgary-based, and building our reputation
              one job at a time. No franchise playbook. No corner-cutting. Just clean ducts
              and proof that we did the work.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-navy mb-12 text-center">
            Meet the Team
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {teamMembers.map((member) => (
              <div key={member.name} className="text-center">
                {/* Photo Placeholder */}
                <div className="w-48 h-48 mx-auto mb-6 bg-cream-dark flex items-center justify-center">
                  <div className="text-center">
                    <svg className="w-16 h-16 mx-auto text-charcoal/30" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                    <p className="text-xs text-charcoal/40 mt-2">Photo coming soon</p>
                  </div>
                </div>

                <h3 className="font-display text-xl font-bold text-navy mb-1">
                  {member.name}
                </h3>
                <p className="text-orange font-display text-sm uppercase tracking-wider mb-4">
                  {member.role}
                </p>
                <p className="text-charcoal/70 text-sm leading-relaxed mb-4">
                  {member.bio}
                </p>

                <div className="flex flex-wrap justify-center gap-2">
                  {member.highlights.map((highlight) => (
                    <span
                      key={highlight}
                      className="text-xs bg-cream px-3 py-1 text-charcoal/70"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials & Equipment Section */}
      <section className="py-16 px-6 bg-cream">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-navy mb-8 text-center">
            Credentials &amp; Equipment
          </h2>
          <ul className="space-y-4 text-charcoal/80 leading-relaxed list-none">
            <li>
              Dan Zentner has 15 years of HVAC experience and is a licensed contractor.
            </li>
            <li>
              Dan is a Siksika Nation member -- The Vent Men is 51% Indigenous-owned.
            </li>
            <li>
              We use a HyperVac H2, a commercial-grade HEPA-filtered vacuum system.
            </li>
            <li>
              Our service vehicle is a fully wrapped Ford Transit 350.
            </li>
            <li>
              Every job includes before-and-after video documentation.
            </li>
          </ul>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-navy mb-12 text-center">
            Why We&apos;re Different
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value) => (
              <div key={value.title} className="card flex gap-4">
                <div className="flex-shrink-0 text-orange">{value.icon}</div>
                <div>
                  <h3 className="font-display text-lg font-bold text-navy mb-2">
                    {value.title}
                  </h3>
                  <p className="text-charcoal/70 text-sm">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Indigenous Ownership Badge */}
      <section className="py-12 px-6 bg-cream-dark">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white border border-cream-dark">
            <span className="w-3 h-3 bg-orange rounded-full"></span>
            <span className="font-display text-navy uppercase tracking-wider text-sm">
              Majority Indigenous-Owned Business
            </span>
          </div>
          <p className="mt-4 text-charcoal/60 text-sm max-w-xl mx-auto">
            The Vent Men is 51% Indigenous-owned. We&apos;re proud to
            contribute to Indigenous economic development in Calgary and Alberta.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-navy py-12 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-2xl font-bold text-white mb-4">
            Ready to Work With Us?
          </h2>
          <p className="text-cream/70 mb-6">
            Get your personalized quote in under 2 minutes. See what transparent
            duct cleaning looks like.
          </p>
          <Link href="/quote" className="btn btn-primary">
            Get My Quote
          </Link>
        </div>
      </section>
    </div>
  );
}
