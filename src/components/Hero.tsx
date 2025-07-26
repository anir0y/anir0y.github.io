import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';
import { Shield, Terminal } from 'lucide-react';
import Matrix from './Matrix'; // Import the Matrix component

export const Hero: React.FC = () => {
  return (
    <section className="min-h-screen relative flex items-center justify-center bg-gray-900 text-white pt-20 overflow-hidden">
      <Matrix /> {/* Add the Matrix component here */}
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center relative z-10 backdrop-filter backdrop-blur-sm p-4 rounded-lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-20 w-full"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="text-purple">Animesh</span> Roy,
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
                  'Penetration Tester',
                  1000,
                  'Cybersecurity Consultant',
                  1000,
                  'RF researcher',
                  1000,
                ]}
              repeat={Infinity}
            />
          </div>
          root~$ cat /etc/animesh/intro.txt <br />
          <br />
          <p className="text-gray-300 mb-8">
            Specializing in cybersecurity, penetration testing, and secure application development.
            Protecting digital assets through innovative solutions and constant vigilance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#contact"
              className="bg-purple text-white px-6 py-3 rounded-md flex items-center justify-center space-x-2">
              <Shield size={20} className="text-white" />
              <span>Hire Me</span>
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#projects"
              className="border border-purple text-purple px-6 py-3 rounded-md flex items-center justify-center space-x-2">
              <Terminal size={20} className="text-white" />
              <span>View Projects</span>
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://classroom.anir0y.in"
              className="border border-purple text-purple px-6 py-3 rounded-md flex items-center justify-center space-x-2">
              <Terminal size={20} className="text-white" />
              <span>Blog</span>
            </motion.a>
            
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative hidden md:block w-full"
        >
          <div className="w-64 h-64 md:w-96 md:h-96 mx-auto relative">
            <img
              src="https://pbs.twimg.com/profile_images/1706703769751506944/L-sDbc-Q_400x400.jpg"
              alt="Profile"
              className="rounded-full w-full h-full object-cover border-4 border-purple"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple/20 to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};