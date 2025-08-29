import React from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { ArrowDown, Github, Linkedin, Twitter, Mail } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section id="home" className="min-h-screen bg-gray-900 relative overflow-hidden flex items-center justify-center">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 font-mono">
              <span className="text-cyan-400">anir0y</span>
            </h1>
            <div className="text-xl md:text-2xl text-gray-300 mb-8 font-mono">
              <TypeAnimation
                sequence={[
                  'Cybersecurity Expert',
                  2000,
                  'Penetration Tester',
                  2000,
                  'Red Team Specialist',
                  2000,
                  'Security Researcher',
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Passionate about cybersecurity, ethical hacking, and building secure digital solutions. 
            Helping organizations strengthen their security posture through comprehensive testing and analysis.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <a
              href="#contact"
              className="bg-cyan-400 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-cyan-300 transition-colors"
            >
              Get In Touch
            </a>
            <a
              href="#projects"
              className="border border-cyan-400 text-cyan-400 px-8 py-3 rounded-lg font-semibold hover:bg-cyan-400 hover:text-gray-900 transition-colors"
            >
              View Projects
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex justify-center space-x-6 mb-16"
          >
            <a
              href="https://github.com/anir0y"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyan-400 transition-colors"
            >
              <Github size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/anir0y/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyan-400 transition-colors"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="https://x.com/anir0y"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyan-400 transition-colors"
            >
              <Twitter size={24} />
            </a>
            <a
              href="mailto:mail@anir0y.in"
              className="text-gray-400 hover:text-cyan-400 transition-colors"
            >
              <Mail size={24} />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ArrowDown className="text-cyan-400" size={24} />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};