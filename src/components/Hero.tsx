import { lazy, Suspense, useLayoutEffect, useRef, useState, type MouseEvent } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { gsap, prefersReducedMotion, isCoarsePointer } from '../lib/motion';
import { hasWebGL } from '../lib/webgl';
import { scrollToId } from '../lib/smoothScroll';
import { services } from '../data/services';
import '../styles/hero.css';

const HeroScene = lazy(() => import('./HeroScene'));

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const [webgl] = useState(() => hasWebGL());
  const [reduced] = useState(() => prefersReducedMotion());
  const [mobile] = useState(() => isCoarsePointer() || window.innerWidth < 760);
  const [sceneReady, setSceneReady] = useState(false);

  useLayoutEffect(() => {
    if (reduced || !root.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
      tl.from('.hero__line > span', { yPercent: 110, duration: 1.4, stagger: 0.12 }, 0.15)
        .from('.hero__lead, .hero__ctas', { opacity: 0, y: 24, duration: 1.1, stagger: 0.1 }, 0.7)
        .from('.hero__strip li', { opacity: 0, y: 12, duration: 0.8, stagger: 0.05 }, 1);

      // Content drifts up and fades as the visitor scrolls away
      gsap.to('.hero__content', {
        yPercent: -14,
        opacity: 0.2,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      });
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  const go = (id: string) => (e: MouseEvent) => {
    e.preventDefault();
    scrollToId(id);
  };

  return (
    <section id="home" ref={root} className="hero" aria-labelledby="hero-title">
      {webgl ? (
        <Suspense fallback={null}>
          <div className={`hero__scene ${sceneReady ? 'is-ready' : ''}`}>
            <HeroScene reduced={reduced} mobile={mobile} onReady={() => setSceneReady(true)} />
          </div>
        </Suspense>
      ) : (
        <div className="hero__fallback" aria-hidden="true" />
      )}
      <div className="hero__shade" aria-hidden="true" />

      <div className="hero__content container">
        <h1 id="hero-title" className="hero__title">
          <span className="hero__line"><span>Digital Experiences.</span></span>
          <span className="hero__line hero__line--2"><span>Built to Grow Businesses.</span></span>
        </h1>

        <div className="hero__bottom">
          <p className="hero__lead">
            AS Webmarketings combines creative design, web development, SEO, and digital marketing to help businesses
            strengthen their online presence.
          </p>
          <div className="hero__ctas">
            <a href="#portfolio" className="btn btn-primary" onClick={go('portfolio')}>
              Explore our work <ArrowDown size={18} aria-hidden="true" />
            </a>
            <a href="#contact" className="btn btn-ghost-light" onClick={go('contact')}>
              Start a project <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
        </div>

        <ul className="hero__strip" aria-label="What we do">
          {services.map((s) => (
            <li key={s.id}>{s.title}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
