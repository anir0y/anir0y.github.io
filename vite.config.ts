import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// Static SPA. base:'./' keeps asset paths relative so it deploys to a
// subpath, GitHub Pages project page, or a bare static host unchanged.
// Two entries: / (desktop) and /m/ (dedicated zero-animation phone edition).
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    target: 'es2020', outDir: 'dist', sourcemap: false, chunkSizeWarningLimit: 1200,
    rollupOptions: {
      input: { main: 'index.html', mobile: 'm/index.html' },
    },
  },
  test: { environment: 'node', include: ['src/**/*.test.{ts,tsx}'] },
});
