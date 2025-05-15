import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieCredits } from "../../services/tmdbApi";
import styles from "./movieCast.module.css";

function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const castData = await getMovieCredits(movieId);
        setCast(castData);
      } catch (error) {
        console.error("Помилка при отриманні акторського складу:", error);
      }
    };
    fetchCast();
  }, [movieId]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Акторський склад</h2>
      <ul className={styles.list}>
        {cast.map((actor) => (
          <li key={actor.id} className={styles.item}>
            {actor.name} як {actor.character}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieCast;
