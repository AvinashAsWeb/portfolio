/**
 * Site-wide settings. Edit this file to add real contact details,
 * social links and to hide placeholder blocks before going live.
 */
export const site = {
  name: 'AS Webmarketings',
  /** Main company website (used in the footer). */
  mainWebsite: 'https://aswebmarketings.com/',

  /**
   * Show clearly labelled placeholder blocks (empty USA project slots,
   * "link coming soon" tags, missing contact details).
   * Set to false before sharing the site with clients.
   */
  showPlaceholders: true,

  contact: {
    // Add real details here. Empty strings are hidden (or shown as placeholders).
    email: '', // e.g. 'hello@aswebmarketings.com'
    phone: '', // e.g. '+91 00000 00000'
    address: '', // e.g. 'Kolkata, West Bengal, India'
  },

  /** Leave a field empty to hide that link. */
  social: {
    linkedin: '',
    facebook: '',
    instagram: '',
    x: '',
  },

  partner: {
    name: 'The Marketing Cartel',
    url: 'https://www.marketingcartel.com/',
    region: 'United States',
  },

  /**
   * Contact form endpoint. Set VITE_FORM_ENDPOINT in a .env file
   * (see .env.example). Without it, the form validates but will not send.
   */
  formEndpoint: (import.meta.env.VITE_FORM_ENDPOINT as string | undefined) ?? '',
};
