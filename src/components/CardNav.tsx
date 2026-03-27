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
          className={`h-[60px] flex items-center justify-between px-5 rounded-nav border backdrop-blur-[14px] backdrop-saturate-[1.6] transition-all duration-300 ${
            scrolled
              ? 'bg-[var(--nav-bg)] border-[var(--nav-border)] shadow-[0_4px_24px_var(--nav-shadow)]'
              : 'bg-[var(--nav-bg)] border-[var(--nav-border)]'
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

          {/* Logo */}
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
                className="relative text-fg-muted hover:text-fg text-sm font-medium transition-colors after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right side: theme toggle + CTA */}
          <div className="flex items-center gap-2">
            <ThemeToggle theme={theme} onToggle={onThemeToggle} />
            <a
              href="https://topmate.io/anir0y"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center px-5 h-9 bg-fg text-bg rounded-[0.6rem] text-sm font-medium hover:bg-accent hover:text-[#000] transition-all"
            >
              Book a Call
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
