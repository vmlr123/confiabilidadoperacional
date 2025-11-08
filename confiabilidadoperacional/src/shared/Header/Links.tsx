import { NavLink } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import styles from "./Links.module.css";
import type { PageData } from "../../App";

const ITEMS_PER_PAGE_MENU = 3;

type PageNode = PageData & { children: PageNode[] };

export default function Links({
  pages,
  setIsClicked,
}: {
  pages?: PageData[];
  setIsClicked: (value: boolean) => void;
}) {
  const [currentPage, setCurrentPage] = useState<number>(1);
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

    // Exclude home page to avoid duplication
    return rootPages.filter(
      (page) => !page.title.rendered.toLowerCase().includes("home")
    );
  }, [pages]);

  // Flatten the hierarchy for pagination - only top-level items
  const allMenuItems = useMemo(() => {
    const items: (PageNode | string)[] = [];
    // Always include home and articles first
    items.push("home");
    items.push("articles");
    pageHierarchy.forEach((page) => {
      items.push(page);
    });
    return items;
  }, [pageHierarchy]);

  const totalPages = Math.ceil(allMenuItems.length / ITEMS_PER_PAGE_MENU);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE_MENU;
  const endIndex = startIndex + ITEMS_PER_PAGE_MENU;
  const paginatedItems = allMenuItems.slice(startIndex, endIndex);

  // Ensure home and articles are always on the first page
  const adjustedPaginatedItems =
    currentPage === 1
      ? paginatedItems
      : paginatedItems.filter(
          (item) =>
            typeof item !== "string" || (item !== "home" && item !== "articles")
        );

  const renderMenuItem = (item: PageNode | string) => {
    if (typeof item === "string") {
      if (item === "articles") {
        return (
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
        );
      } else if (item === "home") {
        return (
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
        );
      }
    } else {
      const page = item;
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
    }
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
        {adjustedPaginatedItems.map((item) => renderMenuItem(item))}
        {totalPages > 1 && (
          <div style={{ textAlign: "center", marginTop: "1rem" }}>
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              style={{
                margin: "0 0.5rem",
                padding: "0.5rem 1rem",
                background: "var(--button-bg)",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: currentPage === 1 ? "not-allowed" : "pointer",
              }}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              style={{
                margin: "0 0.5rem",
                padding: "0.5rem 1rem",
                background: "var(--button-bg)",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: currentPage === totalPages ? "not-allowed" : "pointer",
              }}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
