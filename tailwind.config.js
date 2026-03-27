/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'cyber-dark': '#111111',
        'cyber-blue': '#888888',
        'cyber-green': '#666666',
        'cyber-text': '#CCCCCC',
        'cyber-muted': '#666666',
        'cyber-border': '#222222',
        'cyber-card': '#1A1A1A',
        'cyber-red': '#999999',
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
