import { ArrowUpRight } from 'lucide-react';
import type { Project } from '../data/projects';
import { safeUrl, displayDomain } from '../lib/url';
import { site } from '../config/site';

interface Props {
  project: Project;
  tone?: 'light' | 'dark';
}

export default function ProjectCard({ project: p, tone = 'light' }: Props) {
  const url = safeUrl(p.websiteUrl);

  const body = (
    <>
      <div className="pcard__media" style={p.logoBg ? { background: p.logoBg } : undefined}>
        {p.image ? (
          <>
            <img className="pcard__shot" src={p.image} alt={`${p.name} website preview`} loading="lazy" decoding="async" />
            <span className="pcard__badge">
              <img src={p.logo} alt="" loading="lazy" decoding="async" />
            </span>
          </>
        ) : (
          <img className="pcard__logo" src={p.logo} alt={`${p.name} logo`} loading="lazy" decoding="async" />
        )}
      </div>
      <div className="pcard__meta">
        <div className="pcard__row">
          <h3 className="pcard__name">
            <span>{p.name}</span>
          </h3>
          {url && <ArrowUpRight className="pcard__arrow" size={22} aria-hidden="true" />}
        </div>
        {p.title && <p className="pcard__title">{p.title}</p>}
        <p className="pcard__cat">{p.category}</p>
        {p.description && <p className="pcard__desc">{p.description}</p>}
        {p.services && p.services.length > 0 && (
          <ul className="pcard__tags" aria-label="Services delivered">
            {p.services.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        )}
        {p.results && p.results.length > 0 && (
          <ul className="pcard__results" aria-label="Results">
            {p.results.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        )}
        {url ? (
          <span className="pcard__visit">Visit {displayDomain(url)}</span>
        ) : (
          site.showPlaceholders && <span className="placeholder-note">Website link to be added</span>
        )}
      </div>
    </>
  );

  return (
    <li className={`pcard pcard--${tone} ${p.featured ? 'pcard--featured' : ''} ${url ? 'is-link' : ''}`}>
      {url ? (
        <a
          className="pcard__inner"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${p.name}: visit website (opens in a new tab)`}
        >
          {body}
        </a>
      ) : (
        <div className="pcard__inner">{body}</div>
      )}
    </li>
  );
}
