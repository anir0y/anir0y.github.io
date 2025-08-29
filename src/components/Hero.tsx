@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  scroll-behavior: smooth;
}

body {
  @apply bg-gray-50 text-gray-900;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  @apply bg-gray-100;
}

::-webkit-scrollbar-thumb {
  @apply bg-gray-400 rounded-full;
}

::-webkit-scrollbar-thumb:hover {
  @apply bg-gray-500;
}

/* Minimalist animations */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideIn {
  from { opacity: 0; transform: translateX(-10px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.animate-fadeIn {
  animation: fadeIn 0.5s ease-out;
}

.animate-slideIn {
  animation: slideIn 0.5s ease-out;
}

.animate-pulse-custom {
  animation: pulse 2s infinite;
}

/* Clean card styles */
.card {
  @apply bg-white rounded-lg border border-gray-200 shadow-sm;
  transition: all 0.2s ease;
}

.card:hover {
  @apply shadow-md;
  transform: translateY(-1px);
}

/* Monospace elements */
.mono {
  font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
}

/* Grid patterns for technical feel */
.grid-bg {
  background-image: 
    linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
  background-size: 20px 20px;
}

/* Status indicators */
.status-dot {
  @apply w-2 h-2 rounded-full;
}

.status-online {
  @apply bg-green-500;
  animation: pulse 2s infinite;
}

.status-warning {
  @apply bg-yellow-500;
}

.status-error {
  @apply bg-red-500;
}

/* Terminal styling */
.terminal {
  @apply bg-gray-900 text-green-400 font-mono text-sm p-4 rounded-lg;
}

.terminal-cursor {
  @apply inline-block w-2 h-4 bg-green-400 ml-1;
  animation: pulse 1s infinite;
}

/* Responsive design */
@media (max-width: 768px) {
  .grid-cols-12 {
    @apply grid-cols-1;
  }
  
  .col-span-8 {
    @apply col-span-1;
  }
  
  .col-span-4 {
    @apply col-span-1;
  }
}

/* Clean focus states */
*:focus {
  @apply outline-none ring-2 ring-gray-300 ring-offset-2;
}

button:focus,
a:focus {
  @apply ring-blue-500;
}

/* Subtle shadows */
.shadow-subtle {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}

.shadow-subtle-lg {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* Typography improvements */
.text-mono {
  font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
}

.text-balance {
  text-wrap: balance;
}

/* Smooth transitions */
* {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* Performance optimizations */
.will-change-transform {
  will-change: transform;
}

.backface-hidden {
  backface-visibility: hidden;
}

.transform-gpu {
  transform: translateZ(0);
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
  .card {
    @apply border-2 border-gray-900;
  }
}

@keyframes shimmer {
  0% { left: -100%; }
  100% { left: 100%; }
}

.tech-card {
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(20, 20, 40, 0.8) 100%);
  border: 1px solid rgba(0, 255, 255, 0.3);
  border-radius: 8px;
  padding: 24px;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.tech-card:hover {
  border-color: rgba(0, 255, 255, 0.5);
  box-shadow: 0 0 30px rgba(0, 255, 255, 0.1);
  transform: translateY(-2px);
}

.tech-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #00ffff, transparent);
  animation: border-scan 3s infinite;
}

@keyframes border-scan {
  0% { left: -100%; }
  100% { left: 100%; }
}

.tech-card-header {
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(0, 255, 255, 0.2);
}

/* Enhanced Project Card Styles */
.project-card {
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(30, 30, 60, 0.9) 100%);
  border: 1px solid rgba(0, 255, 255, 0.2);
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  transition: all 0.3s ease;
  backdrop-filter: blur(15px);
}

.project-card:hover {
  border-color: rgba(0, 255, 255, 0.6);
  box-shadow: 0 10px 40px rgba(0, 255, 255, 0.1);
  transform: translateY(-5px);
}

.project-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, transparent, rgba(0, 255, 255, 0.05), transparent);
  transition: left 0.5s ease;
}

.project-card:hover::before {
  left: 100%;
}

/* Enhanced Skill Item Styles */
.skill-item {
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(0, 255, 255, 0.2);
  border-radius: 6px;
  padding: 12px 16px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.skill-item:hover {
  border-color: rgba(0, 255, 255, 0.5);
  background: rgba(0, 0, 0, 0.8);
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.1);
}

.skill-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.1), transparent);
  transition: left 0.3s ease;
}

.skill-item:hover::before {
  left: 100%;
}

