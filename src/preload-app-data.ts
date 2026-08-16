import { preloadEvents } from './events/core/use-events.ts';
import { preloadEventsPage } from './events/core/use-events-page.ts';
import { preloadHomePage } from './home/core/use-home-page.ts';
import { preloadInstructors } from './instructors/core/use-instructors.ts';
import { preloadClassesPage } from './schedule/core/use-classes-page.ts';
import { preloadScheduleClasses } from './schedule/core/use-schedule-classes.ts';
import type { Directus } from './shared/directus/core/directus.ts';
import { preloadLabels } from './shared/labels/core/use-labels.ts';
import { preloadNavLinks } from './shared/navbar/core/use-nav-links.ts';

/**
 * Starts every collection request in parallel at boot. Without this each hook
 * only fires when its component first renders, so Suspense resolves them one
 * round trip at a time and every first visit to a route waits on the network.
 *
 * The whole payload is a few dozen kilobytes, so fetching all routes up front
 * costs one parallel burst and makes later navigation a cache hit.
 */
export const preloadAppData = (directus: Directus) => {
  const requests = [
    preloadLabels(directus),
    preloadNavLinks(directus),
    preloadHomePage(directus),
    preloadClassesPage(directus),
    preloadScheduleClasses(directus),
    preloadEventsPage(directus),
    preloadEvents(directus),
    preloadInstructors(directus),
  ];

  // Nothing awaits these here; the components do. Mark them handled so a failed
  // request cannot surface as an unhandled rejection before its component reads it.
  requests.forEach(request => request.catch(() => undefined));
};
