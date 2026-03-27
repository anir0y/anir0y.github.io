import React from 'react';
import { motion } from 'framer-motion';
import { projects } from '../data/projects';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';

export const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-32 bg-cyber-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-50" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="mb-4">
            <span className="terminal-prompt text-xs">ls /projects</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-4 tracking-tight">
            Featured Projects
          </h2>
          <p className="text-cyber-muted max-w-lg text-base font-display">
            Security tools, labs, and applications built with purpose.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.a
              key={index}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="project-card group block"
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                  width={480}
                  height={192}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark/80 via-transparent to-transparent" />
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-8 h-8 flex items-center justify-center bg-cyber-dark/80 border border-cyber-blue/30 backdrop-blur-sm">
                    <ArrowUpRight size={14} className="text-cyber-blue" />
                  </div>
                </div>
                <div className="absolute top-4 left-4">
                  <div className="status-active" />
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-display font-semibold text-white mb-2 group-hover:text-cyber-blue transition-colors">
                  {project.title}
                </h3>
                <p className="text-cyber-muted mb-5 text-sm leading-relaxed line-clamp-2">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="tech-badge">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex space-x-6 pt-4 border-t border-cyber-border/50">
                  <span className="text-cyber-muted group-hover:text-cyber-blue flex items-center space-x-2 text-xs transition-colors font-mono">
                    <ExternalLink size={12} />
                    <span>View</span>
                  </span>
                  <span
                    className="text-cyber-muted flex items-center space-x-2 text-xs transition-colors font-mono hover:text-cyber-blue"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      window.open(project.github, '_blank');
                    }}
                  >
                    <Github size={12} />
                    <span>Source</span>
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};
