import type { Event } from '../../../events/core/event.ts';

export type EventImageSchema = {
  id: string;
  width: number | null;
  height: number | null;
};

export type EventSchema = {
  id: string;
  title: string;
  date_start: string;
  date_end?: string;
  category: 'Intensive' | 'Workshop' | 'Guest Event' | 'Retreat';
  description?: string | null;
  location?: string;
  image: EventImageSchema | null;
  featured: boolean;
  full: boolean;
  booking_url?: string | null;
  deposit: number;
};

const toAspectRatio = (image: EventImageSchema | null): number | undefined =>
  image?.width && image.height ? image.width / image.height : undefined;

const toEvent = (schema: EventSchema): Event => ({
  id: schema.id,
  title: schema.title,
  dateStart: schema.date_start,
  dateEnd: schema.date_end,
  category: schema.category,
  description: schema.description ?? '',
  location: schema.location,
  imageUrl: schema.image?.id ?? '',
  imageAspectRatio: toAspectRatio(schema.image),
  featured: schema.featured,
  full: schema.full,
  bookingUrl: schema.booking_url ?? '',
  deposit: schema.deposit,
});

export const EventSchema = { toEvent } as const;
