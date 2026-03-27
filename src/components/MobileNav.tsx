import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Projects', href: '#projects' },
  { label: 'Labs', href: '#labs' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
  { label: 'Blog', href: 'https://classroom.anir0y.in' },
];

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 md:hidden"
        >
          <div className="absolute inset-0 bg-cyber-dark/95 backdrop-blur-xl" onClick={onClose} />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-cyber-dark border-l border-cyber-border"
          >
            <div className="flex justify-between items-center p-6 border-b border-cyber-border">
              <div className="flex items-center space-x-3">
                <img src="/img/anir0y-logo.svg" alt="anir0y logo" className="h-6 w-6 object-contain" />
                <span className="font-mono text-cyber-blue text-sm tracking-wider">anir0y</span>
              </div>
              <button
                onClick={onClose}
                className="text-cyber-muted hover:text-cyber-blue transition-colors p-2"
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            <nav className="flex flex-col p-6 space-y-1">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  href={item.href}
                  onClick={(e) => {
                    if (item.href.startsWith('#')) {
                      e.preventDefault();
                      document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' });
                    }
                    onClose();
                  }}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-center px-4 py-4 text-cyber-muted hover:text-cyber-blue hover:bg-cyber-card/50 transition-all font-mono text-sm uppercase tracking-wider border-b border-cyber-border/30"
                >
                  <span className="text-cyber-blue/40 mr-4 text-xs">0{i + 1}</span>
                  {item.label}
                </motion.a>
              ))}
            </nav>

            <div className="absolute bottom-8 left-6 right-6">
              <div className="flex items-center space-x-2 text-cyber-muted text-xs font-mono">
                <div className="status-active" />
                <span className="text-cyber-green/70">Available for consulting</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
