import React from 'react';
import { projects } from '../data/projects';
import { ArrowUpRight, FlaskConical } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

const projectItems = projects.filter(p => p.type === 'project');
const labItems = projects.filter(p => p.type === 'lab');

function getSpanClass(span?: string): string {
  if (span === 'hero') return 'col-span-6 min-h-[360px]';
  if (span === 'wide') return 'col-span-6 md:col-span-4';
  return 'col-span-6 md:col-span-3';
}

export const BentoGrid: React.FC = () => {
  return (
    <section id="work" className="py-sp-2xl px-sp-md">
      <div className="w-[min(90%,1120px)] mx-auto">

        {/* Projects */}
        <ScrollReveal>
          <span className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-accent mb-4 block">
            Projects
          </span>
          <h2 className="text-[clamp(1.6rem,3vw,2.2rem)] font-bold tracking-[-0.025em] mb-2">
            Featured Work
          </h2>
          <p className="text-fg-muted text-sm mb-8 max-w-lg">
            Security tools, applications, and open-source projects.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-sp-3xl">
          {projectItems.map((project, index) => (
            <ScrollReveal
              key={project.title}
              className={`${getSpanClass(project.span)} group`}
              delay={Math.min(index, 4)}
            >
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`relative block h-full min-h-[240px] rounded-card border border-border bg-bg-card overflow-hidden hover:-translate-y-[3px] hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)] hover:border-border-strong transition-all duration-300 ${project.span === 'hero' ? 'border-accent/20 hover:border-accent/40' : ''}`}
              >
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src={project.imageUrl}
                    alt=""
                    className="w-full h-full object-cover opacity-[0.15] group-hover:opacity-[0.25] group-hover:scale-[1.06] transition-all duration-700"
                    loading="lazy"
                  />
                </div>

                <div className="relative z-10 p-8 h-full flex flex-col justify-end">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 text-[0.68rem] font-mono font-medium uppercase tracking-[0.06em] rounded-full bg-accent-dim text-accent"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-[1.4rem] font-bold tracking-[-0.025em] text-fg mb-2">
                    {project.title}
                  </h3>

                  <p className="text-fg-muted text-sm leading-relaxed line-clamp-2">
                    {project.description}
                  </p>

                  <div className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-bg-inset opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight size={16} className="text-fg-muted" />
                  </div>
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>

        {/* Labs */}
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-accent block">
              Interactive Labs
            </span>
            <FlaskConical size={14} className="text-accent" />
          </div>
          <h2 className="text-[clamp(1.6rem,3vw,2.2rem)] font-bold tracking-[-0.025em] mb-2">
            Hands-on Learning
          </h2>
          <p className="text-fg-muted text-sm mb-8 max-w-lg">
            Practice cybersecurity concepts in live, interactive environments.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {labItems.map((lab, index) => (
            <ScrollReveal
              key={lab.title}
              className="group"
              delay={Math.min(index, 3)}
            >
              <a
                href={lab.link}
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex items-center gap-5 p-5 rounded-xl border border-border bg-bg-card overflow-hidden hover:-translate-y-[2px] hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] hover:border-accent/30 transition-all duration-300"
              >
                {/* Thumbnail */}
                <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border border-border">
                  <img
                    src={lab.imageUrl}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {lab.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-1.5 py-0.5 text-[0.6rem] font-mono font-medium uppercase tracking-[0.06em] rounded bg-accent-dim text-accent"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-base font-semibold tracking-[-0.02em] text-fg mb-1 group-hover:text-accent transition-colors">
                    {lab.title}
                  </h3>
                  <p className="text-fg-muted text-xs leading-relaxed line-clamp-1">
                    {lab.description}
                  </p>
                </div>

                {/* Status + arrow */}
                <div className="flex-shrink-0 flex flex-col items-end gap-2">
                  <ArrowUpRight size={14} className="text-fg-faint group-hover:text-accent transition-colors" />
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent animate-status-pulse" />
                    <span className="text-[0.65rem] font-mono text-fg-faint">Live</span>
                  </div>
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
