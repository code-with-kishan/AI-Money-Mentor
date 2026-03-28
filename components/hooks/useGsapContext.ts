import { useLayoutEffect, DependencyList } from "react";
import { gsap } from "gsap";

/**
 * useGsapContext - Safely create a GSAP context for a component's ref.
 * @param scopeRef - React ref to the root element
 * @param cb - Callback that receives the GSAP context
 * @param deps - Dependency list to re-run the effect if needed
 */
export function useGsapContext<T extends HTMLElement>(
  scopeRef: React.RefObject<T | null>,
  cb: (ctx: gsap.Context) => void,
  deps: DependencyList = []
) {
  useLayoutEffect(() => {
    if (!scopeRef.current) return;
    const ctx = gsap.context((self) => cb(self), scopeRef);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
