import { useEffect, useState } from "react";
import type { TReview } from "../store/userStore";

export function useFetchReviews(userId: number | undefined) {
  const [reviews, setReviews] = useState<TReview[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;

    setLoading(true);
    fetch(`http://localhost:3001/reviews?userId=${userId}`)
      .then((res) => res.json())
      .then((data: TReview[]) => setReviews(data))
      .catch((err: unknown) => {
        if (err instanceof Error) setError(err.message);
        else setError(String(err));
      })
      .finally(() => setLoading(false));
  }, [userId]);

  return { reviews, loading, error };
}
