import React from 'react';
import { motion } from 'framer-motion';
import { projects } from '../data/projects';
import { ExternalLink, Github } from 'lucide-react';

export const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-20 bg-gray-800 relative overflow-hidden">
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
            <span className="text-cyan-400">FEATURED_</span>
            <span className="text-purple-400">PROJECTS</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto"></div>
          <div className="mt-4 font-mono text-sm text-gray-400">
            <span className="text-green-400">root@anir0y:~$</span> ls -la /projects/
          </div>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
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
                  // PROJECT_{String(index + 1).padStart(2, '0')}
                </span>
              </div>
              
              <div className="relative group">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-48 object-cover rounded border border-cyan-400/20"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity rounded" />
                <div className="absolute top-2 right-2 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              
              <div className="mt-4">
                <h3 className="text-xl font-bold text-white mb-2 font-mono">{project.title}</h3>
                <p className="text-gray-300 mb-4 text-sm leading-relaxed">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs bg-gray-900/50 text-cyan-400 rounded border border-cyan-400/30 font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex space-x-4">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-cyan-400 flex items-center space-x-1 group font-mono text-sm transition-colors"
                  >
                    <motion.span
                      whileHover={{ x: 3 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    >
                      <ExternalLink size={16} />
                    </motion.span>
                    <span>LEARN_MORE</span>
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-purple-400 flex items-center space-x-1 group font-mono text-sm transition-colors"
                  >
                    <motion.span
                      whileHover={{ x: 3 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    >
                      <Github size={16} />
                    </motion.span>
                    <span>SOURCE</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};