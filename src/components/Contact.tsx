import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Twitter, MailCheckIcon, BookIcon, BookDashed, Calendar } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">
          Get in <span className="text-green-500">Touch</span>
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-white">Let's Connect</h3>
            <p className="text-gray-400">
              Whether you're interested in cybersecurity consulting, need a security audit,
              or want to discuss potential collaborations, I'm always open to new opportunities.
            </p>
            
            <div className="flex space-x-4">
              <SocialLink href="https://github.com/anir0y" icon={Github} />
              <SocialLink href="https://www.linkedin.com/in/anir0y/" icon={Linkedin} />
              <SocialLink href="https://x.com/anir0y" icon={Twitter} />
            </div>
          </motion.div>
          
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-4"
          > 
            <div>
              Book My Calendar:
              <SocialLink href='https://book.anir0y.in' icon={Calendar} />
              </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

const SocialLink: React.FC<{
  href: string;
  icon: React.FC<{ size?: number; className?: string }>;
}> = ({ href, icon: Icon }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-green-500 hover:bg-green-500 hover:text-black transition-colors"
  >
    <Icon size={20} />
  </a>
);