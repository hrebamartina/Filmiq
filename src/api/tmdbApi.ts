const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  genre_ids: number[];
  overview: string;
  release_date: string;
}

export const fetchMoviesByGenre = async (genreId: number): Promise<Movie[]> => {
  const res = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&sort_by=popularity.desc`
  );
  const data = await res.json();
  return data.results;
};
