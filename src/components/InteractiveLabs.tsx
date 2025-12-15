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
    <section id="labs" className="py-24 bg-cyber-dark relative overflow-hidden border-t border-cyber-border">
      <div className="absolute inset-0 bg-pattern opacity-100"></div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="mb-4">
            <span className="terminal-prompt text-xs">ls /labs</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-cyber-text mb-6">
            Interactive Labs
          </h2>
          <div className="section-divider"></div>
          <p className="text-cyber-muted mt-8 max-w-3xl mx-auto leading-relaxed">
            Enhance your learning with these hands-on laboratory exercises.
            These interactive labs provide practical experience to reinforce theoretical knowledge
            and develop hands-on skills in cybersecurity and networking concepts.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {labs.map((lab, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="minimal-card group cursor-pointer"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-cyber-dark/50 border border-cyber-blue/30 rounded">
                  <lab.icon className="text-cyber-blue" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-cyber-text">{lab.title}</h3>
                  <span className="text-cyber-blue text-xs uppercase tracking-wider">{lab.category}</span>
                </div>
              </div>

              <p className="text-cyber-muted mb-6 text-sm leading-relaxed">{lab.description}</p>

              <div className="flex items-center justify-between pt-4 border-t border-cyber-border">
                <a
                  href={lab.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-cyber-muted hover:text-cyber-blue text-sm transition-colors"
                >
                  <span>Launch</span>
                  <ExternalLink size={14} />
                </a>

                <div className="flex items-center space-x-2">
                  <div className="status-active"></div>
                  <span className="text-cyber-green font-mono text-xs">Online</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};