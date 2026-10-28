import { useRef, useState } from 'react';
import { LayoutTemplate, Blocks, Search, Megaphone, Gauge, LifeBuoy, Plus, type LucideIcon } from 'lucide-react';
import { services, type ServiceIcon } from '../data/services';
import { useReveal } from '../lib/useReveal';
import '../styles/services.css';

const icons: Record<ServiceIcon, LucideIcon> = {
  layout: LayoutTemplate,
  wordpress: Blocks,
  search: Search,
  megaphone: Megaphone,
  gauge: Gauge,
  lifebuoy: LifeBuoy,
};

export default function Services() {
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<string | null>(null);
  useReveal(root);

  return (
    <section id="services" ref={root} className="section services" aria-labelledby="services-title">
      <div className="container services__grid">
        <div className="services__intro">
          <h2 id="services-title" data-reveal>What we do</h2>
          <p data-reveal>
            Design, development and marketing under one roof, so your website and your visibility are planned together.
          </p>
        </div>

        <ul className="services__list">
          {services.map((s) => {
            const Icon = icons[s.icon];
            const isOpen = open === s.id;
            return (
              <li key={s.id} className={`svc ${isOpen ? 'is-open' : ''}`} data-reveal>
                <button
                  className="svc__head"
                  aria-expanded={isOpen}
                  aria-controls={`svc-${s.id}`}
                  onClick={() => setOpen(isOpen ? null : s.id)}
                >
                  <span className="svc__icon" aria-hidden="true">
                    <Icon size={22} strokeWidth={1.75} />
                  </span>
                  <span className="svc__text">
                    <span className="svc__title">{s.title}</span>
                    <span className="svc__summary">{s.summary}</span>
                  </span>
                  <span className="svc__toggle" aria-hidden="true">
                    <Plus size={20} />
                  </span>
                  <span className="sr-only">{isOpen ? 'Hide details' : 'Learn more'}</span>
                </button>
                <div id={`svc-${s.id}`} className="svc__body" role="region" aria-label={`${s.title} details`}>
                  <div className="svc__body-inner">
                    <ul>
                      {s.details.map((d) => (
                        <li key={d}>{d}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
