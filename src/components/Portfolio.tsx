import { useRef, type MouseEvent } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '../data/projects';
import ProjectCard from './ProjectCard';
import { useReveal } from '../lib/useReveal';
import { scrollToId } from '../lib/smoothScroll';
import '../styles/portfolio.css';

export default function Portfolio() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);
  const list = projects.filter((p) => p.region !== 'usa');

  const toContact = (e: MouseEvent) => {
    e.preventDefault();
    scrollToId('contact');
  };

  return (
    <section id="portfolio" ref={root} className="section portfolio" aria-labelledby="portfolio-title">
      <div className="container">
        <div className="sec-head">
          <h2 id="portfolio-title" data-reveal>Work we’ve delivered</h2>
          <p data-reveal>
            Websites and digital marketing for businesses across industries. Select a project to open the live website
            in a new tab.
          </p>
        </div>

        <ul className="pgrid">
          {list.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
          <li className="pcard pcard--cta">
            <a href="#contact" className="pcard__inner" onClick={toContact}>
              <span className="pcard__cta-text">Your project could be next.</span>
              <span className="pcard__cta-link">
                Start a project <ArrowUpRight size={20} aria-hidden="true" />
              </span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
