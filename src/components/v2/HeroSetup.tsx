// src/components/v2/HeroSetup.tsx

export function HeroSetup() {
  return (
    <section
      className="relative flex min-h-[100dvh] flex-col items-center justify-center bg-[var(--navy)] px-6 text-center"
    >
      {/* Location pill */}
      <span
        className="mb-6 inline-block bg-[var(--cream)] px-3 py-1 text-[0.75rem] uppercase tracking-[0.4em] text-[var(--navy)]"
        style={{ fontFamily: "'Courier New', Courier, monospace" }}
      >
        Calgary, AB
      </span>

      {/* Setup headline */}
      <h1
        className="text-[1.8rem] leading-[1.05] font-bold uppercase tracking-[0.03em] text-[var(--cream)] md:text-[3rem]"
        style={{ fontFamily: "var(--font-oswald)" }}
      >
        You wouldn&apos;t
        <br />
        drink
        <br />
        dirty water.
      </h1>

      {/* Scroll prompt */}
      <div
        className="absolute bottom-6 flex flex-col items-center animate-pulse"
        style={{ fontFamily: "'Courier New', Courier, monospace" }}
      >
        <span className="text-[0.75rem] uppercase tracking-[0.2em] text-[var(--orange)]">
          Scroll
        </span>
        <span className="mt-1 animate-bounce text-xl text-[var(--orange)]">
          &#8595;
        </span>
      </div>
    </section>
  );
}
