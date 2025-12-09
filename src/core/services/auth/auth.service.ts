import { api } from "@/core/api/axios/axios-instance";
import { storage } from "@/core/utils/storage";
import { Token } from "@/core/utils/token";
import type { LoginPayload, AuthTokens } from "./auth.types";

const USER_KEY = "auth_user";

/* -------------------------------------------------------------
 * TOKEN METHODS
 * ------------------------------------------------------------- */
export const getAccessToken = () => Token.get();
export const getRefreshToken = () => Token.getRefresh();

export const setTokens = (tokens: AuthTokens) => {
  Token.set(tokens.access_token);
  Token.setRefresh(tokens.refresh_token);
};

export const clearTokens = () => {
  Token.remove();
  Token.removeRefresh();
  storage.remove(USER_KEY);
};

/* -------------------------------------------------------------
 * MOCK IMPLEMENTATION (for dev mode)
 * ------------------------------------------------------------- */
async function mockLogin(payload: LoginPayload): Promise<AuthTokens> {
  const res = await fetch("/mocks/auth/users.json");
  const users = await res.json();

  const user = users.find(
    (u: unknown) =>
      u.email === payload.email && u.password === payload.password,
  );

  if (!user) throw new Error("Invalid credentials");

  const tokens = {
    access_token: `mock_access_${user.id}`,
    refresh_token: `mock_refresh_${user.id}`,
  };

  storage.set(USER_KEY, user);
  setTokens(tokens);

  return tokens;
}

async function mockLogout() {
  clearTokens();
}

async function mockRefresh(): Promise<string | null> {
  const refresh = getRefreshToken();
  if (!refresh) return null;

  const newToken = "mock_access_refreshed";
  Token.set(newToken);
  return newToken;
}

/* -------------------------------------------------------------
 * API IMPLEMENTATION (using Axios instance)
 * ------------------------------------------------------------- */
async function apiLogin(payload: LoginPayload): Promise<AuthTokens> {
  const { data } = await api.post("/auth/login", payload);

  const { access_token, refresh_token, user } = data;
  if (!access_token) throw new Error("Invalid login response");

  setTokens({ access_token, refresh_token });

  if (user) storage.set(USER_KEY, user);

  return data;
}

async function apiLogout() {
  try {
    await api.post("/auth/logout", {
      refresh_token: getRefreshToken(),
    });
  } catch (err) {
    console.warn("Logout API failed:", err);
  } finally {
    clearTokens();
  }
}

async function apiRefresh(): Promise<string | null> {
  const refresh = getRefreshToken();
  if (!refresh) return null;

  try {
    const { data } = await api.post("/auth/refresh", {
      refresh_token: refresh,
    });

    if (data?.access_token) {
      Token.set(data.access_token);
      return data.access_token;
    }
    return null;
  } catch (err) {
    clearTokens();
    return null;
  }
}

/* -------------------------------------------------------------
 * PUBLIC API (depending on mode)
 * ------------------------------------------------------------- */
const API_MODE = import.meta.env.VITE_API_MODE;

export const login = (payload: LoginPayload) =>
  API_MODE === "mock" ? mockLogin(payload) : apiLogin(payload);

export const logout = () => (API_MODE === "mock" ? mockLogout() : apiLogout());

export const refreshAccessToken = () =>
  API_MODE === "mock" ? mockRefresh() : apiRefresh();

export const getUser = () => storage.get(USER_KEY);
