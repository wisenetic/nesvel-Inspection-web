// src/core/services/auth/auth.types.ts

/**
 * Payload used for login API.
 */
export interface LoginPayload {
  email: string;
  password: string;
}

/**
 * Tokens returned by backend after login/refresh.
 */
export interface AuthTokens {
  access_token: string;
  refresh_token: string;
}

/**
 * Shape of the authenticated user returned by BE.
 */
export interface AuthUser {
  id: string | number;
  name: string;
  email?: string;
  avatar?: string;
  role?: string;
  [key: string]: unknown;
}

/**
 * Response shape returned by /auth/login
 */
export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  user: AuthUser;
}
