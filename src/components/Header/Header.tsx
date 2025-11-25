import styles from "./Header.module.scss";
import logo from "../../assets/logo.svg";

export default function Header() {
  return (
    <header className={styles.header}>
      <nav>
        {}
        <img src={logo} alt="Filmiq logo" className={styles.logo} />
      </nav>
    </header>
  );
}
