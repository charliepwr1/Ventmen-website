import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 py-12">
      {/* Logo */}
      <Image
        src="/logo-transparent.png"
        alt="The Vent Men"
        width={400}
        height={400}
        priority
        sizes="(max-width: 768px) 256px, (max-width: 1024px) 320px, 384px"
        className="w-64 md:w-80 lg:w-96 h-auto"
      />

      {/* Tagline */}
      <p className="mt-8 text-xl md:text-2xl text-charcoal text-center max-w-md">
        Duct cleaners you&apos;ll actually like.
      </p>

      {/* Divider */}
      <div className="divider mt-8 mx-auto"></div>

      {/* CTAs */}
      <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full max-w-lg">
        <Link
          href="/quote"
          className="btn btn-primary flex-1 text-center justify-center"
        >
          My Ducts Are Dirty
        </Link>
        <Link
          href="/work"
          className="btn btn-outline flex-1 text-center justify-center"
        >
          Show Me The Work
        </Link>
      </div>

      {/* Trust indicators - subtle */}
      <div className="mt-16 flex flex-col sm:flex-row items-center gap-6 sm:gap-10 text-sm text-charcoal/60">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 bg-orange rounded-full"></span>
          Video-Verified
        </span>
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 bg-orange rounded-full"></span>
          Calgary-Based
        </span>
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 bg-orange rounded-full"></span>
          Transparent Pricing
        </span>
      </div>
    </div>
  );
}
