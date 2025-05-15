import { Link } from "react-router-dom";
import styles from "./notFoundPage.module.css";

function NotFoundPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404 - Сторінку не знайдено</h1>
      <p className={styles.message}>
        Вибачте, сторінка, яку ви шукаєте, не існує.
      </p>
      <Link to="/" className={styles.link}>
        Перейти на головну
      </Link>
    </div>
  );
}

export default NotFoundPage;
