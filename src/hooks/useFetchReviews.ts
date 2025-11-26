import { useEffect, useState, useCallback } from "react";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "../firebase";

export type TReview = {
  id: string;
  movieId: number;
  movieTitle: string;
  userId: string;
  username: string;
  text: string;
  createdAt: Date;
};

export function useFetchReviews(userId: string | undefined) {
  const [reviews, setReviews] = useState<TReview[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReviews = useCallback(async (uid: string) => {
    setLoading(true);
    setError(null);

    try {
      const reviewsRef = collection(db, "reviews");

      const q = query(
        reviewsRef,
        where("userId", "==", uid),
        orderBy("createdAt", "desc")
      );

      const querySnapshot = await getDocs(q);

      const fetchedReviews: TReview[] = querySnapshot.docs.map((doc) => {
        const data = doc.data();

        return {
          id: doc.id,
          movieId: data.movieId,
          movieTitle: data.movieTitle,
          userId: data.userId,
          username: data.username,
          text: data.text,
          createdAt: data.createdAt?.toDate
            ? data.createdAt.toDate()
            : new Date()
        };
      });

      setReviews(fetchedReviews);
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Error while loading reviews";

      console.error("Fetch reviews error:", msg);
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      fetchReviews(userId);
    }
  }, [userId, fetchReviews]);

  return { reviews, loading, error };
}
