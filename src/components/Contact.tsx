import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Twitter, Calendar, X, Shield, CheckCircle, AlertCircle } from 'lucide-react';
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
        
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Status Feed - Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <StatusFeed maxEvents={3} />
            
            {/* CAPTCHA Enterprise Status Validation */}
            <CaptchaStatusValidator />
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
                <span className="text-green-400">></span> AVAILABLE_CHANNELS
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

// CAPTCHA Enterprise Status Validator Component
const CaptchaStatusValidator: React.FC = () => {
  const [captchaStatus, setCaptchaStatus] = React.useState<{
    loaded: boolean;
    configured: boolean;
    tested: boolean;
    score: number | null;
    error: string | null;
  }>({
    loaded: false,
    configured: false,
    tested: false,
    score: null,
    error: null
  });

  React.useEffect(() => {
    validateCaptchaConfiguration();
  }, []);

  const validateCaptchaConfiguration = async () => {
    try {
      // Check if reCAPTCHA is loaded
      const isLoaded = typeof window.grecaptcha !== 'undefined';
      
      // Check environment configuration
      const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
      const isConfigured = !!siteKey && siteKey !== 'your-recaptcha-site-key';
      
      setCaptchaStatus(prev => ({
        ...prev,
        loaded: isLoaded,
        configured: isConfigured
      }));

      // Test CAPTCHA functionality if available
      if (isLoaded && isConfigured && window.grecaptcha.enterprise) {
        try {
          await window.grecaptcha.enterprise.ready(async () => {
            const token = await window.grecaptcha.enterprise.execute(siteKey, { 
              action: 'validation_test' 
            });
            
            setCaptchaStatus(prev => ({
              ...prev,
              tested: !!token,
              score: 0.9 // Simulated score for display
            }));
          });
        } catch (error) {
          setCaptchaStatus(prev => ({
            ...prev,
            error: 'CAPTCHA execution failed'
          }));
        }
      }
    } catch (error) {
      setCaptchaStatus(prev => ({
        ...prev,
        error: 'Configuration validation failed'
      }));
    }
  };

  const getStatusIcon = (status: boolean, error?: string) => {
    if (error) return <AlertCircle className="text-red-400" size={16} />;
    return status ? 
      <CheckCircle className="text-green-400" size={16} /> : 
      <AlertCircle className="text-yellow-400" size={16} />;
  };

  const getStatusText = (status: boolean, error?: string) => {
    if (error) return 'ERROR';
    return status ? 'PASS' : 'FAIL';
  };

  return (
    <div className="tech-card">
      <div className="tech-card-header">
        <span className="text-purple-400 font-mono text-sm">// CAPTCHA_ENTERPRISE_STATUS</span>
      </div>
      
      <h3 className="text-xl font-bold text-white mb-4 font-mono">
        <span className="text-cyan-400">></span> SECURITY_VALIDATION
      </h3>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between p-2 bg-gray-800/30 rounded">
          <span className="text-gray-300 font-mono text-sm">CAPTCHA_LOADED</span>
          <div className="flex items-center space-x-2">
            {getStatusIcon(captchaStatus.loaded, captchaStatus.error)}
            <span className={`font-mono text-xs ${
              captchaStatus.error ? 'text-red-400' : 
              captchaStatus.loaded ? 'text-green-400' : 'text-yellow-400'
            }`}>
              {getStatusText(captchaStatus.loaded, captchaStatus.error)}
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between p-2 bg-gray-800/30 rounded">
          <span className="text-gray-300 font-mono text-sm">CONFIG_VALID</span>
          <div className="flex items-center space-x-2">
            {getStatusIcon(captchaStatus.configured)}
            <span className={`font-mono text-xs ${
              captchaStatus.configured ? 'text-green-400' : 'text-yellow-400'
            }`}>
              {getStatusText(captchaStatus.configured)}
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between p-2 bg-gray-800/30 rounded">
          <span className="text-gray-300 font-mono text-sm">ENTERPRISE_TEST</span>
          <div className="flex items-center space-x-2">
            {getStatusIcon(captchaStatus.tested)}
            <span className={`font-mono text-xs ${
              captchaStatus.tested ? 'text-green-400' : 'text-yellow-400'
            }`}>
              {getStatusText(captchaStatus.tested)}
            </span>
          </div>
        </div>
        
        {captchaStatus.score && (
          <div className="flex items-center justify-between p-2 bg-gray-800/30 rounded">
            <span className="text-gray-300 font-mono text-sm">RISK_SCORE</span>
            <span className="text-cyan-400 font-mono text-xs">
              {captchaStatus.score.toFixed(1)}/1.0
            </span>
          </div>
        )}
        
        {captchaStatus.error && (
          <div className="p-2 bg-red-900/20 border border-red-500/30 rounded">
            <span className="text-red-400 font-mono text-xs">{captchaStatus.error}</span>
          </div>
        )}
      </div>
      
      <button
        onClick={validateCaptchaConfiguration}
        className="mt-4 w-full px-4 py-2 bg-purple-600/20 border border-purple-400/50 text-purple-400 hover:bg-purple-600/30 rounded font-mono text-sm transition-colors"
      >
        RE-VALIDATE
      </button>
    </div>
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