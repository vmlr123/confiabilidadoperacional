import Article from "./Article";
import parse from "html-react-parser";
import DOMPurify from "dompurify";
import { useState, useEffect, type ReactNode } from "react";
import type { ArticleData } from "../../App";
import type { MediaData } from "../../App";

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
    const filteredArticles = articles.filter((article) => {
      // Filter by search term
      const matchesSearch = article.title.rendered
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      // Filter by selected categories
      const articleCategories = article.class_list.slice(7);
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
        const dateA: Date = new Date(a.date);
        const dateB: Date = new Date(b.date);
        return sortOrder === "desc"
          ? dateB.getTime() - dateA.getTime()
          : dateA.getTime() - dateB.getTime();
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
          featuredMediaID={article.featured_media ?? 0}
          description={parse(
              DOMPurify.sanitize(
                article.excerpt.rendered || "No se pudo cargar el contenido"
              )
            ) as ReactNode}
        />
      ))}
      {totalPages > 1 && (
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
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
    </>
  );
}
