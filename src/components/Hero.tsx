@tailwind base;
@tailwind components;
@tailwind utilities;

/* Import modern tech-inspired fonts */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500;600&display=swap');

html {
  scroll-behavior: smooth;
}

body {
  @apply bg-white text-gray-900;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  line-height: 1.6;
}

/* Custom scrollbar - minimalistic */
::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  @apply bg-gray-50;
}

::-webkit-scrollbar-thumb {
  @apply bg-gray-300 rounded-full;
  transition: background-color 0.2s ease;
}

::-webkit-scrollbar-thumb:hover {
  @apply bg-gray-400;
}

/* Minimalistic animations */
@keyframes fadeInUp {
  from { 
    opacity: 0; 
    transform: translateY(20px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
}

@keyframes slideInLeft {
  from { 
    opacity: 0; 
    transform: translateX(-20px); 
  }
  to { 
    opacity: 1; 
    transform: translateX(0); 
  }
}

@keyframes subtlePulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

@keyframes gentleFloat {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
}

.animate-fadeInUp {
  animation: fadeInUp 0.6s ease-out;
}

.animate-slideInLeft {
  animation: slideInLeft 0.6s ease-out;
}

.animate-subtlePulse {
  animation: subtlePulse 3s infinite;
}

.animate-gentleFloat {
  animation: gentleFloat 4s ease-in-out infinite;
}

/* Clean card styles with subtle tech elements */
.minimal-card {
  @apply bg-white rounded-xl border border-gray-100 shadow-sm;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.minimal-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, #3b82f6, transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.minimal-card:hover {
  @apply shadow-lg border-gray-200;
  transform: translateY(-2px);
}

.minimal-card:hover::before {
  opacity: 1;
}

/* Tech-inspired typography */
.tech-mono {
  font-family: 'JetBrains Mono', 'SF Mono', 'Monaco', monospace;
  font-weight: 400;
}

.tech-heading {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  letter-spacing: -0.025em;
  line-height: 1.2;
}

/* Subtle grid background for tech feel */
.tech-grid {
  background-image: 
    linear-gradient(rgba(59, 130, 246, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(59, 130, 246, 0.03) 1px, transparent 1px);
  background-size: 24px 24px;
}

/* Status indicators - minimalistic */
.status-dot {
  @apply w-2 h-2 rounded-full;
  position: relative;
}

.status-dot::after {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: 50%;
  background: inherit;
  opacity: 0.3;
  animation: subtlePulse 2s infinite;
}

.status-online {
  @apply bg-emerald-500;
}

.status-warning {
  @apply bg-amber-500;
}

.status-error {
  @apply bg-red-500;
}

/* Clean button styles */
.btn-primary {
  @apply bg-gray-900 text-white px-6 py-3 rounded-lg font-medium;
  @apply hover:bg-gray-800 transition-all duration-200;
  @apply focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2;
  position: relative;
  overflow: hidden;
}

.btn-primary::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transition: left 0.5s ease;
}

.btn-primary:hover::before {
  left: 100%;
}

.btn-secondary {
  @apply bg-white text-gray-900 px-6 py-3 rounded-lg font-medium border border-gray-200;
  @apply hover:bg-gray-50 hover:border-gray-300 transition-all duration-200;
  @apply focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2;
}

/* Header backdrop with subtle tech effect */
.header-backdrop {
  @apply bg-white/80 backdrop-blur-md border-b border-gray-100;
  position: relative;
}

.header-backdrop::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, #3b82f6, transparent);
  opacity: 0.5;
}

/* Navigation improvements */
.nav-link {
  @apply text-gray-600 hover:text-gray-900 transition-colors duration-200;
  @apply relative font-medium;
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: #3b82f6;
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
}

/* Project cards with minimal tech aesthetic */
.project-card {
  @apply minimal-card p-6;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.project-card:hover {
  transform: translateY(-4px);
}

.project-image {
  @apply rounded-lg overflow-hidden;
  position: relative;
}

.project-image::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.project-card:hover .project-image::after {
  opacity: 1;
}

/* Skills section improvements */
.skill-category {
  @apply minimal-card p-8;
}

.skill-item {
  @apply flex items-center space-x-3 p-3 rounded-lg;
  @apply hover:bg-gray-50 transition-colors duration-200;
  position: relative;
}

.skill-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  width: 0;
  height: 2px;
  background: #3b82f6;
  transform: translateY(-50%);
  transition: width 0.3s ease;
}

.skill-item:hover::before {
  width: 4px;
}

/* Contact section enhancements */
.contact-card {
  @apply minimal-card p-8;
}

.social-link {
  @apply flex items-center space-x-3 p-4 rounded-lg;
  @apply hover:bg-gray-50 transition-all duration-200;
  @apply border border-transparent hover:border-gray-200;
  position: relative;
  overflow: hidden;
}

.social-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.05), transparent);
  transition: left 0.5s ease;
}

