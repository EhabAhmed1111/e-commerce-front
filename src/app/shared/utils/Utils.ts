export function getMonthName(date: Date): string {
  return date.toLocaleString('default', { month: 'long' });
}