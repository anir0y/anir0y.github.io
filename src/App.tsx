import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';


function App() {
  return (
    <div className="bg-gray-900 min-h-screen">
      <Header />
      <main>
        <Hero />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <footer className="py-6 text-gray-300 text-center bg-gray-800 border-t border-cyan-400/20">
        <div className="container mx-auto px-4">
          <div className="font-mono text-sm">
            <span className="text-green-400">></span> System Health Monitoring: 
            <a 
              href="https://anir0y.cronitorstatus.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-cyan-400 hover:text-white transition-colors ml-2"
            >
              anir0y.cronitorstatus.com
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;