.social-link:hover::before {
  left: 100%;
}

/* Hero section improvements */
.hero-section {
  @apply min-h-screen flex items-center justify-center;
  @apply bg-gradient-to-br from-gray-50 to-white;
  position: relative;
}

.hero-content {
  @apply max-w-4xl mx-auto text-center px-6;
}

.hero-title {
  @apply text-5xl md:text-7xl font-bold mb-6 tech-heading;
  @apply bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent;
}

.hero-subtitle {
  @apply text-xl md:text-2xl text-gray-600 mb-8;
  @apply max-w-2xl mx-auto;
}

/* Responsive improvements */
@media (max-width: 768px) {
  .minimal-card {
    @apply mx-4;
  }
  
  .hero-title {
    @apply text-4xl;
  }
  
  .hero-subtitle {
    @apply text-lg;
  }
  
  .project-card:hover {
    transform: none;
  }
}

/* Focus states for accessibility */
*:focus {
  @apply outline-none;
}

button:focus,
a:focus,
input:focus,
textarea:focus {
  @apply ring-2 ring-blue-500 ring-offset-2;
}

/* Subtle shadows for depth */
.shadow-subtle {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03);
}

.shadow-subtle-lg {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
}

/* Typography scale improvements */
.text-xs { font-size: 0.75rem; line-height: 1.5; }
.text-sm { font-size: 0.875rem; line-height: 1.5; }
.text-base { font-size: 1rem; line-height: 1.6; }
.text-lg { font-size: 1.125rem; line-height: 1.6; }
.text-xl { font-size: 1.25rem; line-height: 1.5; }
.text-2xl { font-size: 1.5rem; line-height: 1.4; }
.text-3xl { font-size: 1.875rem; line-height: 1.3; }
.text-4xl { font-size: 2.25rem; line-height: 1.2; }
.text-5xl { font-size: 3rem; line-height: 1.1; }

/* Spacing system - 8px base */
.space-y-2 > * + * { margin-top: 0.5rem; }
.space-y-4 > * + * { margin-top: 1rem; }
.space-y-6 > * + * { margin-top: 1.5rem; }
.space-y-8 > * + * { margin-top: 2rem; }
.space-y-12 > * + * { margin-top: 3rem; }
.space-y-16 > * + * { margin-top: 4rem; }

/* Performance optimizations */
.will-change-transform {
  will-change: transform;
}

.backface-hidden {
  backface-visibility: hidden;
}

/* Print styles */
@media print {
  * {
    @apply text-black bg-white;
  }
  
  .no-print {
    display: none !important;
  }
}

/* Accessibility improvements */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .minimal-card {
    @apply border-2 border-gray-900;
  }
  
  .btn-primary {
    @apply border-2 border-gray-900;
  }
}

/* Loading states */
.loading-skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Micro-interactions */
.interactive-element {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.interactive-element:hover {
  transform: translateY(-1px);
}

.interactive-element:active {
  transform: translateY(0);
}

import React from 'react';