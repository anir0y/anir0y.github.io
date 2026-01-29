import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { copyFileSync, mkdirSync } from 'fs';
import { join } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-img-folder',
      writeBundle() {
        const imgFiles = [
          'anir0y-logo.svg',
          'favicon.ico',
          'favicon-16x16.png',
          'favicon-32x32.png',
          'favicon-96x96.png',
          'apple-touch-icon.png',
          'android-chrome-192x192.png',
          'android-chrome-512x512.png',
        ];
        mkdirSync('dist/img', { recursive: true });
        imgFiles.forEach(file => {
          try {
            copyFileSync(join('img', file), join('dist/img', file));
          } catch (e) {
            console.warn(`Could not copy ${file}`);
          }
        });
      }
    }
  ],
  base: './', // Use relative paths for deployment
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});