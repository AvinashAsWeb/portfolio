import type { MouseEvent } from 'react';
import { ArrowUpRight } from 'lucide-react';
import logoLight from '../assets/brand/logo-light.png';
import { site } from '../config/site';
import { safeUrl } from '../lib/url';
import { scrollToId } from '../lib/smoothScroll';
import { LinkedInIcon, FacebookIcon, InstagramIcon, XIcon } from './SocialIcons';
import '../styles/footer.css';

const nav = [
  { id: 'services', label: 'Services' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'collaboration', label: 'USA collaboration' },
  { id: 'partners', label: 'Our Partners' },
  { id: 'about', label: 'About Us' },
  { id: 'contact', label: 'Contact' },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const go = (id: string) => (e: MouseEvent) => {
    e.preventDefault();
    scrollToId(id);
  };
  const socials = [
    { key: 'linkedin', label: 'LinkedIn', url: safeUrl(site.social.linkedin), Icon: LinkedInIcon },
    { key: 'facebook', label: 'Facebook', url: safeUrl(site.social.facebook), Icon: FacebookIcon },
    { key: 'instagram', label: 'Instagram', url: safeUrl(site.social.instagram), Icon: InstagramIcon },
    { key: 'x', label: 'X', url: safeUrl(site.social.x), Icon: XIcon },
  ].filter((s) => s.url);
  const { email, phone, address } = site.contact;

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <img src={logoLight} alt="AS Webmarketings" width={492} height={108} loading="lazy" />
          <p>Website design, development, SEO and digital marketing for businesses that want to grow online.</p>
        </div>

        <nav aria-label="Footer" className="footer__col">
          <h2>Explore</h2>
          <ul>
            {nav.map((n) => (
              <li key={n.id}><a href={`#${n.id}`} onClick={go(n.id)}>{n.label}</a></li>
            ))}
          </ul>
        </nav>

        <div className="footer__col">
          <h2>Contact</h2>
          <ul>
            {email && <li><a href={`mailto:${email}`}>{email}</a></li>}
            {phone && <li><a href={`tel:${phone.replace(/[^\d+]/g, '')}`}>{phone}</a></li>}
            {address && <li>{address}</li>}
            {!email && !phone && !address && site.showPlaceholders && <li className="footer__ph">Contact details to be added</li>}
            <li>
              <a href={site.mainWebsite} target="_blank" rel="noopener noreferrer">
                aswebmarketings.com <ArrowUpRight size={14} aria-hidden="true" /><span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          </ul>
          {socials.length > 0 && (
            <div className="footer__social">
              {socials.map(({ key, label, url, Icon }) => (
                <a key={key} href={url!} target="_blank" rel="noopener noreferrer" aria-label={`${label} (opens in a new tab)`}>
                  <Icon size={18} />
                </a>
              ))}
            </div>
          )}
        </div>

        <div className="footer__col">
          <h2>Collaboration</h2>
          <ul>
            <li>
              <a href={site.partner.url} target="_blank" rel="noopener noreferrer">
                {site.partner.name} <ArrowUpRight size={14} aria-hidden="true" /><span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
            <li className="footer__muted">{site.partner.region}</li>
          </ul>
        </div>
      </div>
      <div className="container footer__base">
        <p>© {year} AS Webmarketings. All rights reserved.</p>
      </div>
    </footer>
  );
}
