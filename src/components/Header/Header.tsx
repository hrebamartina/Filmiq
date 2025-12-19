
import styles from './Header.module.scss';
import logo from '../../assets/logo.svg'; 
import searchIcon from '../../assets/searchIcon.svg';
import profileIcon from '../../assets/profileIcon.svg';

export default function Header () {
  return (
    <header className={styles.header}>
      <img src={logo} alt="Filmiq logo" /> 


<div className={styles.header__right}>
      <div className={styles.header__search}>
        <img 
          src={searchIcon} 
          alt="Search icon" 
          className={styles['header__search-icon']} 
        />
        <input
          type="text"
          placeholder="Search..."
          className={styles['header__search-input']}
        />
      </div>

      <nav className={styles.header__nav}>
        <a href="#" className={styles['header__nav-item']}>
          <img src={profileIcon} alt="Profile icon" />
          Profile
        </a>
        <a href="#" className={styles['header__nav-item']}>Home</a>
        <a href="#" className={styles['header__nav-item']}>Random Movie</a>
        <a href="#" className={styles['header__nav-item']}>Logout</a>
      </nav>
      </div>
    </header>
  );
}