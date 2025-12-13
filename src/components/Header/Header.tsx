import styles from "./Header.module.scss";
import logo from "../../assets/logo.svg";
import searchIcon from "../../assets/searchIcon.svg";
import profileIcon from "../../assets/profileIcon.svg";
import { Link, useNavigate } from "@tanstack/react-router";
import { useAuthModalStore } from "../../store/authModalStore";
import { useProfileStore } from "../../store/userStore";
import { useAuth } from "../../hooks/useAuth";
import { useState, useEffect } from "react";

type MovieSearchResult = {
  id: number;
  title: string;
  poster_path: string | null;
};

export default function Header() {
  const openModal = useAuthModalStore((state) => state.openModal);
  const user = useProfileStore((state) => state.user);
  const isAuthenticated = !!user;
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<MovieSearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&query=${encodeURIComponent(
            query
          )}`
        );
        const data = await res.json();
        setResults(data.results || []);
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const handleSelectMovie = (id: number) => {
    setQuery("");
    setResults([]);
    navigate({ to: "/movie/$id", params: { id: id.toString() } });
  };

  return (
    <header className={styles.header}>
      <img src={logo} alt="Filmiq logo" />

      <div className={styles.header__right}>
        <div className={styles.header__search}>
          <img
            src={searchIcon}
            alt="Search icon"
            className={styles["header__search-icon"]}
          />
          <input
            type="text"
            placeholder="Search movies..."
            className={styles["header__search-input"]}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && results.length > 0 && (
            <ul className={styles["header__search-results"]}>
              {results.slice(0, 5).map((movie) => (
                <li
                  key={movie.id}
                  onClick={() => handleSelectMovie(movie.id)}
                  className={styles["header__search-result-item"]}
                >
                  {movie.title}
                </li>
              ))}
            </ul>
          )}
          {loading && (
            <div className={styles["header__search-loading"]}>Loading...</div>
          )}
        </div>

        <nav className={styles.header__nav}>
          <Link to="/" className={styles["header__nav-item"]}>
            Home
          </Link>

          <Link to="/randomMovie" className={styles["header__nav-item"]}>
            Random Movie
          </Link>

          {isAuthenticated ? (
            <>
              <Link to="/profile" className={styles["header__nav-item"]}>
                <img src={profileIcon} alt="Profile icon" />
                Profile
              </Link>

              <button
                type="button"
                className={styles["header__nav-item"]}
                onClick={logout}
                data-cy="logout-button"
              >
                Log Out
              </button>
            </>
          ) : (
            <button
              type="button"
              className={styles["header__nav-item"]}
              onClick={() => openModal("login")}
            >
              Log In
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
