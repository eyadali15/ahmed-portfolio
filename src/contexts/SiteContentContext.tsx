import { createContext, startTransition, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { STATIC_SITE_CONTENT, fetchSiteContent, normalizeSiteContent, type SiteContent } from '@/lib/siteContent';

type SiteContentStatus = 'loading' | 'ready' | 'error';

type SiteContentContextValue = {
  siteContent: SiteContent;
  status: SiteContentStatus;
  error: string | null;
  refreshSiteContent: () => Promise<SiteContent>;
  replaceSiteContent: (nextSiteContent: SiteContent) => void;
};

const SiteContentContext = createContext<SiteContentContextValue | undefined>(undefined);

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [siteContent, setSiteContent] = useState<SiteContent>(STATIC_SITE_CONTENT);
  const [status, setStatus] = useState<SiteContentStatus>('loading');
  const [error, setError] = useState<string | null>(null);

  const replaceSiteContent = (nextSiteContent: SiteContent) => {
    startTransition(() => {
      setSiteContent(normalizeSiteContent(nextSiteContent));
      setStatus('ready');
      setError(null);
    });
  };

  const refreshSiteContent = async () => {
    try {
      const latestContent = await fetchSiteContent();
      replaceSiteContent(latestContent);
      return latestContent;
    } catch (caughtError) {
      const message =
        caughtError instanceof Error ? caughtError.message : 'Failed to refresh site content.';

      startTransition(() => {
        setStatus('error');
        setError(message);
      });

      return siteContent;
    }
  };

  useEffect(() => {
    let isActive = true;

    const loadSiteContent = async () => {
      try {
        const latestContent = await fetchSiteContent();

        if (!isActive) {
          return;
        }

        startTransition(() => {
          setSiteContent(latestContent);
          setStatus('ready');
          setError(null);
        });
      } catch (caughtError) {
        if (!isActive) {
          return;
        }

        const message =
          caughtError instanceof Error ? caughtError.message : 'Failed to refresh site content.';

        startTransition(() => {
          setStatus('error');
          setError(message);
        });
      }
    };

    void loadSiteContent();

    return () => {
      isActive = false;
    };
  }, []);

  const value = useMemo(
    () => ({
      siteContent,
      status,
      error,
      refreshSiteContent,
      replaceSiteContent,
    }),
    [error, siteContent, status],
  );

  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>;
}

export function useSiteContent() {
  const context = useContext(SiteContentContext);

  if (!context) {
    throw new Error('useSiteContent must be used within a SiteContentProvider.');
  }

  return context;
}
