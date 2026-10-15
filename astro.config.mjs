import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  // Site URL — replace with the real production domain when deploying.
  site: 'https://smartstopmcbo.vercel.app',

  // Astro Island Architecture: components ship zero JS unless hydrated
  // explicitly via `client:load`, `client:visible`, `client:idle`, etc.
  integrations: [
    react(),
    tailwind({
      // We provide our own base styles in src/styles/global.css
      applyBaseStyles: false,
    }),
  ],

  // Vite tweaks — React plugin is wired automatically by @astrojs/react.
  vite: {
    ssr: {
      noExternal: ['nanostores'],
    },
  },

  // Compress HTML output for faster mobile downloads on 3G/4G.
  compressHTML: true,

  // Prettier image pipeline defaults (Astro's built-in image optimizer).
  image: {
    responsiveStyles: true,
  },
});
