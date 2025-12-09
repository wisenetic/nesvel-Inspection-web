// src/core/utils/env.ts

export const env = {
  API_URL: import.meta.env.VITE_API_URL,
  MODE: import.meta.env.MODE,
  API_MODE: import.meta.env.VITE_API_MODE ?? "api",
};
