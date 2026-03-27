// src/components/v2/CredentialBar.tsx

const CREDENTIALS = [
  { value: "4.9/5", label: "Google Rating" },
  { value: "$0", label: "Hidden Fees" },
  { value: "100%", label: "Satisfaction" },
] as const;

export function CredentialBar() {
  return (
    <div className="flex items-center justify-around bg-[var(--navy)] px-4 py-3">
      {CREDENTIALS.map((cred) => (
        <div key={cred.label} className="text-center">
          <div
            className="text-[1.1rem] font-bold text-[var(--orange)] md:text-[1.3rem]"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            {cred.value}
          </div>
          <div
            className="mt-0.5 text-[0.6875rem] uppercase tracking-[0.1em] text-[var(--cream)]"
            style={{ fontFamily: "'Courier New', Courier, monospace" }}
          >
            {cred.label}
          </div>
        </div>
      ))}
    </div>
  );
}
