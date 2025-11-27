import React, { useState, useEffect } from "react";
import CategorySidePanel from "../../features/ArticleFinder/CategorySidePanel";
import styles from "./Articles.module.css";
import type { ArticleData } from "../../App";
import type { MediaData } from "../../App";
import SelectedArticles from "./SelectedArticles";
import { Outlet, useLocation } from "react-router-dom";

const Articles = React.memo(function Articles({
  articles,
  media,
}: {
  articles: ArticleData[];
  media: MediaData[];
}) {
  const [categoriesWorkingArray, setCategoriesWorkingArray] = useState<
    string[]
  >([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(
    new Set([])
  );
  const [sortBy, setSortBy] = useState<string>("date"); // 'date', 'title'
  const [sortOrder, setSortOrder] = useState<string>("desc"); // 'asc', 'desc'
  const currentLocation = useLocation().pathname;

  useEffect(() => {
    const catSet = new Set<string>();
    articles.forEach((article) => {
      const classes = Array.isArray(article.class_list)
        ? article.class_list
        : [];
      for (const category of classes) {
        if (!category) continue;
        const key = category.toLowerCase();
        // Skip tags - they should not appear as categories
        if (key.includes("tag")) continue;
        // Only include entries that look like categories
        if (key.includes("category") || key.startsWith("cat-")) {
          catSet.add(category);
        }
      }
    });
    setCategoriesWorkingArray([...catSet]);
  }, [articles]);

  // Try to fetch authoritative list of registered categories from WP REST API.
  // If fetch fails, fall back to the categories discovered in `class_list` above.
  useEffect(() => {
    let cancelled = false;

    async function fetchCategories() {
      try {
        const res = await fetch(
          "https://confiabilidadoperacional.com/wp-json/wp/v2/categories?per_page=100"
        );
        if (!res.ok) throw new Error("Failed to fetch categories");
        const data = await res.json();
        if (cancelled) return;
        if (Array.isArray(data) && data.length > 0) {
          // Map to the same `class_list` style values (e.g. `category-slug`)
          const mapped = data
            .filter((c) => c && c.slug)
            .map((c) => `category-${c.slug}`);
          setCategoriesWorkingArray(mapped);
        }
      } catch {
        // Keep fallback derived from articles (already set by previous effect)
      }
    }

    fetchCategories();
    return () => {
      cancelled = true;
    };
  }, [articles]);

  // Debug dump removed

  return (
    <>
      {currentLocation === "/articles" ? (
        <div className={styles.articles}>
          <div className={styles.preview}>
            <SelectedArticles
              articles={articles}
              searchTerm={searchTerm}
              selectedCategories={selectedCategories}
              sortBy={sortBy}
              sortOrder={sortOrder}
              media={media}
            />
          </div>
          <div className={styles.categories}>
            <CategorySidePanel
              categoriesWorkingArray={categoriesWorkingArray}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              sortBy={sortBy}
              setSortBy={setSortBy}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
            />
          </div>
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
});

export default Articles;
