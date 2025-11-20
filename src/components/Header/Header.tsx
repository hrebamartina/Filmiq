import styles from "./Header.module.scss";
import logo from "../../assets/logo.svg";
import searchIcon from "../../assets/searchIcon.svg";
import profileIcon from "../../assets/profileIcon.svg";
import { Link } from "@tanstack/react-router";
import { useAuthModalStore } from '../../store/authModalStore';



export default function Header() {

  const openModal = useAuthModalStore((state) => state.openModal);
 


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
            placeholder="Search..."
            className={styles["header__search-input"]}
          />
        </div>

        <nav className={styles.header__nav}>
          <Link to="/profile" className={styles["header__nav-item"]}>
            <img src={profileIcon} alt="Profile icon" />
            Profile
          </Link>
          <Link to="/" className={styles["header__nav-item"]}>
            Home
          </Link>
          <Link to="/randomMovie" className={styles["header__nav-item"]}>
            Random Movie
          </Link>

 <button
            type="button"
            className={styles["header__nav-item"]} 
            onClick={() => openModal('login')}
          >
            Log In
          </button>
        
        </nav>
      </div>
    </header>
  );
}