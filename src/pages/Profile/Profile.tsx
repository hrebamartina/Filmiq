import { useProfileStore, type TMovieListItem } from "../../store/userStore";
import Slider from "../../components/UI/Slider/Slider";
import avatarIcon from "../../assets/avatarIcon.svg";
import styles from "./Profile.module.scss";
import { useFetchReviews } from "../../hooks/useFetchReviews";

export default function Profile() {
  const { favorites, watchlist, user } = useProfileStore();
  const userId = user?.id;

  const { reviews: loadedReviews, loading, error } = useFetchReviews(userId);

  const handleMovieSelect = (movie: TMovieListItem) => {
    console.log("Selected movie:", movie);
  };

  const uniqueWatchlist = watchlist.filter(
    (w) => !favorites.some((f) => f.id === w.id)
  );

  return (
    <div className={styles.profile}>
      <section className={styles.profile__info}>
        <div className={styles.profile__left}>
          <div className={styles.profile__avatar}>
            <img src={avatarIcon} alt="Profile Avatar" />
          </div>
          <div>
            <h2>{user?.username || "Username"}</h2>
            <p>{user?.email || "Bio"}</p>
          </div>
        </div>
        <div className={styles.profile__stats}>
          <p>Added movies this month: {favorites.length + watchlist.length}</p>
          <p>Total added movies: {favorites.length + watchlist.length}</p>
          <p>Favorite genre: –</p>
          <p>Reviews written: {loadedReviews.length}</p>
        </div>
      </section>
      <section className={styles.profile__lists}>
        {favorites.length > 0 && (
          <Slider
            movies={favorites}
            onSelectMovie={handleMovieSelect}
            title="Favorite Films"
          />
        )}

        {uniqueWatchlist.length > 0 && (
          <Slider
            movies={uniqueWatchlist}
            onSelectMovie={handleMovieSelect}
            title="Watchlist"
          />
        )}

        {favorites.length === 0 && uniqueWatchlist.length === 0 && (
          <p className={styles.profile__empty}>No movies added yet.</p>
        )}
      </section>
      <section className={styles.profile__reviews}>
        <h3 className={styles.profile__title}>My Reviews</h3>

        {loading && <p>Loading reviews...</p>}
        {error && (
          <p style={{ color: "red" }}>Failed to load reviews: {error}</p>
        )}

        {!loading && loadedReviews.length === 0 && (
          <p className={styles.profile__empty}>No reviews yet.</p>
        )}

        {!loading &&
          loadedReviews.length > 0 &&
          loadedReviews.map((r) => (
            <div key={r.id} className={styles.profile__review}>
              <h4>{r.movieTitle}</h4>
              <p>{r.text}</p>
              <small>{new Date(r.date).toLocaleString()}</small>
            </div>
          ))}
      </section>
    </div>
  );
}
