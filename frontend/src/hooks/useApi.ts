import { useState, useCallback } from "react";
import apiClient from "../api/client";

type RequestParams = Record<string, string | number | boolean> | undefined;
type RequestBody = Record<string, unknown> | undefined;

interface UseApiResponse<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  execute: (params?: RequestParams | RequestBody) => Promise<T>;
}

export function useApi<T>(endpoint: string, method: "GET" | "POST" | "PUT" | "DELETE" = "GET"): UseApiResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(
    async (params?: RequestParams | RequestBody) => {
      try {
        setLoading(true);
        setError(null);

        const response = await apiClient({
          method,
          url: endpoint,
          ...(method !== "GET" && params && { data: params }),
          ...(method === "GET" && params && { params }),
        });

        setData(response.data);
        return response.data;
      } catch (err) {
        setError(err as Error);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [endpoint, method]
  );

  return { data, loading, error, execute };
}

export default useApi;
