import React, { lazy, Suspense } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';

const Projects = lazy(() => import('./components/Projects').then(m => ({ default: m.Projects })));
const InteractiveLabs = lazy(() => import('./components/InteractiveLabs').then(m => ({ default: m.InteractiveLabs })));
const Skills = lazy(() => import('./components/Skills').then(m => ({ default: m.Skills })));
const Contact = lazy(() => import('./components/Contact').then(m => ({ default: m.Contact })));
const Footer = lazy(() => import('./components/Footer').then(m => ({ default: m.Footer })));

function App() {
  return (
    <div className="min-h-screen bg-cyber-dark text-cyber-text relative overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <Suspense fallback={null}>
          <Projects />
          <InteractiveLabs />
          <Skills />
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;