import { use } from 'react';

import { createDirectusResource } from '../../directus/core/directus-resource.ts';
import { useDirectus } from '../../directus/core/use-directus.ts';

const labelsResource = createDirectusResource(directus => directus.getLabels());

export const preloadLabels = labelsResource.preload;

export const useLabels = () => use(labelsResource.load(useDirectus()));
