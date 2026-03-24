import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

console.log(
  `%c
    ╔══════════════════════════════════════════════════╗
    ║                                                  ║
    ║     █████╗ ███╗   ██╗██╗██████╗  ██████╗ ██╗   ██║
    ║    ██╔══██╗████╗  ██║██║██╔══██╗██╔═████╗╚██╗ ██╔║
    ║    ███████║██╔██╗ ██║██║██████╔╝██║██╔██║ ╚████╔╝║
    ║    ██╔══██║██║╚██╗██║██║██╔══██╗████╔╝██║  ╚██╔╝ ║
    ║    ██║  ██║██║ ╚████║██║██║  ██║╚██████╔╝   ██║  ║
    ║    ╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝╚═╝  ╚═╝ ╚═════╝    ╚═╝  ║
    ║                                                  ║
    ╠══════════════════════════════════════════════════╣
    ║                                                  ║
    ║   ⚡ Curious enough to open DevTools?            ║
    ║   🔐 That's the hacker mindset.                 ║
    ║                                                  ║
    ║   > whoami                                       ║
    ║     Animesh Roy | Security Researcher            ║
    ║                                                  ║
    ║   > cat /etc/motd                                ║
    ║     "Break things. Learn things. Secure things." ║
    ║                                                  ║
    ║   > find / -name "opportunities"                 ║
    ║     → https://anir0y.in                          ║
    ║     → https://github.com/anir0y                  ║
    ║                                                  ║
    ╚══════════════════════════════════════════════════╝
`,
  'color: #00ff41; font-family: monospace; font-size: 12px; line-height: 1.4;'
);

console.log(
  '%c🛡️ If you found a vulnerability, responsible disclosure is appreciated!',
  'color: #ff6b6b; font-size: 14px; font-weight: bold; padding: 8px 0;'
);

console.log(
  '%c📬 Contact: https://anir0y.in/#contact',
  'color: #74b9ff; font-size: 12px; padding: 4px 0;'
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
