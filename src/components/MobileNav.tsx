import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  theme: 'light' | 'dark';
  onThemeToggle: (event: React.MouseEvent) => void;
}

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
  { label: 'Blog', href: 'https://blogs.anir0y.in', external: true },
];

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose, theme, onThemeToggle }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[1000] md:hidden"
        >
          <div className="absolute inset-0 bg-bg/95 backdrop-blur-xl" onClick={onClose} />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-bg border-l border-border"
          >
            <div className="flex justify-between items-center p-6 border-b border-border">
              <div className="flex items-center gap-2">
                <img src="/img/anir0y-logo.svg" alt="anir0y" className="h-6 w-6" />
                <span className="font-bold text-accent text-sm tracking-[-0.5px]">anir0y</span>
              </div>
              <div className="flex items-center gap-2">
                <ThemeToggle theme={theme} onToggle={onThemeToggle} />
                <button
                  onClick={onClose}
                  className="text-fg-muted hover:text-fg transition-colors p-2"
                  aria-label="Close menu"
                >
                  <X size={22} />
                </button>
              </div>
            </div>

            <nav className="flex flex-col p-6 gap-1">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  href={item.href}
                  onClick={(e) => {
                    if (!item.external && item.href.startsWith('#')) {
                      e.preventDefault();
                      document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' });
                    }
                    onClose();
                  }}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  className="flex items-center justify-between px-4 py-4 text-fg-muted hover:text-fg hover:bg-bg-card transition-all text-sm font-medium rounded-lg"
                >
                  <span>{item.label}</span>
                  {item.external && <ExternalLink size={12} className="opacity-40" />}
                </motion.a>
              ))}

              {/* CTA */}
              <motion.a
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + navItems.length * 0.05 }}
                href="https://topmate.io/anir0y"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center justify-center px-4 py-3 bg-fg text-bg rounded-lg text-sm font-semibold hover:bg-accent hover:text-[#000] transition-all"
              >
                Book a Call
              </motion.a>
            </nav>

            <div className="absolute bottom-8 left-6 right-6">
              <div className="flex items-center gap-2 text-fg-muted text-xs font-mono">
                <div className="w-2 h-2 rounded-full bg-accent animate-status-pulse" />
                <span>Available for projects</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
