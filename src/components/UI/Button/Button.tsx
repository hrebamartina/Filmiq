import styles from "./Button.module.scss";
import { Link } from "@tanstack/react-router";

export default function RandomMovieBtn() {
  return <Link to="/randomMovie" className={styles.button}>Random Movie</Link>;
}
