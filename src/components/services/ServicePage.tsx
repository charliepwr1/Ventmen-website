// src/components/services/ServicePage.tsx

import { JsonLd } from '@/components/seo/JsonLd';
import { BUSINESS, SERVICE_AREAS } from '@/lib/constants/schema';
import { SERVICE_CONTENT, type ServiceSlug } from '@/lib/constants/content';
import Link from 'next/link';

export function ServicePage({ slug }: { slug: ServiceSlug }) {
  const content = SERVICE_CONTENT[slug];

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: content.title,
    description: content.answerBlock,
    provider: {
      '@type': 'HVACBusiness',
      '@id': `${BUSINESS.url}/#organization`,
      name: BUSINESS.name,
    },
    areaServed: SERVICE_AREAS.map((area) => ({
      '@type': area.type,
      name: area.name,
      ...(area.sameAs ? { sameAs: area.sameAs } : {}),
    })),
  };

  const faqSchema = {
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
  };

  return (
    <>
      <JsonLd data={[serviceSchema, faqSchema]} />

      {/* NOTE: No <main> wrapper -- root layout.tsx already provides <main>.
          Using a nested <main> creates invalid HTML that confuses AI crawlers. */}

      {/* Answer Block -- first 60 words, directly answers the search query */}
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

      {/* What's Included */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-navy">
            What Is Included
          </h2>
          <ul className="mt-6 space-y-3">
            {content.whatIsIncluded.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-charcoal">
                <span className="mt-1 block h-2 w-2 shrink-0 bg-orange" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Our Process */}
      <section className="bg-cream-dark px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-navy">
            Our Process
          </h2>
          <ol className="mt-8 space-y-8">
            {content.process.map((step, i) => (
              <li key={i} className="flex gap-4">
                <span className="font-display flex h-10 w-10 shrink-0 items-center justify-center bg-orange text-lg font-bold text-white">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold uppercase text-navy">
                    {step.step}
                  </h3>
                  <p className="mt-1 text-charcoal">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Equipment */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-navy">
            Our Equipment
          </h2>
          <p className="mt-4 text-charcoal">{content.equipment}</p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-navy px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-white">
            Frequently Asked Questions
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

      {/* CTA */}
      <section className="px-6 py-16 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-navy md:text-3xl">
            Ready to See the Difference?
          </h2>
          <p className="mt-4 text-charcoal">
            Get your free quote in 60 seconds. Flat-rate pricing, no surprises.
          </p>
          <Link href="/quote" className="btn btn-primary mt-8 inline-block">
            Get Your Free Quote
          </Link>
        </div>
      </section>
    </>
  );
}
