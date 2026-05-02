import { use } from 'react';

import type { Directus } from '../../directus/core/directus.ts';
import { useDirectus } from '../../directus/core/use-directus.ts';

const labelRequests = new WeakMap<Directus, Promise<Record<string, string>>>();

export const useLabels = () => {
  const directus = useDirectus();
  let labelsPromise = labelRequests.get(directus);

  if (!labelsPromise) {
    labelsPromise = directus.getLabels();
    labelRequests.set(directus, labelsPromise);
  }

  return use(labelsPromise);
};
