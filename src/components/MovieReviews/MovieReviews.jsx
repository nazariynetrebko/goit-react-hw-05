import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieReviews } from "../../services/tmdbApi";
import styles from "./movieReviews.module.css";

function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviewsData = await getMovieReviews(movieId);
        setReviews(reviewsData);
      } catch (error) {
        console.error("Помилка при отриманні оглядів:", error);
      }
    };
    fetchReviews();
  }, [movieId]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Огляди</h2>
      {reviews.length > 0 ? (
        <ul className={styles.list}>
          {reviews.map((review) => (
            <li key={review.id} className={styles.item}>
              <p className={styles.author}>{review.author}</p>
              <p className={styles.content}>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.noReviews}>Оглядів не знайдено.</p>
      )}
    </div>
  );
}

export default MovieReviews;
