import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { MobileNav } from './MobileNav';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'header-backdrop py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6">
          <nav className="flex items-center justify-between">
            <a href="#home" className="flex items-center space-x-3 group">
              <img
                src="/img/anir0y-logo.svg"
                alt="anir0y logo"
                className="h-8 w-8 object-contain transition-transform duration-300 group-hover:scale-110"
              />
              <span className="text-cyber-text font-mono text-lg font-medium tracking-wider">
                anir0y
              </span>
            </a>

            <div className="hidden md:flex items-center space-x-10">
              {['Home', 'Projects', 'Labs', 'Skills', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="nav-link font-medium uppercase"
                >
                  {item}
                </a>
              ))}
            </div>

            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden text-cyber-muted hover:text-cyber-blue transition-colors p-2"
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
          </nav>
        </div>
      </header>

      <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
};

export default Header;
