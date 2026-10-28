import { useLayoutEffect, type RefObject } from 'react';
import { gsap, ScrollTrigger, prefersReducedMotion } from './motion';

/** Reveals elements marked [data-reveal] inside `scope` as they scroll into view. */
export function useReveal(scope: RefObject<HTMLElement | null>): void {
  useLayoutEffect(() => {
    const root = scope.current;
    if (!root || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const items = root.querySelectorAll<HTMLElement>('[data-reveal]');
      ScrollTrigger.batch(items, {
        start: 'top 88%',
        once: true,
        onEnter: (els) =>
          gsap.to(els, { opacity: 1, y: 0, duration: 1, ease: 'expo.out', stagger: 0.08, overwrite: true }),
      });
    }, root);
    return () => ctx.revert();
  }, [scope]);
}
