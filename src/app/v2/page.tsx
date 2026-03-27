// src/app/v2/page.tsx
import type { Metadata } from "next";
import { HeroSetup } from "@/components/v2/HeroSetup";
import { HeroPunchline } from "@/components/v2/HeroPunchline";

export const metadata: Metadata = {
  title: "Home V2 | The Vent Men",
  description:
    "You wouldn't drink dirty water. Stop breathing dirty air. Honest duct cleaning in Calgary.",
  robots: { index: false, follow: false },
};

export default function V2HomePage() {
  return (
    <div>
      <HeroSetup />
      <HeroPunchline />
    </div>
  );
}
