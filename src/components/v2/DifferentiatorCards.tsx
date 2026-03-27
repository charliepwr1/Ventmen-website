// src/components/v2/DifferentiatorCards.tsx
"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

const DIFFERENTIATORS = [
  {
    title: "Uniformed, Professional Techs",
    description: "Clean-cut, on time, booties on. Every time.",
  },
  {
    title: "Truck-Mounted HyperVac Equipment",
    description: "Commercial-grade power. Not a shop vac in a minivan.",
  },
  {
    title: "Clean Home Guarantee",
    description: "We leave your home cleaner than we found it. Guaranteed.",
  },
] as const;

export function DifferentiatorCards() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({
    threshold: 0.2,
  });

  return (
    <section
      id="why-different"
      className="bg-[var(--cream)] px-5 py-12 md:py-16"
    >
      <div className="mx-auto max-w-5xl">
        {/* Section header */}
        <p
          className="mb-1 text-center text-[0.75rem] uppercase tracking-[0.4em] text-[var(--navy)]"
          style={{ fontFamily: "'Courier New', Courier, monospace" }}
        >
          Why Choose Us
        </p>
        <h2
          className="mb-8 text-center text-[1.3rem] font-bold uppercase tracking-[0.05em] text-[var(--navy)] md:text-[1.8rem]"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          Not Your Average
          <br className="md:hidden" /> Duct Cleaners
        </h2>

        {/* Cards */}
        <div ref={ref} className="flex flex-col gap-3 md:flex-row md:gap-6">
          {DIFFERENTIATORS.map((item, i) => (
            <div
              key={item.title}
              className={`border-l-4 border-[var(--orange)] bg-white px-4 py-4 transition-all duration-500 ease-out md:flex-1 ${
                isVisible
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-5 opacity-0"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <h3
                className="text-[0.875rem] font-bold uppercase tracking-[0.05em] text-[var(--navy)]"
                style={{ fontFamily: "var(--font-oswald)" }}
              >
                {item.title}
              </h3>
              <p className="mt-1 text-[0.8125rem] leading-relaxed text-[var(--charcoal)]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
