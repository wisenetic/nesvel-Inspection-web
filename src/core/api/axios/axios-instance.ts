// src/core/api/axios/axios-instance.ts

import axios from "axios";
import { Token } from "@/core/utils/token";
import { RefreshManager } from "./axios-refresh-manager";
import { normalizeAxiosError, isUnauthorized } from "./axios-error-handler";
import { env } from "@/core/utils/env";

export const api = axios.create({
  baseURL: env.API_URL,
  timeout: 15000,
});

// -------------------------------------------------------------
// REQUEST INTERCEPTOR
// -------------------------------------------------------------
api.interceptors.request.use((config) => {
  const token = Token.get();
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
});

// -------------------------------------------------------------
// RESPONSE INTERCEPTOR
// -------------------------------------------------------------
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const err = normalizeAxiosError(error);

    // 🔐 Attempt refresh token
    if (isUnauthorized(error)) {
      const newToken = await RefreshManager.refreshToken();

      if (!newToken) {
        // Refresh failed → log out by rejecting to AuthProvider.onError
        return Promise.reject(err);
      }

      // Retry the original request
      const original = error.config!;
      original.headers = {
        ...original.headers,
        Authorization: `Bearer ${newToken}`,
      };

      return api(original);
    }

    // Pass through other errors
    return Promise.reject(err);
  },
);
