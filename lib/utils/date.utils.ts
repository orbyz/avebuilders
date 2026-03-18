export function getWeekStart(date: Date) {
  const d = new Date(date);

  const day = d.getDay(); // 0 domingo, 1 lunes...
  const diff = day === 0 ? -6 : 1 - day; // ajustar a lunes

  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);

  return d;
}
