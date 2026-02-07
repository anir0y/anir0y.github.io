import React from 'react';
import { motion } from 'framer-motion';
import { projects } from '../data/projects';
import { ExternalLink, Github } from 'lucide-react';

export const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-24 bg-cyber-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-pattern opacity-100"></div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="mb-4">
            <span className="terminal-prompt text-xs">ls /projects</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-cyber-text mb-6">
            Featured Projects
          </h2>
          <div className="section-divider"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="project-card group cursor-pointer p-0 overflow-hidden"
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                  decoding="async"
                  width={480}
                  height={192}
                />
                <div className="absolute top-3 right-3">
                  <div className="status-active"></div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-cyber-text mb-3">{project.title}</h3>
                <p className="text-cyber-muted mb-4 text-sm leading-relaxed">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="tech-badge">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex space-x-6 pt-4 border-t border-cyber-border">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyber-muted hover:text-cyber-blue flex items-center space-x-2 text-sm transition-colors"
                  >
                    <ExternalLink size={16} />
                    <span>View</span>
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyber-muted hover:text-cyber-blue flex items-center space-x-2 text-sm transition-colors"
                  >
                    <Github size={16} />
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