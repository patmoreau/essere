import { use } from 'react';

import type { Directus } from '../../shared/directus/core/directus.ts';
import { useDirectus } from '../../shared/directus/core/use-directus.ts';
import type { ScheduleClass } from './schedule-class.ts';

const scheduleRequests = new WeakMap<Directus, Promise<ScheduleClass[]>>();

export const useScheduleClasses = (): ScheduleClass[] => {
  const directus = useDirectus();
  let promise = scheduleRequests.get(directus);
  if (!promise) {
    promise = directus.getScheduleClasses();
    scheduleRequests.set(directus, promise);
  }
  return use(promise);
};
