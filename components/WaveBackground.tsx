"use client";
import { useEffect, useRef } from "react";

/**
 * WaveBackground – ultra-lightweight CSS-only background.
 * Replaced canvas + gsap.ticker with a static CSS radial-gradient overlay.
 * The canvas approach was consuming CPU every frame via the gsap ticker,
 * even with throttling and IntersectionObserver. A pure CSS background
 * uses zero JavaScript and zero CPU at runtime.
 */
export function WaveBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
      style={{
        background: `
          radial-gradient(ellipse 80% 60% at 15% 20%, rgba(90,140,255,0.08) 0%, transparent 60%),
          radial-gradient(ellipse 70% 50% at 85% 70%, rgba(36,199,132,0.06) 0%, transparent 55%),
          radial-gradient(ellipse 60% 40% at 50% 50%, rgba(75,213,255,0.04) 0%, transparent 50%)
        `,
      }}
    />
  );
}
