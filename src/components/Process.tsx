import { useLayoutEffect, useRef } from 'react';
import { steps } from '../data/process';
import { site } from '../config/site';
import { useReveal } from '../lib/useReveal';
import { gsap, prefersReducedMotion } from '../lib/motion';
import '../styles/process.css';

export default function Process() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    const mm = gsap.matchMedia();
    const build = (axis: 'x' | 'y') => {
      const nodes = el.querySelectorAll<HTMLElement>('.step__dot');
      const tl = gsap.timeline({
        scrollTrigger: { trigger: '.timeline', start: axis === 'x' ? 'top 75%' : 'top 70%', end: axis === 'x' ? 'top 30%' : 'bottom 60%', scrub: 0.5 },
      });
      tl.fromTo('.timeline__progress', axis === 'x' ? { scaleX: 0 } : { scaleY: 0 }, { scaleX: 1, scaleY: 1, ease: 'none', duration: nodes.length });
      nodes.forEach((n, i) => {
        tl.to(n, { backgroundColor: '#ff7506', borderColor: '#ff7506', color: '#000', duration: 0.2 }, i * (nodes.length / (nodes.length - 1)) * 0.98);
      });
    };
    mm.add({ wide: '(min-width: 900px)', narrow: '(max-width: 899px)' }, (c) => {
      gsap.context(() => build(c.conditions?.wide ? 'x' : 'y'), el);
    });
    return () => mm.revert();
  }, []);

  return (
    <section id="about" ref={root} className="section process" aria-labelledby="about-title">
      <div className="container">
        <div className="sec-head">
          <h2 id="about-title" data-reveal>About us</h2>
          <div data-reveal className="process__about">
            <p>
              AS Webmarketings is a digital agency for website design, web development, SEO and digital marketing. We
              plan the website and the marketing together, so the work you launch is built to be found.
            </p>
            <p>We also collaborate with {site.partner.name} in the United States on selected projects.</p>
          </div>
        </div>

        <h3 className="process__title" data-reveal>How a project moves forward</h3>
        <div className="timeline">
          <span className="timeline__track" aria-hidden="true">
            <span className="timeline__progress" />
          </span>
          <ol className="timeline__list">
          {steps.map((s, i) => (
            <li key={s.title} className="step">
              <span className="step__dot" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <h4 className="step__title">{s.title}</h4>
              <p className="step__text">{s.text}</p>
            </li>
          ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
