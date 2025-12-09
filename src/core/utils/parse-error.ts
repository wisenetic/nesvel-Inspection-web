// src/core/utils/parse-error.ts
import type { AxiosError } from "axios";

export function parseErrorMessage(error: unknown): string {
  // JS Error class
  if (error instanceof Error) return error.message;

  // Any object with a message field
  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as unknown).message === "string"
  ) {
    return (error as unknown).message;
  }

  // Axios error response
  if ((error as AxiosError)?.isAxiosError) {
    const axiosErr = error as AxiosError<{ message?: string; error?: string }>;

    return (
      axiosErr.response?.data?.message ||
      axiosErr.response?.data?.error ||
      axiosErr.message ||
      "Network error occurred"
    );
  }

  // Unknown error shape
  try {
    return JSON.stringify(error) || "Unknown error occurred";
  } catch {
    return "Unknown error occurred";
  }
}
