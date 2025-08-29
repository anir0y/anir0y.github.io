import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-900">
      {/* Digital Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid-pattern"></div>
      </div>
      
      {/* Glitch Overlay */}
      <div className="glitch-overlay"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white animate-fadeIn">
          Animesh Roy
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-cyan-300 animate-slideIn">
          Cybersecurity Guy
        </p>
        <p className="text-lg mb-12 text-gray-300 max-w-2xl mx-auto animate-fadeIn" style={{ animationDelay: '0.3s' }}>
          Protecting digital assets through advanced penetration testing, vulnerability assessment, 
          and security consulting. Specialized in network security and threat analysis.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeIn" style={{ animationDelay: '0.6s' }}>
          <button 
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3 bg-cyan-600 hover:bg-cyan-700 hover:scale-105 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-cyan-500/25"
          >
            View My Work
          </button>
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3 border border-cyan-600 text-cyan-400 hover:bg-cyan-600 hover:text-white hover:scale-105 font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-cyan-500/25"
          >
            Contact Me
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;