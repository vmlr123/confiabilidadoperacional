import { NavLink } from "react-router-dom";
import styles from "./Links.module.css";
import type { PageData } from "../../App";

export default function Links({
  pages,
  setIsClicked,
  isClicked,
}: {
  pages?: PageData[];
  isClicked?: boolean;
  setIsClicked: (value: boolean) => void;
}) {
  return (
    <div className={styles.container}>
      <div
        className={isClicked ? styles.clicked : styles.notclicked}
        onClick={() => setIsClicked(false)}
      >
        {pages &&
          pages.length > 0 &&
          pages.map((page) => {
            const isHome = page.title.rendered.toLowerCase() === "home";
            const slug = page.title.rendered
              .toLowerCase()
              .replace(/ /g, "-")
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "");
            const to = isHome ? "/" : `/${slug}`;

            return (
              <NavLink
                key={page.id}
                to={to}
                className={({ isActive }) =>
                  isActive ? styles.active : styles.inactive
                }
                onClick={() => setIsClicked(false)}
              >
                {page.title.rendered}
              </NavLink>
            );
          })}
        <NavLink
          key="articles"
          to="/articles"
          className={({ isActive }) =>
            isActive ? styles.active : styles.inactive
          }
          onClick={() => setIsClicked(false)}
        >
          Artículos por categoría
        </NavLink>
      </div>
    </div>
  );
}
