import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Twitter, MailCheckIcon, BookIcon, BookDashed, Calendar, X, GitBranchIcon } from 'lucide-react';
import { StatusFeed } from './StatusFeed';

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
        
        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Status Feed - Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <StatusFeed maxEvents={5} />
          </motion.div>
          
          {/* Middle Column - Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8 lg:col-span-1"
          >
            <div className="tech-card">
              <div className="tech-card-header">
                <span className="text-cyan-400 font-mono text-sm">// SYSTEM_STATUS</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 font-mono">
                <span className="text-green-400">&gt;</span> READY_FOR_CONNECTION
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Whether you're interested in cybersecurity consulting, need a security audit,
                or want to discuss potential collaborations, I'm always open to new opportunities.
                Let's build something secure together.
              </p>
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
                href="https://book.anir0y.in" 
                icon={Calendar} 
                label="CALENDAR"
                description="Schedule Meeting"
              />
            </div>
          </motion.div>
          
          {/* Right Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 lg:col-span-1"
          >
            <div className="tech-card">
              <div className="tech-card-header">
                <span className="text-purple-400 font-mono text-sm">// BOOKING_SYSTEM</span>
              </div>
              
              <div className="space-y-6">
                <div className="booking-option">
                  <div className="flex items-center space-x-3 mb-3">
                    <Calendar className="text-cyan-400" size={24} />
                    <h4 className="text-white font-mono text-lg">DIRECT_BOOKING</h4>
                  </div>
                  <p className="text-gray-300 text-sm mb-4">
                    Schedule a consultation session directly through my calendar system.
                  </p>
                  <motion.a
                    href="https://book.anir0y.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tech-button primary"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>BOOK_SESSION</span>
                    <div className="button-glitch"></div>
                  </motion.a>
                </div>

                <div className="divider">
                  <span className="text-gray-500 font-mono text-xs">OR</span>
                </div>

                <div className="booking-option">
                  <div className="flex items-center space-x-3 mb-3">
                    <BookIcon className="text-purple-400" size={24} />
                    <h4 className="text-white font-mono text-lg">TOPMATE_PLATFORM</h4>
                  </div>
                  <p className="text-gray-300 text-sm mb-4">
                    Connect through Topmate.io for structured mentoring sessions.
                  </p>
                  <motion.a
                    href="https://topmate.io/anir0y/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tech-button secondary"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>CONNECT_VIA_TOPMATE</span>
                    <div className="button-glitch"></div>
                  </motion.a>
                </div>
              </div>
            </div>

            {/* Status Indicator */}
            <div className="status-indicator">
              <div className="flex items-center space-x-2">
                <div className="status-dot"></div>
                <span className="text-green-400 font-mono text-sm">SYSTEM_ONLINE</span>
              </div>
              <span className="text-gray-400 font-mono text-xs">Response time: &lt; 24hrs</span>
            </div>

            {/* Status Monitoring Link */}
            <div className="tech-card mt-6">
              <div className="tech-card-header">
                <span className="text-green-400 font-mono text-sm">// SYSTEM_MONITORING</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-white font-mono text-lg mb-1">SERVICE_STATUS</h4>
                  <p className="text-gray-400 text-sm">Real-time system monitoring</p>
                </div>
                <motion.a
                  href="https://anir0y.cronitorstatus.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-green-600/20 border border-green-500/30 text-green-400 hover:bg-green-600/30 hover:border-green-400 rounded font-mono text-sm transition-all duration-300 hover:scale-105"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  VIEW_STATUS
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

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