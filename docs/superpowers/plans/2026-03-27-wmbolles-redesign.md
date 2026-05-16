# wmbolles.com-Inspired Redesign Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign anir0y.in to match wmbolles.com's clean, minimal aesthetic with light/dark theme, bento grid, logo marquee, scroll reveals, and view transition theme toggle — while keeping Tailwind CSS and existing content.

**Architecture:** Replace the cyberpunk dark-only theme with a wmbolles-inspired design system using CSS custom properties for theming (light/dark) integrated into Tailwind via `extend`. Swap framer-motion scroll animations with a lightweight Intersection Observer-based scroll reveal system. Implement View Transition API for theme switching with circle-reveal animation. Restructure layout: floating card navbar, hero with avatar, tech marquee, bento grid for projects+labs, split contact section, 3-column footer.

**Tech Stack:** React 18 + TypeScript, Vite, Tailwind CSS 3.4 (with CSS custom properties), View Transition API, Intersection Observer API, lucide-react icons. Keep framer-motion only for complex interactions (mobile nav).

---

## File Structure

### New Files
- `src/hooks/useTheme.ts` — Theme toggle logic with localStorage + View Transition API
- `src/hooks/useScrollReveal.ts` — Intersection Observer-based scroll reveal hook
- `src/components/ThemeToggle.tsx` — Sun/Moon toggle button component
- `src/components/CardNav.tsx` — Floating card navbar (replaces Header.tsx)
- `src/components/TechMarquee.tsx` — Infinite scrolling tech logo marquee
- `src/components/BentoGrid.tsx` — Bento grid layout for projects + labs
- `src/components/ScrollReveal.tsx` — Wrapper component for scroll-triggered animations
- `src/components/About.tsx` — About section with bio + metrics
- `src/data/techStack.ts` — Tech stack data for marquee

### Modified Files
- `tailwind.config.js` — New color system with CSS variables, typography, spacing
- `src/index.css` — Complete restyle: CSS custom properties, theme vars, component classes
- `src/App.tsx` — New layout structure, theme provider
- `src/components/Hero.tsx` — Redesign to wmbolles style (avatar + big title + bio)
- `src/components/Contact.tsx` — Split 2-column layout
- `src/components/Footer.tsx` — 3-column grid with accent topline + status dot
- `src/components/MobileNav.tsx` — Restyle to match new theme
- `index.html` — Add `data-theme` attribute, update meta theme-color
- `src/types/index.ts` — Add new types (TechItem, etc.)

### Removed/Replaced Files
- `src/components/Header.tsx` → replaced by `CardNav.tsx`
- `src/components/Projects.tsx` → replaced by `BentoGrid.tsx`
- `src/components/InteractiveLabs.tsx` → merged into `BentoGrid.tsx`
- `src/components/Skills.tsx` → replaced by `TechMarquee.tsx` + About section metrics
- `src/components/Matrix.tsx` — unused, can delete

---

## Chunk 1: Design System Foundation

### Task 1: Tailwind Config + CSS Custom Properties

**Files:**
- Modify: `tailwind.config.js`
- Modify: `src/index.css`
- Modify: `index.html`

- [ ] **Step 1: Update `index.html` to support theming**

Add `data-theme="dark"` to `<html>` tag (dark default to match existing):

```html
<html lang="en" data-theme="dark">
```

- [ ] **Step 2: Rewrite `tailwind.config.js` with new design tokens**

```js
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
```

- [ ] **Step 3: Rewrite `src/index.css` with CSS custom properties and new component classes**

Replace the entire file. Key sections:

**Theme variables** (`:root` for light, `[data-theme=dark]` for dark):
```css
:root, [data-theme="light"] {
  --bg: #f7f7f5;
  --bg-alt: #ffffff;
  --bg-card: #ffffff;
  --bg-inset: #f0f0ed;
  --fg: #0a0a0a;
  --fg-muted: #4a4a4a;
  --fg-faint: #909090;
  --accent: #00c471;
  --accent-dim: rgba(0, 196, 113, 0.12);
  --accent-glow: rgba(0, 196, 113, 0.25);
  --border: #e2e2df;
  --border-strong: #c8c8c4;
  --nav-bg: #ffffff;
  --nav-border: rgba(0, 0, 0, 0.08);
  --nav-shadow: rgba(0, 0, 0, 0.08);
}

[data-theme="dark"] {
  --bg: #0d1117;
  --bg-alt: #161b22;
  --bg-card: #1c2128;
  --bg-inset: #090d12;
  --fg: #f0f0ee;
  --fg-muted: #8b949e;
  --fg-faint: #3d444d;
  --accent: #00e87a;
  --accent-dim: rgba(0, 232, 122, 0.1);
  --accent-glow: rgba(0, 232, 122, 0.2);
  --border: #21262d;
  --border-strong: #30363d;
  --nav-bg: rgba(13, 17, 23, 0.92);
  --nav-border: rgba(255, 255, 255, 0.06);
  --nav-shadow: rgba(0, 0, 0, 0.3);
}
```

