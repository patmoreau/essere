import { createDirectus, readItems, readSingleton, rest } from '@directus/sdk';

import type { Event } from '../../../events/core/event.ts';
import type { HomePage as HomePageModel } from '../../../home/core/home-page.ts';
import { Config } from '../../config/core/config';
import { EventSchema } from './event-schema.ts';
import { FooterLinkSchema } from './footer-link-schema.ts';
import { HomePageSchema } from './home-page-schema.ts';
import type { LabelSchema } from './label-schema.ts';
import { NavLinkSchema } from './nav-link-schema.ts';

type Schema = {
  labels: LabelSchema[];
  nav_links: NavLinkSchema[];
  footer_links: FooterLinkSchema[];
  home_page: HomePageSchema;
  events: EventSchema[];
};

export type Directus = {
  getLabels(): Promise<Record<string, string>>;
  getNavLinks(): Promise<NavLinkSchema[]>;
  getFooterLinks(): Promise<ReturnType<typeof FooterLinkSchema.toFooterLink>[]>;
  getHomePage(): Promise<HomePageModel>;
  getEvents(): Promise<Event[]>;
};

export const Directus = (config: Config): Directus => {
  const directus = createDirectus<Schema>(config.DIRECTUS_URL).with(rest());

  const brokenImageSvg =
    `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%235b6159'%3E` +
    `%3Cpath d='M21 5v6.59l-3-3.01-4 4.01-4-4-4 4-3-3.01V5c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2zm-3 6.42 3 3.01V19c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2v-6.58l3 2.99 4-4 4 4 4-4z'/%3E` +
    `%3C/svg%3E`;

  const resolveAssetUrl = (fileId?: string | null): string => {
    if (!fileId) {
      return brokenImageSvg;
    }

    if (fileId.startsWith('http://') || fileId.startsWith('https://')) {
      return fileId;
    }

    const baseUrl = config.DIRECTUS_URL.replace(/\/$/, '');
    return `${baseUrl}/assets/${fileId}`;
  };

  const getLabels = async (): Promise<Record<string, string>> => {
    const response = await directus.request(readItems('labels', { limit: -1 }));

    return response.reduce(
      (acc, item) => {
        acc[item.key] = item.value || item.key;
        return acc;
      },
      {} as Record<string, string>,
    );
  };

  const getNavLinks = async () => {
    const response = await directus.request(readItems('nav_links', { sort: ['order'] }));

    return response.map(NavLinkSchema.toNavLink);
  };

  const getFooterLinks = async () => {
    const response = await directus.request(readItems('footer_links', { sort: ['order'] }));

    return response.map(FooterLinkSchema.toFooterLink);
  };

  const getHomePage = async () => {
    const response = await directus.request(readSingleton('home_page'));

    return HomePageSchema.toHomePage({
      ...response,
      hero_image: resolveAssetUrl(response.hero_image),
    });
  };

  const getEvents = async (): Promise<Event[]> => {
    const response = await directus.request(
      readItems('events', { sort: ['date_start'], limit: 4 }),
    );

    return response.map((item) =>
      EventSchema.toEvent({ ...item, image: resolveAssetUrl(item.image) }),
    );
  };

  return {
    getLabels: getLabels,
    getNavLinks: getNavLinks,
    getFooterLinks: getFooterLinks,
    getHomePage: getHomePage,
    getEvents: getEvents,
  };
};
