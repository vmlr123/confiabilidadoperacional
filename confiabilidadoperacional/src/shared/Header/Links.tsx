import { NavLink } from "react-router-dom";
import { useEffect, useMemo } from "react";
import styles from "./Links.module.css";
import type { PageData } from "../../App";

type PageNode = PageData & { children: PageNode[] };

export default function Links({
  pages,
  setIsClicked,
}: {
  pages?: PageData[];
  setIsClicked: (value: boolean) => void;
}) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Element;
      if (!target.closest(`.${styles.menu}`)) {
        setIsClicked(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [setIsClicked]);

  const pageHierarchy = useMemo(() => {
    if (!pages) return [];

    const pageMap = new Map<number, PageNode>();
    const rootPages: PageNode[] = [];

    // Initialize all pages as nodes
    pages.forEach((page) => {
      pageMap.set(page.id!, { ...page, children: [] });
    });

    // Build hierarchy
    pages.forEach((page) => {
      const node = pageMap.get(page.id!)!;
      if (page.parent === 0) {
        rootPages.push(node);
      } else {
        const parent = pageMap.get(page.parent!);
        if (parent) {
          parent.children.push(node);
        } else {
          // If parent not found, treat as root
          rootPages.push(node);
        }
      }
    });

    return rootPages;
  }, [pages]);

  const renderMenuItem = (page: PageNode) => {
    const isHome = page.title.rendered.toLowerCase() === "home";
    const slug = page.title.rendered
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/\//g, "-")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    const to = isHome ? "/" : `/${slug}`;

    return (
      <div key={page.id} className={styles.menuItem}>
        <NavLink
          to={to}
          className={({ isActive }) =>
            isActive ? styles.active : styles.inactive
          }
          onClick={() => setIsClicked(false)}
        >
          {isHome ? "Inicio" : page.title.rendered}
        </NavLink>
        {page.children.length > 0 && (
          <div className={styles.submenu}>
            {page.children.map((child) => renderMenuItem(child))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <button
          className={styles.closeButton}
          onClick={() => setIsClicked(false)}
          aria-label="Cerrar menú"
        >
          ✕
        </button>
        {pageHierarchy.map((page) => renderMenuItem(page))}
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
        <NavLink
          key="home"
          to="/"
          className={({ isActive }) =>
            isActive ? styles.active : styles.inactive
          }
          onClick={() => setIsClicked(false)}
        >
          Inicio
        </NavLink>
      </div>
    </div>
  );
}
