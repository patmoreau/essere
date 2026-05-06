import type { Event } from '../../../events/core/event.ts';

export type EventSchema = {
  id: string;
  title: string;
  date_start: string;
  date_end?: string;
  category: 'Intensive' | 'Workshop' | 'Guest Event' | 'Retreat';
  description: string;
  location?: string;
  image: string;
  featured: boolean;
  booking_url?: string;
};

const toEvent = (schema: EventSchema): Event => ({
  id: schema.id,
  title: schema.title,
  dateStart: schema.date_start,
  dateEnd: schema.date_end,
  category: schema.category,
  description: schema.description,
  location: schema.location,
  imageUrl: schema.image,
  featured: schema.featured,
  bookingUrl: schema.booking_url,
});

export const EventSchema = { toEvent } as const;
