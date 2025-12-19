import { useCallback, useState } from "react";
import {
  doc,
  collection,
  setDoc,
  deleteDoc,
  getDocs
} from "firebase/firestore";
import { db } from "../firebase";
import type { TMovieListItem } from "../store/userStore";
import { useProfileStore } from "../store/userStore";

type ListType = "favorites" | "watchlist";

export const useListManagement = (movieId: number) => {
  const [isListLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    user,
    favorites,
    watchlist,
    addFavorite,
    removeFavorite,
    addWatchlist,
    removeWatchlist,
    setFavorites,
    setWatchlist
  } = useProfileStore();

  const userId = user?.id;

  const getUserCollectionRef = useCallback(
    (list: ListType) => {
      if (!userId) throw new Error("User not logged in");
      return collection(db, "users", userId, list);
    },
    [userId]
  );

  const fetchLists = useCallback(async () => {
    if (!userId) return;
    setIsLoading(true);
    setError(null);

    try {
      const favSnap = await getDocs(getUserCollectionRef("favorites"));
      setFavorites(
        favSnap.docs.map((doc) => ({
          id: Number(doc.id),
          title: doc.data().title,
          poster_path: doc.data().poster_path
        }))
      );

      const watchSnap = await getDocs(getUserCollectionRef("watchlist"));
      setWatchlist(
        watchSnap.docs.map((doc) => ({
          id: Number(doc.id),
          title: doc.data().title,
          poster_path: doc.data().poster_path
        }))
      );
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [userId, getUserCollectionRef, setFavorites, setWatchlist]);

  const toggleList = useCallback(
    async (list: ListType, movie: TMovieListItem) => {
      if (!userId) return;
      setIsLoading(true);
      setError(null);

      const isInList =
        list === "favorites"
          ? favorites.some((m) => m.id === movie.id)
          : watchlist.some((m) => m.id === movie.id);

      try {
        const docRef = doc(getUserCollectionRef(list), String(movie.id));

        if (list === "favorites") {
          if (isInList) removeFavorite(movie.id);
          else addFavorite(movie);
        } else {
          if (isInList) removeWatchlist(movie.id);
          else addWatchlist(movie);
        }

        if (isInList) await deleteDoc(docRef);
        else
          await setDoc(docRef, {
            title: movie.title,
            poster_path: movie.poster_path
          });
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Unknown error";
        setError(message);
      } finally {
        setIsLoading(false);
      }
    },
    [
      userId,
      favorites,
      watchlist,
      getUserCollectionRef,
      addFavorite,
      removeFavorite,
      addWatchlist,
      removeWatchlist
    ]
  );

  const isFavorite = favorites.some((m) => m.id === movieId);
  const inWatchlist = watchlist.some((m) => m.id === movieId);

  return {
    isFavorite,
    inWatchlist,
    toggleFavorite: async (movie: TMovieListItem) =>
      toggleList("favorites", movie),
    toggleWatchlist: async (movie: TMovieListItem) =>
      toggleList("watchlist", movie),
    fetchLists,
    isListLoading,
    error,
    isAuthenticated: !!userId
  };
};
