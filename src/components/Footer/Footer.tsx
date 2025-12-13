import styles from "./Footer.module.scss";
import logo from "../../assets/logo.svg";
import instagramLogo from "../../assets/instagramLogo.svg";
import twitterLogo from "../../assets/twitterLogo.svg";
import githubLogo from "../../assets/githubLogo.svg";
import scrollUp from "../../assets/scrollUp.svg";
import RandomMovieBtn from "../UI/Button/Button";
import { Link } from "@tanstack/react-router";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__top}>
        <p className={styles.footer__question}>Don't know what to choose?</p>
        <RandomMovieBtn />
      </div>
      <div className={styles.footer__content}>
        <div className={styles.footer__left}>
          <p>
            <img src={logo} alt="Filmiq logo" className={styles.footer__logo} />
          </p>
          <p className={styles.footer__socials}>
            Follow us:
            <span className={styles["footer__socials-icons"]}>
              <img
                src={instagramLogo}
                alt="Instagram"
                className={styles["footer__socials-icon"]}
              />
              <img
                src={twitterLogo}
                alt="Twitter"
                className={styles["footer__socials-icon"]}
              />
              <img
                src={githubLogo}
                alt="Github"
                className={styles["footer__socials-icon"]}
              />
            </span>
          </p>
          <p>Data powered by TMDb API</p>
        </div>
        <div className={styles.footer__right}>
          <ul className={styles.footer__links}>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/randomMovie">Random Movie</Link>
            </li>
          </ul>
          <button className={styles.footer__scroll}>
            <img src={scrollUp} alt="scroll" />
          </button>
        </div>
      </div>
    </footer>
  );
}
