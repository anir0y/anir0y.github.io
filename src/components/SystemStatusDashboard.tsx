import React from 'react';
import { motion } from 'framer-motion';
import { SystemStatus } from './SystemStatus';

export const SystemStatusDashboard: React.FC = () => {
  return (
    <section id="status" className="py-20 bg-gray-800 relative overflow-hidden">
      {/* Tech Grid Background */}
      <div className="absolute inset-0 opacity-5">
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
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-mono">
            <span className="text-cyan-400">SYSTEM_</span>
            <span className="text-green-400">STATUS</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-green-400 mx-auto"></div>
          <div className="mt-4 font-mono text-sm text-gray-400">
            <span className="text-green-400">root@anir0y:~$</span> systemctl status --all
          </div>
        </motion.div>
        
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <SystemStatus />
          </motion.div>
        </div>
      </div>
    </section>
  );
};