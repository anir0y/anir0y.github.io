import React, { useState } from 'react';
import { Download, Menu, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';
import { MobileNav } from './MobileNav';

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleDownload = () => {
    // In a real app, this would be a real PDF URL
    const pdfUrl = 'https://flowcv.com/resume/m0s15rrp9ewf';
    window.open(pdfUrl, '_blank');
  };



  return (
    <header className="fixed top-0 w-full bg-gray-900/95 backdrop-blur-md z-50 border-b border-cyan-400/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold text-white font-mono flex items-center space-x-2"
          >
            <Terminal className="text-cyan-400" size={24} />
            <span className="text-cyan-400">>_</span> 
            <span className="glitch-text" data-text="anir0y">anir0y</span>
          </motion.div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink href="#projects">Projects</NavLink>
            <NavLink href="#skills">Skills</NavLink>
            <NavLink href="#contact">Contact</NavLink>

            <motion.a
              href="https://classroom.anir0y.in"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="tech-button primary text-sm"
            >
              <span>BLOG</span>
            </motion.a>
          </nav>
          
          <button 
            className="md:hidden text-cyan-400 hover:text-white transition-colors"
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
  <motion.a
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    href={href}
    onClick={(e) => {
      e.preventDefault();
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: 'smooth' });
    }}
    className="text-gray-300 hover:text-cyan-400 transition-colors duration-200 font-mono relative group"
  >
    <span className="relative z-10">{children}</span>
    <div className="absolute inset-0 bg-cyan-400/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded"></div>
  </motion.a>
);