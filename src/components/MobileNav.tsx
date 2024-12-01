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
          className="fixed inset-0 bg-gray-900/95 backdrop-blur-sm z-50 md:hidden"
        >
          <div className="flex flex-col h-full">
            <div className="flex justify-end p-4">
              <button
                onClick={onClose}
                className="text-white hover:text-green-500 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <nav className="flex flex-col items-center space-y-8 mt-16">
              <MobileNavLink href="https://classroom.anir0y.in" onClick={onClose}>Blog</MobileNavLink>
              <MobileNavLink href="#projects" onClick={onClose}>Projects</MobileNavLink>
              <MobileNavLink href="#skills" onClick={onClose}>Skills</MobileNavLink>
              <MobileNavLink href="#contact" onClick={onClose}>Contact</MobileNavLink>
              <button
                onClick={() => {
                  window.open('https://bit.ly/anir0y-profile', '_blank');
                  onClose();
                }}
                className="bg-green-500 text-black px-6 py-3 rounded-md hover:bg-green-400 transition-colors"
              >
                View Profile
              </button>
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
  <a
    href={href}
    onClick={(e) => {
      e.preventDefault();
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: 'smooth' });
      onClick();
    }}
    className="text-2xl text-white hover:text-green-500 transition-colors"
  >
    {children}
  </a>
);