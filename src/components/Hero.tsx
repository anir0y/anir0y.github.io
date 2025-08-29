import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid-pattern"></div>
        </div>
        
        {/* Glitch Overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="glitch-overlay"></div>
        </div>
        
        {/* Scanning Lines */}
        <div className="absolute inset-0 opacity-5">
          <div className="scan-lines"></div>
        </div>
        
        {/* Floating Particles */}
        <div className="absolute inset-0 opacity-20">
          <div className="particle particle-1"></div>
          <div className="particle particle-2"></div>
          <div className="particle particle-3"></div>
          <div className="particle particle-4"></div>
          <div className="particle particle-5"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 glitch-text" data-text="John Doe">
          John Doe
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-cyan-300">
          Cybersecurity Expert & Ethical Hacker
        </p>
        <p className="text-lg mb-12 text-gray-300 max-w-2xl mx-auto">
          Protecting digital assets through advanced penetration testing, vulnerability assessment, 
          and security consulting. Specialized in network security and threat analysis.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-lg transition-colors duration-300">
            View My Work
          </button>
          <button className="px-8 py-3 border border-cyan-600 text-cyan-400 hover:bg-cyan-600 hover:text-white font-semibold rounded-lg transition-colors duration-300">
            Contact Me
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;