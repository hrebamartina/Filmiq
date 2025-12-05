import { useState } from "react";

const API_BASE_URL = "http://localhost:3001";
export const useMutation = <TData>() => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = async (
    endpoint: string,
    method: "POST" | "PUT" | "PATCH" | "DELETE",
    body?: object
  ): Promise<TData> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: body ? JSON.stringify(body) : undefined
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`API error: ${errText}`);
      }

      return (await response.json()) as TData;
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error";
      setError(msg);
      throw new Error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return { mutate, isLoading, error };
};

export const fetchData = async (endpoint: string) => {
  const response = await fetch(`${API_BASE_URL}/${endpoint}`);
  if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
  return response.json();
};
