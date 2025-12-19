// src/hooks/usePostReview.ts
import { useState } from "react";
import type { TReview } from "../store/userStore";

export function usePostReview() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const postReview = async (review: TReview) => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("http://localhost:3001/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(review)
      });

      if (!res.ok) {
        throw new Error("Failed to post review");
      }

      const data = await res.json();
      return data;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
        throw err;
      } else {
        setError("Unknown error");
        throw new Error("Unknown error");
      }
    } finally {
      setLoading(false);
    }
  };

  return { postReview, loading, error };
}
