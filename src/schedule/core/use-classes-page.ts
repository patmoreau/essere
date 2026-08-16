import { use } from 'react';

import { createDirectusResource } from '../../shared/directus/core/directus-resource.ts';
import { useDirectus } from '../../shared/directus/core/use-directus.ts';
import type { ClassesPage } from './classes-page.ts';

const classesPageResource = createDirectusResource(directus => directus.getClassesPage());

export const preloadClassesPage = classesPageResource.preload;

export const useClassesPage = (): ClassesPage => use(classesPageResource.load(useDirectus()));
