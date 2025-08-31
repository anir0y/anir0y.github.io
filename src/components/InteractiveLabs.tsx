import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Terminal, Shield, Network } from 'lucide-react';

interface Lab {
  title: string;
  url: string;
  description: string;
  icon: React.FC<{ size?: number; className?: string }>;
  category: string;
}

const labs: Lab[] = [
  {
    title: "PKI Lab",
    url: "https://anir0y.in/pki/",
    description: "Practice Public Key Infrastructure concepts and certificate management",
    icon: Shield,
    category: "Cryptography"
  },
  {
    title: "OSI Packet Lab", 
    url: "https://osi.anir0y.in/",
    description: "Explore network packet analysis and the OSI model layers",
    icon: Network,
    category: "Networking"
  },
  {
    title: "Buffer Overflow Lab",
    url: "https://0x414141.anir0y.in/",
    description: "Learn about buffer overflow vulnerabilities and exploitation techniques", 
    icon: Terminal,
    category: "Exploitation"
  }
];

export const InteractiveLabs: React.FC = () => {
  return (
    <section id="labs" className="py-20 bg-gray-800 relative overflow-hidden">
      {/* Tech Grid Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid-pattern"></div>
      </div>
      
      {/* Scan Line Effect */}
      <div className="glitch-overlay"></div>
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-mono">
            <span className="text-cyan-400">INTERACTIVE_</span>
            <span className="text-purple-400">LABS</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto"></div>
          <div className="mt-4 font-mono text-sm text-gray-400">
            <span className="text-green-400">root@anir0y:~$</span> ls -la /labs/
          </div>
          <p className="text-gray-300 mt-6 max-w-3xl mx-auto leading-relaxed">
            Enhance your learning with these hands-on laboratory exercises. 
            These interactive labs provide practical experience to reinforce theoretical knowledge 
            and develop hands-on skills in cybersecurity and networking concepts.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {labs.map((lab, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="project-card group cursor-pointer p-6"
              whileHover={{ scale: 1.02 }}
            >
              <div className="tech-card-header">
                <span className="text-cyan-400 font-mono text-xs">
                  // LAB_{String(index + 1).padStart(2, '0')}
                </span>
              </div>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-gray-900/50 border border-cyan-400/30 rounded">
                  <lab.icon className="text-cyan-400" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white font-mono">{lab.title}</h3>
                  <span className="text-purple-400 font-mono text-sm">{lab.category}</span>
                </div>
              </div>
              
              <p className="text-gray-300 mb-6 text-sm leading-relaxed">{lab.description}</p>
              
              <div className="flex items-center justify-between">
                <motion.a
                  href={lab.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-cyan-400 hover:text-white group font-mono text-sm transition-colors"
                  whileHover={{ x: 3 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  <span>LAUNCH_LAB</span>
                  <ExternalLink size={16} className="group-hover:text-white transition-colors" />
                </motion.a>
                
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 font-mono text-xs">ONLINE</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <div className="tech-card max-w-2xl mx-auto">
            <div className="tech-card-header">
              <span className="text-green-400 font-mono text-sm">// LEARNING_OBJECTIVES</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-4 font-mono">
              <span className="text-cyan-400">></span> HANDS_ON_EXPERIENCE
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Each lab is designed to provide practical, real-world experience with cybersecurity concepts. 
              Work through these exercises to build your skills in a safe, controlled environment.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};