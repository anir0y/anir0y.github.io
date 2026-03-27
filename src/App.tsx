import React, { lazy, Suspense } from 'react';
import { useTheme } from './hooks/useTheme';
import { CardNav } from './components/CardNav';
import { BackToTop } from './components/BackToTop';
import Hero from './components/Hero';

const About = lazy(() => import('./components/About').then(m => ({ default: m.About })));
const TechMarquee = lazy(() => import('./components/TechMarquee').then(m => ({ default: m.TechMarquee })));
const BentoGrid = lazy(() => import('./components/BentoGrid').then(m => ({ default: m.BentoGrid })));
const Contact = lazy(() => import('./components/Contact').then(m => ({ default: m.Contact })));
const Footer = lazy(() => import('./components/Footer').then(m => ({ default: m.Footer })));

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-bg text-fg relative overflow-x-hidden transition-colors">
      <CardNav theme={theme} onThemeToggle={toggleTheme} />
      <main>
        <Hero />
        <Suspense fallback={null}>
          <About />
          <TechMarquee />
          <BentoGrid />
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      <BackToTop />
    </div>
  );
}

export default App;
