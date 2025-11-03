
import styles from './MovieDetails.module.scss';
import heartIcon from "../../assets/heartIcon.svg";
import oclockIcon from "../../assets/oclockIcon.svg";
import pencilIcon from "../../assets/pencilIcon.svg";
import CommunityReviews from '../../components/CommunityReviews/CommunityReviews';

export default function MovieDetails() {
  return (
    <div className={styles.random}>
      <section className={styles.random__content}>
        <img
          src=""
          alt="Movie Poster"
          className={styles.random__poster}
        />
        <div className={styles.detailsAndActions}>
          <div className={styles.random__details}>
            <p className={styles["random__details-title"]}>Title:</p>
            <p className={styles["random__details-title"]}>Year: </p>
            <p className={styles["random__details-description"]}>description</p>

            <div className={styles.random__tabs}>
              <button>Cast</button>
              <button>Crew</button>
              <button className={styles.active}>Genres</button>
            </div>

            <p>genre</p>
          </div>

          
          <div className={styles.movieActions}>
            <div className={`${styles.actionItem} ${styles.like}`}>
              <img src={heartIcon} alt="like" className={styles.icon}/>
              <span>Like</span>
            </div>

            <div className={`${styles.actionItem} ${styles.watchlist}`} >
              <img src={oclockIcon} alt="watchlist" className={styles.icon}/>
              <span>WatchList</span>
            </div>

            <div className={`${styles.actionItem} ${styles.review}`}>
              <img src={pencilIcon} alt="review" className={styles.icon}/>
              <span>Review</span>
            </div>
          </div>
        </div>
      </section>
      <CommunityReviews />
    </div>
  );
}
