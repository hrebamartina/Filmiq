import { create } from "zustand";

export type TMovieListItem = {
  id: number;
  title: string;
  poster_path?: string | null;
};

export type TUser = {
  id: number;
  email: string;
  username?: string;
};

export type TReview = {
  id: number;
  userId: number;
  movieId: number;
  movieTitle: string;
  text: string;
  date: string;
};

type ProfileStore = {
  user: TUser | null;
  favorites: TMovieListItem[];
  watchlist: TMovieListItem[];
  reviews: TReview[];

  setUser: (user: TUser | null) => void;

  addFavorite: (movie: TMovieListItem) => void;
  removeFavorite: (id: number) => void;

  addWatchlist: (movie: TMovieListItem) => void;
  removeWatchlist: (id: number) => void;

  setFavorites: (movies: TMovieListItem[]) => void;
  setWatchlist: (movies: TMovieListItem[]) => void;

  addReview: (review: TReview) => void;
  removeReview: (date: string) => void;
  setReviews: (reviews: TReview[]) => void;
};

const loadFromStorage = <T>(key: string): T[] => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};
export const useProfileStore = create<ProfileStore>((set, get) => ({
  user: null,

  favorites: loadFromStorage<TMovieListItem>("favorites"),
  watchlist: loadFromStorage<TMovieListItem>("watchlist"),
  reviews: loadFromStorage<TReview>("reviews"),
  setUser: (user) => set({ user }),
  addFavorite: (movie) => {
    const newList = [...get().favorites, movie];
    set({ favorites: newList });
    localStorage.setItem("favorites", JSON.stringify(newList));
  },
  removeFavorite: (id) => {
    const newList = get().favorites.filter((m) => m.id !== id);
    set({ favorites: newList });
    localStorage.setItem("favorites", JSON.stringify(newList));
  },
  setFavorites: (movies) => {
    set({ favorites: movies });
    localStorage.setItem("favorites", JSON.stringify(movies));
  },
  addWatchlist: (movie) => {
    const newList = [...get().watchlist, movie];
    set({ watchlist: newList });
    localStorage.setItem("watchlist", JSON.stringify(newList));
  },
  removeWatchlist: (id) => {
    const newList = get().watchlist.filter((m) => m.id !== id);
    set({ watchlist: newList });
    localStorage.setItem("watchlist", JSON.stringify(newList));
  },
  setWatchlist: (movies) => {
    set({ watchlist: movies });
    localStorage.setItem("watchlist", JSON.stringify(movies));
  },

  addReview: (review) => {
    const newList = [...get().reviews, review];
    set({ reviews: newList });
    localStorage.setItem("reviews", JSON.stringify(newList));
  },
  removeReview: (date) => {
    const newList = get().reviews.filter((r) => r.date !== date);
    set({ reviews: newList });
    localStorage.setItem("reviews", JSON.stringify(newList));
  },
  setReviews: (reviews) => {
    set({ reviews });
    localStorage.setItem("reviews", JSON.stringify(reviews));
  }
}));
