/**
 * useConfig — Reads admin CMS config from localStorage.
 * Falls back to static JSON imports if no localStorage data exists.
 */

const STORAGE_KEY = 'aha-site-config';
const PROJECTS_KEY = 'aha-site-config-projects';

export interface SiteConfig {
  general: {
    siteTitle: string;
    metaDescription: string;
    logoText: string;
    copyrightText: string;
    socialLinks: {
      vimeo: string;
      linkedin: string;
      whatsapp: string;
      instagram: string;
    };
  };
  home: {
    hero: { visible: boolean; name1: string; name2: string; subtitle: string; description: string; heroVideo: string; bannerVideo: string; buttonText: string };
    featured: { visible: boolean; label: string; title: string; buttonText: string };
    videoBanner: { visible: boolean; label: string; titlePart1: string; titlePart2: string; fallbackImage: string };
    cta: { visible: boolean; label: string; title: string; description: string; buttonText: string };
  };
  about: {
    heroBanner: { visible: boolean; heroBackground: string; label: string; title: string };
    intro: { visible: boolean; text1: string; text2: string };
    gallery: { visible: boolean; label: string; title: string; photos: string[] };
    philosophy: { visible: boolean; title1: string; text1: string; text2: string; title2: string; expertiseItems: { title: string; description: string }[] };
    timeline: { visible: boolean; label: string; title: string; milestones: { year: string; title: string; description: string }[] };
    quote: { visible: boolean; text: string; author: string };
  };
  contact: {
    header: { label: string; title: string; description: string };
    info: { email: string; location: string; vimeoUrl: string; linkedinUrl: string; whatsappUrl: string; formButtonText: string };
  };
  design: {
    accentColor: string;
    bgColor: string;
    textColor: string;
  };
  spacing: Record<string, Record<string, unknown>>;
  projects: Array<{
    slug: string;
    title: string;
    client: string;
    role: string;
    category: string;
    year: number;
    vimeoId: string;
    thumbnail: string;
    description: string;
    featured: boolean;
    credits: { role: string; name: string }[];
  }>;
}

let _cachedConfig: SiteConfig | null = null;

export function getConfig(): SiteConfig | null {
  if (_cachedConfig) return _cachedConfig;
  
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    
    const parsed = JSON.parse(raw);
    
    // Load projects separately
    const projRaw = localStorage.getItem(PROJECTS_KEY);
    if (projRaw) {
      try {
        parsed.projects = JSON.parse(projRaw);
      } catch {
        parsed.projects = [];
      }
    }
    
    _cachedConfig = parsed as SiteConfig;
    return _cachedConfig;
  } catch {
    return null;
  }
}

/** Clear cache so next getConfig() re-reads localStorage */
export function clearConfigCache() {
  _cachedConfig = null;
}
