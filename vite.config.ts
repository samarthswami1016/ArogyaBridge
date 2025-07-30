import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    proxy: {
      '/google': {
        target: 'https://maps.googleapis.com',
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/google/, ''),
      },
    },
  },
});