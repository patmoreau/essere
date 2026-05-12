import { use } from 'react';

import type { Directus } from '../../shared/directus/core/directus.ts';
import { useDirectus } from '../../shared/directus/core/use-directus.ts';
import type { EventsPage } from './events-page.ts';

const eventsRequests = new WeakMap<Directus, Promise<EventsPage>>();

export const useEventsPage = () => {
  const directus = useDirectus();

  let dataPromise = eventsRequests.get(directus);

  if (!dataPromise) {
    dataPromise = directus.getEventsPage();
    eventsRequests.set(directus, dataPromise);
  }

  return use(dataPromise);
};
