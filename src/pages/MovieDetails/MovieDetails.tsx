import { useEffect, useState, useCallback, useMemo } from "react";
import { useParams } from "@tanstack/react-router";
import MovieCard from "../../components/MovieCard/MovieCard";
import CommunityReviews from "../../components/CommunityReviews/CommunityReviews";
import ReviewModal from "../../components/review/ReviewModal";
import styles from "./MovieDetails.module.scss";
import type { Movie } from "../../types/movie";
import type { TMovieListItem } from "../../store/userStore";
import { useListManagement } from "../../hooks/useListManagement";
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

  const {
    isFavorite,
    inWatchlist,
    toggleFavorite,
    toggleWatchlist,
    isListLoading,
    isAuthenticated
  } = useListManagement(movieId);
  const movieItem: TMovieListItem = useMemo(
    () => ({
      id: movie?.id || 0,
      title: movie?.title || "",
      poster_path: movie?.poster_path || null
    }),
    [movie]
  );
  const handleToggleFavorite = useCallback(async (): Promise<void> => {
    if (!isAuthenticated) {
      console.warn("User must be logged in to toggle favorite.");
      return;
    }
    await toggleFavorite(movieItem);
  }, [isAuthenticated, toggleFavorite, movieItem]);
  const handleToggleWatchlist = useCallback(async (): Promise<void> => {
    if (!isAuthenticated) {
      console.warn("User must be logged in to toggle watchlist.");
      return;
    }
    await toggleWatchlist(movieItem);
  }, [isAuthenticated, toggleWatchlist, movieItem]);
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
      } catch (err) {
        console.error("Error fetching movie:", err);
      }
    }

    fetchMovie();
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div className={styles.random}>
      <MovieCard
        movie={movie}
        showActions
        onReviewClick={() => setIsReviewOpen(true)}
        isFavorite={isFavorite}
        inWatchlist={inWatchlist}
        isListLoading={isListLoading}
        isAuthenticated={isAuthenticated}
        onToggleFavorite={handleToggleFavorite}
        onToggleWatchlist={handleToggleWatchlist}
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
