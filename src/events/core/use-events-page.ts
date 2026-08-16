import { use } from 'react';

import { createDirectusResource } from '../../shared/directus/core/directus-resource.ts';
import { useDirectus } from '../../shared/directus/core/use-directus.ts';

const eventsPageResource = createDirectusResource(directus => directus.getEventsPage());

export const preloadEventsPage = eventsPageResource.preload;

export const useEventsPage = () => use(eventsPageResource.load(useDirectus()));
