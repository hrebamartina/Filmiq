import { useEffect, useCallback } from "react";
import { doc, setDoc, onSnapshot } from "firebase/firestore";
import type { DocumentData, DocumentReference } from "firebase/firestore";
import { db } from "../firebase";
import { useProfileStore } from "../store/userStore";
import type { TMovieListItem } from "../store/userStore";
const LIST_COLLECTION = "lists";
const FAVORITES_DOC_ID = "favorites";
const WATCHLIST_DOC_ID = "watchlist";

export const useFirestoreSync = () => {
  const { user } = useProfileStore();
  const userId = user?.id;
  const setFavorites = useProfileStore((state) => state.setFavorites);
  const setWatchlist = useProfileStore((state) => state.setWatchlist);
  const favorites = useProfileStore((state) => state.favorites);
  const watchlist = useProfileStore((state) => state.watchlist);
  const getListRef = useCallback(
    (listName: string): DocumentReference<DocumentData> | null => {
      if (!userId) return null;
      return doc(db, "users", userId, LIST_COLLECTION, listName);
    },
    [userId]
  );
  const updateListInFirestore = useCallback(
    async (listName: string, items: TMovieListItem[]) => {
      const ref = getListRef(listName);
      if (!ref) return;

      try {
        await setDoc(ref, { items: items });
      } catch (error) {
        console.error(
          `Помилка оновлення списку ${listName} у Firestore:`,
          error
        );
      }
    },
    [getListRef]
  );
  const addFavoriteToDb = useCallback(
    (movie: TMovieListItem) => {
      const newList = [...favorites, movie];
      updateListInFirestore(FAVORITES_DOC_ID, newList);
    },
    [favorites, updateListInFirestore]
  );
  const removeFavoriteFromDb = useCallback(
    (movieId: number) => {
      const newList = favorites.filter((m) => m.id !== movieId);
      updateListInFirestore(FAVORITES_DOC_ID, newList);
    },
    [favorites, updateListInFirestore]
  );

  const addWatchlistToDb = useCallback(
    (movie: TMovieListItem) => {
      const newList = [...watchlist, movie];
      updateListInFirestore(WATCHLIST_DOC_ID, newList);
    },
    [watchlist, updateListInFirestore]
  );
  const removeWatchlistFromDb = useCallback(
    (movieId: number) => {
      const newList = watchlist.filter((m) => m.id !== movieId);
      updateListInFirestore(WATCHLIST_DOC_ID, newList);
    },
    [watchlist, updateListInFirestore]
  );

  useEffect(() => {
    if (!userId) {
      setFavorites([]);
      setWatchlist([]);
      return;
    }

    const favRef = getListRef(FAVORITES_DOC_ID);
    const watchRef = getListRef(WATCHLIST_DOC_ID);

    if (!favRef || !watchRef) return;
    const unsubscribeFavorites = onSnapshot(
      favRef,
      (doc) => {
        if (doc.exists()) {
          const data = doc.data();
          const fetchedFavorites = (data.items || []) as TMovieListItem[];
          setFavorites(fetchedFavorites);
        } else {
          setFavorites([]);
          updateListInFirestore(FAVORITES_DOC_ID, []);
        }
      },
      (error) => {
        console.error("Помилка синхронізації Favorites:", error);
      }
    );
    const unsubscribeWatchlist = onSnapshot(
      watchRef,
      (doc) => {
        if (doc.exists()) {
          const data = doc.data();
          const fetchedWatchlist = (data.items || []) as TMovieListItem[];
          setWatchlist(fetchedWatchlist);
        } else {
          setWatchlist([]);
          updateListInFirestore(WATCHLIST_DOC_ID, []);
        }
      },
      (error) => {
        console.error("Помилка синхронізації Watchlist:", error);
      }
    );
    return () => {
      unsubscribeFavorites();
      unsubscribeWatchlist();
    };
  }, [userId, getListRef, setFavorites, setWatchlist, updateListInFirestore]);
  return {
    addFavoriteToDb,
    removeFavoriteFromDb,
    addWatchlistToDb,
    removeWatchlistFromDb
  };
};
