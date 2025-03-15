import { ApiClient, OpenAPI } from "./generated";
import type { ApiError } from "./generated";

// Configure OpenAPI defaults
OpenAPI.BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
OpenAPI.VERSION = "1.0";
OpenAPI.WITH_CREDENTIALS = true;
OpenAPI.CREDENTIALS = "include";

// Configure authentication
OpenAPI.TOKEN = async () => {
  // In a browser environment
  if (typeof window !== "undefined") {
    return localStorage.getItem("token") || "";
  }
  // In SSR environment
  return "";
};

// Configure headers
OpenAPI.HEADERS = async () => {
  return {
    "Content-Type": "application/json",
  };
};

// Create API client instance
const api = new ApiClient(OpenAPI);

// Create error handler
const handleApiError = (error: ApiError) => {
  if (error.status === 401) {
    // Handle unauthorized
    localStorage.removeItem("token");
    window.location.href = "/login";
  }
  throw error;
};

// Export configured client and types
export { api, ApiError, handleApiError };
export type * from "./generated";
