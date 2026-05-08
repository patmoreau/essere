import { use } from 'react';

import type { Directus } from '../../shared/directus/core/directus.ts';
import { useDirectus } from '../../shared/directus/core/use-directus.ts';
import type { ClassesPage } from './classes-page.ts';

const classesPageRequests = new WeakMap<Directus, Promise<ClassesPage>>();

export const useClassesPage = (): ClassesPage => {
  const directus = useDirectus();
  let promise = classesPageRequests.get(directus);
  if (!promise) {
    promise = directus.getClassesPage();
    classesPageRequests.set(directus, promise);
  }
  return use(promise);
};
