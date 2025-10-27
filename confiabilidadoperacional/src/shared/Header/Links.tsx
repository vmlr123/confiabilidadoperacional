import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import styles from "./Links.module.css";
import type { PageData } from "../../App";

export default function Links({
  pages,
  setIsClicked,
}: {
  pages?: PageData[];
  setIsClicked: (value: boolean) => void;
}) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest(`.${styles.menu}`)) {
        setIsClicked(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsClicked]);

  return (
    <div className={styles.container}>
      <div className={styles.menu}>
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
