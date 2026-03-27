import React from 'react';
import { techStack } from '../data/techStack';

export const TechMarquee: React.FC = () => {
  const items = [...techStack, ...techStack];

  return (
    <section className="py-sp-xl overflow-hidden border-y border-border">
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-bg to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-bg to-transparent z-10 pointer-events-none" />

        <div className="flex gap-4 animate-marquee hover:[animation-play-state:paused] w-max">
          {items.map((tech, i) => (
            <div
              key={`${tech.name}-${i}`}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-bg-card text-fg-muted text-sm font-medium whitespace-nowrap hover:text-fg hover:border-border-strong hover:scale-110 transition-all duration-300 cursor-default select-none"
            >
              <span className="text-base">{tech.icon}</span>
              <span>{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
