import { use } from 'react';

import { createDirectusResource } from '../../shared/directus/core/directus-resource.ts';
import { useDirectus } from '../../shared/directus/core/use-directus.ts';

const instructorsResource = createDirectusResource(directus => directus.getInstructors());

export const preloadInstructors = instructorsResource.preload;

export const useInstructors = () => use(instructorsResource.load(useDirectus()));
