import { Project } from '../types';

export const projects: Project[] = [
  {
    title: "Morse Code Learning",
    description: "Interactive Morse code learning platform with real-time translation, practice exercises, and audio playback. Master the classic communication method through hands-on practice and gamified learning experience.",
    technologies: ["JavaScript", "Web Audio API", "Education"],
    imageUrl: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80",
    link: "https://morse.anir0y.in/",
    github: "https://morse.anir0y.in/"
  },
  {
    title: "VWA - Vulnerable Web App",
    description: "WebApp Lab for training.",
    technologies: ["docekr", "php", "mysql", "brain"],
    imageUrl: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&q=80",
    link: "https://hub.docker.com/r/anir0y/vwa",
    github: "https://hub.docker.com/r/anir0y/vwa"
  },
  {
    title: "Red Teaming as a IAC",
    description: "Automates Covenant C2 deployment using Terraform on DigitalOcean with Cloudflare integration, enabling secure, scalable, and stealthy infrastructure for red teaming and post-exploitation tasks with ease and consistency.",
    technologies: ["Python", "teraform", "cloud"],
    imageUrl: "https://i.imgur.com/sc7xTbR.png",
    link: "https://github.com/vatsal-mob/IAC-C2",
    github: "https://github.com/vatsal-mob/IAC-C2"
  },
  
  {
    title: "CANBus Simulator",
    description: "A CANBus Simulator mimics Controller Area Network communication, enabling testing, debugging, and development of CAN-enabled devices by simulating real-world scenarios without requiring physical hardware systems, ideal for automotive and industrial applications.",
    technologies: ["C++", "car hacking", "security"],
    imageUrl: "https://i.imgur.com/1ziuUEC.png",
    link: "https://github.com/anir0y/simulator",
    github: "https://github.com/anir0y/simulator"

  },

  {
    title: "Unified Courier Tracker (India)",
    description: "Comprehensive courier tracking system for India that unifies tracking across multiple courier services. Track shipments from various carriers in one place with real-time status updates and delivery notifications.",
    technologies: ["TypeScript", "React", "API Integration"],
    imageUrl: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?auto=format&fit=crop&w=800&q=80",
    link: "https://courier.anir0y.in/",
    github: "https://github.com/anir0y/unified-courier-tracker"
  }

];