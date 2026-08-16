import { use } from 'react';

import { createDirectusResource } from '../../shared/directus/core/directus-resource.ts';
import { useDirectus } from '../../shared/directus/core/use-directus.ts';
import type { ScheduleClass } from './schedule-class.ts';

const scheduleClassesResource = createDirectusResource(directus => directus.getScheduleClasses());

export const preloadScheduleClasses = scheduleClassesResource.preload;

export const useScheduleClasses = (): ScheduleClass[] =>
  use(scheduleClassesResource.load(useDirectus()));
