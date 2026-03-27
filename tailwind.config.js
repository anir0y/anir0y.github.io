/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'cyber-dark': '#0a0a0a',
        'cyber-darker': '#050505',
        'cyber-blue': '#00d4ff',
        'cyber-green': '#00ff88',
        'cyber-text': '#e8e8e8',
        'cyber-muted': '#6b7280',
        'cyber-border': '#1f1f1f',
        'cyber-card': '#111111',
        'cyber-red': '#ff3366',
        'cyber-surface': '#161616',
      },
      fontFamily: {
        sans: ['"SF Mono"', '"Fira Code"', '"JetBrains Mono"', 'monospace'],
        mono: ['"SF Mono"', '"Fira Code"', '"JetBrains Mono"', 'monospace'],
        display: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease-out',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)',
        'radial-glow': 'radial-gradient(circle at 50% 50%, rgba(0,212,255,0.08) 0%, transparent 70%)',
      },
      backgroundSize: {
        'grid': '64px 64px',
      },
    },
  },
  plugins: [],
};