.social-card {
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.6) 0%, rgba(40, 0, 80, 0.6) 100%);
  border: 1px solid rgba(128, 0, 128, 0.4);
  border-radius: 8px;
  padding: 16px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  backdrop-filter: blur(5px);
}

.social-card:hover {
  border-color: rgba(0, 255, 255, 0.6);
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.2);
  transform: translateY(-2px);
}

.social-card-content {
  display: flex;
  align-items: center;
  space-x: 12px;
  gap: 12px;
  position: relative;
  z-index: 2;
}

.social-card-glitch {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, transparent 30%, rgba(0, 255, 255, 0.1) 50%, transparent 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.social-card:hover .social-card-glitch {
  opacity: 1;
  animation: glitch-sweep 0.6s ease-out;
}

@keyframes glitch-sweep {
  0% { transform: translateX(-100%) skewX(-15deg); }
  100% { transform: translateX(100%) skewX(-15deg); }
}

.booking-option {
  padding: 20px;
  border: 1px solid rgba(128, 0, 128, 0.3);
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}

.booking-option:hover {
  border-color: rgba(0, 255, 255, 0.5);
  background: rgba(0, 0, 0, 0.5);
  transform: translateY(-2px);
}

.divider {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin: 24px 0;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.5), transparent);
}

.divider span {
  padding: 0 16px;
  background: rgba(0, 0, 0, 0.8);
}

.status-indicator {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(0, 255, 0, 0.3);
  border-radius: 4px;
}

.status-dot {
  width: 8px;
  height: 8px;
  background: #00ff00;
  border-radius: 50%;
  animation: pulse-dot 2s infinite;
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.2); }
}

/* Enhanced Typography */
.terminal-text {
  font-family: 'Courier New', monospace;
  color: #00ff00;
  text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
}

.neon-text {
  color: #00ffff;
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
}

.purple-neon-text {
  color: #ff00ff;
  text-shadow: 0 0 10px rgba(255, 0, 255, 0.5);
}

/* Enhanced Animations */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.floating {
  animation: float 6s ease-in-out infinite;
}

@keyframes glow-pulse {
  0%, 100% { box-shadow: 0 0 20px rgba(0, 255, 255, 0.2); }
  50% { box-shadow: 0 0 40px rgba(0, 255, 255, 0.4); }
}

.glow-pulse {
  animation: glow-pulse 3s ease-in-out infinite;
}

/* Animated Grid Background */
.grid-pattern {
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
  animation: grid-move 20s linear infinite;
}

@keyframes grid-move {
  0% { transform: translate(0, 0); }
  100% { transform: translate(50px, 50px); }
}

/* Glitch Overlay */
.glitch-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(0, 255, 255, 0.03) 50%,
    transparent 100%
  );
  animation: glitch-move 8s ease-in-out infinite;
}

@keyframes glitch-move {
  0%, 100% { transform: translateX(-100%); }
  50% { transform: translateX(100%); }
}

/* Scanning Lines */
.scan-lines {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 255, 255, 0.03) 2px,
    rgba(0, 255, 255, 0.03) 4px
  );
  animation: scan 3s linear infinite;
}

@keyframes scan {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100vh); }
}

/* Floating Particles */
.particles {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}

.particles::before,
.particles::after {
  content: '';
  position: absolute;
  width: 2px;
  height: 2px;
  background: rgba(0, 255, 255, 0.6);
  border-radius: 50%;
  animation: particle-float 15s infinite linear;
}

.particles::before {
  top: 20%;
  left: 20%;
  animation-delay: -5s;
}

.particles::after {
  top: 80%;
  right: 30%;
  animation-delay: -10s;
}

@keyframes particle-float {
  0% {
    transform: translateY(100vh) translateX(0);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(-100px) translateX(100px);
    opacity: 0;
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .glitch-text {
    font-size: 2rem;
  }
  
  .tech-card {
    padding: 16px;
  }
  
  .social-card {
    padding: 12px;
  }
  
  .tech-button {
    padding: 10px 20px;
    font-size: 12px;
  }
  
  .status-indicator {
    flex-direction: column;
    gap: 8px;
    text-align: center;
  }
  
  .project-card:hover {
    transform: none;
  }
  
  .tech-card:hover {
    transform: none;
  }
  
  .grid-pattern {
    background-size: 30px 30px;
  }
  
  .scan-lines {
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 1px,
      rgba(0, 255, 255, 0.02) 1px,
      rgba(0, 255, 255, 0.02) 2px
    );
  }
}