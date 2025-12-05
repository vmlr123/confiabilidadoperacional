import Article from "./Article";
import parse from "html-react-parser";
import DOMPurify from "dompurify";
import { useState, useEffect, type ReactNode } from "react";
import type { ArticleData } from "../../App";
import type { MediaData } from "../../App";
import styles from "./SelectedArticles.module.css";

const ITEMS_PER_PAGE = 3;

export default function SelectedArticles({
  articles,
  searchTerm,
  selectedCategories,
  sortBy,
  sortOrder,
  media,
}: {
  articles: ArticleData[];
  searchTerm: string;
  selectedCategories: Set<string>;
  sortBy: string;
  sortOrder: string;
  media: MediaData[];
}) {
  const [finalArticles, setFinalArticles] = useState<ArticleData[]>([
    ...articles,
  ]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const safeTime = (d?: string | Date) => {
      if (!d) return 0;
      if (d instanceof Date) {
        const t = d.getTime();
        return isNaN(t) ? 0 : t;
      }
      const parsed = new Date(d);
      const t = parsed.getTime();
      return isNaN(t) ? 0 : t;
    };

    const filteredArticles = articles.filter((article) => {
      // Filter by search term
      const matchesSearch = article.title.rendered
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      // Filter by selected categories
      const articleCategories = Array.isArray(article.class_list)
        ? article.class_list
        : [];
      const selectedCategoriesArray = [...selectedCategories];
      const matchesCategory =
        selectedCategoriesArray.length === 0
          ? true
          : articleCategories.some((element) =>
              selectedCategoriesArray.includes(element)
            );

      return matchesSearch && matchesCategory;
    });

    // Sort the filtered articles
    const sortedArticles = [...filteredArticles].sort((a, b) => {
      if (sortBy === "date") {
        const timeA = safeTime(a.date);
        const timeB = safeTime(b.date);
        return sortOrder === "desc" ? timeB - timeA : timeA - timeB;
      } else if (sortBy === "title") {
        return sortOrder === "desc"
          ? b.title.rendered.localeCompare(a.title.rendered)
          : a.title.rendered.localeCompare(b.title.rendered);
      }
      return 0; // No sorting
    });

    setFinalArticles(sortedArticles);
    setCurrentPage(1); // Reset to first page when filters change
  }, [articles, searchTerm, selectedCategories, sortBy, sortOrder]);

  const totalPages = Math.ceil(finalArticles.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedArticles = finalArticles.slice(startIndex, endIndex);
  return (
    <>
      {totalPages > 1 && (
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className={styles.button}
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
            className={styles.button}
          >
            Next
          </button>
        </div>
      )}
      {paginatedArticles.map((article) => (
        <Article
          key={article.id}
          id={article.id}
          title={
            parse(
              DOMPurify.sanitize(
                article.title.rendered || "No se pudo cargar el contenido"
              )
            ) as ReactNode
          }
          date={
            new Date(article.date).toLocaleDateString("es-ES") ||
            "No se pudo cargar el contenido. Por favor intente recargar la página."
          }
          media={media}
          featuredMediaID={article.id ?? 0}
          description={
            parse(
              DOMPurify.sanitize(
                article.excerpt.rendered || "No se pudo cargar el contenido"
              )
            ) as ReactNode
          }
        />
      ))}
      {totalPages > 1 && (
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className={styles.button}
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
            className={styles.button}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}
