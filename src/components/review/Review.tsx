import { useState } from "react";
import styles from "./Review.module.scss";
import type { TReview } from "../../store/userStore";
import { usePostReview } from "../../hooks/usePostReviews";
import { useProfileStore } from "../../store/userStore";

interface ReviewProps {
  title: string;
  movieId: number;
  onClose: () => void;
}

const Review: React.FC<ReviewProps> = ({ title, movieId, onClose }) => {
  const [text, setText] = useState("");
  const user = useProfileStore((state) => state.user);

  const { postReview, loading, error } = usePostReview();

  const handleSave = async () => {
    if (!text.trim()) {
      alert("Review cannot be empty");
      return;
    }

    if (!user) {
      alert("You must be logged in!");
      return;
    }

    const newReview: TReview = {
      id: Date.now(),
      movieId,
      movieTitle: title,
      userId: user.id,
      text,
      date: new Date().toISOString()
    };

    try {
      await postReview(newReview);
      alert("Review saved!");
      onClose();
    } catch {
      alert("Failed to save review: " + error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.reviewBox}>
        <h2 className={styles.reviewBox__title}>{title}</h2>

        <textarea
          className={styles.reviewBox__textarea}
          placeholder="Add a review..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          className={styles.reviewBox__button}
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save"}
        </button>

        {error && <p className={styles.error}>{error}</p>}
      </div>
    </div>
  );
};

export default Review;
