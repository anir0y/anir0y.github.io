import { Project } from '../types';

export const projects: Project[] = [
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

];