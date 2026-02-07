import React from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Github,
  Linkedin,
  Shield,
  Terminal,
  ExternalLink,
  Calendar,
  BookOpen,
  X
} from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-cyber-dark border-t border-cyber-border relative overflow-hidden">
      <div className="absolute inset-0 bg-pattern opacity-100"></div>

      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <div className="flex items-center space-x-3 mb-6">
              <img src="/img/anir0y-logo.svg" alt="anir0y logo" className="h-6 w-6 object-contain" />
              <span className="text-cyber-text font-mono text-xl font-medium">anir0y</span>
            </div>
            <p className="text-cyber-muted text-sm leading-relaxed mb-6">
              Cybersecurity professional helping organizations stay secure through
              penetration testing, security consulting, and threat analysis.
            </p>

            <div className="flex items-center justify-between p-3 bg-cyber-card/50 border border-cyber-green/30 rounded">
              <div className="flex items-center space-x-2">
                <div className="status-active"></div>
                <span className="text-cyber-green font-mono text-xs">Available</span>
              </div>
              <span className="text-cyber-muted font-mono text-xs">Response &lt; 24hrs</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <h3 className="text-cyber-text text-sm font-bold mb-6 uppercase tracking-wider">
              Quick Links
            </h3>
            <nav className="space-y-3">
              <FooterLink href="#home" icon={Terminal}>Home</FooterLink>
              <FooterLink href="#projects" icon={Shield}>Projects</FooterLink>
              <FooterLink href="#labs" icon={BookOpen}>Labs</FooterLink>
              <FooterLink href="#skills" icon={BookOpen}>Skills</FooterLink>
              <FooterLink href="#contact" icon={Mail}>Contact</FooterLink>
              <FooterLink href="https://classroom.anir0y.in" icon={ExternalLink} external>Blog</FooterLink>
            </nav>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <h3 className="text-cyber-text text-sm font-bold mb-6 uppercase tracking-wider">
              Services
            </h3>
            <nav className="space-y-3">
              <FooterLink href="https://book.anir0y.in" icon={Calendar} external>Book Consultation</FooterLink>
              <FooterLink href="https://topmate.io/anir0y/" icon={BookOpen} external>Mentoring</FooterLink>
              <FooterLink href="https://status.anir0y.in/" icon={Shield} external>System Status</FooterLink>
            </nav>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-1"
          >
            <h3 className="text-cyber-text text-sm font-bold mb-6 uppercase tracking-wider">
              Connect
            </h3>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <SocialButton href="https://github.com/anir0y" icon={Github} label="GitHub" />
              <SocialButton href="https://www.linkedin.com/in/anir0y/" icon={Linkedin} label="LinkedIn" />
              <SocialButton href="https://x.com/anir0y" icon={X} label="X/Twitter" />
              <SocialButton href="mailto:mail@anir0y.in" icon={Mail} label="Email" />
            </div>

            <div className="text-cyber-muted text-sm space-y-1">
              <p className="font-mono text-xs">mail@anir0y.in</p>
              <p className="text-xs">Available for consulting</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="pt-8 border-t border-cyber-border"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">

            <div className="flex items-center space-x-2 text-cyber-muted text-sm">
              <span className="font-mono">© {currentYear} Animesh Roy</span>
            </div>

            <div className="flex items-center space-x-6 text-sm">
              <a
                href="/.well-known/security.txt"
                className="text-cyber-muted hover:text-cyber-blue transition-colors font-mono text-xs"
                target="_blank"
                rel="noopener noreferrer"
              >
                Security
              </a>
              <a
                href="/privacy.html"
                className="text-cyber-muted hover:text-cyber-blue transition-colors font-mono text-xs"
              >
                Privacy
              </a>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-cyber-muted text-xs font-mono">
              Ethical hacking • Penetration testing • Security consulting
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

const FooterLink: React.FC<{
  href: string;
  icon: React.FC<{ size?: number; className?: string }>;
  children: React.ReactNode;
  external?: boolean;
}> = ({ href, icon: Icon, children, external = false }) => (
  <a
    href={href}
    target={external ? "_blank" : undefined}
    rel={external ? "noopener noreferrer" : undefined}
    className="flex items-center space-x-2 text-cyber-muted hover:text-cyber-blue transition-colors group text-sm"
    onClick={!external ? (e) => {
      e.preventDefault();
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: 'smooth' });
    } : undefined}
  >
    <Icon size={14} className="group-hover:text-cyber-blue transition-colors flex-shrink-0" />
    <span>{children}</span>
    {external && <ExternalLink size={12} className="opacity-50" />}
  </a>
);

const SocialButton: React.FC<{
  href: string;
  icon: React.FC<{ size?: number; className?: string }>;
  label: string;
}> = ({ href, icon: Icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-center p-3 bg-cyber-card/50 border border-cyber-border hover:border-cyber-blue/50 rounded transition-all group"
    aria-label={label}
  >
    <Icon size={16} className="text-cyber-muted group-hover:text-cyber-blue transition-colors" />
  </a>
);
