import React, { useState } from 'react';
import Header from './components/Header';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';
import { MobileNav } from './components/MobileNav';

function App() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <div className="App">
      <Header />
      <MobileNav 
        isOpen={isMobileNavOpen} 
        onClose={() => setIsMobileNavOpen(false)} 
      />
      <Hero />
      <Projects />
      <Skills />
      <Contact />
    </div>
  );
}

export default App;