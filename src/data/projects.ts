/**
 * PORTFOLIO DATA — the only file you need to edit to add, change or remove projects.
 *
 * Adding a project:
 *   1. Put the client logo (and optional screenshot) in src/assets/clients/
 *   2. Import it below
 *   3. Add an object to `projects` (general work) or `usaProjects` (The Marketing Cartel collaboration)
 *
 * Leave `websiteUrl` empty if you don't have the link yet — the card will not be clickable.
 * Only fill `description`, `services` and `results` with confirmed, real information.
 */
import jetflow from '../assets/clients/jetflow.webp';
import greenmall from '../assets/clients/greenmall.webp';
import hearing360 from '../assets/clients/hearing360.webp';
import espacendesign from '../assets/clients/espacendesign.webp';
import smiley from '../assets/clients/smiley.webp';
import roots from '../assets/clients/roots.webp';
import calcuttacravings from '../assets/clients/calcuttacravings.webp';
import chouzhang from '../assets/clients/chouzhang.webp';
import loominators from '../assets/clients/loominators.webp';
import luxaderm from '../assets/clients/luxaderm.webp';
import machhlibaba from '../assets/clients/machhlibaba.webp';
import moon from '../assets/clients/moon.webp';
import pran from '../assets/clients/pran.webp';

export type Region = 'india' | 'usa';

export interface Project {
  id: string;
  /** Client / business name */
  name: string;
  /** Optional project title, e.g. "E-commerce website" */
  title?: string;
  logo: string;
  /** Optional website screenshot. When set, the card shows it with the logo as a badge. */
  image?: string;
  /** Background colour behind the logo tile (match logos that have their own background). */
  logoBg?: string;
  /** Business industry or project category */
  category: string;
  description?: string;
  /** Full URL including https://. Empty = link not added yet. */
  websiteUrl: string;
  services?: string[];
  results?: string[];
  region: Region;
  /** Featured projects get a larger card */
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: 'espace-n-design',
    name: 'Espace N Design',
    logo: espacendesign,
    category: 'Interior design',
    description: 'Home interior design studio in Kolkata.',
    websiteUrl: 'https://espacendesign.com/',
    region: 'india',
    featured: true,
  },
  {
    id: 'loominators',
    name: 'Loominators',
    logo: loominators,
    logoBg: '#FCF4EE',
    category: 'E-commerce',
    description: 'WooCommerce online store.',
    websiteUrl: 'https://loominators.in/',
    region: 'india',
    featured: true,
  },
  {
    id: 'jet-flow-technologies',
    name: 'Jet Flow Technologies',
    logo: jetflow,
    category: 'Industrial manufacturing',
    websiteUrl: 'https://jetflowtechnologies.com/',
    region: 'india',
  },
  {
    id: 'green-mall',
    name: 'Green Mall',
    logo: greenmall,
    category: 'Garden centre',
    websiteUrl: 'https://greenmall.in/',
    region: 'india',
  },
  {
    id: 'hearing-360',
    name: 'Hearing 360 Degree',
    logo: hearing360,
    category: 'Hearing care',
    websiteUrl: 'https://hearingaidskolkata.com/',
    region: 'india',
  },
  {
    id: 'machhli-baba-fries',
    name: 'Machhli Baba Fries',
    logo: machhlibaba,
    logoBg: '#2B3175',
    category: 'Restaurant',
    websiteUrl: 'https://machhlibabafries.com/',
    region: 'india',
  },
  {
    id: 'luxaderm',
    name: 'Luxaderm Skin Clinic',
    logo: luxaderm,
    category: 'Skin clinic',
    websiteUrl: '', // TODO: add website URL
    region: 'india',
  },
  {
    id: 'the-roots-dental-care',
    name: 'The Roots Dental Care',
    logo: roots,
    category: 'Dental clinic',
    websiteUrl: '', // TODO: add website URL
    region: 'india',
  },
  {
    id: 'smiley-dental',
    name: 'Smiley Dental Treatment Centre',
    logo: smiley,
    category: 'Dental clinic',
    websiteUrl: '', // TODO: add website URL
    region: 'india',
  },
  {
    id: 'chou-zhang',
    name: 'Chou Zhang',
    logo: chouzhang,
    logoBg: '#FF0000',
    category: 'Restaurant',
    websiteUrl: '', // TODO: add website URL
    region: 'india',
  },
  {
    id: 'calcutta-cravings',
    name: 'Calcutta Cravings',
    logo: calcuttacravings,
    logoBg: '#FBED1D',
    category: 'Food',
    websiteUrl: '', // TODO: add website URL
    region: 'india',
  },
  {
    id: 'moon-enterprise',
    name: 'Moon Enterprise',
    logo: moon,
    category: 'Business',
    websiteUrl: '', // TODO: add website URL
    region: 'india',
  },
  {
    id: 'pran',
    name: 'Pragya Research Association',
    logo: pran,
    category: 'Research organisation',
    websiteUrl: '', // TODO: add website URL
    region: 'india',
  },
];

/**
 * Projects delivered with The Marketing Cartel (USA).
 * Copy the shape of an object above and set region: 'usa'.
 */
export const usaProjects: Project[] = [];
