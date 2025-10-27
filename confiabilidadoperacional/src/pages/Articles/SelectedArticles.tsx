import Article from "./Article";
import parse from "html-react-parser";
import DOMPurify from "dompurify";
import { useState, useEffect, type ReactNode } from "react";
import type { ArticleData } from "../../App";

export default function SelectedArticles({
  articles,
  searchTerm,
  selectedCategories,
  sortBy,
  sortOrder,
}: {
  articles: ArticleData[];
  searchTerm: string;
  selectedCategories: Set<string>;
  sortBy: string;
  sortOrder: string;
}) {
  const [finalArticles, setFinalArticles] = useState<ArticleData[]>([
    ...articles,
  ]);

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
  }, [articles, searchTerm, selectedCategories, sortBy, sortOrder]);
  return (
    <>
      {finalArticles.map((article) => (
        <Article
          key={article.id}
          title={
            parse(
              DOMPurify.sanitize(
                article.title.rendered || "No se pudo cargar el contenido"
              )
            ) as ReactNode
          }
          date={
            new Date(article.date).toLocaleDateString() ||
            "No se pudo cargar el contenido. Por favor intente recargar la página."
          }
        />
      ))}
    </>
  );
}
