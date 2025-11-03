import Slider from "../../components/UI/Slider/Slider";
import styles from './Profile.module.scss';
import avatarIcon from "../../assets/avatarIcon.svg";

export default function Profile() {
  return (
    <div className={styles.profile}>
      <section className={styles.profile__info}>
        <div className={styles.profile__left}>
          <div className={styles.profile__avatar}>
            <img src={avatarIcon} alt="Profile Avatar" />
          </div>
          <div>
            <h2>Username</h2>
            <p>Bio</p>
          </div>
        </div>

        <div className={styles.profile__stats}>
          <p>Added movies this month: 0</p>
          <p>Total added movies: 0</p>
          <p>Favorite genre: 0</p>
          <p>Reviews written: 0</p>
        </div>
      </section>

      <section className={styles.profile__lists}>
        <h3 className={styles.profile__title}>Favorite films</h3>
        <Slider />

        <h3 className={styles.profile__title}>Watchlist</h3>
        <Slider />
      </section>
    </div>
  );
}
