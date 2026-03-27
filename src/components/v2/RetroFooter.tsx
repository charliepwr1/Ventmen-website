// src/components/v2/RetroFooter.tsx
import Link from "next/link";

const SERVICE_AREAS = [
  "Calgary",
  "Okotoks",
  "Chestermere",
  "Cochrane",
  "High River",
  "Langdon",
] as const;

const QUICK_LINKS = [
  { label: "Get a Quote", href: "/quote" },
  { label: "Services", href: "/services" },
  { label: "About Us", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
] as const;

export function RetroFooter() {
  return (
    <footer className="bg-[var(--navy)] px-5 pb-24 pt-12 md:pb-12">
      <div className="mx-auto max-w-3xl">
        {/* Logo */}
        <h3
          className="text-center text-[1.3rem] font-bold uppercase tracking-[0.05em] text-[var(--cream)]"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          The Vent Men
        </h3>
        <div className="mx-auto my-4 h-[2px] w-10 bg-[var(--orange)]" />

        {/* Columns */}
        <div className="flex gap-8 text-center md:text-left">
          <div className="flex-1">
            <h4
              className="mb-2 text-[0.75rem] font-bold uppercase tracking-[0.15em] text-[var(--orange)]"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              Service Areas
            </h4>
            {SERVICE_AREAS.map((area) => (
              <p key={area} className="mb-1 text-[0.8125rem] text-[#999]">
                {area}
              </p>
            ))}
          </div>
          <div className="flex-1">
            <h4
              className="mb-2 text-[0.75rem] font-bold uppercase tracking-[0.15em] text-[var(--orange)]"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              Quick Links
            </h4>
            {QUICK_LINKS.map((link) => (
              <p key={link.label} className="mb-1">
                <Link
                  href={link.href}
                  className="text-[0.8125rem] text-[#999] transition-colors hover:text-[var(--cream)]"
                >
                  {link.label}
                </Link>
              </p>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 border-t border-white/10 pt-4 text-center">
          <p
            className="text-[1rem] font-bold tracking-[0.05em] text-[var(--orange)]"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            (403) 555-VENT
          </p>
          <p className="mt-1 text-[0.6875rem] text-[#666]">
            The Vent Men Ltd. -- Calgary, Alberta
          </p>
        </div>
      </div>
    </footer>
  );
}
