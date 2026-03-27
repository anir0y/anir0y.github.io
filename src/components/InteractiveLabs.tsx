import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Terminal, Shield, Network, Mail, ArrowUpRight } from 'lucide-react';

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
  },
  {
    title: "DKIM Lab",
    url: "https://lab-dkim.anir0y.in/",
    description: "An interactive lab to understand email authentication, replay attacks, and defenses",
    icon: Mail,
    category: "Email Security"
  }
];

export const InteractiveLabs: React.FC = () => {
  return (
    <section id="labs" className="py-32 bg-cyber-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30" />

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyber-blue/20 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="mb-4">
            <span className="terminal-prompt text-xs">ls /labs</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-4 tracking-tight">
            Interactive Labs
          </h2>
          <p className="text-cyber-muted max-w-xl text-base font-display">
            Hands-on laboratory exercises for practical cybersecurity experience.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl">
          {labs.map((lab, index) => (
            <motion.a
              key={index}
              href={lab.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="glass-card p-6 group block"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 flex items-center justify-center border border-cyber-blue/20 bg-cyber-blue/5 group-hover:border-cyber-blue/40 transition-colors">
                    <lab.icon className="text-cyber-blue" size={18} />
                  </div>
                  <div>
                    <h3 className="text-base font-display font-semibold text-white group-hover:text-cyber-blue transition-colors">
                      {lab.title}
                    </h3>
                    <span className="text-cyber-blue/60 text-xs font-mono uppercase tracking-wider">
                      {lab.category}
                    </span>
                  </div>
                </div>
                <ArrowUpRight size={16} className="text-cyber-muted opacity-0 group-hover:opacity-100 transition-all group-hover:text-cyber-blue" />
              </div>

              <p className="text-cyber-muted text-sm leading-relaxed mb-5">
                {lab.description}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-cyber-border/30">
                <span className="text-cyber-muted text-xs font-mono group-hover:text-cyber-blue transition-colors flex items-center space-x-2">
                  <ExternalLink size={12} />
                  <span>Launch Lab</span>
                </span>
                <div className="flex items-center space-x-2">
                  <div className="status-active" />
                  <span className="text-cyber-green/70 font-mono text-xs">Online</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};
