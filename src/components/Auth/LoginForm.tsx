import styles from './Auth.module.scss';
import logo from '../../assets/logo.svg'


export default function Login() {
  return (
    <div className={styles.login}>
    <img src={logo} alt="logo" />

  <form className={styles.login__form}>
    <input type="email" placeholder="Email" className={styles.login__input} required />
    <input type="password" placeholder="Password" className={styles.login__input} required />
    <button type="submit" className={styles.login__button}>Log In</button>
  </form>

  <p className="login-modal__signup">
    Don’t have an account?
    <a href="#" className={styles.login__link}>Sign up</a>
  </p>
</div>

  )
}