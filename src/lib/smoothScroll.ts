import Lenis from 'lenis';
import { gsap, ScrollTrigger, prefersReducedMotion } from './motion';

let lenis: Lenis | null = null;

/** Smooth wheel scrolling on desktop only. Touch devices and reduced-motion users keep native scrolling. */
export function initSmoothScroll(): () => void {
  if (prefersReducedMotion()) return () => {};
  lenis = new Lenis({ duration: 1.1, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  const tick = (time: number) => lenis?.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  return () => {
    gsap.ticker.remove(tick);
    lenis?.destroy();
    lenis = null;
  };
}

const NAV_OFFSET = 72;

export function scrollToId(id: string): void {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) {
    lenis.scrollTo(el, { offset: id === 'home' ? 0 : -NAV_OFFSET + 1 });
  } else {
    const top = id === 'home' ? 0 : el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET + 1;
    window.scrollTo({ top, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  }
  // Move keyboard focus to the section for screen reader / keyboard users
  el.setAttribute('tabindex', '-1');
  el.focus({ preventScroll: true });
}

export function lockScroll(locked: boolean): void {
  if (lenis) (locked ? lenis.stop() : lenis.start());
  document.documentElement.style.overflow = locked ? 'hidden' : '';
}
