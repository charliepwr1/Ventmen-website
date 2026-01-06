import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <h1 className="font-display text-8xl font-bold text-orange mb-4">404</h1>
        <h2 className="font-display text-2xl font-bold text-navy mb-4">
          Page Not Found
        </h2>
        <p className="text-charcoal/70 mb-8">
          Looks like this page got sucked into the ductwork. Let&apos;s get you
          back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn btn-primary">
            Go Home
          </Link>
          <Link href="/quote" className="btn btn-outline">
            Get a Quote
          </Link>
        </div>
      </div>
    </div>
  );
}
