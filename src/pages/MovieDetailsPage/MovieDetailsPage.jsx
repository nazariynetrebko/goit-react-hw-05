import { useEffect, useState } from "react";
import {
  Link,
  Outlet,
  useParams,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { getMovieDetails } from "../../services/tmdbApi";
import styles from "./movieDetailsPage.module.css";

function MovieDetailsPage() {
  const { movieId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const from = location.state?.from || "/movies";

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieData = await getMovieDetails(movieId);
        setMovie(movieData);
      } catch (error) {
        console.error("Помилка при отриманні деталей фільму:", error);
      }
    };
    fetchMovieDetails();
  }, [movieId]);

  const goBack = () => {
    navigate(from);
  };

  if (!movie) return <div className={styles.loading}>Завантаження...</div>;

  return (
    <div className={styles.container}>
      <button onClick={goBack} className={styles.backButton}>
        Назад
      </button>
      <h1 className={styles.title}>{movie.title}</h1>
      {movie.poster_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className={styles.poster}
        />
      ) : (
        <div className={styles.noPoster}>Постер відсутній</div>
      )}
      <p className={styles.overview}>{movie.overview}</p>
      <nav className={styles.nav}>
        <Link to="cast" className={styles.link}>
          Акторський склад
        </Link>
        <Link to="reviews" className={styles.link}>
          Огляди
        </Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default MovieDetailsPage;
