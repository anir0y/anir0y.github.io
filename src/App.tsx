import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import { Projects } from './components/Projects';
import { InteractiveLabs } from './components/InteractiveLabs';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-cyber-dark text-cyber-text relative overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <Projects />
        <InteractiveLabs />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;