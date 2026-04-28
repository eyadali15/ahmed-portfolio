/**
 * useConfig — Reads admin CMS config from localStorage.
 * Falls back to static JSON imports if no localStorage data exists.
 * Provides helper to read layout box-model values for any page/section.
 */

const STORAGE_KEY = 'aha-site-config';
const PROJECTS_KEY = 'aha-site-config-projects';

export interface LayoutBox {
  align: string; pt: string; pb: string; mt: string; mb: string; gap: string; gridCols: string;
}

export interface SiteConfig {
  general: {
    siteTitle: string;
    metaDescription: string;
    logoText: string;
    copyrightText: string;
    socialLinks: {
      vimeo: string;
      facebook: string;
      whatsapp: string;
      instagram: string;
    };
  };
  home: {
    hero: { visible: boolean; name1: string; name2: string; subtitle: string; description: string; heroVideo: string; bannerVideo: string; buttonText: string };
    featured: { visible: boolean; label: string; title: string; buttonText: string };
    videoBanner: { visible: boolean; label: string; titlePart1: string; titlePart2: string; fallbackImage: string };
    cta: { visible: boolean; label: string; title: string; description: string; buttonText: string };
    styles?: Record<string, { font?: string; size?: string; align?: string; color?: string }>;
  };
  about: {
    heroBanner: { visible: boolean; heroBackground: string; label: string; title: string };
    intro: { visible: boolean; text1: string; text2: string };
    gallery: { visible: boolean; label: string; title: string; photos: string[] };
    philosophy: { visible: boolean; title1: string; text1: string; text2: string; title2: string; expertiseItems: { title: string; description: string }[] };
    timeline: { visible: boolean; label: string; title: string; milestones: { year: string; title: string; description: string }[] };
    quote: { visible: boolean; text: string; author: string };
    services?: any[];
    styles?: Record<string, { font?: string; size?: string; align?: string; color?: string }>;
  };
  contact: {
    header: { label: string; title: string; description: string };
    info: { email: string; location: string; vimeoUrl: string; facebookUrl: string; whatsappUrl: string; instagramUrl: string; formButtonText: string };
    styles?: Record<string, { font?: string; size?: string; align?: string; color?: string }>;
  };
  design: {
    accentColor: string;
    bgColor: string;
    textColor: string;
    enablePreloader?: boolean;
    enableTransitions?: boolean;
    enableSmoothScroll?: boolean;
  };
  spacing: Record<string, Record<string, unknown>>;
  layout: {
    home: Record<string, LayoutBox>;
    portfolio: Record<string, LayoutBox>;
    about: Record<string, LayoutBox>;
    contact: Record<string, LayoutBox>;
  };
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

/**
 * Get layout box-model CSS for a specific page + section from CMS.
 * Returns a CSSProperties object with paddingTop, paddingBottom, marginTop, marginBottom, textAlign.
 */
export function getLayoutStyle(page: string, section: string): React.CSSProperties {
  const cms = getConfig();
  const layout = cms?.layout?.[page as keyof typeof cms.layout]?.[section];
  if (!layout) return {};
  
  const style: React.CSSProperties = {};
  if (layout.pt) style.paddingTop = layout.pt + (isNaN(Number(layout.pt)) ? '' : 'px');
  if (layout.pb) style.paddingBottom = layout.pb + (isNaN(Number(layout.pb)) ? '' : 'px');
  if (layout.mt) style.marginTop = layout.mt + (isNaN(Number(layout.mt)) ? '' : 'px');
  // mb + gap combined into marginBottom
  const mbVal = Number(layout.mb) || 0;
  const gapVal = Number(layout.gap) || 0;
  const totalBottom = mbVal + gapVal;
  if (totalBottom) style.marginBottom = totalBottom + 'px';
  else if (layout.mb) style.marginBottom = layout.mb + (isNaN(Number(layout.mb)) ? '' : 'px');
  if (layout.align) style.textAlign = layout.align as any;
  return style;
}

/**
 * Get grid columns from layout if set.
 */
export function getGridCols(page: string, section: string): string | undefined {
  const cms = getConfig();
  const layout = cms?.layout?.[page as keyof typeof cms.layout]?.[section];
  return layout?.gridCols || undefined;
}

/**
 * Helper: merge CMS layout onto existing static layout style.
 * CMS values override static ones when non-empty.
 */
export function mergeLayoutStyle(staticStyle: React.CSSProperties, page: string, section: string): React.CSSProperties {
  const cmsStyle = getLayoutStyle(page, section);
  return { ...staticStyle, ...cmsStyle };
}
