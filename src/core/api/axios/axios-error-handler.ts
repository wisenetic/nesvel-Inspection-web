// src/core/api/axios/axios-error-handler.ts
import type { AxiosError } from "axios";
import { HTTP } from "@/core/utils/http-status";
import { parseErrorMessage } from "@/core/utils/parse-error";

export function normalizeAxiosError(error: AxiosError) {
  return {
    message: parseErrorMessage(error),
    status: error.response?.status ?? 0,
    data: error.response?.data ?? null,
    raw: error,
  };
}

export function isUnauthorized(err: AxiosError) {
  return (
    err.response?.status === HTTP.UNAUTHORIZED ||
    err.response?.status === HTTP.FORBIDDEN
  );
}
