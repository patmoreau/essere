import { type ReactNode } from 'react';

import type { Directus } from '../core/directus.ts';
import { DirectusContext } from './DirectusContext.tsx';

export const DirectusProvider = ({
  children,
  directus,
}: {
  children: ReactNode;
  directus: Directus;
}) => {
  return <DirectusContext.Provider value={directus}>{children}</DirectusContext.Provider>;
};
