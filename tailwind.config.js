/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'cyber-dark': '#111111',
        'cyber-blue': '#00d9ff',
        'cyber-green': '#00ff41',
        'cyber-text': '#e0e0e0',
        'cyber-muted': '#888888',
        'cyber-border': '#333333',
        'cyber-card': '#1a1a1a',
        'cyber-red': '#ff0040',
      },
      fontFamily: {
        sans: ['monospace', 'Courier New', 'monospace'],
        mono: ['monospace', 'Courier New', 'monospace'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
    },
  },
  plugins: [],
};
