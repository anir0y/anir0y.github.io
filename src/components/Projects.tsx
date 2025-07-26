import React from 'react';
import { motion } from 'framer-motion';
import { projects } from '../data/projects';
import { ExternalLink, Github } from 'lucide-react';

export const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">
          Featured <span className="text-white">Projects</span>
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-800 rounded-lg overflow-hidden"
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative group">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-purple/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                L35: <p className="text-gray-300 mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-sm bg-gray-700 text-purple rounded-full"
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
                    className="text-gray-300 hover:text-white flex items-center space-x-1 group"
                  >
                    <motion.span
                      whileHover={{ x: 3 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    >
                      <ExternalLink size={16} className="text-white" />
                    </motion.span>
                    <span>learn more</span>
                  </a>
                  <a
                    href={project.github}
                    className="text-gray-300 hover:text-white flex items-center space-x-1 group"
                  >
                    <motion.span
                      whileHover={{ x: 3 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    >
                      <Github size={16} className="text-white" />
                    </motion.span>
                    <span>Source</span>
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