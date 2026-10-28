import { useLayoutEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import mark from '../assets/brand/mark.png';
import { site } from '../config/site';
import { usaProjects } from '../data/projects';
import ProjectCard from './ProjectCard';
import { useReveal } from '../lib/useReveal';
import { gsap, prefersReducedMotion } from '../lib/motion';
import '../styles/partnership.css';

/**
 * Optional: place The Marketing Cartel's logo (with their permission) in src/assets/partners/
 * and import it here, e.g. `import partnerLogo from '../assets/partners/marketing-cartel.png'`.
 */
const partnerLogo: string | null = null;

const ARC = 'M0 106 C 150 -30, 450 -30, 600 106';

export default function Partnership() {
  const root = useRef<HTMLElement>(null);
  const arc = useRef<SVGPathElement>(null);
  useReveal(root);
  const reduced = prefersReducedMotion();

  // Draw the connecting arc as the section scrolls into view
  useLayoutEffect(() => {
    if (reduced || !arc.current || !root.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        arc.current,
        { strokeDashoffset: 1, strokeDasharray: '1 1' },
        {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: { trigger: '.collab__bridge', start: 'top 85%', end: 'top 40%', scrub: 0.6 },
        },
      );
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  const showSlots = usaProjects.length === 0 && site.showPlaceholders;
  const showUsa = usaProjects.length > 0 || showSlots;

  return (
    <section id="collaboration" ref={root} className="section collab" aria-labelledby="collab-title">
      <div className="container">
        <div className="sec-head collab__head">
          <h2 id="collab-title" data-reveal>Collaborating beyond borders</h2>
          <div data-reveal>
            <p>
              AS Webmarketings collaborates with {site.partner.name}, a USA-based marketing company, on selected digital
              projects.
            </p>
            <a className="btn btn-primary collab__btn" href={site.partner.url} target="_blank" rel="noopener noreferrer">
              Visit {site.partner.name} <ArrowUpRight size={18} aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </div>

        <div className="collab__bridge" role="img" aria-label={`AS Webmarketings in India, collaborating with ${site.partner.name} in the United States`}>
          <div className="collab__node">
            <img src={mark} alt="" width={96} height={96} />
            <strong>AS Webmarketings</strong>
            <span>India</span>
          </div>

          <svg className="collab__arc" viewBox="0 0 600 110" preserveAspectRatio="none" aria-hidden="true">
            <path className="collab__arc-base" d={ARC} />
            <path ref={arc} className="collab__arc-line" d={ARC} pathLength={1} />
          </svg>

          <div className="collab__node collab__node--partner">
            {partnerLogo ? (
              <img src={partnerLogo} alt="" className="collab__partner-logo" />
            ) : (
              <span className="collab__ring" aria-hidden="true">US</span>
            )}
            <strong>{site.partner.name}</strong>
            <span>{site.partner.region}</span>
          </div>
        </div>

        {showUsa && (
          <div className="collab__usa">
            <h3 data-reveal>Selected USA projects</h3>
            {usaProjects.length > 0 ? (
              <ul className="pgrid collab__grid">
                {usaProjects.map((p) => (
                  <ProjectCard key={p.id} project={p} tone="dark" />
                ))}
              </ul>
            ) : (
              <ul className="collab__slots">
                {[1, 2, 3].map((n) => (
                  <li key={n} className="collab__slot">
                    <span className="placeholder-note">Placeholder</span>
                    <p>USA project slot. Add projects to <code>usaProjects</code> in <code>src/data/projects.ts</code>.</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
