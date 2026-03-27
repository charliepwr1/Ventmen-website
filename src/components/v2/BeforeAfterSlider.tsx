// src/components/v2/BeforeAfterSlider.tsx
"use client";

import { useCallback, useRef, useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function BeforeAfterSlider() {
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLDivElement>({
    threshold: 0.3,
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const isDragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.min(90, Math.max(10, (x / rect.width) * 100));
    setPosition(percent);
  }, []);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      isDragging.current = true;
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      updatePosition(e.clientX);
    },
    [updatePosition]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current) return;
      updatePosition(e.clientX);
    },
    [updatePosition]
  );

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      setPosition((p) => Math.max(10, p - 5));
    } else if (e.key === "ArrowRight") {
      setPosition((p) => Math.min(90, p + 5));
    }
  }, []);

  return (
    <section ref={sectionRef} className="bg-[var(--navy)] px-5 py-12 md:py-16">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <p
          className="mb-1 text-center text-[0.75rem] uppercase tracking-[0.4em] text-[var(--orange)]"
          style={{ fontFamily: "'Courier New', Courier, monospace" }}
        >
          See The Proof
        </p>
        <h2
          className="mb-6 text-center text-[1.1rem] font-bold uppercase tracking-[0.05em] text-[var(--cream)] md:text-[1.5rem]"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          Don&apos;t Take Our
          <br className="md:hidden" /> Word For It
        </h2>

        {/* Slider */}
        <div
          ref={containerRef}
          className={`relative h-[200px] cursor-col-resize select-none overflow-hidden border-2 border-[var(--orange)] transition-all duration-600 ease-out md:h-[300px] ${
            isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          role="slider"
          aria-label="Before and after comparison"
          aria-valuemin={10}
          aria-valuemax={90}
          aria-valuenow={Math.round(position)}
          tabIndex={0}
          onKeyDown={handleKeyDown}
        >
          {/* Before side */}
          <div
            className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#2a2a2a] to-[#3d3d3d]"
          >
            <span
              className="text-[0.875rem] font-bold uppercase tracking-[0.2em] text-[var(--orange)]"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              Before
            </span>
          </div>

          {/* After side (clips based on position) */}
          <div
            className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#e8e4dc] to-[var(--cream)]"
            style={{ clipPath: `inset(0 0 0 ${position}%)` }}
          >
            <span
              className="text-[0.875rem] font-bold uppercase tracking-[0.2em] text-[var(--navy)]"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              After
            </span>
          </div>

          {/* Divider line + handle */}
          <div
            className="absolute top-0 h-full w-[3px] bg-[var(--orange)]"
            style={{ left: `${position}%`, transform: "translateX(-50%)" }}
          >
            <div className="absolute left-1/2 top-1/2 flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[var(--cream)] bg-[var(--orange)] text-xs text-white">
              &#8596;
            </div>
          </div>
        </div>

        <p
          className="mt-3 text-center text-[0.6875rem] uppercase tracking-[0.1em] text-[#666]"
          style={{ fontFamily: "'Courier New', Courier, monospace" }}
        >
          Drag to compare
        </p>
      </div>
    </section>
  );
}
