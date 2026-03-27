import React from 'react';
import { Mail, Github, Linkedin, ExternalLink } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { XIcon } from './XIcon';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
  { label: 'Blog', href: 'https://blogs.anir0y.in', external: true },
  { label: 'Status', href: 'https://status.anir0y.in/', external: true },
];

const socialLinks = [
  { href: 'https://github.com/anir0y', icon: Github, label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/anir0y/', icon: Linkedin, label: 'LinkedIn' },
  { href: 'https://x.com/anir0y', icon: XIcon, label: 'X' },
  { href: 'mailto:mail@anir0y.in', icon: Mail, label: 'Email' },
];

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
                {navLinks.map((link) => (
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
                {socialLinks.map((social) => (
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
          <span className="text-fg-faint text-xs font-mono">&copy; {currentYear} Animesh Roy</span>
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
