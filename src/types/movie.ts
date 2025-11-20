export interface Movie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string | null;
  backdrop_path?: string | null;
  vote_average?: number;
  genre_ids?: number[];
  genres?: { id: number; name: string }[];
  credits?: {
    cast?: { id: number; name: string; character: string }[];
    crew?: { id: number; name: string; job: string }[];
  };
}
