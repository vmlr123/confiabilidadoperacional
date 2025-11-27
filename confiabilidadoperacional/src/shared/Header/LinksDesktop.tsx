import { NavLink } from "react-router-dom";
import { useMemo, useState, useRef, useEffect, useCallback } from "react";
import styles from "./LinksDesktop.module.css";
import type { PageData } from "../../App";

type PageNode = PageData & { children: PageNode[] };

export default function LinksDesktop({ pages }: { pages?: PageData[] }) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const closeTimer = useRef<number | null>(null);
  const mouseMoveListener = useRef<((e: MouseEvent) => void) | null>(null);
  const dropdownRefs = useRef<Map<string, HTMLElement>>(new Map());
  const CLOSE_DELAY_MS = 350; // increased close delay for more tolerance

  const focusFirstChild = useCallback((idKey: string) => {
    const el = dropdownRefs.current.get(idKey);
    if (!el) return;
    const firstLink = el.querySelector("a") as HTMLElement | null;
    if (firstLink) firstLink.focus();
  }, []);

  const handleParentKeyDown = useCallback(
    (e: React.KeyboardEvent, idKey: string) => {
      if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setOpenDropdown(idKey);
        // focus first submenu item
        setTimeout(() => focusFirstChild(idKey), 0);
      } else if (e.key === "Escape" || e.key === "Esc") {
        e.preventDefault();
        setOpenDropdown(null);
      }
    },
    [focusFirstChild]
  );

  useEffect(() => {
    return () => {
      if (closeTimer.current) {
        clearTimeout(closeTimer.current);
        closeTimer.current = null;
      }
    };
  }, []);

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

    // Exclude pages that should not appear in the desktop nav (home, blog)
    return rootPages.filter((page) => {
      const t = page.title.rendered.toLowerCase();
      if (t.includes("home")) return false;
      if (t.includes("blog")) return false;
      return true;
    });
  }, [pages]);

  // For horizontal nav, only include top-level items, submenus will be handled separately
  const allNavItems = useMemo(() => {
    const items: (PageNode | string)[] = [];
    // Always include home and articles first
    items.push("home");
    items.push("articles");
    items.push("risk-matrix");
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
      } else if (item === "risk-matrix") {
        return (
          <NavLink
            key="risk-matrix"
            to="/risk-matrix"
            className={({ isActive }) =>
              isActive ? styles.active : styles.inactive
            }
          >
            Matriz de Riesgo
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
        const idKey = String(page.id ?? page.title.rendered);
        return (
          <div
            key={page.id}
            className={styles.dropdown}
            onMouseEnter={() => {
              // clear any pending close
              if (closeTimer.current) {
                clearTimeout(closeTimer.current);
                closeTimer.current = null;
              }
              // remove any mousemove tracking
              if (mouseMoveListener.current) {
                window.removeEventListener(
                  "mousemove",
                  mouseMoveListener.current
                );
                mouseMoveListener.current = null;
              }
              setOpenDropdown(idKey);
            }}
            onMouseLeave={(e) => {
              const dropdownEl = e.currentTarget as HTMLElement;
              // start a delayed close, but set up pointer-tracking to keep open if cursor moves toward submenu
              if (closeTimer.current) clearTimeout(closeTimer.current);
              // mousemove handler checks if pointer moves into the dropdown area (parent or submenu)
              const mm = (ev: MouseEvent) => {
                const x = ev.clientX;
                const y = ev.clientY;
                const submenu = dropdownEl.querySelector(
                  `.${styles.dropdownContent}`
                ) as HTMLElement | null;
                if (submenu) {
                  const subRect = submenu.getBoundingClientRect();
                  const parentRect = dropdownEl.getBoundingClientRect();
                  // Build a buffer rect between parent and submenu to allow crossing gaps
                  const bufferRect = {
                    left: Math.min(parentRect.left, subRect.left) - 8,
                    right: Math.max(parentRect.right, subRect.right) + 8,
                    top: Math.min(parentRect.top, subRect.top) - 8,
                    bottom: Math.max(parentRect.bottom, subRect.bottom) + 8,
                  };
                  if (
                    x >= bufferRect.left &&
                    x <= bufferRect.right &&
                    y >= bufferRect.top &&
                    y <= bufferRect.bottom
                  ) {
                    // pointer is within the safe area; keep open
                    if (closeTimer.current) {
                      clearTimeout(closeTimer.current);
                      closeTimer.current = null;
                    }
                    setOpenDropdown(idKey);
                    if (mouseMoveListener.current) {
                      window.removeEventListener(
                        "mousemove",
                        mouseMoveListener.current
                      );
                      mouseMoveListener.current = null;
                    }
                  }
                }
              };
              mouseMoveListener.current = mm;
              window.addEventListener("mousemove", mm);

              closeTimer.current = window.setTimeout(() => {
                setOpenDropdown(null);
                if (mouseMoveListener.current) {
                  window.removeEventListener(
                    "mousemove",
                    mouseMoveListener.current
                  );
                  mouseMoveListener.current = null;
                }
                closeTimer.current = null;
              }, CLOSE_DELAY_MS) as unknown as number;
            }}
          >
            <NavLink
              to={to}
              className={({ isActive }) =>
                isActive ? styles.active : styles.inactive
              }
              onKeyDown={(e) => handleParentKeyDown(e, idKey)}
            >
              {isHome ? "Inicio" : page.title.rendered}
            </NavLink>
            <div
              className={styles.dropdownContent}
              onMouseEnter={() => {
                if (closeTimer.current) {
                  clearTimeout(closeTimer.current);
                  closeTimer.current = null;
                }
                if (mouseMoveListener.current) {
                  window.removeEventListener(
                    "mousemove",
                    mouseMoveListener.current
                  );
                  mouseMoveListener.current = null;
                }
                setOpenDropdown(idKey);
              }}
              onMouseLeave={() => {
                if (closeTimer.current) clearTimeout(closeTimer.current);
                if (mouseMoveListener.current) {
                  window.removeEventListener(
                    "mousemove",
                    mouseMoveListener.current
                  );
                  mouseMoveListener.current = null;
                }
                closeTimer.current = window.setTimeout(() => {
                  setOpenDropdown(null);
                  closeTimer.current = null;
                }, CLOSE_DELAY_MS) as unknown as number;
              }}
              style={
                {
                  "--menu-width": `${160 - depth * 16}px`,
                  display: openDropdown === idKey ? "block" : "none",
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
