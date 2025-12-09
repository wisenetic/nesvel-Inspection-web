// src/core/providers/auth-provider/auth-provider.ts
import type { AuthProvider } from "@refinedev/core";
import {
  login,
  logout,
  refreshAccessToken,
  getUser,
  getAccessToken,
} from "@/core/services/auth";
import { parseErrorMessage } from "@/core/utils/parse-error";

export const authProvider: AuthProvider = {
  /**
   * -------------------------------------------------------------
   * LOGIN
   * -------------------------------------------------------------
   * Called by refine when user submits login form.
   */
  login: async ({ email, password }) => {
    try {
      await login({ email, password });

      return {
        success: true,
        // Refine automatically navigates using this redirect path
        redirectTo: "/",
      };
    } catch (error) {
      return {
        success: false,
        error: {
          name: "Login Error",
          message: parseErrorMessage(error),
        },
      };
    }
  },

  /**
   * -------------------------------------------------------------
   * LOGOUT
   * -------------------------------------------------------------
   */
  logout: async () => {
    try {
      await logout();
    } catch {
      // even if logout API fails, still drop local session
    }

    return {
      success: true,
      redirectTo: "/login",
    };
  },

  /**
   * -------------------------------------------------------------
   * CHECK
   * -------------------------------------------------------------
   * Called on:
   * - page load
   * - navigation
   * - Authenticated wrapper
   * - routerProvider sync
   *
   * Ensures the user session is valid.
   */
  check: async () => {
    let token = getAccessToken();

    if (!token) {
      // Attempt silent refresh
      const refreshed = await refreshAccessToken();
      if (!refreshed) {
        return {
          authenticated: false,
          redirectTo: "/login",
          logout: true,
        };
      }
      token = refreshed.accessToken;
    }

    return { authenticated: true };
  },

  /**
   * -------------------------------------------------------------
   * IDENTITY (optional)
   * -------------------------------------------------------------
   * Used by refine UI (header, profile, audit logs)
   */
  getIdentity: async () => {
    const user = getUser();
    if (!user) return null;

    return {
      id: user.id,
      name: user.name,
      avatar: user.avatar ?? undefined,
      email: user.email ?? undefined,
      role: user.role,
    };
  },

  /**
   * -------------------------------------------------------------
   * PERMISSIONS (optional)
   * -------------------------------------------------------------
   * Used by refine to:
   * - guard resources
   * - show/hide UI elements
   * - hide modules in sidebar (we will integrate this later)
   */
  getPermissions: async () => {
    const user = getUser();
    return user?.role ?? "user";
  },

  /**
   * -------------------------------------------------------------
   * onError (required for refine v5)
   * -------------------------------------------------------------
   * Global error handler for auth-related failures.
   */
  onError: async (error) => {
    console.warn("[AuthProvider:onError]", error);

    const status =
      error?.status ??
      error?.response?.status ??
      error?.response?.data?.statusCode;

    // Token expired or user unauthorized
    if (status === 401 || status === 403) {
      return {
        logout: true,
        redirectTo: "/login",
      };
    }

    // Do nothing, allow dataProvider to handle it
    return {};
  },
};
