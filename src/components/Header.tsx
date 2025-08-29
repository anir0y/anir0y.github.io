import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import MobileNav from './MobileNav';

export default function Header() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="header-backdrop fixed top-0 left-0 right-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="text-xl font-semibold text-gray-900 tech-heading">Anir0y</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection('hero')}
                className="nav-link"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('projects')}
                className="nav-link"
              >
                Projects
              </button>
              <button
                onClick={() => scrollToSection('skills')}
                className="nav-link"
              >
                Skills
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="nav-link"
              >
                Contact
              </button>
            </nav>

            {/* Mobile Navigation Toggle */}
            <MobileNav 
              isOpen={isMobileNavOpen} 
              onToggle={() => setIsMobileNavOpen(!isMobileNavOpen)} 
            />
          </div>
        </div>
      </header>
    </>
  );
}