// src/app/v2/page.tsx
import type { Metadata } from "next";
import { HeroSetup } from "@/components/v2/HeroSetup";
import { HeroPunchline } from "@/components/v2/HeroPunchline";
import { CredentialBar } from "@/components/v2/CredentialBar";
import { DifferentiatorCards } from "@/components/v2/DifferentiatorCards";
import { BeforeAfterSlider } from "@/components/v2/BeforeAfterSlider";
import { QuoteCTA } from "@/components/v2/QuoteCTA";
import { SocialProof } from "@/components/v2/SocialProof";
import { AboutMini } from "@/components/v2/AboutMini";
import { RetroFooter } from "@/components/v2/RetroFooter";

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
      <CredentialBar />
      <DifferentiatorCards />
      <BeforeAfterSlider />
      <QuoteCTA />
      <SocialProof />
      <AboutMini />
      <RetroFooter />
    </div>
  );
}
