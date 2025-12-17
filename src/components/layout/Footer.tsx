import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-navy py-12 text-cream">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="font-[family-name:var(--font-oswald)] text-xl font-bold uppercase">
              The Vent Men
            </Link>
            <p className="mt-2 text-sm text-cream/70">
              Video-Verified Duct Cleaning
            </p>
            <p className="mt-4 text-sm text-cream/70">
              Calgary&apos;s trusted choice for transparent, professional furnace and duct cleaning.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-[family-name:var(--font-oswald)] text-sm font-semibold uppercase tracking-wider">
              Services
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/services#residential" className="text-sm text-cream/70 hover:text-orange transition-colors">
                  Residential Cleaning
                </Link>
              </li>
              <li>
                <Link href="/services#furnace" className="text-sm text-cream/70 hover:text-orange transition-colors">
                  Furnace Cleaning
                </Link>
              </li>
              <li>
                <Link href="/services#duct" className="text-sm text-cream/70 hover:text-orange transition-colors">
                  Duct Cleaning
                </Link>
              </li>
              <li>
                <Link href="/quote" className="text-sm text-cream/70 hover:text-orange transition-colors">
                  Get a Quote
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-[family-name:var(--font-oswald)] text-sm font-semibold uppercase tracking-wider">
              Company
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/about" className="text-sm text-cream/70 hover:text-orange transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/service-area" className="text-sm text-cream/70 hover:text-orange transition-colors">
                  Service Area
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-cream/70 hover:text-orange transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-cream/70 hover:text-orange transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-[family-name:var(--font-oswald)] text-sm font-semibold uppercase tracking-wider">
              Contact
            </h3>
            <ul className="mt-4 space-y-2">
              <li className="text-sm text-cream/70">
                <a href="mailto:hello@theventmen.ca" className="hover:text-orange transition-colors">
                  hello@theventmen.ca
                </a>
              </li>
              <li className="text-sm text-cream/70">
                Calgary, Alberta
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-cream/20 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-cream/70">
              &copy; {new Date().getFullYear()} The Vent Men. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-cream/70">
              <Link href="/privacy" className="hover:text-orange transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-orange transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
