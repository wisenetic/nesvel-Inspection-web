// src/core/utils/token.ts

const ACCESS = "access_token";
const REFRESH = "refresh_token";

export const Token = {
  // Access
  get: () => localStorage.getItem(ACCESS),
  set: (token: string) => localStorage.setItem(ACCESS, token),
  remove: () => localStorage.removeItem(ACCESS),

  // Refresh
  getRefresh: () => localStorage.getItem(REFRESH),
  setRefresh: (token: string) => localStorage.setItem(REFRESH, token),
  removeRefresh: () => localStorage.removeItem(REFRESH),
};
