import AsyncStorage from '@react-native-async-storage/async-storage';

export const STORAGE_KEYS = {
  habits: 'habit-app:habits',
  pocket: 'habit-app:pocket',
  dreams: 'habit-app:dreams',
} as const;

export async function loadData<T>(key: string, fallback: T): Promise<T> {
  try {
    const raw = await AsyncStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export async function saveData<T>(key: string, value: T): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch {
    // 本機儲存失敗時暫不處理,資料仍保留在記憶體中
  }
}
