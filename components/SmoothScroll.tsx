"use client";

import { ReactNode } from "react";

/**
 * SmoothScroll — removed Lenis and gsap ticker integration.
 * Native browser scrolling is used instead for maximum performance.
 * Lenis was adding a persistent gsap.ticker callback that consumed
 * CPU every frame, competing with WaveBackground and other animations.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
