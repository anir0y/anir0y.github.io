import React, { useState } from 'react';
import { Download, Menu } from 'lucide-react';
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
    <header className="fixed top-0 w-full bg-black/90 backdrop-blur-sm z-50 analog-glitch-effect">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold text-white"
          >
            <span className="font-mono">&gt;_</span> anir0y
          </motion.div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink href="#projects">Projects</NavLink>
            <NavLink href="#skills">Skills</NavLink>
            <NavLink href="#contact">Contact</NavLink>

            {/*
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownload}
              className="bg-purple-700 text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-purple-800 transition-colors">
              <Download size={18} />
              <span>Profile</span>
            </motion.button>
            */}
          </nav>
          
          <button 
            className="md:hidden text-white hover:text-white transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={24} className="text-white" />
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
    className="text-white hover:text-purple transition-colors duration-200"
  >
    {children}
  </motion.a>
);