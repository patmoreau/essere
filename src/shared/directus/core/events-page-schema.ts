import type {EventsPage} from "../../../events/core/events-page.ts";

export type EventsPageSchema = {
  hero_eyebrow: string;
  hero_headline: string;
  hero_headline_accent: string;
  hero_subheading: string;
  event_featured_headline: string;
};

const toEventsPage = (schema: EventsPageSchema): EventsPage => ({
  heroEyebrow: schema.hero_eyebrow,
  heroHeadline: schema.hero_headline,
  heroHeadlineAccent: schema.hero_headline_accent,
  heroSubheading: schema.hero_subheading,
  eventFeaturedHeadline: schema.event_featured_headline,
});

export const EventsPageSchema = { toEventsPage: toEventsPage } as const;
