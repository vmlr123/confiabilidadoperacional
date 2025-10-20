import styles from "./Header.module.css";
import type { ArticleData } from "../../App";
import Links from "./Links";
import { NavLink } from "react-router-dom";

export default function Header({ pages }: { pages?: ArticleData[] }) {
  return (
    <>
      <header className={styles.header}>
        <NavLink
          to="/menu"
          className={({ isActive }) =>
            isActive ? styles.active : styles.inactive
          }
        >
          Menú
        </NavLink>
        <h1 className={styles.page}>Confiabilidad Operacional</h1>
        <nav className={styles.nav}>
          <Links pages={pages} />
        </nav>
      </header>
    </>
  );
}
