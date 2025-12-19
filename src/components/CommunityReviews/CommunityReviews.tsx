import styles from "./CommunityReviews.module.scss";

interface Review {
  id: string;
  author: string;
  content: string;
  created_at: string;
  author_details?: {
    rating?: number | null;
    avatar_path?: string | null;
  };
}

interface CommunityReviewsProps {
  reviews: Review[];
}

export default function CommunityReviews({ reviews }: CommunityReviewsProps) {
  return (
    <div className={styles.communityReviews}>
      <h2 className={styles.communityReviews__title}>Community Reviews</h2>

      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <div className={styles.communityReviews__list}>
          {reviews.map((review) => (
            <div key={review.id} className={styles.communityReviews__item}>
              <p className={styles.communityReviews__username}>
                {review.author}{" "}
                {review.author_details?.rating && (
                  <span> — {review.author_details.rating}/10</span>
                )}
              </p>

              <p className={styles.communityReviews__text}>{review.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
