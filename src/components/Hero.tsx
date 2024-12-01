import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';
import { Shield, Terminal } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-900 text-white pt-20">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="text-green-500">Animesh</span> Roy,
            <br />
            
          </h1>
          <div className="text-xl md:text-2xl text-gray-400 mb-6 h-20">
            <TypeAnimation
              sequence={[
                'Teacher',
                1000,
                'Security Researcher',
                1000,
                'Red Teamer',
                1000,

              ]}
              repeat={Infinity}
            />
          </div>
          <p className="text-gray-400 mb-8">
            Specializing in cybersecurity, penetration testing, and secure application development.
            Protecting digital assets through innovative solutions and constant vigilance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#contact"
              className="bg-green-500 text-black px-6 py-3 rounded-md flex items-center justify-center space-x-2"
            >
              <Shield size={20} />
              <span>Hire Me</span>
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#projects"
              className="border border-green-500 text-green-500 px-6 py-3 rounded-md flex items-center justify-center space-x-2"
            >
              <Terminal size={20} />
              <span>View Projects</span>
            </motion.a>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative hidden md:block"
        >
          <div className="w-64 h-64 md:w-96 md:h-96 mx-auto relative">
            <img
              src="https://pbs.twimg.com/profile_images/1706703769751506944/L-sDbc-Q_400x400.jpg"
              alt="Profile"
              className="rounded-full w-full h-full object-cover border-4 border-green-500"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-green-500/20 to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};