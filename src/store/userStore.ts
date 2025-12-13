import { create } from "zustand";
export type TMovieListItem = {
  id: number;
  title: string;
  poster_path?: string | null;
};

export type TUser = {
  id: string;
  email: string;
  username?: string;
};

export type TReview = {
  id: string;
  userId: string;
  movieId: number;
  movieTitle: string;
  text: string;
  createdAt: Date;
};

type ProfileStoreType = {
  user: TUser | null;
  favorites: TMovieListItem[];
  watchlist: TMovieListItem[];
  reviews: TReview[];

  setUser: (user: TUser | null) => void;
  addFavorite: (movie: TMovieListItem) => void;
  removeFavorite: (id: number) => void;
  setFavorites: (movies: TMovieListItem[]) => void;
  addWatchlist: (movie: TMovieListItem) => void;
  removeWatchlist: (id: number) => void;
  setWatchlist: (movies: TMovieListItem[]) => void;
  addReview: (review: TReview) => void;
  removeReview: (id: string) => void;
  setReviews: (reviews: TReview[]) => void;
};

const loadFromStorage = <T>(key: string): T[] => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error(`Error loading ${key} from storage:`, e);
    return [];
  }
};

const loadUserFromStorage = (): TUser | null => {
  try {
    const data = localStorage.getItem("user");
    if (!data) return null;
    const userData = JSON.parse(data);
    return typeof userData.id === "string" ? userData : null;
  } catch (e) {
    console.error("Error loading user from storage:", e);
    localStorage.removeItem("user");
    return null;
  }
};

const profileStore = create<ProfileStoreType>((set, get) => ({
  user: loadUserFromStorage(),
  favorites: loadFromStorage<TMovieListItem>("favorites"),
  watchlist: loadFromStorage<TMovieListItem>("watchlist"),
  reviews: [],

  setUser: (user) => {
    set({ user });
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  },

  addFavorite: (movie) => set({ favorites: [...get().favorites, movie] }),
  removeFavorite: (id) =>
    set({ favorites: get().favorites.filter((m) => m.id !== id) }),
  setFavorites: (movies) => set({ favorites: movies }),

  addWatchlist: (movie) => set({ watchlist: [...get().watchlist, movie] }),
  removeWatchlist: (id) =>
    set({ watchlist: get().watchlist.filter((m) => m.id !== id) }),
  setWatchlist: (movies) => set({ watchlist: movies }),

  addReview: (review) => set({ reviews: [...get().reviews, review] }),
  removeReview: (id) =>
    set({ reviews: get().reviews.filter((r) => r.id !== id) }),
  setReviews: (reviews) => set({ reviews })
}));

export const useProfileStore = profileStore;
export { profileStore };
