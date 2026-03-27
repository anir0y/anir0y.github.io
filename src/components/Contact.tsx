import React from 'react';
import { Mail, Calendar, Github, Linkedin, ArrowUpRight } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { Threads } from './Threads';
import { XIcon } from './XIcon';

const socials = [
  { href: 'https://github.com/anir0y', icon: Github, label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/anir0y/', icon: Linkedin, label: 'LinkedIn' },
  { href: 'https://x.com/anir0y', icon: XIcon, label: '' },
  { href: 'https://topmate.io/anir0y/', label: 'Topmate' },
];

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="relative py-sp-3xl px-sp-md overflow-hidden" style={{ background: 'var(--bg)' }}>
      {/* Threads background — fills entire section */}
      <div className="absolute inset-0 z-0">
        <Threads amplitude={1} />
      </div>

      <div className="w-[min(90%,1120px)] mx-auto relative z-[1]">
        <div className="grid md:grid-cols-2 gap-sp-2xl">
          {/* Left: headline */}
          <ScrollReveal>
            <span className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-accent mb-4 block">
              Contact
            </span>
            <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold tracking-[-0.03em] leading-[1.1] mb-4">
              Let's work together
            </h2>
            <p className="text-fg-muted text-[1.05rem] leading-relaxed">
              Available for security consulting, penetration testing, and collaboration.
              Reach out through any channel below.
            </p>
          </ScrollReveal>

          {/* Right: contact card */}
          <ScrollReveal delay={1}>
            <div className="rounded-xl border border-border bg-bg-card/90 backdrop-blur-sm p-8 space-y-6">
              <a
                href="mailto:mail@anir0y.in"
                className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-border-strong hover:bg-bg-inset transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-accent" />
                  <div>
                    <div className="text-[0.7rem] font-mono uppercase tracking-[0.1em] text-fg-faint">Email</div>
                    <div className="text-fg text-sm font-medium">mail@anir0y.in</div>
                  </div>
                </div>
                <ArrowUpRight size={14} className="text-fg-faint group-hover:text-fg transition-colors" />
              </a>

              <a
                href="https://topmate.io/anir0y"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-border-strong hover:bg-bg-inset transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Calendar size={18} className="text-accent" />
                  <div>
                    <div className="text-[0.7rem] font-mono uppercase tracking-[0.1em] text-fg-faint">Schedule</div>
                    <div className="text-fg text-sm font-medium">topmate.io/anir0y</div>
                  </div>
                </div>
                <ArrowUpRight size={14} className="text-fg-faint group-hover:text-fg transition-colors" />
              </a>

              {/* Social pills */}
              <div className="flex flex-wrap gap-2 pt-2">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 rounded border border-border text-fg-muted text-[0.8rem] font-medium hover:border-border-strong hover:text-fg transition-all ${social.label ? 'px-3.5 py-2' : 'p-2.5'}`}
                  >
                    {social.icon && <social.icon size={14} />}
                    {social.label && <span>{social.label}</span>}
                  </a>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
