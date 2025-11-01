import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader, CheckCircle, AlertCircle } from 'lucide-react';
import { useRecaptcha } from './RecaptchaProvider';
import { RecaptchaService, getRecaptchaConfig } from '../services/recaptchaService';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

export const ContactForm: React.FC = () => {
  const { executeRecaptcha, isLoaded } = useRecaptcha();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<FormStatus>({ type: 'idle', message: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setStatus({ type: 'error', message: 'Name is required' });
      return false;
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      setStatus({ type: 'error', message: 'Valid email is required' });
      return false;
    }
    if (!formData.message.trim()) {
      setStatus({ type: 'error', message: 'Message is required' });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setStatus({ type: 'loading', message: 'Verifying and sending...' });

    try {
      // Execute reCAPTCHA
      const token = await executeRecaptcha('contact_form');
      if (!token) {
        setStatus({ type: 'error', message: 'reCAPTCHA verification failed. Please try again.' });
        return;
      }

      // Verify reCAPTCHA token
      const config = getRecaptchaConfig();
      const recaptchaService = new RecaptchaService(config.backendUrl, config.siteKey);
      
      const userIP = await recaptchaService.getUserIP();
      const verificationResult = await recaptchaService.verifyToken({
        token,
        expectedAction: 'contact_form',
        userIpAddress: userIP || undefined,
        userAgent: navigator.userAgent,
      });

      // Validate the assessment
      if (!recaptchaService.isValidAssessment(verificationResult, 'contact_form', 0.5)) {
        setStatus({ 
          type: 'error', 
          message: 'Security verification failed. Please try again.' 
        });
        return;
      }

      // Here you would typically send the form data to your backend
      // For now, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));

      setStatus({ 
        type: 'success', 
        message: 'Message sent successfully! I\'ll get back to you soon.' 
      });
      
      // Reset form
      setFormData({ name: '', email: '', subject: '', message: '' });

    } catch (error) {
      console.error('Form submission error:', error);
      setStatus({ 
        type: 'error', 
        message: 'Failed to send message. Please try again.' 
      });
    }
  };

  const getStatusIcon = () => {
    switch (status.type) {
      case 'loading':
        return <Loader className="animate-spin" size={16} />;
      case 'success':
        return <CheckCircle className="text-green-400" size={16} />;
      case 'error':
        return <AlertCircle className="text-red-400" size={16} />;
      default:
        return <Send size={16} />;
    }
  };

  const getStatusColor = () => {
    switch (status.type) {
      case 'success':
        return 'text-green-400';
      case 'error':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="tech-card">
      <div className="tech-card-header">
        <span className="text-cyan-400 font-mono text-sm">// SECURE_CONTACT_FORM</span>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-white font-mono text-sm mb-2">
              NAME*
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 bg-gray-800/50 border border-cyan-400/30 rounded text-white font-mono text-sm focus:border-cyan-400 focus:outline-none transition-colors"
              placeholder="Your name"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-white font-mono text-sm mb-2">
              EMAIL*
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 bg-gray-800/50 border border-cyan-400/30 rounded text-white font-mono text-sm focus:border-cyan-400 focus:outline-none transition-colors"
              placeholder="your@email.com"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="subject" className="block text-white font-mono text-sm mb-2">
            SUBJECT
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            className="w-full px-3 py-2 bg-gray-800/50 border border-cyan-400/30 rounded text-white font-mono text-sm focus:border-cyan-400 focus:outline-none transition-colors"
            placeholder="What's this about?"
          />
        </div>
        
        <div>
          <label htmlFor="message" className="block text-white font-mono text-sm mb-2">
            MESSAGE*
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
            rows={4}
            className="w-full px-3 py-2 bg-gray-800/50 border border-cyan-400/30 rounded text-white font-mono text-sm focus:border-cyan-400 focus:outline-none transition-colors resize-vertical"
            placeholder="Your message..."
          />
        </div>
        
        {status.message && (
          <div className={`flex items-center space-x-2 ${getStatusColor()} font-mono text-sm`}>
            {getStatusIcon()}
            <span>{status.message}</span>
          </div>
        )}
        
        <motion.button
          type="submit"
          disabled={status.type === 'loading' || !isLoaded}
          className="w-full px-6 py-3 bg-cyan-600/20 border border-cyan-400/50 text-cyan-400 hover:bg-cyan-600/30 hover:border-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed rounded font-mono text-sm transition-all duration-300 flex items-center justify-center space-x-2"
          whileHover={{ scale: status.type === 'loading' ? 1 : 1.02 }}
          whileTap={{ scale: status.type === 'loading' ? 1 : 0.98 }}
        >
          {getStatusIcon()}
          <span>
            {status.type === 'loading' ? 'SENDING...' : 'SEND_MESSAGE'}
          </span>
        </motion.button>
        
        <div className="text-center">
          <p className="text-gray-500 font-mono text-xs">
            Protected by reCAPTCHA Enterprise
          </p>
        </div>
      </form>
    </div>
  );
};