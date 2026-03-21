// src/components/service-area/AreaPage.tsx

import { JsonLd } from '@/components/seo/JsonLd';
import { BUSINESS, SERVICE_AREAS, SERVICES } from '@/lib/constants/schema';
import { AREA_CONTENT, type AreaSlug } from '@/lib/constants/content';
import Link from 'next/link';

export function AreaPage({ slug }: { slug: AreaSlug }) {
  const content = AREA_CONTENT[slug];
  const areaData = SERVICE_AREAS.find((a) => a.slug === slug);

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'HVACBusiness',
    '@id': `${BUSINESS.url}/#organization`,
    name: BUSINESS.name,
    url: BUSINESS.url,
    telephone: BUSINESS.telephone,
    description: content.answerBlock,
    areaServed: {
      '@type': areaData?.type ?? 'City',
      name: areaData?.name ?? slug,
      ...(areaData?.sameAs ? { sameAs: areaData.sameAs } : {}),
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `HVAC Cleaning Services in ${areaData?.name ?? slug}`,
      itemListElement: SERVICES.map((svc) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: svc.name,
          description: svc.shortDescription,
        },
      })),
    },
  };

  const faqSchema = content.faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  } : null;

  const schemas = [localBusinessSchema, ...(faqSchema ? [faqSchema] : [])];

  return (
    <>
      <JsonLd data={schemas} />

      {/* No <main> wrapper -- root layout.tsx already provides <main> */}

      {/* Answer Block */}
      <section className="bg-cream px-6 py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-display text-3xl font-bold uppercase tracking-wide text-navy md:text-5xl">
            {content.title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-charcoal md:text-xl">
            {content.answerBlock}
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link href="/quote" className="btn btn-primary">
              Get Your Free Quote
            </Link>
            <a href={`tel:${BUSINESS.telephone}`} className="btn btn-outline">
              Call {BUSINESS.telephone.replace('+1-', '')}
            </a>
          </div>
        </div>
      </section>

      {/* Local Context */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-navy">
            About Our Service in {areaData?.name}
          </h2>
          <p className="mt-4 text-charcoal">{content.localContext}</p>
          {content.neighborhoods.length > 0 && (
            <div className="mt-6">
              <h3 className="font-display text-lg font-semibold uppercase text-navy">
                Neighborhoods We Serve
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {content.neighborhoods.map((n) => (
                  <span key={n} className="border border-cream-dark bg-cream px-3 py-1 text-sm text-charcoal">
                    {n}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Services Available */}
      <section className="bg-cream-dark px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-navy">
            Services Available in {areaData?.name}
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              { href: '/services/furnace-cleaning', title: 'Furnace Cleaning', price: 'From $159.95' },
              { href: '/services/duct-cleaning', title: 'Duct Cleaning', price: 'From $159.95' },
              { href: '/services/dryer-vent-cleaning', title: 'Dryer Vent Cleaning', price: 'From $59.95' },
              { href: '/services/full-system-cleaning', title: 'Full System Cleaning', price: '$349.95' },
            ].map((svc) => (
              <Link key={svc.href} href={svc.href} className="card block p-5 transition-colors hover:border-orange">
                <h3 className="font-display font-semibold uppercase text-navy">{svc.title}</h3>
                <p className="mt-1 text-sm text-charcoal">{svc.price}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      {content.faqs.length > 0 && (
        <section className="bg-navy px-6 py-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-white">
              {areaData?.name} Duct Cleaning FAQ
            </h2>
            <dl className="mt-8 space-y-6">
              {content.faqs.map((faq, i) => (
                <div key={i} className="border-b border-white/20 pb-6">
                  <dt className="text-lg font-semibold text-white">{faq.question}</dt>
                  <dd className="mt-2 text-cream">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="px-6 py-16 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-navy md:text-3xl">
            Book Your {areaData?.name} Duct Cleaning
          </h2>
          <p className="mt-4 text-charcoal">
            Flat-rate pricing. No travel fees. Video proof of every job.
          </p>
          <Link href="/quote" className="btn btn-primary mt-8 inline-block">
            Get Your Free Quote
          </Link>
        </div>
      </section>
    </>
  );
}
