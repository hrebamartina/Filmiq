import styles from './Home.module.scss';
import Slider from '../../components/UI/Slider/Slider';

export default function Home() {
  return (
    <section className={styles.category}>
      <h3 className={styles.category__title}>Action</h3>
      <Slider />
       <h3 className={styles.category__title}>Comedy</h3>
       <Slider />
       <h3 className={styles.category__title}>Horror</h3>
       <Slider />
         <h3 className={styles.category__title}>Romance</h3>
       <Slider />
          <h3 className={styles.category__title}>Science Fiction</h3>
       <Slider />
         <h3 className={styles.category__title}>Drama</h3>
       <Slider />
<h2 className={styles.category__title}>Adventure</h2>
       <Slider />
    </section>
  )
}