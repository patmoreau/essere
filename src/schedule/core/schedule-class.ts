export type ScheduleClass = {
  id: string;
  title: string;
  category: 'Yoga' | 'Pilates' | 'Meditation';
  instructorName: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  bookingUrl?: string;
};
