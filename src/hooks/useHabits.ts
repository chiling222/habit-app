import { useCallback, useEffect, useState } from 'react';
import { STORAGE_KEYS, loadData, saveData } from '../storage/storage';
import { IconName } from '../theme/icons';
import { dateKey, startOfDay } from '../utils/date';

export type HabitDate = { y: number; m: number; d: number };

export type Habit = {
  id: string;
  name: string;
  color: number;
  icon: IconName;
  start: HabitDate;
  stamps: string[];
};

export function useHabits() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    loadData<Habit[]>(STORAGE_KEYS.habits, []).then((data) => {
      setHabits(data);
      setLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (loaded) saveData(STORAGE_KEYS.habits, habits);
  }, [habits, loaded]);

  const addHabit = useCallback((name: string, color: number, icon: IconName) => {
    const today = startOfDay(new Date());
    const newHabit: Habit = {
      id: `${Date.now()}`,
      name,
      color,
      icon,
      start: { y: today.getFullYear(), m: today.getMonth() + 1, d: today.getDate() },
      stamps: [],
    };
    setHabits((prev) => [...prev, newHabit]);
  }, []);

  const toggleStamp = useCallback((habitId: string, y: number, m: number, d: number) => {
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id !== habitId) return h;
        const k = dateKey(y, m, d);
        const has = h.stamps.includes(k);
        if (has) {
          return { ...h, stamps: h.stamps.filter((s) => s !== k) };
        }
        let start = h.start;
        const cd = startOfDay(new Date(y, m - 1, d));
        const st = startOfDay(new Date(h.start.y, h.start.m - 1, h.start.d));
        if (cd < st) start = { y, m, d };
        return { ...h, stamps: [...h.stamps, k], start };
      })
    );
  }, []);

  const batchStamp = useCallback((habitId: string, y: number, m: number, dayLo: number, dayHi: number) => {
    const today = startOfDay(new Date());
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id !== habitId) return h;
        const set = new Set(h.stamps);
        for (let d = dayLo; d <= dayHi; d++) {
          const cd = startOfDay(new Date(y, m - 1, d));
          if (cd > today) continue;
          set.add(dateKey(y, m, d));
        }
        let start = h.start;
        const loDate = startOfDay(new Date(y, m - 1, dayLo));
        const st = startOfDay(new Date(h.start.y, h.start.m - 1, h.start.d));
        if (loDate < st) start = { y, m, d: dayLo };
        return { ...h, stamps: [...set], start };
      })
    );
  }, []);

  return { habits, loaded, addHabit, toggleStamp, batchStamp };
}
