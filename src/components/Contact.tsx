import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Twitter, Calendar, X, Shield, CheckCircle, AlertCircle } from 'lucide-react';
import { StatusFeed } from './StatusFeed';
import { CaptchaValidator } from './CaptchaValidator';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-20 bg-gray-900 relative overflow-hidden">
      {/* Digital Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid-pattern"></div>
      </div>
      
      {/* Glitch Overlay */}
      <div className="glitch-overlay"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto glitch-line"></div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 font-mono">
            <span className="text-cyan-400">GET_IN_</span>
            <span className="text-purple-400">TOUCH</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto"></div>
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Status Feed - Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <StatusFeed maxEvents={3} />
            
            {/* Enhanced CAPTCHA Diagnostics */}
            <CaptchaValidator />
          </motion.div>
          
          {/* Right Column - Contact Options */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="tech-card">
              <div className="tech-card-header">
                <span className="text-cyan-400 font-mono text-sm">// CONTACT_METHODS</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 font-mono">
                <span className="text-green-400">&gt;</span> AVAILABLE_CHANNELS
              </h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                Connect with me through these secure channels for cybersecurity consulting, 
                security audits, or collaboration opportunities.
              </p>
              
              {/* Direct Contact Methods */}
              <div className="space-y-4">
                <ContactMethod 
                  icon={Mail}
                  label="EMAIL"
                  value="mail@anir0y.in"
                  href="mailto:mail@anir0y.in"
                  description="Direct email communication"
                />
                <ContactMethod 
                  icon={Calendar}
                  label="CALENDAR"
                  value="book.anir0y.in"
                  href="https://book.anir0y.in"
                  description="Schedule consultation session"
                />
              </div>
            </div>

            {/* Social Links Grid */}
            <div className="grid grid-cols-2 gap-4">
              <SocialCard 
                href="https://github.com/anir0y" 
                icon={Github} 
                label="GITHUB"
                description="Code Repository"
              />
              <SocialCard 
                href="https://www.linkedin.com/in/anir0y/" 
                icon={Linkedin} 
                label="LINKEDIN"
                description="Professional Network"
              />
              <SocialCard 
                href="https://x.com/anir0y" 
                icon={X} 
                label="X/TWITTER"
                description="Tech Updates"
              />
              <SocialCard 
                href="https://topmate.io/anir0y/" 
                icon={Calendar} 
                label="TOPMATE"
                description="Mentoring Platform"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Contact Method Component
const ContactMethod: React.FC<{
  icon: React.FC<{ size?: number; className?: string }>;
  label: string;
  value: string;
  href: string;
  description: string;
}> = ({ icon: Icon, label, value, href, description }) => (
  <motion.a
    href={href}
    target={href.startsWith('http') ? '_blank' : undefined}
    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
    className="flex items-center space-x-4 p-3 bg-gray-800/30 border border-cyan-400/20 hover:border-cyan-400/50 rounded transition-all duration-300 group"
    whileHover={{ scale: 1.02 }}
  >
    <Icon className="text-cyan-400 group-hover:text-white transition-colors" size={20} />
    <div className="flex-1">
      <div className="text-white font-mono text-sm">{label}</div>
      <div className="text-cyan-400 font-mono text-xs">{value}</div>
      <div className="text-gray-400 text-xs">{description}</div>
    </div>
  </motion.a>
);

// Social Card Component (unchanged)
const SocialCard: React.FC<{
  href: string;
  icon: React.FC<{ size?: number; className?: string }>;
  label: string;
  description: string;
}> = ({ href, icon: Icon, label, description }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="social-card"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <div className="social-card-content">
      <Icon size={20} className="text-cyan-400" />
      <div>
        <div className="text-white font-mono text-sm">{label}</div>
        <div className="text-gray-400 text-xs">{description}</div>
      </div>
    </div>
    <div className="social-card-glitch"></div>
  </motion.a>
);

// Extend Window interface for TypeScript
declare global {
  interface Window {
    grecaptcha: {
      enterprise: {
        ready: (callback: () => void) => void;
        execute: (siteKey: string, options: { action: string }) => Promise<string>;
      };
    };
  }
}