import siteSeed from '@/content/siteSeed.json';
import { sortProjects, type Project } from '@/data/projects';

export type SiteContent = {
  pages: typeof siteSeed.pages;
  projects: Project[];
};

export type SitePageKey = keyof SiteContent['pages'];

export function normalizeSiteContent(siteContent: SiteContent): SiteContent {
  return {
    ...siteContent,
    projects: sortProjects(siteContent.projects),
  };
}

export const STATIC_SITE_CONTENT: SiteContent = normalizeSiteContent(siteSeed as SiteContent);

export async function fetchSiteContent(): Promise<SiteContent> {
  const response = await fetch('/api/content/bootstrap', {
    headers: {
      Accept: 'application/json',
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Failed to load site content (${response.status}).`);
  }

  return normalizeSiteContent((await response.json()) as SiteContent);
}
