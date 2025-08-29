import React from 'react';

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

/* Glitch Text Effect */
.glitch-text {
  color: #00ffff;
  position: relative;
  display: inline-block;
  animation: glitch-main 2s infinite;
}

.glitch-text::before,
.glitch-text::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.glitch-text::before {
  color: #ff0040;
  animation: glitch-1 0.5s infinite;
  clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
}

.glitch-text::after {
  color: #00ff41;
  animation: glitch-2 0.5s infinite;
  clip-path: polygon(0 55%, 100% 55%, 100% 100%, 0 100%);
}

@keyframes glitch-main {
  0%, 100% { transform: translate(0); }
  20% { transform: translate(-2px, 2px); }
  40% { transform: translate(-2px, -2px); }
  60% { transform: translate(2px, 2px); }
  80% { transform: translate(2px, -2px); }
}

@keyframes glitch-1 {
  0%, 100% { transform: translate(0); }
  10% { transform: translate(-2px, -2px); }
  20% { transform: translate(2px, 2px); }
  30% { transform: translate(-2px, 2px); }
  40% { transform: translate(2px, -2px); }
  50% { transform: translate(-2px, -2px); }
  60% { transform: translate(2px, 2px); }
  70% { transform: translate(-2px, 2px); }
  80% { transform: translate(2px, -2px); }
  90% { transform: translate(-2px, -2px); }
}

@keyframes glitch-2 {
  0%, 100% { transform: translate(0); }
  10% { transform: translate(2px, 2px); }
  20% { transform: translate(-2px, -2px); }
  30% { transform: translate(2px, -2px); }
  40% { transform: translate(-2px, 2px); }
  50% { transform: translate(2px, 2px); }
  60% { transform: translate(-2px, -2px); }
  70% { transform: translate(2px, -2px); }
  80% { transform: translate(-2px, 2px); }
  90% { transform: translate(2px, 2px); }
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
}