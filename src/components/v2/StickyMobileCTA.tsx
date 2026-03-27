// src/components/v2/StickyMobileCTA.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setVisible(true);
      return;
    }

    const handleScroll = () => {
      const punchline = document.getElementById("hero-punchline");
      if (!punchline) return;
      const rect = punchline.getBoundingClientRect();
      setVisible(rect.bottom < 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 flex items-center justify-between bg-[var(--orange)] px-4 py-3 transition-opacity duration-300 md:hidden ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <span
        className="text-[0.875rem] font-bold uppercase tracking-[0.1em] text-[var(--cream)]"
        style={{ fontFamily: "var(--font-oswald)" }}
      >
        Get Your Price
      </span>
      <Link
        href="/quote"
        className="bg-[var(--navy)] px-4 py-2 text-[0.75rem] font-bold uppercase tracking-[0.1em] text-[var(--cream)]"
        style={{ fontFamily: "var(--font-oswald)" }}
      >
        Free Quote
      </Link>
    </div>
  );
}
