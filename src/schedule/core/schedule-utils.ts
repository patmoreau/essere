import type { ScheduleClass } from './schedule-class.ts';

export type DayOfWeek =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';

export const DAYS_OF_WEEK: DayOfWeek[] = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export const DAY_LABELS_FR: Record<DayOfWeek, string> = {
  Monday: 'Lundi',
  Tuesday: 'Mardi',
  Wednesday: 'Mercredi',
  Thursday: 'Jeudi',
  Friday: 'Vendredi',
  Saturday: 'Samedi',
  Sunday: 'Dimanche',
};

export const CATEGORY_LABELS_FR: Record<ScheduleClass['category'], string> = {
  Yoga: 'Yoga',
  Pilates: 'Pilates',
  Meditation: 'Méditation',
};

export const CATEGORY_COLORS: Record<ScheduleClass['category'], string> = {
  Yoga: 'var(--primary)',
  Pilates: 'var(--secondary)',
  Meditation: '#625f53',
};

const parseLocalDate = (dateStr: string): Date => {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day);
};

const JS_DAY_TO_DOW: DayOfWeek[] = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export const getDayOfWeek = (dateStr: string): DayOfWeek =>
  JS_DAY_TO_DOW[parseLocalDate(dateStr).getDay()];

export const isActiveInWeek = (cls: ScheduleClass, weekStart: Date): boolean => {
  const weekEnd = addDays(weekStart, 6);
  const start = parseLocalDate(cls.startDate);
  const end = parseLocalDate(cls.endDate);
  return start <= weekEnd && end >= weekStart;
};

export const getWeekStart = (date: Date): Date => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
};

export const addDays = (date: Date, days: number): Date => {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
};

const MONTH_SHORT_FR = [
  'jan',
  'fév',
  'mar',
  'avr',
  'mai',
  'juin',
  'juil',
  'août',
  'sep',
  'oct',
  'nov',
  'déc',
];

export const formatDayDate = (date: Date): string => {
  const day = date.getDate();
  const month = MONTH_SHORT_FR[date.getMonth()];
  return `${day} ${month}`;
};

export const formatWeekRange = (weekStart: Date): string => {
  const weekEnd = addDays(weekStart, 6);
  const startDay = weekStart.getDate();
  const endDay = weekEnd.getDate();
  const startMonth = MONTH_SHORT_FR[weekStart.getMonth()];
  const endMonth = MONTH_SHORT_FR[weekEnd.getMonth()];
  const year = weekEnd.getFullYear();
  if (weekStart.getMonth() === weekEnd.getMonth()) {
    return `${startDay} – ${endDay} ${endMonth} ${year}`;
  }
  return `${startDay} ${startMonth} – ${endDay} ${endMonth} ${year}`;
};
