import { use } from 'react';

import type { Directus } from '../../shared/directus/core/directus.ts';
import { useDirectus } from '../../shared/directus/core/use-directus.ts';
import type { Instructor } from './instructor.ts';

const instructorsRequests = new WeakMap<Directus, Promise<Instructor[]>>();

export const useInstructors = () => {
  const directus = useDirectus();

  let dataPromise = instructorsRequests.get(directus);

  if (!dataPromise) {
    dataPromise = directus.getInstructors();
    instructorsRequests.set(directus, dataPromise);
  }

  return use(dataPromise);
};
