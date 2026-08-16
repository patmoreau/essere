import { use } from 'react';

import { createDirectusResource } from '../../directus/core/directus-resource.ts';
import { useDirectus } from '../../directus/core/use-directus.ts';
import type { NavLink } from './nav-link.ts';

const navLinksResource = createDirectusResource(directus => directus.getNavLinks());

export const preloadNavLinks = navLinksResource.preload;

export const useNavLinks = (): NavLink[] => use(navLinksResource.load(useDirectus()));
