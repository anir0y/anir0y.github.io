import React from 'react';
import { Shield, Wifi, Box } from 'lucide-react';
import { skills } from '../data/skills';

const iconMap = {
  shield: Shield,
  wifi: Wifi,
  box: Box,
};

export function Skills() {
  const securitySkills = skills.filter(skill => skill.category === 'security');
  const toolsSkills = skills.filter(skill => skill.category === 'tools');

  return (
    <section id="skills" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 tech-heading">
            Skills & Expertise
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A comprehensive toolkit for modern cybersecurity challenges and digital innovation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Security Skills */}
          <div className="skill-category">
            <div className="flex items-center mb-6">
              <Shield className="w-6 h-6 text-blue-600 mr-3" />
              <h3 className="text-2xl font-semibold text-gray-900 tech-heading">
                Security Expertise
              </h3>
            </div>
            <div className="space-y-3">
              {securitySkills.map((skill, index) => {
                const IconComponent = iconMap[skill.icon as keyof typeof iconMap];
                return (
                  <div key={index} className="skill-item">
                    <IconComponent className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-700 font-medium">{skill.name}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tools & Technologies */}
          <div className="skill-category">
            <div className="flex items-center mb-6">
              <Box className="w-6 h-6 text-blue-600 mr-3" />
              <h3 className="text-2xl font-semibold text-gray-900 tech-heading">
                Tools & Technologies
              </h3>
            </div>
            <div className="space-y-3">
              {toolsSkills.map((skill, index) => {
                const IconComponent = iconMap[skill.icon as keyof typeof iconMap];
                return (
                  <div key={index} className="skill-item">
                    <IconComponent className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-700 font-medium">{skill.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Status Indicator */}
        <div className="mt-12 text-center">
          <div className="status-indicator inline-flex">
            <div className="status-dot status-online"></div>
            <span className="text-sm text-gray-600 tech-mono">
              Continuously learning and adapting to new technologies
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}