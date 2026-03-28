"use client";

import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function GSAPConfig() {
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Set global performance defaults
    gsap.defaults({
      lazy: true,
      overwrite: "auto",
      duration: 0.5,
      ease: "power2.out",
    });

    // Optional: Global ScrollTrigger defaults
    ScrollTrigger.config({
      limitCallbacks: true,
      ignoreMobileResize: true,
    });
  }, []);

  return null;
}
