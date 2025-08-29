import React from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { projects } from '../data/projects';

export function Projects() {
  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 tech-heading">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A showcase of cybersecurity tools, research projects, and innovative solutions 
            I've developed to address real-world security challenges.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <div className="project-image mb-6">
                <img 
                  src={project.imageUrl} 
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 tech-heading">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full tech-mono"
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
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span className="text-sm font-medium">Live Demo</span>
                  </a>
                  {project.github && (
                    <a 
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      <span className="text-sm font-medium">Source</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Status Indicator */}
        <div className="mt-12 text-center">
          <div className="status-indicator inline-flex">
            <div className="status-dot status-online"></div>
            <span className="text-sm text-gray-600 tech-mono">
              More projects available on GitHub
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}