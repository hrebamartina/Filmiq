import { Link } from "@tanstack/react-router";
import styles from "./NotFoundPage.module.scss";

export default function NotFoundPage() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>404</h1>
      <h2 className={styles.subtitle}>This page is not found</h2>
      <Link to="/" className={styles.link} search={{ modal: undefined }}>
        Return to Home Page
      </Link>
    </div>
  );
}
