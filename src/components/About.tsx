import React from 'react';
import { ScrollReveal } from './ScrollReveal';

const stats = [
  { value: '8+', label: 'Years Experience' },
  { value: '100+', label: 'Security Assessments' },
  { value: '20+', label: 'Open Source Projects' },
];

export const About: React.FC = () => {
  return (
    <section id="about" className="py-sp-3xl px-sp-md">
      <div className="w-[min(90%,1120px)] mx-auto">
        <ScrollReveal>
          <span className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-accent mb-6 block">
            About
          </span>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-sp-2xl">
          <ScrollReveal delay={1}>
            <h2 className="text-[clamp(2.2rem,5vw,4rem)] font-extrabold tracking-[-0.04em] leading-[1.1] mb-6">
              Security researcher & consultant
            </h2>
            <p className="text-fg-muted text-[1.05rem] leading-relaxed mb-4">
              With a background spanning offensive security, threat intelligence, and cloud infrastructure,
              I bridge the gap between identifying risks and building defenses that actually work.
            </p>
            <p className="text-fg-muted text-[1.05rem] leading-relaxed">
              Currently focused on red teaming engagements, building interactive security labs for
              the community, and mentoring the next generation of security professionals.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={2}>
            {/* Stats in bordered cards */}
            <div className="grid grid-cols-3 gap-3 md:mt-8">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="text-center p-5 rounded-xl border border-border bg-bg-card hover:border-accent/30 transition-colors"
                >
                  <div className="text-[clamp(1.8rem,3.5vw,2.5rem)] font-extrabold text-accent tracking-[-0.03em] mb-1">
                    {stat.value}
                  </div>
                  <div className="text-fg-muted text-xs leading-tight">{stat.label}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