**Base styles:**
```css
body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 16px;
  line-height: 1.6;
  background-color: var(--bg);
  color: var(--fg);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  transition: background-color 0.3s ease, color 0.3s ease;
}
```

**Scroll reveal classes:**
```css
.section-enter {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.75s ease-out, transform 0.75s ease-out;
}
.section-enter.visible {
  opacity: 1;
  transform: none;
}
.reveal { opacity: 0; transform: translateY(32px); transition: opacity 0.65s ease-out, transform 0.65s ease-out; }
.reveal.visible { opacity: 1; transform: none; }
.reveal.d1 { transition-delay: 80ms; }
.reveal.d2 { transition-delay: 160ms; }
.reveal.d3 { transition-delay: 240ms; }
.reveal.d4 { transition-delay: 320ms; }
```

**View transition CSS:**
```css
::view-transition-new(root) {
  animation: vt-circle-reveal 0.55s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}
::view-transition-old(root) {
  animation: none;
  z-index: -1;
}
@keyframes vt-circle-reveal {
  from { clip-path: circle(0px at var(--theme-x, 50%) var(--theme-y, 50%)); }
  to   { clip-path: circle(200vmax at var(--theme-x, 50%) var(--theme-y, 50%)); }
}
```

**Component classes** (buttons, cards, nav, marquee, bento — see full CSS in step implementation).

- [ ] **Step 4: Verify build compiles**

