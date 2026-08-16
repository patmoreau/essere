import { use } from 'react';

import { createDirectusResource } from '../../shared/directus/core/directus-resource.ts';
import { useDirectus } from '../../shared/directus/core/use-directus.ts';

const eventsResource = createDirectusResource(directus => directus.getEvents());

export const preloadEvents = eventsResource.preload;

export const useEvents = () => use(eventsResource.load(useDirectus()));
