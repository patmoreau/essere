import { use } from 'react';

import type { Directus } from '../../shared/directus/core/directus.ts';
import { useDirectus } from '../../shared/directus/core/use-directus.ts';
import type { Event } from './event.ts';

const eventsRequests = new WeakMap<Directus, Promise<Event[]>>();

export const useEvents = () => {
  const directus = useDirectus();

  let dataPromise = eventsRequests.get(directus);

  if (!dataPromise) {
    dataPromise = directus.getEvents();
    eventsRequests.set(directus, dataPromise);
  }

  return use(dataPromise);
};
