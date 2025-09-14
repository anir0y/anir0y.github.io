import React from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Github, 
  Linkedin, 
  Twitter, 
  Shield, 
  Terminal, 
  ExternalLink,
  Heart,
  Calendar,
  BookOpen,
  X
} from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 border-t border-cyan-400/20 relative overflow-hidden">
      {/* Tech Grid Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid-pattern"></div>
      </div>
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Section - Primary focus area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <div className="flex items-center space-x-3 mb-4">
              <Terminal className="text-cyan-400" size={24} />
              <span className="text-cyan-400 font-mono text-xl font-bold">anir0y</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              Cybersecurity professional helping organizations stay secure through 
              penetration testing, security consulting, and threat analysis.
            </p>
            
            {/* Status Indicator - High visibility for trust building */}
            <div className="flex items-center justify-between p-3 bg-gray-800/50 border border-green-400/30 rounded">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 font-mono text-sm">SYSTEM_ONLINE</span>
              </div>
              <span className="text-gray-400 font-mono text-xs">Response: &lt; 24hrs</span>
            </div>
          </motion.div>

          {/* Quick Links - Essential navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <h3 className="text-white font-mono text-lg mb-4 flex items-center">
              <span className="text-cyan-400 mr-2">{'>'}</span>
              QUICK_LINKS
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

          {/* Services - Business focused */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <h3 className="text-white font-mono text-lg mb-4 flex items-center">
              <span className="text-purple-400 mr-2">{'>'}</span>
              SERVICES
            </h3>
            <nav className="space-y-3">
              <FooterLink href="https://book.anir0y.in" icon={Calendar} external>Book Consultation</FooterLink>
              <FooterLink href="https://topmate.io/anir0y/" icon={BookOpen} external>Mentoring</FooterLink>
              <FooterLink href="https://status.anir0y.in/" icon={Shield} external>System Status</FooterLink>
            </nav>
          </motion.div>

          {/* Connect - Social engagement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-1"
          >
            <h3 className="text-white font-mono text-lg mb-4 flex items-center">
              <span className="text-green-400 mr-2">{'>'}</span>
              CONNECT
            </h3>
            
            {/* Social Links Grid - Optimized for scanning */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <SocialButton href="https://github.com/anir0y" icon={Github} label="GitHub" />
              <SocialButton href="https://www.linkedin.com/in/anir0y/" icon={Linkedin} label="LinkedIn" />
              <SocialButton href="https://x.com/anir0y" icon={X} label="X/Twitter" />
              <SocialButton href="mailto:mail@anir0y.in" icon={Mail} label="Email" />
            </div>

            {/* Contact Info - Essential for business */}
            <div className="text-gray-400 text-sm space-y-1">
              <p className="font-mono">mail@anir0y.in</p>
              <p className="font-mono">Available for consulting</p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar - Legal and secondary info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="pt-8 border-t border-gray-700"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            
            {/* Copyright - Legal requirement */}
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <span className="font-mono">© {currentYear} Animesh Roy (anir0y)</span>
              <Heart className="text-red-400" size={14} />
              <span className="font-mono">Made with passion for security</span>
            </div>

            {/* Legal Links - Compliance focused */}
            <div className="flex items-center space-x-6 text-sm">
              <a 
                href="/.well-known/security.txt" 
                className="text-gray-400 hover:text-cyan-400 transition-colors font-mono"
                target="_blank"
                rel="noopener noreferrer"
              >
                Security Policy
              </a>
              <a 
                href="/privacy.html" 
                className="text-gray-400 hover:text-cyan-400 transition-colors font-mono"
              >
                Privacy
              </a>
              <a 
                href="/terms" 
                className="text-gray-400 hover:text-cyan-400 transition-colors font-mono"
              >
                Terms
              </a>
            </div>
          </div>

          {/* Attribution - Professional credibility */}
          <div className="mt-4 text-center">
            <p className="text-gray-500 text-xs font-mono">
              Ethical hacking • Penetration testing • Security consulting
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

/* Reusable Footer Link Component - Consistent interaction patterns */
const FooterLink: React.FC<{
  href: string;
  icon: React.FC<{ size?: number; className?: string }>;
  children: React.ReactNode;
  external?: boolean;
}> = ({ href, icon: Icon, children, external = false }) => (
  <motion.a
    href={href}
    target={external ? "_blank" : undefined}
    rel={external ? "noopener noreferrer" : undefined}
    className="flex items-center space-x-2 text-gray-400 hover:text-cyan-400 transition-colors group"
    whileHover={{ x: 3 }}
    transition={{ type: "spring", stiffness: 500, damping: 30 }}
    onClick={!external ? (e) => {
      e.preventDefault();
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: 'smooth' });
    } : undefined}
  >
    <Icon size={14} className="group-hover:text-cyan-400 transition-colors" />
    <span className="font-mono text-sm">{children}</span>
    {external && <ExternalLink size={12} className="opacity-50" />}
  </motion.a>
);

/* Social Button Component - Optimized for engagement */
const SocialButton: React.FC<{
  href: string;
  icon: React.FC<{ size?: number; className?: string }>;
  label: string;
}> = ({ href, icon: Icon, label }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-center p-2 bg-gray-800/50 border border-gray-700 hover:border-cyan-400/50 rounded transition-all duration-300 group"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    aria-label={label}
  >
    <Icon size={16} className="text-gray-400 group-hover:text-cyan-400 transition-colors" />
  </motion.a>
);