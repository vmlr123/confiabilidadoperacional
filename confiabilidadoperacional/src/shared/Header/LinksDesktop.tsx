import { NavLink } from "react-router-dom";
import { useMemo } from "react";
import styles from "./LinksDesktop.module.css";
import type { PageData } from "../../App";

type PageNode = PageData & { children: PageNode[] };

export default function LinksDesktop({ pages }: { pages?: PageData[] }) {
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

  // For horizontal nav, only include top-level items, submenus will be handled separately
  const allNavItems = useMemo(() => {
    const items: (PageNode | string)[] = [];
    // Always include home and articles first
    items.push("home");
    items.push("articles");
    pageHierarchy.forEach((page) => {
      items.push(page);
    });
    return items;
  }, [pageHierarchy]);

  const renderNavItem = (
    item: PageNode | string,
    depth: number = 0
  ): React.JSX.Element => {
    if (typeof item === "string") {
      if (item === "articles") {
        return (
          <NavLink
            key="articles"
            to="/articles"
            className={({ isActive }) =>
              isActive ? styles.active : styles.inactive
            }
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

      if (page.children.length > 0) {
        return (
          <div key={page.id} className={styles.dropdown}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                isActive ? styles.active : styles.inactive
              }
            >
              {isHome ? "Inicio" : page.title.rendered}
            </NavLink>
            <div
              className={styles.dropdownContent}
              style={
                {
                  "--menu-width": `${160 - depth * 16}px`,
                } as React.CSSProperties
              }
            >
              {page.children.map((child) => renderNavItem(child, depth + 1))}
            </div>
          </div>
        );
      } else {
        return (
          <NavLink
            key={page.id}
            to={to}
            className={({ isActive }) =>
              isActive ? styles.active : styles.inactive
            }
          >
            {isHome ? "Inicio" : page.title.rendered}
          </NavLink>
        );
      }
    }
    return <></>; // Fallback, though shouldn't reach
  };

  return (
    <div className={styles.navLinks}>
      {allNavItems.map((item) => renderNavItem(item))}
    </div>
  );
}
