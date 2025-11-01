import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import { Projects } from './components/Projects';
import { InteractiveLabs } from './components/InteractiveLabs';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import Matrix from './components/Matrix';
import { RecaptchaProvider } from './components/RecaptchaProvider';
import { getRecaptchaConfig } from './services/recaptchaService';

function App() {
  const recaptchaConfig = getRecaptchaConfig();

  return (
    <RecaptchaProvider siteKey={recaptchaConfig.siteKey}>
      <div className="min-h-screen bg-black text-white relative overflow-x-hidden">
        {/* Matrix Background */}
        <div className="fixed inset-0 z-0">
          <Matrix />
        </div>
        
        {/* Main Content */}
        <div className="relative z-10">
          <Header />
          <main>
            <Hero />
            <Projects />
            <InteractiveLabs />
            <Skills />
            <Contact />
            <Footer />
          </main>
        </div>
      </div>
    </RecaptchaProvider>
  );
}

export default App;