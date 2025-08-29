import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Matrix from './components/Matrix';

function App() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <Matrix />
      <div className="relative z-10">
        <Header />
        <Hero />
        <Projects />
        <Skills />
        <Contact />
      </div>
    </div>
  );
}

export default App;