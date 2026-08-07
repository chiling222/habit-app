import { useCallback, useEffect, useState } from 'react';
import { STORAGE_KEYS, loadData, saveData } from '../storage/storage';

export type Effort = { id: string; text: string; done: boolean };

export type Dream = {
  id: string;
  name: string;
  note: string;
  gradient: string[];
  photoUri?: string;
  realized: boolean;
  efforts: Effort[];
};

export const DREAM_GRADIENTS: string[][] = [
  ['#CDE4D6', '#BFD3EC'],
  ['#EBD3E4', '#D9C7EC'],
  ['#F3E1C4', '#E9C6C0'],
  ['#A8D8C0', '#B6C9E8', '#D8BEDD'],
  ['#F2D6A8', '#E8B7A0'],
];

export function useDreams() {
  const [dreams, setDreams] = useState<Dream[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    loadData<Dream[]>(STORAGE_KEYS.dreams, []).then((data) => {
      setDreams(data);
      setLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (loaded) saveData(STORAGE_KEYS.dreams, dreams);
  }, [dreams, loaded]);

  const addDream = useCallback((name: string, note: string) => {
    setDreams((prev) => {
      const gradient = DREAM_GRADIENTS[prev.length % DREAM_GRADIENTS.length];
      const newDream: Dream = {
        id: `${Date.now()}`,
        name,
        note,
        gradient,
        realized: false,
        efforts: [],
      };
      return [...prev, newDream];
    });
  }, []);

  const setPhoto = useCallback((dreamId: string, uri: string) => {
    setDreams((prev) => prev.map((d) => (d.id === dreamId ? { ...d, photoUri: uri } : d)));
  }, []);

  const addEffort = useCallback((dreamId: string, text: string) => {
    setDreams((prev) =>
      prev.map((d) =>
        d.id === dreamId ? { ...d, efforts: [...d.efforts, { id: `${Date.now()}`, text, done: false }] } : d
      )
    );
  }, []);

  const toggleEffort = useCallback((dreamId: string, effortId: string) => {
    setDreams((prev) =>
      prev.map((d) =>
        d.id === dreamId
          ? { ...d, efforts: d.efforts.map((e) => (e.id === effortId ? { ...e, done: !e.done } : e)) }
          : d
      )
    );
  }, []);

  const realizeDream = useCallback((dreamId: string) => {
    setDreams((prev) => prev.map((d) => (d.id === dreamId ? { ...d, realized: true } : d)));
  }, []);

  return { dreams, loaded, addDream, setPhoto, addEffort, toggleEffort, realizeDream };
}
