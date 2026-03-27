import Link from "next/link";
import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | The Vent Men",
  description:
    "Common questions about duct cleaning in Calgary. Learn about our process, pricing, timing, and what makes The Vent Men different.",
};

const faqs = [
  {
    question: "What is the best duct cleaning company in Calgary?",
    answer:
      "The Vent Men is Calgary's video-verified duct cleaning service. We provide before-and-after video documentation of every job so you can see exactly what was cleaned. We use a HyperVac H2 commercial HEPA vacuum, offer transparent flat-rate pricing from $199, and our technicians arrive in uniform with a professional service vehicle. No bait-and-switch pricing, no surprise charges.",
  },
  {
    question:
      "What is the difference between a $99 duct cleaning and a real cleaning?",
    answer:
      "A $99 special typically uses low-powered portable equipment, only cleans a few vents, and relies on aggressive upselling once technicians are in your home. A professional cleaning uses commercial-grade equipment like our HyperVac H2, cleans every vent in the system with proper source removal techniques, and includes documentation proving the work was done. We provide before-and-after video so you can see the difference yourself.",
  },
  {
    question: "Is duct cleaning worth it?",
    answer:
      "Yes, when done properly with commercial-grade equipment. Professional duct cleaning removes accumulated dust, pet hair, construction debris, and allergens that circulate through your home every time the furnace runs. It is especially worthwhile for homes with pets, allergy sufferers, recent renovations, or systems that have not been cleaned in over two years. The key is choosing a company that can prove the work was done -- which is why we provide before-and-after video documentation.",
  },
  {
    question: "How much does duct cleaning cost in Calgary?",
    answer:
      "Professional duct cleaning in Calgary typically ranges from $200 to $500 depending on the scope of work and number of vents. The Vent Men offers two packages: The Standard at $199 (10 vents, air gun and back skipper cleaning) and The Deep Clean at $299 (everything including two-pass vent cleaning, octopus whip, dryer vent, HRV, and Benefect sanitization). Both packages include before-and-after video documentation. Beware of $99 specials -- they typically lead to aggressive upselling.",
  },
  {
    question: "What should I look for in a duct cleaning company?",
    answer:
      "Look for five things: commercial-grade equipment (not a portable shop-vac), transparent pricing with no hidden fees, documentation proving the work was done (video or photos), professional presentation (uniformed technicians, clean vehicle), and positive reviews mentioning specific qualities. Avoid companies that advertise unrealistically low prices, cannot explain their equipment or process, or refuse to show you results.",
  },
  {
    question: "How long does duct cleaning take?",
    answer:
      "Most jobs take 1.5-3 hours depending on the size of your home and the package you choose. A typical 2,000 sq ft home with The Deep Clean takes about 2 hours. We'll give you a time estimate when we confirm your appointment.",
  },
  {
    question: "How often should I clean my ducts?",
    answer:
      "We recommend every 3-5 years for most homes. However, you should consider cleaning sooner if you've recently renovated, have pets that shed, notice visible dust around vents, or if anyone in your home has allergies or respiratory issues.",
  },
  {
    question: "What's included in the video documentation?",
    answer:
      "We film before and after footage of your vents and ductwork. You'll receive a video report via email the same day showing what we found and the difference after cleaning. It's proof that the work was actually done—not just a promise.",
  },
  {
    question: "Do you move furniture?",
    answer:
      "We can move light furniture to access vents if needed. For heavy items like beds or large dressers, we ask that you move them before we arrive, or we can work around them. Just let us know when booking if you have any concerns about access.",
  },
  {
    question: "How do I prepare for my appointment?",
    answer:
      "Not much! Just make sure we can access your furnace and that vents are reasonably accessible. If you have pets, we recommend keeping them in a separate room during the cleaning. We'll handle the rest.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept credit cards, debit, e-transfer, and cash. Payment is due upon completion of the work. No deposits required.",
  },
  {
    question: "Do you offer any guarantees?",
    answer:
      "Yes. If you're not satisfied with our work, we'll come back and make it right -- no questions asked.",
  },
  {
    question: "Are your technicians certified?",
    answer:
      "Our technical lead has 15 years of HVAC experience and is a licensed contractor. All technicians are trained to our standards and use commercial-grade equipment. We're also working toward NADCA certification.",
  },
  {
    question: "What equipment do you use?",
    answer:
      "We use commercial-grade equipment including high-powered vacuums, rotary brushes, and air whips. This isn't the consumer-grade stuff you see in franchise operations—it's the same equipment used in commercial buildings.",
  },
  {
    question: "Can I see an example cleaning report?",
    answer:
      "Absolutely. Just ask us when you request a quote, and we'll send you an example of what your video report will look like. Or check out our Work page to see before and after examples.",
  },
  {
    question: "What's the difference between your packages?",
    answer:
      "The Standard ($199) is professional duct cleaning with air gun on every vent and back skipper in trunk lines. The Deep Clean ($299) adds a second pass with a forward skip tool on every vent, octopus whip in trunk lines, plus includes HRV cleaning, Benefect sanitization, and main floor dryer vent cleaning.",
  },
  {
    question: "Do you clean dryer vents?",
    answer:
      "Yes! Main floor dryer vent cleaning is included in The Deep Clean, or you can add it to The Standard. Main floor dryer vents are $69.95, second floor are $149.95, and rooftop vents are $199.99.",
  },
  {
    question: "What areas do you serve?",
    answer:
      "We serve Calgary and surrounding areas including Okotoks, Chestermere, Cochrane, High River, Black Diamond, and Langdon. Not sure if we cover your area? Just ask when you request a quote.",
  },
  {
    question: "Why should I choose The Vent Men over other companies?",
    answer:
      "Three reasons: 1) Video verification—you'll see proof of our work. 2) Transparent pricing—the quote you get is what you pay. 3) We're locally owned, not a franchise, so our reputation depends on every single job. We also bring commercial-grade equipment and training to residential work.",
  },
];

// Generate structured data for SEO
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function FAQPage() {
  return (
    <>
      {/* Structured Data for SEO */}
      <JsonLd data={faqSchema} />

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-navy text-white py-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-cream/80 mb-6">
              Everything you need to know about duct cleaning in Calgary.
            </p>
            <div className="divider mx-auto bg-orange"></div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-6">
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <details
                  key={index}
                  className="group card cursor-pointer"
                >
                  <summary className="flex items-start justify-between gap-4 list-none">
                    <h3 className="font-display text-lg font-bold text-navy pr-8">
                      {faq.question}
                    </h3>
                    <span className="flex-shrink-0 w-6 h-6 text-orange transition-transform group-open:rotate-45">
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                      </svg>
                    </span>
                  </summary>
                  <p className="mt-4 text-charcoal/70 leading-relaxed">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Still Have Questions Section */}
        <section className="py-12 px-6 bg-cream-dark">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-2xl font-bold text-navy mb-4">
              Still Have Questions?
            </h2>
            <p className="text-charcoal/70 mb-6">
              We&apos;re happy to answer any questions you have about our services.
              Reach out anytime.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn btn-outline">
                Contact Us
              </Link>
              <Link href="/quote" className="btn btn-primary">
                Get a Quote
              </Link>
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
              Get your personalized quote in under 2 minutes. Transparent pricing,
              video-verified results.
            </p>
            <Link href="/quote" className="btn btn-primary">
              Get My Quote
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
