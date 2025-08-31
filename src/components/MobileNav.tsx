import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ type: 'tween', duration: 0.3 }}
          className="fixed inset-0 bg-gray-900/98 backdrop-blur-md z-50 md:hidden border-l border-cyan-400/20"
        >
          {/* Tech Grid Background */}
          <div className="absolute inset-0 opacity-10">
            <div className="grid-pattern"></div>
          </div>
          
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center p-4 border-b border-cyan-400/20">
              <div className="font-mono text-cyan-400 text-sm">// NAVIGATION_MENU</div>
              <button
                onClick={onClose}
                className="text-cyan-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <nav className="flex flex-col items-center space-y-8 mt-16 relative z-10">
              <MobileNavLink href="https://classroom.anir0y.in" onClick={onClose}>Blog</MobileNavLink>
              <MobileNavLink href="#projects" onClick={onClose}>Projects</MobileNavLink>
              <MobileNavLink href="#labs" onClick={onClose}>Labs</MobileNavLink>
              <MobileNavLink href="#skills" onClick={onClose}>Skills</MobileNavLink>
              <MobileNavLink href="#contact" onClick={onClose}>Contact</MobileNavLink>
            </nav>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const MobileNavLink: React.FC<{
  href: string;
  children: React.ReactNode;
  onClick: () => void;
}> = ({ href, children, onClick }) => (
  <motion.a
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    href={href}
    onClick={(e) => {
      e.preventDefault();
      if (href.startsWith('http')) {
        window.open(href, '_blank');
      } else {
        const element = document.querySelector(href);
        element?.scrollIntoView({ behavior: 'smooth' });
      }
      onClick();
    }}
    className="text-2xl text-gray-300 hover:text-cyan-400 transition-colors font-mono relative group"
  >
    <span className="relative z-10">{children.toString().toUpperCase()}</span>
    <div className="absolute inset-0 bg-cyan-400/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded"></div>
  </motion.a>
);