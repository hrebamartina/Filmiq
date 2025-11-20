import styles from "./Auth.module.scss";
import logo from "../../assets/logo.svg";
import { useAuthModalStore } from "../../store/authModalStore";
import { useState } from "react";

type SignupFormProps = {
  onSwitchToLogin: () => void;
};

export default function SignupForm({ onSwitchToLogin }: SignupFormProps) {

  const closeModal = useAuthModalStore((state) => state.closeModal);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Паролі не співпадають");
      return;
    }

    console.log("Форма реєстрації відправлена (поки без API):", { email, password });
    closeModal();
  };

  return (
    <div className={styles.login}>
      <img src={logo} alt="logo" />

      <form className={styles.login__form} onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          className={styles.login__input}
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className={styles.login__input}
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm password"
          className={styles.login__input}
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        
        {error && <p className={styles.login__error}>{error}</p>}

        <button type="submit" className={styles.login__button}>
          Sign up
        </button>
      </form>

      <p className="login-modal__signup">
        Already have an account?
        <button type="button" className={styles.login__link} onClick={onSwitchToLogin}>
          Login
        </button>
      </p>
    </div>
  );
}