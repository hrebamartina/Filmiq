import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import styles from "./Slider.module.scss";
import type { TMovieListItem } from "../../../store/userStore";

interface MovieSliderProps {
  title?: string;
  movies: TMovieListItem[];
  onSelectMovie: (movie: TMovieListItem) => void;
}

export default function Slider({
  title,
  movies,
  onSelectMovie
}: MovieSliderProps) {
  const swiperRef = useRef<SwiperType | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsActive(entry.isIntersecting),
      { threshold: 0.5 }
    );

    observer.observe(node);
    return () => observer.unobserve(node);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isActive || !swiperRef.current) return;

      if (e.key === "ArrowRight") swiperRef.current.slideNext();
      else if (e.key === "ArrowLeft") swiperRef.current.slidePrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isActive]);

  if (!movies || movies.length === 0) return null;

  return (
    <section ref={sectionRef} className={styles.sliderSection}>
      {title && <h2 className={styles.title}>{title}</h2>}

      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={20}
        slidesPerView={4}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        breakpoints={{
          320: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 6 }
        }}
      >
        {movies.map((movie: TMovieListItem) => (
          <SwiperSlide key={movie.id} onClick={() => onSelectMovie(movie)}>
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : ""
              }
              alt={movie.title}
              className={styles.poster}
            />
            <p className={styles.movieTitle}>{movie.title}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
