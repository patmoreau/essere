import { useEffect } from 'react';

import { hideSplash } from '../core/hide-splash.ts';

/**
 * Dismisses the boot splash. Rendered inside the app's Suspense boundary so it
 * mounts only once every suspended read has resolved — that is, when the page
 * actually has content to show rather than when React first renders.
 */
export default function SplashGate() {
  useEffect(() => {
    hideSplash();
  }, []);

  return null;
}
