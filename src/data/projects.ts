/// <reference types="vite/client" />

export interface Credit {
  role: string;
  name: string;
}

export interface Project {
  slug: string;
  title: string;
  client: string;
  role: string;
  category: 'commercial' | 'film' | 'documentary';
  year: number;
  vimeoId: string;
  thumbnail: string;
  description: string;
  credits: Credit[];
  featured?: boolean;
}

// Load all project JSON files at build time
const projectModules = import.meta.glob<{ default: Project }>('../content/projects/*.json', { eager: true });

export const projects: Project[] = Object.values(projectModules)
  .map((mod) => mod.default)
  .sort((a, b) => b.year - a.year || a.title.localeCompare(b.title));

export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find((p) => p.slug === slug);
};

export const getRelatedProjects = (slug: string, limit = 3): Project[] => {
  const current = getProjectBySlug(slug);
  if (!current) return projects.slice(0, limit);
  return projects
    .filter((p) => p.slug !== slug)
    .sort((a, b) => {
      if (a.category === current.category && b.category !== current.category) return -1;
      if (b.category === current.category && a.category !== current.category) return 1;
      return b.year - a.year;
    })
    .slice(0, limit);
};

export const getFeaturedProjects = (): Project[] => {
  return projects.filter((p) => p.featured);
};

export const categories = [
  { key: 'all', label: 'All Work' },
  { key: 'commercial', label: 'Commercials' },
  { key: 'film', label: 'Films' },
  { key: 'documentary', label: 'Documentaries' },
];
