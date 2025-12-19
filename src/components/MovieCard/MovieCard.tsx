import styles from "./MovieCard.module.scss";
import heartIcon from "../../assets/heartIcon.svg";
import oclockIcon from "../../assets/oclockIcon.svg";
import pencilIcon from "../../assets/pencilIcon.svg";
import { useState } from "react";
import type { Movie } from "../../types/movie";

interface MovieCardProps {
  movie: Movie;
  showActions?: boolean;
  onReviewClick?: () => void;
  isFavorite: boolean;
  inWatchlist: boolean;
  isListLoading: boolean;
  isAuthenticated: boolean;
  onToggleFavorite: () => Promise<void>;
  onToggleWatchlist: () => Promise<void>;
}

export default function MovieCard({
  movie,
  showActions = true,
  onReviewClick,
  isFavorite,
  inWatchlist,
  isListLoading,
  isAuthenticated,
  onToggleFavorite,
  onToggleWatchlist
}: MovieCardProps) {
  const [activeTab, setActiveTab] = useState<"cast" | "crew" | "genres">(
    "cast"
  );

  const handleActionClick = (action: () => Promise<void>) => {
    if (!isAuthenticated) {
      alert("Please log in to manage your lists.");
      return;
    }
    action();
  };

  return (
    <section className={styles.movieCard}>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className={styles.poster}
      />

      <div className={styles.detailsAndActions}>
        <div className={styles.details}>
          <p className={styles.title}>
            <strong>Title:</strong> {movie.title}
          </p>
          <p className={styles.title}>
            <strong>Year:</strong> {movie.release_date?.slice(0, 4)}
          </p>
          <p className={styles.description}>
            {movie.overview || "No description available."}
          </p>

          <div className={styles.tabs}>
            <button
              onClick={() => setActiveTab("cast")}
              className={activeTab === "cast" ? styles.active : ""}
            >
              Cast
            </button>
            <button
              onClick={() => setActiveTab("crew")}
              className={activeTab === "crew" ? styles.active : ""}
            >
              Crew
            </button>
            <button
              onClick={() => setActiveTab("genres")}
              className={activeTab === "genres" ? styles.active : ""}
            >
              Genres
            </button>
          </div>

          {activeTab === "cast" && (
            <ul>
              {movie.credits?.cast?.slice(0, 10).map((c) => (
                <li key={c.id}>
                  {c.name} {c.character ? `-${c.character}` : ""}
                </li>
              ))}
            </ul>
          )}

          {activeTab === "crew" && (
            <ul>
              {movie.credits?.crew?.slice(0, 10).map((c) => (
                <li key={c.id}>
                  {c.name} {c.job ? `-${c.job}` : ""}
                </li>
              ))}
            </ul>
          )}
          {activeTab === "genres" && (
            <ul>
              {movie.genres?.map((g) => (
                <li key={g.id}>{g.name}</li>
              ))}
            </ul>
          )}
        </div>

        {showActions && (
          <div className={styles.actions}>
            <div
              className={`${styles.actionItem} ${isFavorite ? styles.favoriteActive : ""}`}
              onClick={() => handleActionClick(onToggleFavorite)}
            >
              <img src={heartIcon} alt="like" />
              <span>{isFavorite ? "In favorites" : "Add to favorites"}</span>
              {isListLoading && <span className={styles.loading}>...</span>}
            </div>
            <div
              className={`${styles.actionItem} ${inWatchlist ? styles.watchlistActive : ""}`}
              onClick={() => handleActionClick(onToggleWatchlist)}
            >
              <img src={oclockIcon} alt="watchlist" />
              <span>{inWatchlist ? "In watchlist" : "Watch later"}</span>
              {isListLoading && <span className={styles.loading}>...</span>}
            </div>
            <div className={styles.actionItem} onClick={onReviewClick}>
              <img src={pencilIcon} alt="review" />
              <span>Write a Review</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
