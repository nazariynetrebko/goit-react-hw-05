import { NavLink } from "react-router-dom";
import styles from "./navigation.module.css";

function Navigation() {
  return (
    <nav className={styles.nav}>
      <NavLink to="/" className={styles.link}>
        Головна
      </NavLink>
      <NavLink to="/movies" className={styles.link}>
        Фільм
      </NavLink>
    </nav>
  );
}

export default Navigation;
