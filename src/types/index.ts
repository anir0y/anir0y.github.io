export interface Project {
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  link: string;
  github?: string;
  span?: 'hero' | 'wide' | 'normal';
  type: 'project' | 'lab';
}

export interface Skill {
  name: string;
  icon: string;
  category: 'security' | 'tools';
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}
