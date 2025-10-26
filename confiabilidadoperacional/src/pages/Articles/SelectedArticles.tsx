import Article from "./Article";
import parse from "html-react-parser";
import DOMPurify from "dompurify";
import { useState, useEffect, type ReactNode } from "react";
import type { ArticleData } from "../../App";

export default function SelectedArticles({
  articles,
  categories,
  setCategories,
  categoriesWorkingArray,
  setCategoriesWorkingArray,
  searchTerm,
  setSearchTerm,
  selectedCategories,
  setSelectedCategories,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
}: {
  articles: ArticleData[];
  categories: Set<string>;
  setCategories: (value: Set<string>) => void;
  categoriesWorkingArray: string[];
  setCategoriesWorkingArray: (value: string[]) => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedCategories: Set<string>;
  setSelectedCategories: (value: Set<string>) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  sortOrder: string;
  setSortOrder: (value: string) => void;
}) {
  const [finalArticles, setFinalArticles] = useState<ArticleData[]>([
    ...articles,
  ]);
  useEffect(() => {
    const filteredArticles = finalArticles.filter((article) => {
      // Implement your filtering logic here
      // Example: filter by search term and category
      const matchesSearch = article.title.rendered
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const articleCategories = article.class_list.slice(7);
      const selectedCategoriesArray = [...selectedCategories];
      const matchesCategory = selectedCategoriesArray
        ? articleCategories.some((element) =>
            selectedCategoriesArray.includes(element)
          )
        : true;
      return matchesSearch && matchesCategory;
    });

    const sortedArticles = [...filteredArticles].sort((a, b) => {
      // Implement your sorting logic here
      // Example: sort by date or title
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
    setFinalArticles([...sortedArticles]);
  }, []);
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
          content={
            parse(
              DOMPurify.sanitize(
                article.content?.rendered ||
                  "No se pudo cargar el contenido. Por favor intente recargar la página."
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
