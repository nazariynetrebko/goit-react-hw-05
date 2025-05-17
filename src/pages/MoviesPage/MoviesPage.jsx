import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../../services/tmdbApi";
import MovieList from "../../components/MovieList/MovieList";
import styles from "./moviesPage.module.css";

function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  useEffect(() => {
    if (query.trim() === "") return;
    const fetchMovies = async () => {
      try {
        const results = await searchMovies(query);
        setMovies(results);
      } catch (error) {
        console.error("Помилка при пошуку фільмів:", error);
      }
    };
    fetchMovies();
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formQuery = e.target.elements.query.value;
    setSearchParams({ query: formQuery });
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="query"
          defaultValue={query}
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
