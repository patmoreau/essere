import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { PageMeta, SITE_URL } from './page-meta.ts';

const setMetaContent = (selector: string, content: string) => {
  const element = document.head.querySelector<HTMLMetaElement>(selector);
  if (element) {
    element.content = content;
  }
};

const setCanonical = (url: string) => {
  const element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (element) {
    element.href = url;
  }
};

/**
 * Keeps the document title, description, canonical URL and Open Graph tags in
 * sync with the active route. The tags themselves live in index.html so that
 * crawlers reading the raw HTML always find a complete set.
 */
export const usePageMeta = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = PageMeta.forPath(pathname);
    const canonicalUrl = `${SITE_URL}${pathname}`;

    document.title = meta.title;
    setMetaContent('meta[name="description"]', meta.description);
    setMetaContent('meta[property="og:title"]', meta.title);
    setMetaContent('meta[property="og:description"]', meta.description);
    setMetaContent('meta[property="og:url"]', canonicalUrl);
    setCanonical(canonicalUrl);
  }, [pathname]);
};
