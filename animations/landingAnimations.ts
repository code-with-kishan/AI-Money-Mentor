import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * runStoryScrollAnimation – Stagger-reveals all [data-story-card] elements
 * inside the given section using ScrollTrigger.
 */
export function runStoryScrollAnimation(section: HTMLElement) {
  const cards = section.querySelectorAll("[data-story-card]");
  if (cards.length === 0) return;

  gsap.fromTo(
    Array.from(cards),
    { opacity: 0, y: 36, scale: 0.97 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.75,
      stagger: 0.14,
      ease: "power3.out",
      scrollTrigger: {
        trigger: section,
        start: "top 82%",
        toggleActions: "play none none none",
      },
    }
  );
}
