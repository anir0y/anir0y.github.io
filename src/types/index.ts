export interface Project {
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  link: string;
}

export interface Skill {
  name: string;
  icon: string;
  category: 'security'| 'tools';
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}