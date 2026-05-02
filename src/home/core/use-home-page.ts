import { use } from 'react';

import type { Directus } from '../../shared/directus/core/directus.ts';
import { useDirectus } from '../../shared/directus/core/use-directus.ts';
import type { HomePage } from './home-page.ts';

const homePageRequests = new WeakMap<Directus, Promise<HomePage>>();

export const useHomePage = () => {
  const directus = useDirectus();

  let dataPromise = homePageRequests.get(directus);

  if (!dataPromise) {
    dataPromise = directus.getHomePage();
    homePageRequests.set(directus, dataPromise);
  }

  return use(dataPromise);
};
