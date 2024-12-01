import React, { useState } from 'react';
import { Download, Menu } from 'lucide-react';
import { motion } from 'framer-motion';
import { MobileNav } from './MobileNav';

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleDownload = () => {
    // In a real app, this would be a real PDF URL
    const pdfUrl = 'https://bit.ly/anir0y-profile';
    window.open(pdfUrl, '_blank');
  };

  return (
    <header className="fixed top-0 w-full bg-black/90 backdrop-blur-sm z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold text-green-500"
          >
            <span className="font-mono">&gt;_</span> anir0y
          </motion.div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink href="https://classroom.anir0y.in">Blog</NavLink>
            <NavLink href="#projects">Projects</NavLink>
            <NavLink href="#skills">Skills</NavLink>
            <NavLink href="#contact">Contact</NavLink>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownload}
              className="bg-green-500 text-black px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-green-400 transition-colors"
            >
              <Download size={18} />
              <span>Download Profile</span>
            </motion.button>
          </nav>
          
          <button 
            className="md:hidden text-white hover:text-green-500 transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      <MobileNav 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
    </header>
  );
};

const NavLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <a
    href={href}
    onClick={(e) => {
      e.preventDefault();
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: 'smooth' });
    }}
    className="text-gray-300 hover:text-green-500 transition-colors duration-200"
  >
    {children}
  </a>
);