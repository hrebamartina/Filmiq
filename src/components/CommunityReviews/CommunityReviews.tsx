import styles from './CommunityReviews.module.scss';

export default function CommunityReviews() {
  return (
    <section className={styles.communityReviews}>
      <h2 className={styles.communityReviews__title}>Community Reviews</h2>
      <div className={styles.communityReviews__list}>
        <div className={styles.communityReviews__item}>
          <p className={styles.communityReviews__username}>UserName</p>
          <p className={styles.communityReviews__text}>
            I expected better. A disappointment.
          </p>
        </div>
      </div>
    </section>
  );
}
