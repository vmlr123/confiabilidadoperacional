import { useState, useEffect } from "react";
import CategorySidePanel from "../../features/ArticleFinder/CategorySidePanel";
import styles from "./Articles.module.css";
import type { ArticleData } from "../../App";
import SelectedArticles from "./SelectedArticles";

export default function Articles({ articles }: { articles: ArticleData[] }) {
  const [categories, setCategories] = useState<Set<string>>(new Set([]));
  const [categoriesWorkingArray, setCategoriesWorkingArray] = useState<
    string[]
  >([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(
    new Set([])
  );
  const [sortBy, setSortBy] = useState<string>("date"); // 'date', 'title'
  const [sortOrder, setSortOrder] = useState<string>("desc"); // 'asc', 'desc'

  useEffect(() => {
    const catSet = new Set<string>();
    articles.forEach((article) => {
      for (const category of article.class_list.slice(7)) {
        catSet.add(category);
      }
    });
    setCategories(catSet);
    setCategoriesWorkingArray([...catSet]);
  }, [articles]);

  return (
    <>
      <div className={styles.articles}>
        <div className={styles.categories}>
          <CategorySidePanel
            articles={articles}
            categories={categories}
            setCategories={setCategories}
            categoriesWorkingArray={categoriesWorkingArray}
            setCategoriesWorkingArray={setCategoriesWorkingArray}
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
        <div className={styles.preview}>
          <SelectedArticles
            articles={articles}
            searchTerm={searchTerm}
            selectedCategories={selectedCategories}
            sortBy={sortBy}
            sortOrder={sortOrder}
          />
        </div>
      </div>
    </>
  );
}
