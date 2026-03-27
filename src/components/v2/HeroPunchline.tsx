// src/components/v2/HeroPunchline.tsx
"use client";

import Link from "next/link";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function HeroPunchline() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({
    threshold: 0.15,
  });

  const base = "transition-all duration-700 ease-out";
  const hidden = "translate-y-5 opacity-0";
  const shown = "translate-y-0 opacity-100";

  return (
    <section
      className="relative flex min-h-[70dvh] flex-col items-center justify-center overflow-hidden bg-[var(--orange)] px-6 py-20 text-center"
      id="hero-punchline"
    >
      {/* Texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, #000 2px, #000 3px)",
        }}
      />

      <div ref={ref} className="relative z-10">
        {/* Punchline headline */}
        <h2
          className={`text-[3rem] leading-[0.9] font-bold uppercase tracking-[0.02em] text-white md:text-[4.5rem] ${base} ${isVisible ? shown : hidden}`}
          style={{
            fontFamily: "var(--font-oswald)",
            textShadow: "2px 2px 0 rgba(0,0,0,0.15)",
          }}
        >
          Stop
          <br />
          breathing
          <br />
          dirty air.
        </h2>

        {/* Divider */}
        <div
          className={`mx-auto my-5 h-[3px] w-[60px] bg-[var(--navy)] ${base} delay-200 ${isVisible ? shown : hidden}`}
        />

        {/* Tagline */}
        <p
          className={`text-[1rem] font-bold uppercase tracking-[0.15em] text-[var(--navy)] md:text-[1.125rem] ${base} delay-300 ${isVisible ? shown : hidden}`}
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          Honest Duct Cleaning. Done Right.
        </p>

        {/* CTAs */}
        <div
          className={`mt-8 flex justify-center gap-3 ${base} delay-500 ${isVisible ? shown : hidden}`}
        >
          <Link
            href="/quote"
            className="bg-[var(--navy)] px-6 py-3 text-[0.9rem] font-bold uppercase tracking-[0.1em] text-[var(--cream)] transition-opacity hover:opacity-90"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            Get My Price
          </Link>
          <a
            href="#why-different"
            className="border-2 border-white px-6 py-3 text-[0.9rem] font-bold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-80"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}
