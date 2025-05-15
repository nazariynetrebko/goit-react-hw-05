import { Link, useLocation } from "react-router-dom";
import styles from "./movieList.module.css";

function MovieList({ movies }) {
  const location = useLocation();

  return (
    <ul className={styles.list}>
      {movies.map((movie) => (
        <li key={movie.id} className={styles.item}>
          <Link
            to={`/movies/${movie.id}`}
            state={{ from: location }}
            className={styles.link}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              width="200"
              className={styles.image}
            />
            <h3 className={styles.title}>{movie.title}</h3>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default MovieList;
