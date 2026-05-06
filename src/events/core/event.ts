export type Event = {
  id: string;
  title: string;
  dateStart: string;
  dateEnd?: string;
  category: 'Intensive' | 'Workshop' | 'Guest Event' | 'Retreat';
  description: string;
  location?: string;
  imageUrl: string;
  featured: boolean;
  bookingUrl?: string;
};
