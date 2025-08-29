import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';
import { Shield, Terminal } from 'lucide-react';
import Matrix from './Matrix'; // Import the Matrix component

export const Hero: React.FC = () => {
  return (
    <section className="min-h-screen relative flex items-center justify-center bg-gray-900 text-white pt-20 overflow-hidden">
      <Matrix /> {/* Add the Matrix component here */}
      
      {/* Tech Grid Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid-pattern"></div>
      </div>
      
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-20 w-full tech-card"
        >
          <div className="tech-card-header">
            <span className="text-cyan-400 font-mono text-sm">// SYSTEM_IDENTITY</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-mono">
            <span className="text-cyan-400 glitch-text" data-text="Animesh">Animesh</span> 
            <span className="text-purple-400">Roy</span>
            <br />
          </h1>
          
          <div className="text-xl md:text-2xl text-gray-300 mb-8 h-20 font-mono">
            <span className="text-green-400">{">"}</span> 
            <TypeAnimation
              sequence={[
                  'TEACHER',
                  1000,
                  'SECURITY_RESEARCHER',
                  1000,
                  'RED_TEAMER',
                  1000,
                  'PENETRATION_TESTER',
                  1000,
                  'CYBERSECURITY_CONSULTANT',
                  1000,
                  'RF_RESEARCHER',
                  1000,
                ]}
              repeat={Infinity}
            />
          </div>
          
          <div className="mb-6 font-mono text-sm text-gray-400">
            <span className="text-green-400">root@anir0y:~$</span> cat /etc/animesh/intro.txt
          </div>
          
          <p className="text-gray-300 mb-8 leading-relaxed">
            Specializing in cybersecurity, penetration testing, and secure application development.
            Protecting digital assets through innovative solutions and constant vigilance.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#contact"
              className="tech-button primary"
            >
              <Shield size={20} />
              <span>HIRE_ME</span>
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#projects"
              className="tech-button secondary"
            >
              <Terminal size={20} />
              <span>VIEW_PROJECTS</span>
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://classroom.anir0y.in"
              target="_blank"
              rel="noopener noreferrer"
              className="tech-button tertiary"
            >
              <Terminal size={20} />
              <span>ACCESS_BLOG</span>
            </motion.a>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative hidden md:block w-full floating"
        >
          <div className="w-64 h-64 md:w-96 md:h-96 mx-auto relative tech-card p-4 glow-pulse">
            <div className="tech-card-header">
              <span className="text-purple-400 font-mono text-sm">// PROFILE_IMAGE</span>
            </div>
            <img
              src="https://pbs.twimg.com/profile_images/1706703769751506944/L-sDbc-Q_400x400.jpg"
              alt="Profile"
              className="rounded-lg w-full h-full object-cover border-2 border-cyan-400/30 mt-4"
            />
            <div className="absolute inset-4 mt-8 rounded-lg bg-gradient-to-tr from-cyan-400/10 to-purple-400/10 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};