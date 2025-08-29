import React from 'react';
import { ArrowRight, Download, MapPin, Calendar, Users, Code } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Main Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="status-dot status-online"></div>
                <span>Available for new projects</span>
              </div>
              
              <h1 className="hero-title animate-fadeInUp">
                Full-Stack Developer & UI/UX Designer
              </h1>
              
              <p className="hero-subtitle animate-fadeInUp">
                I create digital experiences that combine beautiful design with robust functionality. 
                Specializing in modern web technologies and user-centered design principles.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 animate-slideInLeft">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">50+</div>
                <div className="text-sm text-gray-600">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">3+</div>
                <div className="text-sm text-gray-600">Years</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">25+</div>
                <div className="text-sm text-gray-600">Clients</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fadeInUp">
              <button className="btn-primary group">
                View My Work
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="btn-secondary group">
                <Download className="w-4 h-4 mr-2" />
                Download CV
              </button>
            </div>
          </div>

          {/* Right Column - Profile Card */}
          <div className="flex justify-center lg:justify-end">
            <div className="minimal-card p-8 max-w-sm w-full animate-gentleFloat">
              <div className="text-center space-y-6">
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Code className="w-16 h-16 text-white" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-gray-900">John Doe</h3>
                  <p className="text-gray-600">Senior Developer</p>
                </div>

                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-center justify-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>San Francisco, CA</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>Available Now</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span>Remote & On-site</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <div className="flex justify-center space-x-4">
                    <div className="text-center">
                      <div className="text-lg font-semibold text-gray-900">4.9</div>
                      <div className="text-xs text-gray-600">Rating</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-gray-900">98%</div>
                      <div className="text-xs text-gray-600">Success</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-gray-900">24h</div>
                      <div className="text-xs text-gray-600">Response</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;