// src/components/v2/SocialProof.tsx
"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

const REVIEWS = [
  {
    text: "Finally, a duct cleaning company that actually showed up on time and did what they said they'd do.",
    author: "Sarah M., Okotoks",
  },
  {
    text: "Professional from start to finish. They even put booties on before coming in. Night and day from the last company.",
    author: "Mike T., Calgary SW",
  },
  {
    text: "No upselling, no surprises. Just honest work at a fair price. Already recommended to my neighbors.",
    author: "Jennifer L., Chestermere",
  },
] as const;

export function SocialProof() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({
    threshold: 0.2,
  });

  return (
    <section className="bg-[var(--navy)] px-5 py-12 md:py-16">
      <div className="mx-auto max-w-5xl">
        <p
          className="mb-1 text-center text-[0.75rem] uppercase tracking-[0.4em] text-[var(--orange)]"
          style={{ fontFamily: "'Courier New', Courier, monospace" }}
        >
          What Calgary Says
        </p>
        <div className="mb-6 text-center text-[1.2rem] tracking-[0.15em] text-[var(--orange)]">
          &#9733;&#9733;&#9733;&#9733;&#9733;
        </div>

        <div ref={ref} className="flex flex-col gap-4 md:flex-row md:gap-6">
          {REVIEWS.map((review, i) => (
            <div
              key={review.author}
              className={`border-l-2 border-[var(--orange)] py-2 pl-4 transition-all duration-500 ease-out md:flex-1 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <p
                className="text-[0.8125rem] italic leading-relaxed text-[var(--cream)]"
                style={{ fontFamily: "'Courier New', Courier, monospace" }}
              >
                &ldquo;{review.text}&rdquo;
              </p>
              <p className="mt-2 text-[0.75rem] text-[#999]">
                -- {review.author}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
