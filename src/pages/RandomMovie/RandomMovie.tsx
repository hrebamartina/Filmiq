import styles from './RandomMovie.module.scss'

export default function RandomMovie() {
  return (
    <div className={styles.random}>

      <div className={styles.random__heading}>
        <h2>Choose a genre to discover a random movie:</h2>

        <div className={styles["random__select-wrapper"]}>
          <select aria-label="Select movie genre" className={styles.random__select}>
            <option value="action">Action</option>
            <option value="comedy">Comedy</option>
            <option value="horror">Horror</option>
            <option value="romance">Romance</option>
            <option value="sci-fi">Science Fiction</option>
            <option value="drama">Drama</option>
            <option value="adventure">Adventure</option>
          </select>
        </div>
      </div>


      <section className={styles.random__content}>
        <img
          src="currentMovie.poster"
          alt=""
          className={styles.random__poster}
        />

        <div className={styles.random__details}>
          <p>Title:</p>
          <p>Year: </p>
          <p>description</p>

          <div className={styles.random__tabs}>
            <button>Cast</button>
            <button>Crew</button>
            <button className={styles.active}>Genres</button>
          </div>

          <p>genre</p>
          </div>
          </section>

          <div className={styles.random__actions}>
            <button className={styles.add}>Add to Watchlist</button>
            <button className={styles.try}>Try another</button>
          </div>
        </div>
      
    
  )
}
