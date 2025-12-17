import Link from "next/link";
import { Header, Footer } from "@/components/layout";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-cream">
          <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="font-[family-name:var(--font-oswald)] text-4xl font-bold tracking-tight text-navy sm:text-5xl md:text-6xl">
                Furnace cleaning you can
                <span className="text-orange"> actually trust.</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-charcoal">
                We show up on time, document everything on video, and prove your
                system is clean. No surprises. No upsells. Just professional
                service you can see.
              </p>
              <div className="mt-10 flex items-center justify-center gap-4">
                <Link href="/quote" className="btn btn-primary text-lg">
                  Get Your Quote
                </Link>
                <Link href="/services" className="btn btn-outline">
                  Our Services
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Bar */}
        <section className="bg-navy py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center gap-8 text-cream md:flex-row md:gap-16">
              <div className="flex items-center gap-2">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
                </svg>
                <span className="font-[family-name:var(--font-oswald)] uppercase tracking-wide">
                  Video-Verified
                </span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <span className="font-[family-name:var(--font-oswald)] uppercase tracking-wide">
                  Transparent Pricing
                </span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                <span className="font-[family-name:var(--font-oswald)] uppercase tracking-wide">
                  Calgary-Owned
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-white py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center font-[family-name:var(--font-oswald)] text-3xl font-bold text-navy">
              How It Works
            </h2>
            <div className="mt-16 grid gap-8 md:grid-cols-3">
              {[
                {
                  step: "1",
                  title: "Get Your Quote",
                  description:
                    "Use our online calculator for instant, transparent pricing. No phone tag required.",
                },
                {
                  step: "2",
                  title: "We Clean",
                  description:
                    "Our professional technicians arrive on time and document everything on video.",
                },
                {
                  step: "3",
                  title: "See The Proof",
                  description:
                    "Receive your cleaning report with before/after videos. Know it's actually clean.",
                },
              ].map((item) => (
                <div key={item.step} className="card text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-orange text-xl font-bold text-white">
                    {item.step}
                  </div>
                  <h3 className="mt-4 font-[family-name:var(--font-oswald)] text-xl font-bold text-navy">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-charcoal">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Video Verification */}
        <section className="bg-cream py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 md:grid-cols-2 md:items-center">
              <div>
                <h2 className="font-[family-name:var(--font-oswald)] text-3xl font-bold text-navy">
                  Why Video Verification?
                </h2>
                <p className="mt-4 text-lg text-charcoal">
                  Most duct cleaning companies show up, make noise for an hour, and leave.
                  How do you know they actually cleaned anything?
                </p>
                <ul className="mt-6 space-y-4">
                  {[
                    "Before & after footage of every vent",
                    "Camera inspection of your main trunk line",
                    "Digital report sent to your email",
                    "Peace of mind that the job was done right",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <svg className="h-6 w-6 flex-shrink-0 text-orange" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
                      <span className="text-charcoal">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-lg bg-navy/10 aspect-video flex items-center justify-center">
                <span className="text-navy/50 font-[family-name:var(--font-oswald)] uppercase">
                  Video Preview Coming Soon
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-orange py-16">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="font-[family-name:var(--font-oswald)] text-3xl font-bold text-white">
              Ready to breathe easier?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/90">
              Get your instant quote in under a minute. No pressure, no
              obligations.
            </p>
            <Link
              href="/quote"
              className="btn btn-secondary mt-8 text-lg"
            >
              Get Your Quote Now
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
