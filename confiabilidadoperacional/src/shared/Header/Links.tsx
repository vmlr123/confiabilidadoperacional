import { NavLink } from "react-router-dom";
import styles from "./Links.module.css";
import type { PageData } from "../../App";

export default function Links({ pages }: { pages?: PageData[] }) {
  return (
    <>
      <NavLink
        to="/articles"
        className={({ isActive }) =>
          isActive ? styles.active : styles.inactive
        }
      >
        Artículos
      </NavLink>
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
            >
              {page.title.rendered}
            </NavLink>
          );
        })}
    </>
  );
}
