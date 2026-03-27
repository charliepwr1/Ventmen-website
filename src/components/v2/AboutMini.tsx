// src/components/v2/AboutMini.tsx
import Link from "next/link";

export function AboutMini() {
  return (
    <section className="bg-[var(--cream)] px-5 py-12 text-center md:py-16">
      <div className="mx-auto max-w-xl">
        <p
          className="mb-1 text-[0.75rem] uppercase tracking-[0.4em] text-[var(--orange)]"
          style={{ fontFamily: "'Courier New', Courier, monospace" }}
        >
          Meet The Team
        </p>
        <h2
          className="mb-4 text-[1.1rem] font-bold uppercase tracking-[0.05em] text-[var(--navy)] md:text-[1.5rem]"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          Dan & Charlie
        </h2>

        <p className="mb-2 text-[0.875rem] leading-relaxed text-[var(--charcoal)]">
          Two Calgary guys who got tired of hearing horror stories about duct
          cleaning companies. So we started one that does it right.
        </p>
        <p className="mb-6 text-[0.875rem] leading-relaxed text-[var(--charcoal)]">
          Indigenous-owned. Locally operated. No corporate nonsense.
        </p>

        <Link
          href="/about"
          className="inline-block border-b border-[var(--orange)] pb-0.5 text-[0.875rem] font-bold uppercase tracking-[0.1em] text-[var(--orange)]"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          Our Full Story &#8594;
        </Link>
      </div>
    </section>
  );
}
