import { useEffect, useState, useCallback, useMemo } from "react";
import { useParams } from "@tanstack/react-router";
import MovieCard from "../../components/MovieCard/MovieCard";
import CommunityReviews from "../../components/CommunityReviews/CommunityReviews";
import ReviewModal from "../../components/review/ReviewModal";
import styles from "./MovieDetails.module.scss";
import type { Movie } from "../../types/movie";
import { useProfileStore, type TMovieListItem } from "../../store/userStore";

interface Review {
  id: string;
  author: string;
  content: string;
  created_at: string;
  author_details?: {
    rating?: number | null;
    avatar_path?: string | null;
  };
}

export default function MovieDetails() {
  const { id } = useParams({ from: "/movie/$id" });
  const movieId = parseInt(id);

  const [movie, setMovie] = useState<Movie | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  const user = useProfileStore((state) => state.user);
  const favorites = useProfileStore((state) => state.favorites);
  const watchlist = useProfileStore((state) => state.watchlist);
  const addFavorite = useProfileStore((state) => state.addFavorite);
  const removeFavorite = useProfileStore((state) => state.removeFavorite);
  const addWatchlist = useProfileStore((state) => state.addWatchlist);
  const removeWatchlist = useProfileStore((state) => state.removeWatchlist);

  const isFavorite = favorites.some((m) => m.id === movieId);
  const inWatchlist = watchlist.some((m) => m.id === movieId);
  const isAuthenticated = !!user;
  const movieItem: TMovieListItem = useMemo(
    () => ({
      id: movie?.id || 0,
      title: movie?.title || "",
      poster_path: movie?.poster_path || null
    }),
    [movie]
  );
  const toggleFavorite = useCallback(async () => {
    if (!isAuthenticated) return alert("Please log in!");
    if (isFavorite) removeFavorite(movieItem.id);
    else addFavorite(movieItem);
  }, [isAuthenticated, isFavorite, addFavorite, removeFavorite, movieItem]);

  const toggleWatchlist = useCallback(async () => {
    if (!isAuthenticated) return alert("Please log in!");
    if (inWatchlist) removeWatchlist(movieItem.id);
    else addWatchlist(movieItem);
  }, [isAuthenticated, inWatchlist, addWatchlist, removeWatchlist, movieItem]);

  useEffect(() => {
    async function fetchMovie() {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&append_to_response=credits`
        );
        if (!res.ok) throw new Error(res.statusText);
        const data = await res.json();
        setMovie(data);

        const reviewsRes = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`
        );
        if (!reviewsRes.ok) throw new Error(reviewsRes.statusText);
        const reviewsData = await reviewsRes.json();
        setReviews(reviewsData.results || []);
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
    }

    fetchMovie();
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div className={styles.random}>
      <MovieCard
        movie={movie}
        showActions={true}
        onReviewClick={() => setIsReviewOpen(true)}
        isFavorite={isFavorite}
        inWatchlist={inWatchlist}
        isListLoading={false}
        isAuthenticated={isAuthenticated}
        onToggleFavorite={toggleFavorite}
        onToggleWatchlist={toggleWatchlist}
      />

      <CommunityReviews reviews={reviews} />

      <ReviewModal
        isOpen={isReviewOpen}
        onClose={() => setIsReviewOpen(false)}
        movieTitle={movie.title}
        movieId={movie.id}
      />
    </div>
  );
}
