import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useProfileStore } from "../store/userStore";

export type TReviewCreateData = {
  movieId: number;
  movieTitle: string;
  text: string;
};

export const useReviewActions = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const user = useProfileStore((state) => state.user);

  const addReview = async (reviewData: TReviewCreateData) => {
    if (!user) {
      const msg = "User is not authenticated";
      setError(msg);
      throw new Error(msg);
    }

    setLoading(true);
    setError(null);

    try {
      const reviewsCollection = collection(db, "reviews");

      await addDoc(reviewsCollection, {
        movieId: reviewData.movieId,
        movieTitle: reviewData.movieTitle,
        text: reviewData.text,

        userId: user.id,
        username: user.username || "Anonymous",
        createdAt: serverTimestamp()
      });
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Error posting review";

      console.error("Error while posting review:", message);
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { addReview, loading, error };
};
