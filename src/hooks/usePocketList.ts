import { useCallback, useEffect, useState } from 'react';
import { STORAGE_KEYS, loadData, saveData } from '../storage/storage';

export type PocketOnceItem = { id: string; type: 'once'; name: string; done: boolean };
export type PocketCountItem = { id: string; type: 'count'; name: string; total: number; done: number };
export type PocketItem = PocketOnceItem | PocketCountItem;

export function isPocketComplete(item: PocketItem): boolean {
  return item.type === 'once' ? item.done : item.done >= item.total;
}

export function usePocketList() {
  const [items, setItems] = useState<PocketItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    loadData<PocketItem[]>(STORAGE_KEYS.pocket, []).then((data) => {
      setItems(data);
      setLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (loaded) saveData(STORAGE_KEYS.pocket, items);
  }, [items, loaded]);

  const addItem = useCallback((name: string, type: 'once' | 'count', total: number) => {
    const id = `${Date.now()}`;
    setItems((prev) => [
      ...prev,
      type === 'count' ? { id, type: 'count', name, total, done: 0 } : { id, type: 'once', name, done: false },
    ]);
  }, []);

  const toggleOnce = useCallback((id: string) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id && it.type === 'once' ? { ...it, done: !it.done } : it))
    );
  }, []);

  const bumpCount = useCallback((id: string, delta: number) => {
    setItems((prev) =>
      prev.map((it) => {
        if (it.id !== id || it.type !== 'count') return it;
        const done = Math.max(0, Math.min(it.total, it.done + delta));
        return { ...it, done };
      })
    );
  }, []);

  return { items, loaded, addItem, toggleOnce, bumpCount };
}
