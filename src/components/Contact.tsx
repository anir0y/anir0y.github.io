import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Calendar, X, ArrowUpRight } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-32 bg-cyber-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30" />

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyber-blue/20 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="mb-4">
            <span className="terminal-prompt text-xs">cat /contact</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-4 tracking-tight">
            Get In Touch
          </h2>
          <p className="text-cyber-muted max-w-lg text-base font-display">
            Connect through secure channels for consulting, audits, or collaboration.
          </p>
        </motion.div>

        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <ContactMethod
                icon={Mail}
                label="Email"
                value="mail@anir0y.in"
                href="mailto:mail@anir0y.in"
              />
              <ContactMethod
                icon={Calendar}
                label="Schedule"
                value="book.anir0y.in"
                href="https://book.anir0y.in"
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <SocialCard href="https://github.com/anir0y" icon={Github} label="GitHub" />
              <SocialCard href="https://www.linkedin.com/in/anir0y/" icon={Linkedin} label="LinkedIn" />
              <SocialCard href="https://x.com/anir0y" icon={X} label="X" />
              <SocialCard href="https://topmate.io/anir0y/" icon={Calendar} label="Topmate" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ContactMethod: React.FC<{
  icon: React.FC<{ size?: number; className?: string }>;
  label: string;
  value: string;
  href: string;
}> = ({ icon: Icon, label, value, href }) => (
  <a
    href={href}
    target={href.startsWith('http') ? '_blank' : undefined}
    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
    className="glass-card p-5 flex items-center space-x-4 group"
  >
    <div className="w-10 h-10 flex items-center justify-center border border-cyber-blue/20 bg-cyber-blue/5 group-hover:border-cyber-blue/40 transition-colors flex-shrink-0">
      <Icon className="text-cyber-blue" size={18} />
    </div>
    <div className="flex-1 min-w-0">
      <div className="text-cyber-muted text-xs font-mono uppercase tracking-wider mb-1">{label}</div>
      <div className="text-white text-sm font-display truncate">{value}</div>
    </div>
    <ArrowUpRight size={14} className="text-cyber-muted opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
  </a>
);

const SocialCard: React.FC<{
  href: string;
  icon: React.FC<{ size?: number; className?: string }>;
  label: string;
}> = ({ href, icon: Icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="glass-card flex flex-col items-center justify-center p-5 space-y-2 group"
  >
    <Icon size={18} className="text-cyber-muted group-hover:text-cyber-blue transition-colors" />
    <span className="text-cyber-muted text-xs font-mono group-hover:text-cyber-text transition-colors">
      {label}
    </span>
  </a>
);
