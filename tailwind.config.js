/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        'bg-alt': 'var(--bg-alt)',
        'bg-card': 'var(--bg-card)',
        'bg-inset': 'var(--bg-inset)',
        fg: 'var(--fg)',
        'fg-muted': 'var(--fg-muted)',
        'fg-faint': 'var(--fg-faint)',
        accent: 'var(--accent)',
        'accent-dim': 'var(--accent-dim)',
        'accent-glow': 'var(--accent-glow)',
        border: 'var(--border)',
        'border-strong': 'var(--border-strong)',
      },
      fontFamily: {
        sans: ['"Inter"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Courier New"', 'monospace'],
      },
      maxWidth: {
        container: '1120px',
      },
      borderRadius: {
        DEFAULT: '6px',
        lg: '14px',
        xl: '20px',
        card: '20px',
        nav: '1rem',
      },
      spacing: {
        'sp-xs': '4px',
        'sp-sm': '8px',
        'sp-md': '16px',
        'sp-lg': '24px',
        'sp-xl': '40px',
        'sp-2xl': '64px',
        'sp-3xl': '96px',
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease-out',
        'marquee': 'marquee 40s linear infinite',
        'status-pulse': 'statusPulse 2s ease-in-out infinite',
        'bob': 'bob 2.4s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        statusPulse: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)', boxShadow: '0 0 4px var(--accent)' },
          '50%': { opacity: '0.6', transform: 'scale(0.8)', boxShadow: '0 0 10px var(--accent)' },
        },
        bob: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(8px)' },
        },
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(.16, 1, .3, 1)',
      },
    },
  },
  plugins: [],
};
