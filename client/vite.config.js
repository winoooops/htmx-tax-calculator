import tailwindcss from '@tailwindcss/vite';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const target = env.VITE_API_BASE;
  return {
    plugins: [tailwindcss()],
    server: {
      proxy: {
        '/api': { target, changeOrigin: true }
      }
    }
  };
});