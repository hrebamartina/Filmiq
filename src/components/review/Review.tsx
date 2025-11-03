import React from 'react';
import styles from './Review.module.scss';

const ReviewPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.reviewBox}>
        <h2 className={styles.reviewBox__title}>The Conjuring: Last Rites</h2>
        <textarea
          className={styles.reviewBox__textarea}
          placeholder="Add a review..."
        />
        <button className={styles.reviewBox__button}>Save</button>
      </div>
    </div>
  );
};

export default ReviewPage;
