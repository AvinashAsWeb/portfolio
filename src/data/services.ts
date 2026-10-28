/** SERVICES — edit, reorder or delete entries. `icon` must be one of ServiceIcon (mapped in Services.tsx). */
export type ServiceIcon = 'layout' | 'wordpress' | 'search' | 'megaphone' | 'gauge' | 'lifebuoy';

export interface Service {
  id: string;
  title: string;
  summary: string;
  details: string[];
  icon: ServiceIcon;
}

export const services: Service[] = [
  {
    id: 'web-design',
    title: 'Website design & development',
    summary: 'Custom websites designed around your business and built to work on every screen.',
    details: ['Custom layouts and UI design', 'Responsive, mobile-first builds', 'Landing pages and business websites'],
    icon: 'layout',
  },
  {
    id: 'wordpress',
    title: 'WordPress development',
    summary: 'WordPress and WooCommerce websites you can update yourself.',
    details: ['Elementor and custom themes', 'WooCommerce stores', 'Plugin setup and customisation'],
    icon: 'wordpress',
  },
  {
    id: 'seo',
    title: 'Search engine optimisation',
    summary: 'Technical, on-page and local SEO to help the right customers find you.',
    details: ['Technical and on-page audits', 'Local SEO', 'Keyword and content planning'],
    icon: 'search',
  },
  {
    id: 'digital-marketing',
    title: 'Digital marketing',
    summary: 'Campaigns and content that keep your business visible online.',
    details: ['Social media marketing', 'Content planning', 'Campaign setup and reporting'],
    icon: 'megaphone',
  },
  {
    id: 'performance',
    title: 'Performance optimisation',
    summary: 'Faster pages, lighter assets and better Core Web Vitals.',
    details: ['Speed and Core Web Vitals review', 'Image and asset optimisation', 'Caching and hosting setup'],
    icon: 'gauge',
  },
  {
    id: 'support',
    title: 'Ongoing website support',
    summary: 'Updates, fixes, backups and security checks after launch.',
    details: ['Content and plugin updates', 'Backups and security checks', 'Malware cleanup and recovery'],
    icon: 'lifebuoy',
  },
];
