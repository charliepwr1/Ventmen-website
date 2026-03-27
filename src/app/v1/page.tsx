import type { Metadata } from "next";
import Link from "next/link";
import { PACKAGES, INCLUDED_VENTS } from "@/lib/constants/pricing";
import { TrustBadges } from "@/components/ui";
import { JsonLd } from '@/components/seo/JsonLd';
import { BUSINESS } from '@/lib/constants/schema';

export const metadata: Metadata = {
  title: "Home V1 | The Vent Men",
  robots: { index: false, follow: false },
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

const StarIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const PlayIcon = () => (
  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const PLACEHOLDER_REVIEWS = [
  {
    quote: "They showed up on time, filmed the whole thing, and my ducts look brand new. First cleaning company that actually proved they did the work.",
    name: "Sarah M.",
    neighborhood: "Tuscany",
    featured: true,
  },
  {
    quote: "No upselling, no bait-and-switch. Just honest pricing and a great job. The video report was a nice touch.",
    name: "Mike R.",
    neighborhood: "Okotoks",
    featured: false,
  },
  {
    quote: "We have three dogs and the difference in air quality is night and day. Highly recommend the Pro package.",
    name: "Jennifer L.",
    neighborhood: "Cranston",
    featured: false,
  },
  {
    quote: "Best duct cleaning experience we've had in 20 years of homeownership. Professional, transparent, and thorough.",
    name: "Dave & Karen T.",
    neighborhood: "Signal Hill",
    featured: false,
  },
];

export default function Home() {
  const packageKeys = Object.keys(PACKAGES) as (keyof typeof PACKAGES)[];
  const featuredReview = PLACEHOLDER_REVIEWS.find((r) => r.featured)!;
  const smallReviews = PLACEHOLDER_REVIEWS.filter((r) => !r.featured);

  const homepageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${BUSINESS.url}/`,
    name: 'The Vent Men - Video-Verified Duct Cleaning in Calgary',
    description: 'Calgary\'s trusted furnace and duct cleaning service. Before-and-after video documentation, flat-rate pricing, commercial-grade equipment.',
    isPartOf: { '@id': `${BUSINESS.url}/#website` },
    about: { '@id': `${BUSINESS.url}/#organization` },
  };

  return (
    <div className="min-h-screen pb-16 md:pb-0">
      <JsonLd data={homepageSchema} />
      {/* ============================================================
          SECTION 1: VIDEO-FIRST HERO
          ============================================================ */}
      <section className="relative min-h-[85vh] flex items-center bg-navy overflow-hidden">
        {/* Video placeholder background */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-[#162038] to-[#0f1729]">
          {/* Content guidance for video */}
          <div className="absolute bottom-6 right-6 max-w-xs text-[11px] text-white/20 leading-tight hidden lg:block">
            [RECOMMENDED VIDEO: 15-30s loop — technician arriving at home,
            setting up equipment, before/after duct interior shots, handing
            video report to homeowner. No audio needed. Shoot in 4K, export
            as compressed MP4.]
          </div>
        </div>

        {/* Overlay gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/70 to-transparent" />

        {/* Hero content */}
        <div className="relative z-10 w-full px-6 py-16 md:py-24">
          <div className="max-w-5xl mx-auto">
            <div className="max-w-2xl md:text-left text-center mx-auto md:mx-0">
              {/* Social proof badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 mb-8">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon key={star} className="w-4 h-4 text-orange" />
                  ))}
                </div>
                <span className="text-cream/90 text-sm font-medium">
                  5.0 from 50+ Calgary homeowners
                </span>
              </div>

              {/* Headline */}
              <h1 className="font-display text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-[0.95]">
                Ridiculously Serious About Clean Air
              </h1>

              {/* Subhead */}
              <p className="text-lg md:text-xl text-cream/80 max-w-xl mb-8">
                The Vent Men is Calgary&apos;s video-verified furnace and duct cleaning service. We document every job with before-and-after video so you can see exactly what was in your system. Flat-rate pricing from $199. Commercial-grade HyperVac H2 equipment. Professional, uniformed technicians.
              </p>

              {/* Divider */}
              <div className="divider mb-8 mx-auto md:mx-0"></div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto md:mx-0">
                <Link href="/quote" className="btn btn-primary flex-1 justify-center">
                  Get Your Free Quote
                </Link>
                <button
                  type="button"
                  className="btn btn-outline-light flex-1 justify-center gap-2"
                  aria-label="Watch how we clean (coming soon)"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  Watch How We Clean
                </button>
              </div>

              {/* Phone */}
              <div className="mt-8 flex items-center gap-3 justify-center md:justify-start">
                <a
                  href="tel:+14035551234"
                  className="text-cream font-display text-lg uppercase tracking-wider hover:text-orange transition-colors"
                >
                  (403) 555-1234
                </a>
                <span className="text-cream/40 text-sm">Mon-Sat 8am-6pm</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 2: TRUST BAR
          ============================================================ */}
      <section className="bg-navy border-t border-cream/10 py-4 px-6">
        <TrustBadges variant="dark" className="max-w-5xl mx-auto" />
      </section>

      {/* ============================================================
          SECTION 3: PROOF, NOT PROMISES (Before/After + Video)
          ============================================================ */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-navy mb-4">
              Proof, Not Promises
            </h2>
            <div className="divider mx-auto mb-4"></div>
            <p className="text-charcoal/70 max-w-2xl mx-auto">
              Every job includes video documentation. No smoke and mirrors — just
              clean ducts and proof that we did the work.
            </p>
          </div>

          {/* Before / After cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1 mb-8 max-w-4xl mx-auto">
            {/* Before */}
            <div className="relative aspect-video bg-charcoal/90 flex flex-col items-center justify-center">
              <span className="font-display text-2xl font-bold text-white/30 uppercase tracking-wider mb-2">
                Before
              </span>
              <span className="text-white/15 text-xs text-center px-8 leading-relaxed">
                [PHOTO: Close-up of dirty duct interior — dust buildup,
                debris, pet hair visible. Shoot with phone flashlight inside vent.]
              </span>
            </div>

            {/* After */}
            <div className="relative aspect-video bg-cream flex flex-col items-center justify-center">
              <span className="font-display text-2xl font-bold text-navy/20 uppercase tracking-wider mb-2">
                After
              </span>
              <span className="text-navy/15 text-xs text-center px-8 leading-relaxed">
                [PHOTO: Same duct after cleaning — clean metal, no residue.
                Same angle as before photo for dramatic comparison.]
              </span>
            </div>
          </div>

          {/* Video embed placeholder */}
          <div className="max-w-3xl mx-auto">
            <div className="relative aspect-video bg-navy flex flex-col items-center justify-center cursor-pointer group">
              <div className="w-20 h-20 bg-orange/90 flex items-center justify-center mb-4 group-hover:bg-orange transition-colors">
                <PlayIcon />
              </div>
              <span className="font-display text-lg text-white uppercase tracking-wider">
                Watch a Full Cleaning in 60 Seconds
              </span>
              <span className="text-white/20 text-xs mt-4 text-center px-8 leading-relaxed">
                [RECOMMENDED: 60-second timelapse of a full job — arrival, setup,
                duct inspection, cleaning process, final result, handing report
                to homeowner.]
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 4: HOW IT WORKS
          ============================================================ */}
      <section className="py-16 px-6 bg-cream">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-navy mb-4">
              How It Works
            </h2>
            <div className="divider mx-auto mb-4"></div>
            <p className="text-charcoal/70 max-w-2xl mx-auto">
              Clean ducts in three simple steps. No phone tag, no in-home sales
              pitches, no surprises.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Timeline connector (desktop only) */}
            <div className="hidden md:block absolute top-16 left-[16.67%] right-[16.67%] h-0.5 bg-orange/30" />

            {[
              {
                step: "01",
                title: "Get Your Quote",
                desc: "Answer a few questions. Instant pricing, no phone tag.",
                guidance: "[Screenshot of quote builder on phone]",
              },
              {
                step: "02",
                title: "We Clean & Film",
                desc: "Our crew arrives on time with commercial-grade equipment. Everything on video.",
                guidance: "[Photo of technician with equipment at front door]",
              },
              {
                step: "03",
                title: "See The Proof",
                desc: "Same-day video report. See your ducts before and after.",
                guidance: "[Screenshot of video report being sent to customer]",
              },
            ].map((item) => (
              <div key={item.step} className="text-center relative">
                {/* Step number with dot */}
                <div className="relative z-10 mx-auto mb-6">
                  <div className="w-14 h-14 bg-white border-2 border-orange flex items-center justify-center mx-auto">
                    <span className="font-display text-xl font-bold text-orange">
                      {item.step}
                    </span>
                  </div>
                </div>

                {/* Image placeholder */}
                <div className="aspect-[4/3] bg-white border border-cream-dark flex items-center justify-center mb-4 mx-auto max-w-xs">
                  <span className="text-charcoal/20 text-xs text-center px-4">
                    {item.guidance}
                  </span>
                </div>

                <h3 className="font-display text-xl font-bold text-navy mb-2">
                  {item.title}
                </h3>
                <p className="text-charcoal/70 text-sm max-w-xs mx-auto">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 5: REVIEWS / SOCIAL PROOF
          ============================================================ */}
      <section className="py-16 px-6 bg-cream-dark">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-navy mb-4">
              What Calgary Homeowners Say
            </h2>
            <div className="divider mx-auto mb-4"></div>
            <p className="text-charcoal/60 text-xs uppercase tracking-wider">
              [PLACEHOLDER — Replace with real Google reviews from first customers.
              Include their neighborhood for local trust.]
            </p>
          </div>

          {/* Featured review */}
          <div className="max-w-3xl mx-auto mb-10">
            <div className="card bg-white text-center py-10 px-8 relative">
              <div className="font-display text-6xl text-orange/20 leading-none mb-4">
                &ldquo;
              </div>
              <p className="text-lg text-navy leading-relaxed mb-6 italic">
                {featuredReview.quote}
              </p>
              <div className="flex gap-1 justify-center mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon key={star} className="w-5 h-5 text-orange" />
                ))}
              </div>
              <div className="font-display font-bold text-navy">
                {featuredReview.name}
              </div>
              <div className="text-sm text-charcoal/50">
                {featuredReview.neighborhood} &middot; Verified Customer
              </div>
            </div>
          </div>

          {/* Smaller review cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {smallReviews.map((review) => (
              <div key={review.name} className="card bg-white text-left">
                <div className="flex gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon key={star} className="w-4 h-4 text-orange" />
                  ))}
                </div>
                <p className="text-charcoal/80 text-sm mb-4 italic leading-relaxed">
                  &ldquo;{review.quote}&rdquo;
                </p>
                <div className="pt-4 border-t border-cream-dark">
                  <div className="text-sm font-medium text-navy">
                    {review.name}
                  </div>
                  <div className="text-xs text-charcoal/50">
                    {review.neighborhood} &middot; Verified Customer
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 6: TRANSPARENT PRICING
          ============================================================ */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-navy mb-4">
              Transparent Pricing
            </h2>
            <div className="divider mx-auto mb-4"></div>
            <p className="text-charcoal/70 max-w-2xl mx-auto">
              Choose the package that fits your needs. All packages include{" "}
              {INCLUDED_VENTS} vents and our video verification process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {packageKeys.map((key) => {
              const pkg = PACKAGES[key];
              return (
                <div
                  key={key}
                  className={`card relative ${
                    pkg.recommended
                      ? "ring-2 ring-orange md:scale-105 md:-my-2 z-10"
                      : ""
                  }`}
                >
                  {pkg.recommended && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange text-white px-4 py-1 text-xs font-display uppercase tracking-wider">
                      Most Popular
                    </div>
                  )}
                  <div className="text-center mb-4">
                    <h3 className="font-display text-xl font-bold text-navy mb-1">
                      {pkg.name}
                    </h3>
                    <p className="text-xs text-charcoal/60 mb-3">{pkg.tagline}</p>
                    <span className="text-xs text-charcoal/50 uppercase tracking-wider">
                      Starting from
                    </span>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="font-display text-3xl font-bold text-navy">
                        ${pkg.price}
                      </span>
                    </div>
                    <p className="text-xs text-charcoal/40 mt-1">
                      Includes {INCLUDED_VENTS} vents + video verification
                    </p>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {pkg.features.slice(0, 4).map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckIcon />
                        <span className="text-charcoal/80 text-sm">{feature}</span>
                      </li>
                    ))}
                    {pkg.features.length > 4 && (
                      <li className="text-sm text-charcoal/50 pl-7">
                        +{pkg.features.length - 4} more features
                      </li>
                    )}
                  </ul>

                  <Link
                    href="/quote"
                    className={`btn w-full justify-center text-sm ${
                      pkg.recommended ? "btn-primary" : "btn-outline"
                    }`}
                  >
                    Get Quote
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/services"
              className="text-orange hover:text-orange-dark font-display uppercase tracking-wider text-sm transition-colors"
            >
              View Full Service Details &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 7: FINAL CTA
          ============================================================ */}
      <section className="bg-navy py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Breathe Easier?
          </h2>
          <p className="text-cream/70 mb-8 text-lg">
            Transparent pricing, video-verified results, no surprises.
          </p>
          <Link href="/quote" className="btn btn-primary text-lg px-12 py-4">
            Get Your Free Quote
          </Link>
          <div className="mt-6 flex flex-col items-center gap-2">
            <a
              href="tel:+14035551234"
              className="text-cream font-display text-lg uppercase tracking-wider hover:text-orange transition-colors"
            >
              (403) 555-1234
            </a>
            <span className="text-cream/40 text-sm">
              Most quotes take under 2 minutes
            </span>
          </div>
        </div>
      </section>

      {/* Sticky Mobile Call Bar */}
      <div className="mobile-call-bar md:hidden">
        <a href="tel:+14035551234" className="mobile-call-bar-link">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          Call Now - (403) 555-1234
        </a>
      </div>
    </div>
  );
}
