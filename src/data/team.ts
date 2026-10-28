import anjan from '../assets/team/anjan-sarkar.webp';
import avijit from '../assets/team/avijit-saha.webp';

export interface Person {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo: string;
  /** Optional profile links — leave empty to hide */
  links?: { linkedin?: string; email?: string };
}

export const team: Person[] = [
  {
    id: 'anjan-sarkar',
    name: 'Anjan Sarkar',
    role: 'Founder · Technical Support & Business Growth',
    bio: 'Leads technical support, website delivery, and business growth initiatives, helping projects move from concept to reliable digital experiences.',
    photo: anjan,
    links: {},
  },
  {
    id: 'avijit-saha',
    name: 'Avijit Saha',
    role: 'SEO Head / Digital Marketing Head',
    bio: 'Leads SEO and digital marketing initiatives, focusing on online visibility, search performance, and digital growth strategies.',
    photo: avijit,
    links: {},
  },
];
