// @ts-check
import { defineConfig } from 'astro/config';
import Icon from "astro-icon";
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  server: { port: 1234, host: true},
  vite: {
    build: {
      minify: 'esbuild', // Usa esbuild para minificar (es la opción predeterminada)
    },
    server: {
      host: '0.0.0.0', // Escucha en todas las interfaces de red
      port: 3000,      // O el puerto que prefieras
    },
  },
  integrations: [
    Icon({
      include: {
        // Include only three `mdi` icons in the bundle
        mdi: ['*'],
        // Include all `uis` icons
        uis: ['*']
      }}),
    react(),
    tailwind({
      applyBaseStyles: true,
    }),
  ],
})
