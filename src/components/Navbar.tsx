import { useEffect, useLayoutEffect, useRef, useState, type MouseEvent } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import logo from '../assets/brand/logo.png';
import logoLight from '../assets/brand/logo-light.png';
import { scrollToId, lockScroll } from '../lib/smoothScroll';
import { useActiveSection } from '../lib/useActiveSection';
import '../styles/navbar.css';

const links = [
  { id: 'home', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'partners', label: 'Our Partners' },
  { id: 'about', label: 'About Us' },
  { id: 'contact', label: 'Contact' },
];
const sectionIds = ['home', 'services', 'portfolio', 'collaboration', 'partners', 'about', 'contact'];
// Dark sections the transparent bar can sit over
const darkSections = ['home', 'collaboration'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(sectionIds);
  const listRef = useRef<HTMLUListElement>(null);
  const [indicator, setIndicator] = useState<{ x: number; w: number } | null>(null);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Slide the active indicator under the current link
  useLayoutEffect(() => {
    const place = () => {
      const a = listRef.current?.querySelector<HTMLAnchorElement>(`a[data-id="${active}"]`);
      setIndicator(a ? { x: a.offsetLeft, w: a.offsetWidth } : null);
    };
    place();
    window.addEventListener('resize', place);
    return () => window.removeEventListener('resize', place);
  }, [active]);

  // Mobile menu: lock scroll, Esc to close, focus management
  useEffect(() => {
    lockScroll(open);
    if (!open) return;
    const first = panelRef.current?.querySelector<HTMLElement>('a, button');
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        menuBtn.current?.focus();
      }
      if (e.key === 'Tab' && panelRef.current) {
        const f = panelRef.current.querySelectorAll<HTMLElement>('a, button');
        const firstEl = f[0];
        const lastEl = f[f.length - 1];
        if (e.shiftKey && document.activeElement === firstEl) { e.preventDefault(); lastEl.focus(); }
        else if (!e.shiftKey && document.activeElement === lastEl) { e.preventDefault(); firstEl.focus(); }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const go = (id: string) => (e: MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    lockScroll(false);
    scrollToId(id);
    history.replaceState(null, '', id === 'home' ? location.pathname : `#${id}`);
  };

  const onDark = !scrolled && darkSections.includes(active);
  const light = onDark || open;

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''} ${light ? 'is-light' : ''} ${open ? 'is-open' : ''}`}>
      <div className="nav__inner container">
        <a href="#home" className="nav__logo" onClick={go('home')} aria-label="AS Webmarketings, back to top">
          <img src={light ? logoLight : logo} alt="AS Webmarketings" width={492} height={108} />
        </a>

        <nav aria-label="Primary" className="nav__desktop">
          <ul ref={listRef} className="nav__list">
            {links.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  data-id={l.id}
                  onClick={go(l.id)}
                  className={active === l.id ? 'is-active' : undefined}
                  aria-current={active === l.id ? 'true' : undefined}
                >
                  {l.label}
                </a>
              </li>
            ))}
            <span
              className="nav__indicator"
              aria-hidden="true"
              style={indicator ? { transform: `translateX(${indicator.x}px)`, width: indicator.w, opacity: 1 } : { opacity: 0 }}
            />
          </ul>
        </nav>

        <a href="#contact" className="btn btn-primary nav__cta" onClick={go('contact')}>
          Start a project <ArrowUpRight size={18} aria-hidden="true" />
        </a>

        <button
          ref={menuBtn}
          className="nav__toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      <div id="mobile-menu" ref={panelRef} className="nav__panel" hidden={!open}>
        <nav aria-label="Mobile">
          <ul>
            {links.map((l, i) => (
              <li key={l.id} style={{ animationDelay: `${60 + i * 40}ms` }}>
                <a href={`#${l.id}`} onClick={go(l.id)} aria-current={active === l.id ? 'true' : undefined}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a href="#contact" className="btn btn-primary" onClick={go('contact')}>
          Start a project <ArrowUpRight size={18} aria-hidden="true" />
        </a>
      </div>
    </header>
  );
}
