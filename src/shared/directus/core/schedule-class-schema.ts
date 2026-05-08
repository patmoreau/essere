import type { ScheduleClass } from '../../../schedule/core/schedule-class.ts';

export type ScheduleClassSchema = {
  id: string;
  class_title: string;
  category: 'yoga' | 'pilates' | 'meditation';
  instructor_name: string;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  booking_url?: string | null;
};

const CATEGORY_MAP: Record<ScheduleClassSchema['category'], ScheduleClass['category']> = {
  yoga: 'Yoga',
  pilates: 'Pilates',
  meditation: 'Meditation',
};

const toScheduleClass = (schema: ScheduleClassSchema): ScheduleClass => ({
  id: schema.id,
  title: schema.class_title,
  category: CATEGORY_MAP[schema.category],
  instructorName: schema.instructor_name,
  startDate: schema.start_date,
  endDate: schema.end_date,
  startTime: schema.start_time.slice(0, 5),
  endTime: schema.end_time.slice(0, 5),
  bookingUrl: schema.booking_url ?? undefined,
});

export const ScheduleClassSchema = { toScheduleClass } as const;
