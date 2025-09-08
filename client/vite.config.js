import inject from '@rollup/plugin-inject';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    tailwindcss(),
    inject({
      htmx: 'htmx.org', // Injects htmx from the 'htmx.org' package
    }),
  ],
  server: {
    proxy: {
      '/api': { 
        target: 'http://localhost:3000', 
        changeOrigin: true 
      }
    }
  },
});