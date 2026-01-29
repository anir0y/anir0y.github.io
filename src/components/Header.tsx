import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 header-backdrop">
      <div className="container mx-auto px-6 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src="/img/anir0y-logo.svg"
              alt="anir0y logo"
              className="h-8 w-8 object-contain"
            />
            <span className="text-cyber-text font-mono text-lg font-medium tracking-wide">anir0y</span>
          </div>

          <div className="hidden md:flex items-center space-x-10">
            <a href="#home" className="nav-link text-sm font-medium uppercase tracking-wider">
              Home
            </a>
            <a href="#projects" className="nav-link text-sm font-medium uppercase tracking-wider">
              Projects
            </a>
            <a href="#labs" className="nav-link text-sm font-medium uppercase tracking-wider">
              Labs
            </a>
            <a href="#skills" className="nav-link text-sm font-medium uppercase tracking-wider">
              Skills
            </a>
            <a href="#contact" className="nav-link text-sm font-medium uppercase tracking-wider">
              Contact
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;