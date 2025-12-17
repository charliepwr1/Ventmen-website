"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="font-[family-name:var(--font-oswald)] text-2xl font-bold uppercase text-navy">
              The Vent Men
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link href="/services" className="text-navy hover:text-orange transition-colors">
              Services
            </Link>
            <Link href="/about" className="text-navy hover:text-orange transition-colors">
              About
            </Link>
            <Link href="/service-area" className="text-navy hover:text-orange transition-colors">
              Service Area
            </Link>
            <Link href="/faq" className="text-navy hover:text-orange transition-colors">
              FAQ
            </Link>
            <Link href="/contact" className="text-navy hover:text-orange transition-colors">
              Contact
            </Link>
            <Link href="/quote" className="btn btn-primary">
              Get Your Quote
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-navy hover:text-orange"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            {mobileMenuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link
                href="/services"
                className="text-navy hover:text-orange transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                href="/about"
                className="text-navy hover:text-orange transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/service-area"
                className="text-navy hover:text-orange transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Service Area
              </Link>
              <Link
                href="/faq"
                className="text-navy hover:text-orange transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQ
              </Link>
              <Link
                href="/contact"
                className="text-navy hover:text-orange transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="/quote"
                className="btn btn-primary text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Your Quote
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
