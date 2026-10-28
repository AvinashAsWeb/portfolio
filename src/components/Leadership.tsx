import { useRef } from 'react';
import { Mail } from 'lucide-react';
import { LinkedInIcon } from './SocialIcons';
import { team } from '../data/team';
import { safeUrl } from '../lib/url';
import { useReveal } from '../lib/useReveal';
import '../styles/leadership.css';

export default function Leadership() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  return (
    <section id="partners" ref={root} className="section lead" aria-labelledby="lead-title">
      <div className="container">
        <div className="sec-head">
          <h2 id="lead-title" data-reveal>Our partners</h2>
          <p data-reveal>The people who lead delivery, search and growth at AS Webmarketings.</p>
        </div>

        <ul className="lead__list">
          {team.map((p) => {
            const linkedin = safeUrl(p.links?.linkedin);
            return (
              <li key={p.id} className="person" data-reveal>
                <div className="person__photo">
                  <span className="person__ring" aria-hidden="true" />
                  <img src={p.photo} alt={`Portrait of ${p.name}`} width={480} height={480} loading="lazy" decoding="async" />
                </div>
                <div className="person__text">
                  <h3>{p.name}</h3>
                  <p className="person__role">{p.role}</p>
                  <p className="person__bio">{p.bio}</p>
                  {(linkedin || p.links?.email) && (
                    <div className="person__links">
                      {linkedin && (
                        <a href={linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${p.name} on LinkedIn (opens in a new tab)`}>
                          <LinkedInIcon size={20} />
                        </a>
                      )}
                      {p.links?.email && (
                        <a href={`mailto:${p.links.email}`} aria-label={`Email ${p.name}`}>
                          <Mail size={20} />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
