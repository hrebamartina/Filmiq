import { useProfileStore, type TMovieListItem } from '../store/userStore';
import { useMutation } from './useApiData';
import { useCallback, useMemo } from 'react';

type ListType = 'favorites' | 'watchlist';

type ProfileUpdateResponse = {
  favorites?: TMovieListItem[];
  watchlist?: TMovieListItem[];
};

export const useListManagement = (movieId: number) => {
  const { mutate, isLoading: isListLoading, error } =
    useMutation<ProfileUpdateResponse>();

  const {
    user,
    favorites,
    watchlist,
    addFavorite,
    removeFavorite,
    addWatchlist,
    removeWatchlist,
    setFavorites,
    setWatchlist,
  } = useProfileStore(state => ({
    user: state.user,
    favorites: state.favorites,
    watchlist: state.watchlist,
    addFavorite: state.addFavorite,
    removeFavorite: state.removeFavorite,
    addWatchlist: state.addWatchlist,
    removeWatchlist: state.removeWatchlist,
    setFavorites: state.setFavorites,
    setWatchlist: state.setWatchlist,
  }));

  const userId = user?.id;

  const isFavorite = useMemo(
    () => favorites.some(m => m.id === movieId),
    [favorites, movieId]
  );

  const inWatchlist = useMemo(
    () => watchlist.some(m => m.id === movieId),
    [watchlist, movieId]
  );

  const handleToggleList = useCallback(
    async (list: ListType, movieData: TMovieListItem) => {
      if (!userId) {
        alert('Please log in');
        return;
      }

      const isInList = list === 'favorites' ? isFavorite : inWatchlist;
      const currentList = list === 'favorites' ? favorites : watchlist;
      const setList = list === 'favorites' ? setFavorites : setWatchlist;
      const addItem = list === 'favorites' ? addFavorite : addWatchlist;
      const removeItem = list === 'favorites' ? removeFavorite : removeWatchlist;

      const newList = isInList
        ? currentList.filter(m => m.id !== movieId)
        : [...currentList, movieData];

      const prevList = currentList;
      if (isInList) removeItem(movieId);
      else addItem(movieData);

      try {
        await mutate(`user_profiles/${userId}`, 'PATCH', {
          [list]: newList,
        });
      } catch {
        alert('Error, try again');
        setList(prevList);
      }
    },
    [
      userId,
      isFavorite,
      inWatchlist,
      favorites,
      watchlist,
      addFavorite,
      removeFavorite,
      addWatchlist,
      removeWatchlist,
      setFavorites,
      setWatchlist,
      movieId,
      mutate
    ]
  );

  const toggleFavorite = useCallback(
    (movie: TMovieListItem) => handleToggleList('favorites', movie),
    [handleToggleList]
  );

  const toggleWatchlist = useCallback(
    (movie: TMovieListItem) => handleToggleList('watchlist', movie),
    [handleToggleList]
  );

  return {
    isFavorite,
    inWatchlist,
    toggleFavorite,
    toggleWatchlist,
    isListLoading,
    error,
    isAuthenticated: !!userId,
  };
};
