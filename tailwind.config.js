/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'cyber-dark': '#0A0E27',
        'cyber-blue': '#00D9FF',
        'cyber-green': '#00FF88',
        'cyber-text': '#E8EDF2',
        'cyber-muted': '#8B95A5',
        'cyber-border': '#1A2332',
        'cyber-card': '#1A2332',
        'cyber-red': '#FF6B6B',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'SF Mono', 'Courier New', 'monospace'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
    },
  },
  plugins: [],
};
