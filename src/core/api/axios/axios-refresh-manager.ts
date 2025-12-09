// src/core/api/axios/axios-refresh-manager.ts
import { refreshAccessToken } from "@/core/services/auth/auth.service";
import { Token } from "@/core/utils/token";

let isRefreshing = false;
let refreshQueue: Array<(token: string | null) => void> = [];

export const RefreshManager = {
  async refreshToken() {
    if (isRefreshing) {
      return new Promise<string | null>((resolve) => {
        refreshQueue.push(resolve);
      });
    }

    isRefreshing = true;

    const newToken = await refreshAccessToken();

    refreshQueue.forEach((resolve) => resolve(newToken));
    refreshQueue = [];
    isRefreshing = false;

    if (!newToken) {
      Token.remove();
      Token.removeRefresh();
    }

    return newToken;
  },
};
