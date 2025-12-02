import styles from "./Auth.module.scss";
import logo from "../../assets/logo.svg";
import { useAuthModalStore } from "../../store/authModalStore";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

type LoginFormProps = {
  onSwitchToSignup: () => void;
};

export default function LoginForm({ onSwitchToSignup }: LoginFormProps) {
  const closeModal = useAuthModalStore((state) => state.closeModal);
  const { login, isLoading, error } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await login({ email, password }); 
      closeModal(); 
    } catch (err) {
      console.error(err);
    }
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
        <button
          type="submit"
          className={styles.login__button}
          disabled={isLoading} 
        >
          {isLoading ? "Loading..." : "Log In"}
        </button>
      </form>

      {error && <p className={styles.login__error}>{error}</p>}

      <p className={styles.login__signup}>
        Don’t have an account?
        <button type="button" className={styles.login__link} onClick={onSwitchToSignup}>
          Sign up
        </button>
      </p>
    </div>
  );
}
