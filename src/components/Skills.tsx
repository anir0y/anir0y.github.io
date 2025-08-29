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

// Fallback icon for missing mappings
const DefaultIcon = Shield;

export const Skills: React.FC = () => {
  // Dynamically generate unique categories from skills data
  const categories = Array.from(new Set(skills.map(skill => skill.category)));

  return (
    <section id="skills" className="py-20 bg-gray-900 relative overflow-hidden">
      {/* Tech Grid Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid-pattern"></div>
      </div>
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-mono glitch-text" data-text="TECHNICAL_SKILLS">
            <span className="text-cyan-400">TECHNICAL_</span>
            <span className="text-purple-400">SKILLS</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto glitch-line"></div>
          <div className="mt-4 font-mono text-sm text-gray-400">
            <span className="text-green-400">root@anir0y:~$</span> cat /proc/skills
          </div>
        </motion.div>
        
        <div className="grid gap-8">
          {categories.map((category, categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="tech-card"
            >
              <div className="tech-card-header">
                <span className="text-purple-400 font-mono text-sm">
                  // {category.toUpperCase()}_MODULES
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-6 capitalize font-mono">
                <span className="text-cyan-400">{">"}</span> {category.toUpperCase()}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {skills
                  .filter((skill) => skill.category === category)
                  .map((skill, index) => {
                    const Icon = iconMap[skill.icon as keyof typeof iconMap] || DefaultIcon;
                    return (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        className="bg-gray-800/50 p-4 rounded border border-cyan-400/20 flex items-center space-x-3 hover:border-cyan-400/50 transition-colors group"
                      >
                        <Icon className="text-cyan-400 group-hover:text-white transition-colors" size={20} />
                        <span className="text-gray-300 group-hover:text-white font-mono text-sm transition-colors">{skill.name}</span>
                        <div className="ml-auto w-2 h-2 bg-green-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </motion.div>
                    );
                  })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};