import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Calendar, X, Shield } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 bg-cyber-dark relative overflow-hidden border-t border-cyber-border">
      <div className="absolute inset-0 bg-pattern opacity-100"></div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="mb-4">
            <span className="terminal-prompt text-xs">cat /contact</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-cyber-text mb-6">
            Get In Touch
          </h2>
          <div className="section-divider"></div>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="minimal-card"
          >
            <div className="flex items-center space-x-3 mb-6">
              <Shield className="text-cyber-blue" size={24} />
              <h3 className="text-2xl font-bold text-cyber-text">
                Contact Methods
              </h3>
            </div>
            <p className="text-cyber-muted leading-relaxed mb-8">
              Connect with me through these secure channels for cybersecurity consulting,
              security audits, or collaboration opportunities.
            </p>

            <div className="space-y-4">
              <ContactMethod
                icon={Mail}
                label="Email"
                value="mail@anir0y.in"
                href="mailto:mail@anir0y.in"
              />
              <ContactMethod
                icon={Calendar}
                label="Calendar"
                value="book.anir0y.in"
                href="https://book.anir0y.in"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <SocialCard
                href="https://github.com/anir0y"
                icon={Github}
                label="GitHub"
              />
              <SocialCard
                href="https://www.linkedin.com/in/anir0y/"
                icon={Linkedin}
                label="LinkedIn"
              />
              <SocialCard
                href="https://x.com/anir0y"
                icon={X}
                label="X/Twitter"
              />
              <SocialCard
                href="https://topmate.io/anir0y/"
                icon={Calendar}
                label="Topmate"
              />
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
    className="flex items-center space-x-4 p-4 bg-cyber-dark/30 border border-cyber-blue/20 hover:border-cyber-blue/40 rounded transition-all"
  >
    <Icon className="text-cyber-blue flex-shrink-0" size={20} />
    <div className="flex-1">
      <div className="text-cyber-text text-sm font-medium">{label}</div>
      <div className="text-cyber-blue text-xs font-mono">{value}</div>
    </div>
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
    className="flex items-center justify-center space-x-3 p-4 bg-cyber-dark/30 border border-cyber-blue/20 hover:border-cyber-blue/40 rounded transition-all group"
  >
    <Icon size={18} className="text-cyber-blue group-hover:text-cyber-green transition-colors" />
    <span className="text-cyber-muted text-sm group-hover:text-cyber-text transition-colors">{label}</span>
  </a>
);
