import styles from "./RandomMovie.module.scss";
import MovieCard from "../../components/MovieCard/MovieCard";
import { useEffect, useState } from "react";
import type { Movie } from "../../types/movie";

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

  async function fetchRandomMovie(selectedGenre: string) {
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
    } catch (err) {
      console.error("Error loading random movie:", err);
    }
  }

  useEffect(() => {
    fetchRandomMovie(genre);
  }, [genre]);

  const handleTryAnother = () => {
    fetchRandomMovie(genre);
  };

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGenre(e.target.value);
  };

  const handleAddToWatchlist = () => {
    console.log("Added:", currentMovie);
  };

  return (
    <div className={styles.random}>
      <div className={styles.random__heading}>
        <h2>Choose a genre to discover a random movie:</h2>

        <div className={styles["random__select-wrapper"]}>
          <select
            aria-label="Select movie genre"
            className={styles.random__select}
            value={genre}
            onChange={handleGenreChange}
          >
            <option value="action">Action</option>
            <option value="comedy">Comedy</option>
            <option value="horror">Horror</option>
            <option value="romance">Romance</option>
            <option value="sciFi">Science Fiction</option>
            <option value="drama">Drama</option>
            <option value="adventure">Adventure</option>
          </select>
        </div>
      </div>

      {currentMovie && <MovieCard movie={currentMovie} showActions={false} />}

      <div className={styles.random__actions}>
        <button className={styles.add} onClick={handleAddToWatchlist}>
          Add to Watchlist
        </button>

        <button className={styles.try} onClick={handleTryAnother}>
          Try another
        </button>
      </div>
    </div>
  );
}
