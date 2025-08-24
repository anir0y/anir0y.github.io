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
      <footer className="py-4 text-gray-300 text-center">
        <div>
          System Health Monitoring: <a href="https://anir0y.cronitorstatus.com" target="_blank" rel="noopener noreferrer" className="text-purple hover:underline">anir0y.cronitorstatus.com</a>
        </div>
      </footer>
    </div>
  );
}

export default App;