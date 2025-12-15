import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cyber-dark">
      <div className="absolute inset-0 bg-pattern opacity-100"></div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto py-24">
        <div className="mb-6">
          <span className="terminal-prompt text-xs">root@sec:~$</span>
        </div>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-cyber-text leading-tight">
          Animesh Roy
        </h1>

        <p className="text-xl md:text-2xl mb-12 text-cyber-blue font-medium tracking-wide">
          Cybersecurity Specialist
        </p>

        <p className="text-base md:text-lg mb-16 text-cyber-muted max-w-2xl mx-auto leading-relaxed">
          I help organizations stay secure by finding vulnerabilities before the bad guys do.
          From penetration testing to security consulting, I make cybersecurity accessible and effective for everyone.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="cyber-button-primary"
          >
            View Projects
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;