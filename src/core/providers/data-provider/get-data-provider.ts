// src/core/providers/data-provider/get-data-provider.ts

import { apiDataProvider } from "./api-provider";
import { mockDataProvider } from "./mock-provider";

const MODE = (import.meta.env.VITE_API_MODE ?? "api").toLowerCase();

export const getDataProvider = () => {
  if (MODE === "mock") {
    console.info("[DataProvider] Using MOCK provider");
    return mockDataProvider;
  }

  console.info("[DataProvider] Using AXIOS provider");
  return apiDataProvider;
};
