import React from 'react';
import { Mail, Phone, MapPin, Calendar, MessageSquare, Github, Linkedin, Twitter } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 tech-heading">
            Get In Touch
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ready to collaborate? Let's discuss your next project or just have a chat about technology.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="contact-card">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 tech-heading">
              Contact Information
            </h3>
            <div className="space-y-4">
              <div className="social-link">
                <Mail className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900">Email</p>
                  <p className="text-gray-600">hello@example.com</p>
                </div>
              </div>
              <div className="social-link">
                <Phone className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900">Phone</p>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="social-link">
                <MapPin className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900">Location</p>
                  <p className="text-gray-600">San Francisco, CA</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Connect */}
          <div className="contact-card">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 tech-heading">
              Quick Connect
            </h3>
            <div className="space-y-4">
              <a href="#" className="social-link block">
                <Github className="w-5 h-5 text-gray-700" />
                <div>
                  <p className="font-medium text-gray-900">GitHub</p>
                  <p className="text-gray-600">View my repositories</p>
                </div>
              </a>
              <a href="#" className="social-link block">
                <Linkedin className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900">LinkedIn</p>
                  <p className="text-gray-600">Professional network</p>
                </div>
              </a>
              <a href="#" className="social-link block">
                <Twitter className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="font-medium text-gray-900">Twitter</p>
                  <p className="text-gray-600">Latest updates</p>
                </div>
              </a>
            </div>
          </div>

          {/* Schedule Meeting */}
          <div className="contact-card">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 tech-heading">
              Schedule a Meeting
            </h3>
            <div className="space-y-4">
              <div className="booking-option">
                <Calendar className="w-5 h-5 text-blue-600 mb-2" />
                <h4 className="font-medium text-gray-900 mb-1">15-min Chat</h4>
                <p className="text-sm text-gray-600 mb-3">Quick discussion about your project</p>
                <button className="btn-secondary w-full">Book Now</button>
              </div>
              <div className="booking-option">
                <MessageSquare className="w-5 h-5 text-blue-600 mb-2" />
                <h4 className="font-medium text-gray-900 mb-1">30-min Consultation</h4>
                <p className="text-sm text-gray-600 mb-3">Detailed project planning session</p>
                <button className="btn-primary w-full">Schedule</button>
              </div>
            </div>
          </div>
        </div>

        {/* Status Indicator */}
        <div className="mt-12 text-center">
          <div className="status-indicator inline-flex">
            <div className="status-dot status-online"></div>
            <span className="text-sm text-gray-600 tech-mono">Currently available for new projects</span>
          </div>
        </div>
      </div>
    </section>
  );
}