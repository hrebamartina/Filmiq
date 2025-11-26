import styles from "./Auth.module.scss";
import logo from "../../assets/logo.svg";
import { useAuthModalStore } from "../../store/authModalStore";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

type SignupFormProps = {
  onSwitchToLogin: () => void;
};

export default function SignupForm({ onSwitchToLogin }: SignupFormProps) {
  const closeModal = useAuthModalStore((state) => state.closeModal);
  const { register, isLoading, error: authError } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);

    if (password !== confirmPassword) {
      setFormError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setFormError("Password must be at least 6 characters long.");
      return;
    }

    try {
      await register({ email, password, confirmPassword });
      closeModal();
    } catch (err) {
      console.error("Registration error:", err);
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

        <input
          type="password"
          placeholder="Confirm password"
          className={styles.login__input}
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {(formError || authError) && (
          <p className={styles.login__error}>{formError || authError}</p>
        )}

        <button
          type="submit"
          className={styles.login__button}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Sign up"}
        </button>
      </form>

      <p className="login-modal__signup">
        Already have an account?
        <button
          type="button"
          className={styles.login__link}
          onClick={onSwitchToLogin}
        >
          Login
        </button>
      </p>
    </div>
  );
}
