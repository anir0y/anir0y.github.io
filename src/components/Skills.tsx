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
    <section id="skills" className="py-20 bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">
          Technical <span className="text-white">Skills</span>
        </h2>
        <div className="grid gap-8">
          {categories.map((category, categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
            >
              <h3 className="text-xl font-bold text-white mb-4 capitalize">
                {category}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {skills
                  .filter((skill) => skill.category === category)
                  .map((skill, index) => {
                    const Icon = iconMap[skill.icon as keyof typeof iconMap] || DefaultIcon;
                    return (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        className="bg-gray-900 p-4 rounded-lg flex items-center space-x-3"
                      >
                        <Icon className="text-white" size={24} />
                        <span className="text-white">{skill.name}</span>
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