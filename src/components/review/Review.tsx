import { useState } from "react";
import { useReviewActions } from "../../hooks/useReviewActions";
import { useProfileStore } from "../../store/userStore";
import styles from "./Review.module.scss";
import type { TReviewCreateData } from "../../hooks/useReviewActions";

interface ReviewProps {
  movieId: number;
  movieTitle: string;
  onClose: () => void;
}

const Review: React.FC<ReviewProps> = ({ movieId, movieTitle, onClose }) => {
  const [text, setText] = useState("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { user } = useProfileStore((state) => state);
  const { addReview, loading, error } = useReviewActions();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      console.error("You must be logged in to post a review.");
      setSuccessMessage(null);
      return;
    }
    setSuccessMessage(null);

    const reviewData: TReviewCreateData = {
      movieId,
      movieTitle,
      text
    };

    try {
      await addReview(reviewData);
      setText("");
      setSuccessMessage("Review posted successfully!");
      setTimeout(onClose, 1000);
    } catch (err) {
      console.error("Failed to post review:", err);
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h3 className={styles.reviewBox__title}>
          Write a Review for "{movieTitle}"
        </h3>
        {error && <p className={styles.reviewBox__error}>{error}</p>}
        {successMessage && (
          <p className={styles.reviewBox__success}>{successMessage}</p>
        )}

        <form onSubmit={handleSubmit}>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write your review here..."
            className={styles.reviewBox__textarea}
          />

          <div className={styles.reviewBox__buttons}>
            <button
              type="submit"
              disabled={loading || !text.trim()}
              className={styles.reviewBox__button}
            >
              {loading ? "Posting..." : "Post Review"}
            </button>

            <button
              type="button"
              onClick={onClose}
              className={styles.reviewBox__buttonClose}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Review;
