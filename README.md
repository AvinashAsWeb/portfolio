# AS Webmarketings Portfolio

Single-page portfolio site. React 19 + Vite 7 + TypeScript, Three.js (React Three Fiber) hero, GSAP ScrollTrigger, Lenis smooth scroll.

## Edit content (no component changes needed)

| What | File |
|---|---|
| Client projects (India/general) | `src/data/projects.ts` → `projects` |
| USA projects (The Marketing Cartel) | `src/data/projects.ts` → `usaProjects` |
| Client logos / screenshots | `src/assets/clients/` (WebP, ~560px wide) |
| Services | `src/data/services.ts` |
| Partners (bios, photos, links) | `src/data/team.ts`, photos in `src/assets/team/` |
| Email, phone, address, social links, placeholder switch | `src/config/site.ts` |
| SEO title, description, Open Graph URL | `index.html` |

Set `showPlaceholders: false` in `src/config/site.ts` before sharing with clients.
A project with an empty `websiteUrl` is shown but not clickable. Only add real descriptions/results.

## Run locally (needs Node.js 20.19+ — not available on Windows 7)

```
npm install
npm run dev       # http://localhost:5173
npm run build     # outputs dist/
npm run preview   # serve the build
```
No Node? Use GitHub Codespaces (free tier) in the browser: open the repo → Code → Codespaces → run the commands above.

## Contact form

The form validates in the browser but **does not send anything until an endpoint is set**.
1. Copy `.env.example` to `.env` and set `VITE_FORM_ENDPOINT` — either a Formspree form URL, or `integrations/contact.php` uploaded to your server.
2. Rebuild (`npm run build`) and re-upload `dist/`.
Spam protection: honeypot field + minimum fill time are built in. A captcha (e.g. Cloudflare Turnstile) can be added where marked in `src/components/Contact.tsx`.

## Deploy to a subdomain (e.g. portfolio.aswebmarketings.com)

1. Hosting panel (cPanel / Hostinger hPanel) → Domains/Subdomains → create `portfolio`. Note its folder (e.g. `public_html/portfolio`).
2. Upload **the contents of `dist/`** (not the folder itself) into that folder. Include the hidden `.htaccess`.
3. SSL → issue a free certificate (AutoSSL / Let's Encrypt) for the subdomain. Then uncomment the HTTPS redirect in `.htaccess`.
4. Replace `https://portfolio.example.com` in `index.html` with the real URL, rebuild, re-upload.
5. If DNS is elsewhere (e.g. Cloudflare), add an `A` record `portfolio` → your hosting IP.

Works on any static host (Netlify, Vercel, Cloudflare Pages: build command `npm run build`, output `dist`).
