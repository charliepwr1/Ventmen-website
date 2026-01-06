import Link from "next/link";

// Sample gallery items - replace with real images later
const galleryItems = [
  {
    id: 1,
    title: "Downtown Condo",
    description: "5-year buildup cleared in 3 hours",
    before: "/work/before-1.jpg",
    after: "/work/after-1.jpg",
  },
  {
    id: 2,
    title: "Family Home in Tuscany",
    description: "Pet hair and dust removed from all 18 vents",
    before: "/work/before-2.jpg",
    after: "/work/after-2.jpg",
  },
  {
    id: 3,
    title: "New Construction Cleanup",
    description: "Construction debris cleared before move-in",
    before: "/work/before-3.jpg",
    after: "/work/after-3.jpg",
  },
  {
    id: 4,
    title: "Post-Renovation Deep Clean",
    description: "Drywall dust and debris removed throughout",
    before: "/work/before-4.jpg",
    after: "/work/after-4.jpg",
  },
];

export default function WorkPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-navy text-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            See the Difference
          </h1>
          <p className="text-xl text-cream/80 mb-6">
            Every job includes video verification. No smoke and mirrors—just
            clean ducts.
          </p>
          <div className="divider mx-auto bg-orange"></div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="bg-cream-dark py-6 px-6">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-8 text-sm text-charcoal">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-orange rounded-full"></span>
            Video Before &amp; After
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-orange rounded-full"></span>
            Sent Same Day
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-orange rounded-full"></span>
            No Hidden Fees
          </span>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-2xl font-bold text-navy text-center mb-8">
            Recent Work
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {galleryItems.map((item) => (
              <div key={item.id} className="card">
                {/* Before/After comparison placeholder */}
                <div className="relative aspect-video bg-cream-dark mb-4 flex items-center justify-center">
                  <div className="absolute inset-0 grid grid-cols-2">
                    <div className="bg-charcoal/20 flex items-center justify-center border-r border-white/20">
                      <span className="text-charcoal/40 font-display text-sm uppercase">
                        Before
                      </span>
                    </div>
                    <div className="bg-cream flex items-center justify-center">
                      <span className="text-charcoal/40 font-display text-sm uppercase">
                        After
                      </span>
                    </div>
                  </div>
                  {/* Placeholder for actual comparison slider */}
                  <div className="absolute inset-y-0 left-1/2 w-1 bg-orange -translate-x-1/2 z-10"></div>
                </div>

                <h3 className="font-display text-lg font-bold text-navy mb-1">
                  {item.title}
                </h3>
                <p className="text-charcoal/70 text-sm">{item.description}</p>
              </div>
            ))}
          </div>

          {/* Coming Soon Notice */}
          <div className="mt-12 text-center p-8 bg-white border border-cream-dark">
            <h3 className="font-display text-lg font-bold text-navy mb-2">
              More Videos Coming Soon
            </h3>
            <p className="text-charcoal/70 mb-4">
              We&apos;re building out our gallery with real before &amp; after
              videos from Calgary homes.
            </p>
            <p className="text-sm text-charcoal/50">
              Want to see examples? Ask us—we&apos;ll show you videos from jobs
              just like yours.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-navy py-12 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-2xl font-bold text-white mb-4">
            Ready for Clean Ducts?
          </h2>
          <p className="text-cream/70 mb-6">
            Get a transparent quote in under 2 minutes. No surprises, no
            pressure.
          </p>
          <Link href="/quote" className="btn btn-primary">
            Get My Quote
          </Link>
        </div>
      </section>
    </div>
  );
}

export const metadata = {
  title: "Our Work | The Vent Men",
  description:
    "See before and after photos of our duct cleaning work. Every job includes video verification.",
};
