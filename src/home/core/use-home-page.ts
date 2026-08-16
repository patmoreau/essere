import { use } from 'react';

import { createDirectusResource } from '../../shared/directus/core/directus-resource.ts';
import { useDirectus } from '../../shared/directus/core/use-directus.ts';

const homePageResource = createDirectusResource(directus => directus.getHomePage());

export const preloadHomePage = homePageResource.preload;

export const useHomePage = () => use(homePageResource.load(useDirectus()));
