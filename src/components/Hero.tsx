import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Tech Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="tech-grid-bg"></div>
        </div>
        
        {/* Circuit Pattern */}
        <div className="absolute inset-0 opacity-15">
          <div className="circuit-pattern"></div>
        </div>
        
        {/* Hexagonal Grid */}
        <div className="absolute inset-0 opacity-8">
          <div className="hex-grid"></div>
        </div>
        
        {/* Data Stream Lines */}
        <div className="absolute inset-0 opacity-12">
          <div className="data-streams"></div>
        </div>
        
        {/* Subtle Pulse Effect */}
        <div className="absolute inset-0 opacity-5">
          <div className="pulse-overlay"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
          Anir0y
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-cyan-300">
          Cybersecurity Expert & Ethical Hacker
        </p>
        <p className="text-lg mb-12 text-gray-300 max-w-2xl mx-auto">
          Protecting digital assets through advanced penetration testing, vulnerability assessment, 
          and security consulting. Specialized in network security and threat analysis.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="#projects" 
            className="px-8 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-lg transition-colors duration-300 text-center"
          >
            View My Work
          </a>
          <a 
            href="#contact" 
            className="px-8 py-3 border border-cyan-600 text-cyan-400 hover:bg-cyan-600 hover:text-white font-semibold rounded-lg transition-colors duration-300 text-center"
          >
            Contact Me
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;