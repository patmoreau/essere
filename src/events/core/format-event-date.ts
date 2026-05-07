const datePart = (iso: string) => iso.split('T')[0];
const timePart = (iso: string) => (iso.split('T')[1] ?? '').slice(0, 5);

const formatDate = (iso: string): string => {
  const [year, month, day] = datePart(iso).split('-').map(Number);
  return new Date(year, month - 1, day).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
};

const isSameDay = (a: string, b: string): boolean => datePart(a) === datePart(b);

export const formatEventDateRange = (dateStart: string, dateEnd?: string): string => {
  if (dateEnd && isSameDay(dateStart, dateEnd)) {
    return `${formatDate(dateStart)} · ${timePart(dateStart)} – ${timePart(dateEnd)}`;
  }
  return dateEnd ? `${formatDate(dateStart)} – ${formatDate(dateEnd)}` : formatDate(dateStart);
};
