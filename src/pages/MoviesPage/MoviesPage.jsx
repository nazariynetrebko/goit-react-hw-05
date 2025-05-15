import { use, useState } from "react";
import { searchMovies } from "../../services/tmdbApi";
import MovieList from "../../components/MovieList/MovieList";
import styles from "./moviesPage.module.css";
import { StaticRouterProvider } from "react-router-dom";

function MoviesPage() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (query.trim() === "") return;
    try {
      const results = await searchMovies(query);
      setMovies(results);
    } catch (error) {
      console.error("Помилка при пошуку фільмів:", error);
    }
  };
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Пошук фільмів"
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Пошук
        </button>
      </form>
      <MovieList movies={movies} />
    </div>
  );
}

export default MoviesPage;
