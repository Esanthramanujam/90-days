import { HABITS } from '../data/program.js';

export const scoreOf = (c) => (c ? HABITS.filter((h) => c.habits?.[h.id]).length / HABITS.length : 0);

// A day counts toward the streak when at least 70% of habits are done.
export function streak(checkins, today) {
  const byDay = new Map(checkins.map((c) => [c.day, c]));
  let s = 0;
  let d = today;
  if (scoreOf(byDay.get(d)) < 0.7) d -= 1; // today still in progress
  while (d >= 1 && scoreOf(byDay.get(d)) >= 0.7) { s += 1; d -= 1; }
  return s;
}
