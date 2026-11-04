import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages project page: https://<user>.github.io/bizneslab/
// The production base must match the repository name. Local dev keeps `/`.
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/bizneslab/' : '/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    target: 'es2022',
    cssCodeSplit: true,
    sourcemap: false,
    reportCompressedSize: false,
  },
  server: {
    port: 5173,
    host: true,
  },
  preview: {
    port: 4173,
    host: true,
  },
}));
