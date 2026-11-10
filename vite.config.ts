import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import type { Plugin } from 'vite';
import { renderMobileHtml } from './src/mobile/static';

// The phone edition (/m/) is plain HTML: its text is generated here from the
// shared data files and injected into m/index.html. It ships no JavaScript bundle.
function mobileStatic(): Plugin {
  return {
    name: 'mobile-static',
    transformIndexHtml: {
      order: 'pre',
      handler(html, ctx) {
        if (!ctx.filename.replace(/\\/g, '/').endsWith('/m/index.html')) return html;
        return html.replace('<!--MOBILE_CONTENT-->', renderMobileHtml());
      },
    },
  };
}

// Static SPA. base:'./' keeps asset paths relative so it deploys to a
// subpath, GitHub Pages project page, or a bare static host unchanged.
// Two entries: / (desktop app) and /m/ (static plain-HTML phone edition).
export default defineConfig({
  base: './',
  plugins: [react(), mobileStatic()],
  build: {
    target: 'es2020', outDir: 'dist', sourcemap: false, chunkSizeWarningLimit: 1200,
    rollupOptions: {
      input: { main: 'index.html', mobile: 'm/index.html' },
    },
  },
  test: { environment: 'node', include: ['src/**/*.test.{ts,tsx}'] },
});
