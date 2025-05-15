import { useEffect, useState } from "react";
import { getTrendingMovies } from "../../services/tmdbApi";
import MovieList from "../../components/MovieList/MovieList";
import styles from "./homePage.module.css";

function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const trendingMovies = await getTrendingMovies();
        setMovies(trendingMovies);
      } catch (error) {
        console.log("Помилка при отриманні популярних фільмів:", error);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Популярні фільми</h1>
      <MovieList movies={movies}></MovieList>
    </div>
  );
}

export default HomePage;
