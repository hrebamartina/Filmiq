import styles from "./RandomMovie.module.scss";
import MovieCard from "../../components/MovieCard/MovieCard";
import { useEffect, useState, useMemo, useCallback } from "react";
import type { Movie } from "../../types/movie";
import { type TMovieListItem } from "../../store/userStore";
import { useListManagement } from "../../hooks/useListManagement";

const GENRES: Record<string, number> = {
  action: 28,
  comedy: 35,
  horror: 27,
  romance: 10749,
  sciFi: 878,
  drama: 18,
  adventure: 12
};

export default function RandomMovie() {
  const [currentMovie, setCurrentMovie] = useState<Movie | null>(null);
  const [genre, setGenre] = useState("action");
  const [added, setAdded] = useState(false);

  const movieItem: TMovieListItem = useMemo(
    () => ({
      id: currentMovie?.id || 0,
      title: currentMovie?.title || "",
      poster_path: currentMovie?.poster_path || null
    }),
    [currentMovie]
  );

  const { inWatchlist, toggleWatchlist, isListLoading, isAuthenticated } =
    useListManagement(movieItem.id);

  const isFavorite = false;

  const fetchRandomMovie = async (selectedGenre: string) => {
    try {
      const GENRE_ID = GENRES[selectedGenre];

      const discoverRes = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&with_genres=${GENRE_ID}&sort_by=popularity.desc`
      );
      const discoverData = await discoverRes.json();

      const randomMovie =
        discoverData.results[
          Math.floor(Math.random() * discoverData.results.length)
        ];

      const fullRes = await fetch(
        `https://api.themoviedb.org/3/movie/${randomMovie.id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&append_to_response=credits`
      );

      const fullMovie = await fullRes.json();
      setCurrentMovie(fullMovie);
      setAdded(false);
    } catch (err) {
      console.error("Error loading random movie:", err);
    }
  };

  useEffect(() => {
    fetchRandomMovie(genre);
  }, [genre]);

  const handleTryAnother = () => fetchRandomMovie(genre);

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGenre(e.target.value);
    setAdded(false);
  };

  const handleAddToWatchlist = useCallback(async () => {
    if (!isAuthenticated || !currentMovie) return;

    await toggleWatchlist(movieItem);
    setAdded(true);
  }, [isAuthenticated, currentMovie, movieItem, toggleWatchlist]);

  const noop = useCallback(async () => {}, []);

  return (
    <div className={styles.random}>
      <div className={styles.random__heading}>
        <h2>Choose a genre to discover a random movie:</h2>
        <div className={styles["random__select-wrapper"]}>
          <select
            data-cy="genre-select"
            aria-label="Select movie genre"
            className={styles.random__select}
            value={genre}
            onChange={handleGenreChange}
          >
            {Object.keys(GENRES).map((g) => (
              <option key={g} value={g}>
                {g.charAt(0).toUpperCase() + g.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {currentMovie && (
        <MovieCard
          movie={currentMovie}
          showActions={false}
          isFavorite={isFavorite}
          inWatchlist={inWatchlist}
          isListLoading={isListLoading}
          isAuthenticated={isAuthenticated}
          onToggleFavorite={noop}
          onToggleWatchlist={noop}
          onReviewClick={noop}
        />
      )}

      <div className={styles.random__actions}>
        <button
          className={styles.add}
           data-cy="add-watchlist"  
          onClick={handleAddToWatchlist}
          disabled={isListLoading || !isAuthenticated || added}
        >
          {added ? "Added to Watchlist" : "Add to Watchlist"}
        </button>

        <button className={styles.try} onClick={handleTryAnother} data-cy="try-another">
          Try another
        </button>
      </div>
    </div>
  );
}
