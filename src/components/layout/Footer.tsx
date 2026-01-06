import Link from "next/link";

const serviceLinks = [
  { href: "/services", label: "Residential Cleaning" },
  { href: "/services", label: "Furnace Cleaning" },
  { href: "/quote", label: "Get a Quote" },
];

const companyLinks = [
  { href: "/about", label: "About Us" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="bg-navy py-16 text-cream">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link
              href="/"
              className="font-display text-xl font-bold uppercase tracking-wide"
            >
              The Vent Men
            </Link>
            <p className="mt-4 text-sm text-cream/60 leading-relaxed">
              Video-verified duct cleaning. Calgary&apos;s trusted choice for
              transparent, professional service.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display text-xs tracking-widest uppercase text-cream/40 mb-4">
              Services
            </h3>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream/70 hover:text-orange transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-display text-xs tracking-widest uppercase text-cream/40 mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream/70 hover:text-orange transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-xs tracking-widest uppercase text-cream/40 mb-4">
              Get In Touch
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:hello@theventmen.ca"
                  className="text-sm text-cream/70 hover:text-orange transition-colors"
                >
                  hello@theventmen.ca
                </a>
              </li>
              <li className="text-sm text-cream/70">Calgary, Alberta</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-cream/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-cream/40">
            &copy; {new Date().getFullYear()} The Vent Men. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="text-xs text-cream/40 hover:text-cream transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-cream/40 hover:text-cream transition-colors"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
