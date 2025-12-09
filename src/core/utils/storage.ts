// src/core/utils/storage.ts

export const storage = {
  set<T>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value));
  },

  get<T>(key: string): T | null {
    const value = localStorage.getItem(key);
    if (!value) return null;

    try {
      return JSON.parse(value) as T;
    } catch {
      return null;
    }
  },

  remove(key: string) {
    localStorage.removeItem(key);
  },
};
