import { useEffect, useState } from "react";
import Slider from "../../components/UI/Slider/Slider";
import { fetchMoviesByGenre, type Movie } from "../../api/tmdbApi";
import { useNavigate } from "@tanstack/react-router";
import type { TMovieListItem } from "../../store/userStore";

const genres = [
  { id: 28, name: "Action" },
  { id: 35, name: "Comedy" },
  { id: 27, name: "Horror" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 18, name: "Drama" },
  { id: 12, name: "Adventure" }
];

export default function Home() {
  const [genreMovies, setGenreMovies] = useState<
    Record<string, TMovieListItem[]>
  >({});
  const navigate = useNavigate();

  useEffect(() => {
    async function loadAllGenres() {
      const result: Record<string, TMovieListItem[]> = {};
      for (const genre of genres) {
        const tmdbMovies: Movie[] = await fetchMoviesByGenre(genre.id);
        const moviesForSlider: TMovieListItem[] = tmdbMovies
          .filter((m) => m.poster_path)
          .map((m) => ({
            id: m.id,
            title: m.title,
            poster_path: m.poster_path
          }));
        result[genre.name] = moviesForSlider;
      }
      setGenreMovies(result);
    }

    loadAllGenres();
  }, []);

  const handleMovieSelect = (movie: TMovieListItem) => {
    navigate({ to: `/movie/${movie.id}` });
  };

  return (
    <div>
      {genres.map(
        (genre) =>
          genreMovies[genre.name] &&
          genreMovies[genre.name].length > 0 && (
            <Slider
              key={genre.id}
              title={genre.name}
              movies={genreMovies[genre.name]}
              onSelectMovie={handleMovieSelect}
            />
          )
      )}
    </div>
  );
}
