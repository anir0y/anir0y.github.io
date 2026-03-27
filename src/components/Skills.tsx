import React from 'react';
import { motion } from 'framer-motion';
import { skills } from '../data/skills';
import { Shield, Wifi, Code, Server, Terminal, Box } from 'lucide-react';

const iconMap = {
  shield: Shield,
  wifi: Wifi,
  code: Code,
  server: Server,
  terminal: Terminal,
  box: Box,
};

const DefaultIcon = Shield;

export const Skills: React.FC = () => {
  const categories = Array.from(new Set(skills.map(skill => skill.category)));

  return (
    <section id="skills" className="py-32 bg-cyber-dark relative overflow-hidden">
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
            <span className="terminal-prompt text-xs">cat /skills</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-4 tracking-tight">
            Technical Skills
          </h2>
          <p className="text-cyber-muted max-w-lg text-base font-display">
            Tools, techniques, and expertise honed through years of practice.
          </p>
        </motion.div>

        <div className="space-y-16 max-w-5xl">
          {categories.map((category, categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
            >
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-2 h-2 bg-cyber-blue" />
                <h3 className="text-sm font-mono text-cyber-blue uppercase tracking-widest">
                  {category}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {skills
                  .filter((skill) => skill.category === category)
                  .map((skill, index) => {
                    const Icon = iconMap[skill.icon as keyof typeof iconMap] || DefaultIcon;
                    return (
                      <motion.div
                        key={index}
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
                        className="skill-item flex items-center space-x-3 group cursor-default"
                      >
                        <Icon className="text-cyber-blue/50 group-hover:text-cyber-blue transition-colors flex-shrink-0" size={16} />
                        <span className="text-cyber-muted group-hover:text-cyber-text text-sm transition-colors">
                          {skill.name}
                        </span>
                      </motion.div>
                    );
                  })}
              </div>

              {categoryIndex < categories.length - 1 && (
                <div className="mt-16 circuit-divider" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
