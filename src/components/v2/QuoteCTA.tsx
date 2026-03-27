// src/components/v2/QuoteCTA.tsx
"use client";

import Link from "next/link";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function QuoteCTA() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({
    threshold: 0.3,
  });

  return (
    <section className="bg-[var(--cream)] px-5 py-12 md:py-16">
      <div
        ref={ref}
        className={`relative mx-auto max-w-xl border-[3px] border-[var(--navy)] p-8 text-center transition-all duration-600 ease-out md:p-12 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
        }`}
      >
        {/* Overlapping label */}
        <span
          className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--cream)] px-3 text-[0.6875rem] uppercase tracking-[0.3em] text-[var(--orange)] whitespace-nowrap"
          style={{ fontFamily: "'Courier New', Courier, monospace" }}
        >
          No Surprises
        </span>

        <h2
          className="text-[1.3rem] font-bold uppercase leading-tight tracking-[0.03em] text-[var(--navy)] md:text-[1.8rem]"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          Your Price
          <br />
          in 60 Seconds
        </h2>

        <p className="mt-3 text-[0.875rem] leading-relaxed text-[var(--charcoal)]">
          No phone tag. No bait-and-switch.
          <br />
          The price you see is the price you pay.
        </p>

        <Link
          href="/quote"
          className="mt-6 inline-block bg-[var(--orange)] px-8 py-4 text-[0.875rem] font-bold uppercase tracking-[0.15em] text-[var(--cream)]"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          Build My Quote
        </Link>

        <p
          className="mt-4 text-[0.6875rem] uppercase tracking-[0.15em] text-[#999]"
          style={{ fontFamily: "'Courier New', Courier, monospace" }}
        >
          Transparent pricing -- always
        </p>
      </div>
    </section>
  );
}
