import React from 'react';
import { Terminal, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-cyan-400/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-3">
            <Terminal className="text-cyan-400" size={24} />
            <span className="text-cyan-400">&gt;_</span>
            <span className="glitch-text text-white font-mono text-lg" data-text="anir0y">
              anir0y
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-300 hover:text-cyan-400 transition-colors font-mono">
              home
            </a>
            <a href="#about" className="text-gray-300 hover:text-cyan-400 transition-colors font-mono">
              about
            </a>
            <a href="#projects" className="text-gray-300 hover:text-cyan-400 transition-colors font-mono">
              projects
            </a>
            <a href="#skills" className="text-gray-300 hover:text-cyan-400 transition-colors font-mono">
              skills
            </a>
            <a href="#contact" className="text-gray-300 hover:text-cyan-400 transition-colors font-mono">
              contact
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-300 hover:text-cyan-400 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-cyan-400/20">
            <div className="flex flex-col space-y-4">
              <a
                href="#home"
                className="text-gray-300 hover:text-cyan-400 transition-colors font-mono"
                onClick={() => setIsMenuOpen(false)}
              >
                home
              </a>
              <a
                href="#about"
                className="text-gray-300 hover:text-cyan-400 transition-colors font-mono"
                onClick={() => setIsMenuOpen(false)}
              >
                about
              </a>
              <a
                href="#projects"
                className="text-gray-300 hover:text-cyan-400 transition-colors font-mono"
                onClick={() => setIsMenuOpen(false)}
              >
                projects
              </a>
              <a
                href="#skills"
                className="text-gray-300 hover:text-cyan-400 transition-colors font-mono"
                onClick={() => setIsMenuOpen(false)}
              >
                skills
              </a>
              <a
                href="#contact"
                className="text-gray-300 hover:text-cyan-400 transition-colors font-mono"
                onClick={() => setIsMenuOpen(false)}
              >
                contact
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;