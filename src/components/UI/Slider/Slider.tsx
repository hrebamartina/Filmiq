import styles from './Slider.module.scss';
import actionMovie1 from '../../../assets/actionmovie1 2.png'
import actionMovie2 from '../../../assets/actionMovie2 1.png';
import actionMovie3 from '../../../assets/ActionMovie3 1.png';
import actionMovie4 from '../../../assets/actionMovie4webp 1.png';
import prev from '../../../assets/prev.svg';
import next from '../../../assets/next.svg';
export default function Slider() {
  return (
    <div className={styles.slider}>
     <img src={prev} alt="" className={styles.slider__prev}/>
      <div className={styles.slider__track}>
    <img src={actionMovie1} alt="" className={styles.slider__movie}/>
       <img src={actionMovie2} alt="" className={styles.slider__movie}/>
        <img src={actionMovie3} alt="" className={styles.slider__movie}/>
         <img src={actionMovie4} alt="" className={styles.slider__movie}/>
         </div>
          <img src={next} alt="" className={styles.slider__next}/>
    </div>
  )
}