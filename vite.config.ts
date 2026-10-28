import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Deployed at the root of a subdomain (e.g. portfolio.yourdomain.com), so base stays '/'.
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    target: 'es2020',
    assetsInlineLimit: 4096,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // three.js is only reached through the lazy-loaded hero scene, so Rollup keeps it in its own
        // chunk that downloads after the page is interactive.
        manualChunks: {
          gsap: ['gsap', 'lenis'],
        },
      },
    },
  },
});
