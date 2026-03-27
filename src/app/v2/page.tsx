// src/app/v2/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home V2 | The Vent Men",
  description:
    "You wouldn't drink dirty water. Stop breathing dirty air. Honest duct cleaning in Calgary.",
  robots: { index: false, follow: false },
};

export default function V2HomePage() {
  return (
    <div>
      {/* Sections will be added here */}
      <section className="min-h-screen flex items-center justify-center bg-[var(--navy)]">
        <h1
          className="text-4xl font-bold text-[var(--cream)] uppercase"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          V2 Homepage Shell
        </h1>
      </section>
    </div>
  );
}