Run: `npm run build`
Expected: Build succeeds with no errors (pages may look broken — that's expected at this stage).

- [ ] **Step 5: Commit**

```bash
git add tailwind.config.js src/index.css index.html
git commit -m "feat: replace cyber theme with wmbolles-inspired design system"
```

---

### Task 2: Theme Hook + Toggle Component

**Files:**
- Create: `src/hooks/useTheme.ts`
- Create: `src/components/ThemeToggle.tsx`

- [ ] **Step 1: Create `src/hooks/useTheme.ts`**

```ts
import { useState, useEffect, useCallback } from 'react';

type Theme = 'light' | 'dark';

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'dark';
    const stored = localStorage.getItem('theme') as Theme | null;
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = useCallback((event?: React.MouseEvent) => {
    const x = event ? event.clientX : window.innerWidth / 2;
    const y = event ? event.clientY : window.innerHeight / 2;

    const next: Theme = theme === 'dark' ? 'light' : 'dark';

    // Use View Transition API if available
    if (document.startViewTransition) {
      document.documentElement.style.setProperty('--theme-x', `${x}px`);
      document.documentElement.style.setProperty('--theme-y', `${y}px`);

      document.startViewTransition(() => {
        setThemeState(next);
      });
    } else {
      setThemeState(next);
    }
  }, [theme]);

  return { theme, toggleTheme };
}
```

- [ ] **Step 2: Create `src/components/ThemeToggle.tsx`**

```tsx
import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  onToggle: (event: React.MouseEvent) => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, onToggle }) => (
  <button
    onClick={onToggle}
    className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-fg-faint/10 transition-colors"
    aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
  >
    {theme === 'dark' ? (
      <Sun size={18} className="text-fg-muted" />
    ) : (
      <Moon size={18} className="text-fg-muted" />
    )}
  </button>
);
```

- [ ] **Step 3: Add View Transition API type declaration**

Add to `src/vite-env.d.ts`:
```ts
interface Document {
  startViewTransition?: (callback: () => void) => void;
}
```

- [ ] **Step 4: Verify files compile**

Run: `npx tsc --noEmit`
Expected: No type errors.

- [ ] **Step 5: Commit**

```bash
git add src/hooks/useTheme.ts src/components/ThemeToggle.tsx src/vite-env.d.ts
git commit -m "feat: add theme toggle with View Transition API circle-reveal"
```

---

### Task 3: Scroll Reveal Hook + Component

**Files:**
- Create: `src/hooks/useScrollReveal.ts`
- Create: `src/components/ScrollReveal.tsx`

- [ ] **Step 1: Create `src/hooks/useScrollReveal.ts`**

```ts
import { useEffect, useRef } from 'react';

export function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}
```

- [ ] **Step 2: Create `src/components/ScrollReveal.tsx`**

```tsx
import React, { useEffect, useRef } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  delay?: number; // 0-4 maps to d1-d4
  threshold?: number;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  as: Tag = 'div',
  delay,
  threshold = 0.15,
}) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const delayClass = delay !== undefined ? ` d${delay}` : '';

  return (
    <Tag
      ref={ref as any}
      className={`reveal${delayClass} ${className}`}
    >
      {children}
    </Tag>
  );
};
```

- [ ] **Step 3: Commit**

```bash
git add src/hooks/useScrollReveal.ts src/components/ScrollReveal.tsx
git commit -m "feat: add scroll reveal system with Intersection Observer"
```

---

## Chunk 2: Navigation + Layout Shell

### Task 4: Floating Card Navbar

**Files:**
- Create: `src/components/CardNav.tsx`
- Modify: `src/components/MobileNav.tsx`
- Delete: `src/components/Header.tsx` (replaced by CardNav)

- [ ] **Step 1: Create `src/components/CardNav.tsx`**

Floating card navbar, centered, with blur backdrop. Contains: hamburger (left on mobile), logo (center), nav links (desktop), theme toggle, CTA button.

```tsx
import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { MobileNav } from './MobileNav';

interface CardNavProps {
  theme: 'light' | 'dark';
  onThemeToggle: (event: React.MouseEvent) => void;
}

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
  { label: 'Blog', href: 'https://blogs.anir0y.in', external: true },
];

export const CardNav: React.FC<CardNavProps> = ({ theme, onThemeToggle }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="fixed top-3 left-1/2 -translate-x-1/2 w-[min(95%,1120px)] z-[999]">
        <nav
          className={`h-[60px] flex items-center justify-between px-5 rounded-nav border transition-all duration-300 ${
            scrolled
              ? 'bg-[var(--nav-bg)] border-[var(--nav-border)] shadow-[0_4px_24px_var(--nav-shadow)] backdrop-blur-[14px] backdrop-saturate-[1.6]'
              : 'bg-[var(--nav-bg)] border-[var(--nav-border)] backdrop-blur-[14px] backdrop-saturate-[1.6]'
          }`}
        >
          {/* Hamburger - mobile only */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden text-fg-muted hover:text-fg transition-colors p-2"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>

          {/* Logo - centered on mobile, left on desktop */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 flex items-center gap-2"
          >
            <img src="/img/anir0y-logo.svg" alt="anir0y" className="h-7 w-7" />
            <span className="text-fg font-bold text-[1.1rem] tracking-[-0.5px]">anir0y</span>
          </a>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                onClick={(e) => !link.external && handleNavClick(e, link.href)}
                className="text-fg-muted hover:text-fg text-sm font-medium transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right side: theme toggle + CTA */}
          <div className="flex items-center gap-2">
            <ThemeToggle theme={theme} onToggle={onThemeToggle} />
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="hidden md:flex items-center px-5 h-9 bg-fg text-bg rounded-[0.6rem] text-sm font-medium hover:bg-accent hover:text-[#000] transition-all"
            >
              Contact
            </a>
          </div>
        </nav>
      </div>

      <MobileNav
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        theme={theme}
        onThemeToggle={onThemeToggle}
      />
    </>
  );
};
```

- [ ] **Step 2: Update `src/components/MobileNav.tsx` for new theme**

Update to accept theme props, restyle with new design tokens. Keep framer-motion for slide animation. Update nav items to match new structure (Home, Work, Contact, Blog). Replace cyber-* colors with new theme variables.

Key changes:
- Accept `theme` and `onThemeToggle` props
- Replace all `cyber-*` class references with new theme classes (`bg`, `fg`, `fg-muted`, `border`, `accent`)
- Update `navItems` to match CardNav links
- Add ThemeToggle in mobile menu header
- Remove numbered prefixes and terminal styling

- [ ] **Step 3: Delete `src/components/Header.tsx`**

This file is no longer needed — replaced by CardNav.tsx.

- [ ] **Step 4: Verify navigation renders**

Run: `npm run dev`
Expected: Floating card nav visible at top with logo, links, theme toggle, and CTA.

- [ ] **Step 5: Commit**

```bash
git add src/components/CardNav.tsx src/components/MobileNav.tsx
git rm src/components/Header.tsx
git commit -m "feat: replace header with floating card navbar"
```

---

### Task 5: Update App.tsx Layout Shell

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Rewrite `src/App.tsx`**

```tsx
import React, { lazy, Suspense } from 'react';
import { useTheme } from './hooks/useTheme';
import { CardNav } from './components/CardNav';
import Hero from './components/Hero';

const About = lazy(() => import('./components/About').then(m => ({ default: m.About })));
const TechMarquee = lazy(() => import('./components/TechMarquee').then(m => ({ default: m.TechMarquee })));
const BentoGrid = lazy(() => import('./components/BentoGrid').then(m => ({ default: m.BentoGrid })));
const Contact = lazy(() => import('./components/Contact').then(m => ({ default: m.Contact })));
const Footer = lazy(() => import('./components/Footer').then(m => ({ default: m.Footer })));

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-bg text-fg relative overflow-x-hidden transition-colors">
      <CardNav theme={theme} onThemeToggle={toggleTheme} />
      <main>
        <Hero />
        <Suspense fallback={null}>
          <About />
          <TechMarquee />
          <BentoGrid />
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;
```

- [ ] **Step 2: Commit**

```bash
git add src/App.tsx
git commit -m "feat: update App layout with new section structure"
```

---

## Chunk 3: Hero + About Sections

### Task 6: Redesign Hero Section

**Files:**
- Modify: `src/components/Hero.tsx`

- [ ] **Step 1: Rewrite `src/components/Hero.tsx`**

Replace particle canvas hero with wmbolles-style: large title (clamp responsive), subtitle, bio text, CTA buttons, avatar with decorative corner brackets. Remove canvas entirely. Use ScrollReveal for entrance animations.

Layout: CSS Grid — `1fr auto` on desktop (text left, avatar right), stacked on mobile.

Key elements:
- Mono label: "CYBERSECURITY SPECIALIST" (uppercase, letter-spacing 0.15em, accent color)
- Title: "Animesh Roy" (clamp(3rem, 7.5vw, 6rem), weight 800, letter-spacing -0.04em)
- Bio paragraph: 1-2 sentences, fg-muted color
- Two buttons: "View Work" (primary) + "Download CV" (outline)
- Avatar: circular 280px with 2px accent border, decorative corner brackets in accent color
- Scroll hint chevron at bottom with bob animation

- [ ] **Step 2: Remove framer-motion import from Hero**

Use CSS-based reveal classes instead.

- [ ] **Step 3: Verify Hero renders in both themes**

Run: `npm run dev`
Expected: Hero shows name, subtitle, bio, buttons, avatar. Toggle theme works.

- [ ] **Step 4: Commit**

```bash
git add src/components/Hero.tsx
git commit -m "feat: redesign hero with wmbolles-style layout"
```

---

### Task 7: Create About Section

**Files:**
- Create: `src/components/About.tsx`

- [ ] **Step 1: Create `src/components/About.tsx`**

Full-width section with:
- Mono section label: "ABOUT"
- Headline: "Security researcher & consultant" (clamp(2.2rem, 5vw, 4rem), weight 800)
- Two-column grid: left column with bio paragraphs, right column with metrics/stats
- Metrics bar: 3-4 stat cards (e.g., "13 + Years Experience", "100+ Assessments", "Open Source Contributor")
- Each stat: large accent-colored number + muted label below

Use ScrollReveal wrapper for entrance animations.

```tsx
import React from 'react';
import { ScrollReveal } from './ScrollReveal';

export const About: React.FC = () => {
  const stats = [
    { value: '13 +', label: 'Years Experience' },
    { value: '100+', label: 'Security Assessments' },
    { value: '20+', label: 'Open Source Projects' },
  ];

  return (
    <section id="about" className="py-sp-3xl px-sp-md">
      <div className="w-[min(90%,1120px)] mx-auto">
        <ScrollReveal>
          <span className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-accent mb-6 block">
            About
          </span>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-sp-2xl">
          <ScrollReveal delay={1}>
            <h2 className="text-[clamp(2.2rem,5vw,4rem)] font-extrabold tracking-[-0.04em] leading-[1.1] mb-6">
              Security researcher & consultant
            </h2>
            <p className="text-fg-muted text-[1.05rem] leading-relaxed mb-4">
              I help organizations stay secure by finding vulnerabilities before adversaries do.
              From penetration testing to red teaming, I make cybersecurity accessible and effective.
            </p>
            <p className="text-fg-muted text-[1.05rem] leading-relaxed">
              Currently focused on offensive security, cloud infrastructure assessments,
              and building open-source security tools for the community.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={2}>
            <div className="grid grid-cols-3 gap-4 md:mt-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center md:text-left">
                  <div className="text-[clamp(2rem,4vw,3rem)] font-extrabold text-accent tracking-[-0.03em]">
                    {stat.value}
                  </div>
                  <div className="text-fg-muted text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
```

- [ ] **Step 2: Commit**

```bash
git add src/components/About.tsx
git commit -m "feat: add About section with bio and stats"
```

---

## Chunk 4: Tech Marquee + Bento Grid

### Task 8: Tech Stack Data + Marquee Component

**Files:**
- Create: `src/data/techStack.ts`
- Create: `src/components/TechMarquee.tsx`

- [ ] **Step 1: Create `src/data/techStack.ts`**

```ts
export interface TechItem {
  name: string;
  icon: string; // lucide icon name or emoji
}

export const techStack: TechItem[] = [
  { name: 'Kali Linux', icon: '🐉' },
  { name: 'Burp Suite', icon: '🔍' },
  { name: 'Splunk', icon: '📊' },
  { name: 'Wazuh', icon: '🛡️' },
  { name: 'Elastic', icon: '📈' },
  { name: 'Nessus', icon: '🎯' },
  { name: 'Python', icon: '🐍' },
  { name: 'Docker', icon: '🐳' },
  { name: 'Terraform', icon: '🏗️' },
  { name: 'AWS', icon: '☁️' },
  { name: 'Cobalt Strike', icon: '⚔️' },
  { name: 'Wireshark', icon: '🦈' },
  { name: 'Metasploit', icon: '💉' },
  { name: 'RFID Tools', icon: '📡' },
  { name: 'React', icon: '⚛️' },
  { name: 'TypeScript', icon: '📘' },
];
```

- [ ] **Step 2: Create `src/components/TechMarquee.tsx`**

Infinite scrolling marquee with:
- Duplicate items for seamless loop
- Gradient fade edges (left/right)
- Pause on hover
- Each item: icon + name in a pill-shaped container
- Subtle border, bg-card background

```tsx
import React from 'react';
import { techStack } from '../data/techStack';

export const TechMarquee: React.FC = () => {
  const items = [...techStack, ...techStack]; // duplicate for seamless loop

  return (
    <section className="py-sp-xl overflow-hidden border-y border-border">
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-bg to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-bg to-transparent z-10 pointer-events-none" />

        <div className="flex gap-4 animate-marquee hover:[animation-play-state:paused] w-max">
          {items.map((tech, i) => (
            <div
              key={`${tech.name}-${i}`}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-bg-card text-fg-muted text-sm font-medium whitespace-nowrap hover:text-fg hover:border-border-strong hover:scale-110 transition-all duration-300 cursor-default"
            >
              <span className="text-base">{tech.icon}</span>
              <span>{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
```

- [ ] **Step 3: Add marquee CSS to `src/index.css`**

Ensure the marquee animation is smooth. The Tailwind config already has the keyframe. Add:
```css
.animate-marquee {
  will-change: transform;
}
```

- [ ] **Step 4: Commit**

```bash
git add src/data/techStack.ts src/components/TechMarquee.tsx src/index.css
git commit -m "feat: add infinite tech stack marquee"
```

---

### Task 9: Bento Grid (Projects + Labs)

**Files:**
- Create: `src/components/BentoGrid.tsx`
- Modify: `src/data/projects.ts` (add `span` field)
- Modify: `src/types/index.ts`

- [ ] **Step 1: Update `src/types/index.ts`**

```ts
export interface Project {
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  link: string;
  github?: string;
  span?: 'hero' | 'wide' | 'normal'; // bento grid span
}

export interface Skill {
  name: string;
  icon: string;
  category: 'security' | 'tools';
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}
```

- [ ] **Step 2: Update `src/data/projects.ts`**

Add `span` field to control bento grid sizing. First project gets `span: 'hero'` (full width). Add lab items as projects at the end.

```ts
import { Project } from '../types';

export const projects: Project[] = [
  {
    title: "Morse Code Learning",
    description: "Interactive Morse code learning platform with real-time translation, practice exercises, and audio playback. Master the classic communication method through hands-on practice and gamified learning experience.",
    technologies: ["JavaScript", "Web Audio API", "Education"],
    imageUrl: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=75",
    link: "https://morse.anir0y.in/",
    github: "https://morse.anir0y.in/",
    span: 'hero',
  },
  {
    title: "VWA - Vulnerable Web App",
    description: "WebApp Lab for training.",
    technologies: ["Docker", "PHP", "MySQL"],
    imageUrl: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=480&q=75",
    link: "https://hub.docker.com/r/anir0y/vwa",
    github: "https://hub.docker.com/r/anir0y/vwa",
  },
  {
    title: "Red Teaming as IAC",
    description: "Automates Covenant C2 deployment using Terraform on DigitalOcean with Cloudflare integration for red teaming.",
    technologies: ["Python", "Terraform", "Cloud"],
    imageUrl: "https://i.imgur.com/sc7xTbRl.png",
    link: "https://github.com/vatsal-mob/IAC-C2",
    github: "https://github.com/vatsal-mob/IAC-C2",
  },
  {
    title: "CANBus Simulator",
    description: "Mimics Controller Area Network communication for testing CAN-enabled devices without physical hardware.",
    technologies: ["C++", "Car Hacking", "Security"],
    imageUrl: "https://i.imgur.com/1ziuUECl.png",
    link: "https://github.com/anir0y/simulator",
    github: "https://github.com/anir0y/simulator",
    span: 'wide',
  },
  {
    title: "Unified Courier Tracker",
    description: "Comprehensive courier tracking system for India that unifies tracking across multiple courier services.",
    technologies: ["TypeScript", "React", "API"],
    imageUrl: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?auto=format&fit=crop&w=480&q=75",
    link: "https://courier.anir0y.in/",
    github: "https://github.com/anir0y/unified-courier-tracker",
  },
  // Labs as projects
  {
    title: "PKI Lab",
    description: "Practice Public Key Infrastructure concepts and certificate management in an interactive environment.",
    technologies: ["Cryptography", "PKI", "Interactive"],
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=480&q=75",
    link: "https://anir0y.in/pki/",
  },
  {
    title: "OSI Packet Lab",
    description: "Explore network packet analysis and the OSI model layers through hands-on exercises.",
    technologies: ["Networking", "OSI", "Interactive"],
    imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=480&q=75",
    link: "https://osi.anir0y.in/",
  },
  {
    title: "Buffer Overflow Lab",
    description: "Learn about buffer overflow vulnerabilities and exploitation techniques.",
    technologies: ["Exploitation", "Memory", "Security"],
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=480&q=75",
    link: "https://0x414141.anir0y.in/",
  },
  {
    title: "DKIM Lab",
    description: "Interactive lab to understand email authentication, replay attacks, and defenses.",
    technologies: ["Email Security", "DKIM", "Interactive"],
    imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f2?auto=format&fit=crop&w=480&q=75",
    link: "https://lab-dkim.anir0y.in/",
  },
];
```

- [ ] **Step 3: Create `src/components/BentoGrid.tsx`**

6-column CSS Grid bento layout. Hero card spans all 6 columns, wide cards span 4, normal cards span 3 (or 2).

```tsx
import React from 'react';
import { projects } from '../data/projects';
import { ArrowUpRight } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

function getSpanClass(span?: string, index?: number): string {
  if (span === 'hero') return 'col-span-6 min-h-[360px]';
  if (span === 'wide') return 'col-span-6 md:col-span-4';
  // Alternate: 3+3, or 4+2 pattern
  return 'col-span-6 md:col-span-3';
}

export const BentoGrid: React.FC = () => {
  return (
    <section id="work" className="py-sp-2xl px-sp-md">
      <div className="w-[min(90%,1120px)] mx-auto">
        <ScrollReveal>
          <span className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-accent mb-4 block">
            Work
          </span>
          <h2 className="text-[clamp(1.6rem,3vw,2.2rem)] font-bold tracking-[-0.025em] mb-8">
            Projects & Labs
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-6 gap-4">
          {projects.map((project, index) => (
            <ScrollReveal
              key={index}
              className={`${getSpanClass(project.span, index)} group`}
              delay={Math.min(index, 4) as 0 | 1 | 2 | 3 | 4}
            >
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bento-card relative block h-full rounded-card border border-border bg-bg-card overflow-hidden hover:-translate-y-[3px] hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)] hover:border-border-strong transition-all duration-300"
              >
                {/* Background image */}
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src={project.imageUrl}
                    alt=""
                    className="w-full h-full object-cover opacity-[0.15] group-hover:opacity-[0.25] group-hover:scale-[1.06] transition-all duration-700"
                    loading="lazy"
                  />
                </div>

                {/* Content overlay */}
                <div className="relative z-10 p-8 h-full flex flex-col justify-end">
                  {/* Tech badges */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 text-[0.68rem] font-mono font-medium uppercase tracking-[0.06em] rounded-full bg-accent-dim text-accent"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-[1.4rem] font-bold tracking-[-0.025em] text-fg mb-2">
                    {project.title}
                  </h3>

                  <p className="text-fg-muted text-sm leading-relaxed line-clamp-2">
                    {project.description}
                  </p>

                  {/* Arrow indicator */}
                  <div className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-bg-inset opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight size={16} className="text-fg-muted" />
                  </div>
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
```

- [ ] **Step 4: Delete old project/lab/skills components**

```bash
rm src/components/Projects.tsx
rm src/components/InteractiveLabs.tsx
rm src/components/Skills.tsx
```

- [ ] **Step 5: Verify bento grid renders**

Run: `npm run dev`
Expected: Bento grid shows with asymmetric card sizes, hover effects work.

- [ ] **Step 6: Commit**

```bash
git add src/components/BentoGrid.tsx src/data/projects.ts src/types/index.ts
git rm src/components/Projects.tsx src/components/InteractiveLabs.tsx src/components/Skills.tsx
git commit -m "feat: add bento grid layout for projects and labs"
```

---

## Chunk 5: Contact + Footer + Final Polish

### Task 10: Redesign Contact Section

**Files:**
- Modify: `src/components/Contact.tsx`

- [ ] **Step 1: Rewrite Contact with split 2-column layout**

Left column: headline + description.
Right column: contact detail card with email, schedule link, social pills.

```tsx
import React from 'react';
import { Mail, Calendar, Github, Linkedin, ArrowUpRight } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-sp-3xl px-sp-md">
      <div className="w-[min(90%,1120px)] mx-auto">
        <div className="grid md:grid-cols-2 gap-sp-2xl">
          {/* Left: headline */}
          <ScrollReveal>
            <span className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-accent mb-4 block">
              Contact
            </span>
            <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold tracking-[-0.03em] leading-[1.1] mb-4">
              Let's work together
            </h2>
            <p className="text-fg-muted text-[1.05rem] leading-relaxed">
              Available for security consulting, penetration testing, and collaboration.
              Reach out through any channel below.
            </p>
          </ScrollReveal>

          {/* Right: contact card */}
          <ScrollReveal delay={1}>
            <div className="rounded-xl border border-border bg-bg-card p-8 space-y-6">
              <a
                href="mailto:mail@anir0y.in"
                className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-border-strong hover:bg-bg-inset transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-accent" />
                  <div>
                    <div className="text-[0.7rem] font-mono uppercase tracking-[0.1em] text-fg-faint">Email</div>
                    <div className="text-fg text-sm font-medium">mail@anir0y.in</div>
                  </div>
                </div>
                <ArrowUpRight size={14} className="text-fg-faint group-hover:text-fg transition-colors" />
              </a>

              <a
                href="https://book.anir0y.in"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-border-strong hover:bg-bg-inset transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Calendar size={18} className="text-accent" />
                  <div>
                    <div className="text-[0.7rem] font-mono uppercase tracking-[0.1em] text-fg-faint">Schedule</div>
                    <div className="text-fg text-sm font-medium">book.anir0y.in</div>
                  </div>
                </div>
                <ArrowUpRight size={14} className="text-fg-faint group-hover:text-fg transition-colors" />
              </a>

              {/* Social pills */}
              <div className="flex flex-wrap gap-2 pt-2">
                {[
                  { href: 'https://github.com/anir0y', icon: Github, label: 'GitHub' },
                  { href: 'https://www.linkedin.com/in/anir0y/', icon: Linkedin, label: 'LinkedIn' },
                  { href: 'https://x.com/anir0y', label: 'X' },
                  { href: 'https://topmate.io/anir0y/', label: 'Topmate' },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3.5 py-2 rounded border border-border text-fg-muted text-[0.8rem] font-medium hover:border-border-strong hover:text-fg transition-all"
                  >
                    {social.icon && <social.icon size={14} />}
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Contact.tsx
git commit -m "feat: redesign contact section with split layout"
```

---

### Task 11: Redesign Footer

**Files:**
- Modify: `src/components/Footer.tsx`

- [ ] **Step 1: Rewrite Footer with 3-column grid + accent topline + pulsing status dot**

```tsx
import React from 'react';
import { Mail, Github, Linkedin, ExternalLink } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border">
      {/* Accent gradient topline */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      <div className="w-[min(90%,1120px)] mx-auto px-sp-md py-sp-2xl">
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-[1.8fr_1fr_1fr] gap-sp-2xl mb-12">
            {/* Brand column */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src="/img/anir0y-logo.svg" alt="anir0y" className="h-6 w-6" />
                <span className="text-[1.5rem] font-extrabold tracking-[-0.04em]">anir0y</span>
              </div>
              <p className="text-fg-muted text-sm leading-relaxed mb-6 max-w-xs">
                Cybersecurity professional helping organizations stay secure through
                penetration testing and security consulting.
              </p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent animate-status-pulse" />
                <span className="text-fg-muted text-xs font-mono">Available for projects</span>
              </div>
            </div>

            {/* Navigation column */}
            <div>
              <h3 className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-fg-faint mb-6">
                Navigation
              </h3>
              <nav className="space-y-3">
                {[
                  { label: 'Home', href: '#home' },
                  { label: 'Work', href: '#work' },
                  { label: 'Contact', href: '#contact' },
                  { label: 'Blog', href: 'https://blogs.anir0y.in', external: true },
                  { label: 'Status', href: 'https://status.anir0y.in/', external: true },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    onClick={!link.external ? (e) => {
                      e.preventDefault();
                      document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                    } : undefined}
                    className="flex items-center gap-1 text-fg-muted hover:text-fg text-sm transition-colors"
                  >
                    {link.label}
                    {link.external && <ExternalLink size={10} className="opacity-40" />}
                  </a>
                ))}
              </nav>
            </div>

            {/* Connect column */}
            <div>
              <h3 className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-fg-faint mb-6">
                Connect
              </h3>
              <div className="space-y-3">
                {[
                  { href: 'https://github.com/anir0y', icon: Github, label: 'GitHub' },
                  { href: 'https://www.linkedin.com/in/anir0y/', icon: Linkedin, label: 'LinkedIn' },
                  { href: 'mailto:mail@anir0y.in', icon: Mail, label: 'Email' },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith('http') ? '_blank' : undefined}
                    rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-2 text-fg-muted hover:text-fg text-sm transition-colors"
                  >
                    <social.icon size={14} className="opacity-60" />
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-fg-faint text-xs font-mono">{currentYear} Animesh Roy</span>
          <div className="flex items-center gap-6 text-xs">
            <a href="/.well-known/security.txt" className="text-fg-faint hover:text-fg transition-colors font-mono" target="_blank" rel="noopener noreferrer">
              Security
            </a>
            <a href="/privacy.html" className="text-fg-faint hover:text-fg transition-colors font-mono">
              Privacy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Footer.tsx
git commit -m "feat: redesign footer with 3-column grid and accent topline"
```

---

### Task 12: Final CSS Polish + Responsive Fixes

**Files:**
- Modify: `src/index.css` (final adjustments)

- [ ] **Step 1: Ensure all component utility classes exist in index.css**

Verify these are in index.css:
- Scrollbar styling updated for theme vars
- Selection color updated to accent
- Focus-visible updated to accent
- Print styles preserved
- Mobile responsive overrides for spacing tokens
- Reduced motion preferences respected

Add mobile spacing overrides:
```css
@media (max-width: 768px) {
  :root {
    --sp-lg: 20px;
    --sp-xl: 32px;
    --sp-2xl: 48px;
    --sp-3xl: 64px;
  }

  .grid-cols-6 {
    grid-template-columns: 1fr !important;
  }

  .col-span-6,
  .md\:col-span-4,
  .md\:col-span-3 {
    grid-column: span 1 !important;
  }
}
```

- [ ] **Step 2: Clean up unused CSS classes**

Remove all `cyber-*`, `glass-card`, `terminal-prompt`, `bg-grid`, `bg-noise`, `circuit-divider`, `section-divider`, `glow-text` classes that are no longer referenced.

- [ ] **Step 3: Verify full site in dev mode**

Run: `npm run dev`
Expected: All sections render correctly in both light and dark themes. Navigation works. Scroll reveals fire. Marquee scrolls. Bento grid is responsive.

- [ ] **Step 4: Run production build**

Run: `npm run build`
Expected: Build succeeds with no errors.

- [ ] **Step 5: Commit**

```bash
git add src/index.css
git commit -m "feat: final CSS polish and responsive fixes"
```

---

### Task 13: Remove Unused Dependencies + Clean Up

**Files:**
- Modify: `src/data/skills.ts` (delete if no longer used)
- Verify: no dead imports across all files

- [ ] **Step 1: Delete unused data files**

```bash
rm src/data/skills.ts
```

- [ ] **Step 2: Remove `react-type-animation` from package.json if unused**

Check if it's imported anywhere. If not:
```bash
npm uninstall react-type-animation
```

- [ ] **Step 3: Check all imports are clean**

Run: `npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 4: Final build verification**

Run: `npm run build`
Expected: Clean build, no warnings about unused code.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: remove unused files and dependencies"
```
