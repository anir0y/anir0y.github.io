import React from 'react';
import { Terminal } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 header-backdrop">
      <div className="container mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Terminal className="text-cyan-400" size={24} />
            <span className="text-white font-mono text-xl font-bold hover:text-cyan-400 transition-colors duration-300">anir0y</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="nav-link text-gray-300 hover:text-cyan-400 transition-colors">
              Home
            </a>
            <a href="#projects" className="nav-link text-gray-300 hover:text-cyan-400 transition-colors">
              Projects
            </a>
            <a href="#status" className="nav-link text-gray-300 hover:text-cyan-400 transition-colors">
              Status
            </a>
            <a href="#skills" className="nav-link text-gray-300 hover:text-cyan-400 transition-colors">
              Skills
            </a>
            <a href="#contact" className="nav-link text-gray-300 hover:text-cyan-400 transition-colors">
              Contact
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;