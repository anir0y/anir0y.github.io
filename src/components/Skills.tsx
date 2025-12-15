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
    <section id="skills" className="py-24 bg-cyber-dark relative overflow-hidden border-t border-cyber-border">
      <div className="absolute inset-0 bg-pattern opacity-100"></div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="mb-4">
            <span className="terminal-prompt text-xs">cat /skills</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-cyber-text mb-6">
            Technical Skills
          </h2>
          <div className="section-divider"></div>
        </motion.div>

        <div className="space-y-12 max-w-6xl mx-auto">
          {categories.map((category, categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
            >
              <h3 className="text-xl font-bold text-cyber-blue mb-6 uppercase tracking-wider">
                {category}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {skills
                  .filter((skill) => skill.category === category)
                  .map((skill, index) => {
                    const Icon = iconMap[skill.icon as keyof typeof iconMap] || DefaultIcon;
                    return (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        className="skill-item flex items-center space-x-3 group"
                      >
                        <Icon className="text-cyber-blue group-hover:text-cyber-green transition-colors flex-shrink-0" size={18} />
                        <span className="text-cyber-muted group-hover:text-cyber-text text-sm transition-colors">{skill.name}</span>
                      </motion.div>
                    );
                  })}
              </div>
              {categoryIndex < categories.length - 1 && (
                <div className="mt-12 circuit-divider"></div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};