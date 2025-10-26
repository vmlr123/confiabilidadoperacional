import type { ArticleData } from "../../App";
import styles from "./CategorySidePanel.module.css";
import CategorySelection from "./CategorySelection";

export default function CategorySidePanel({
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
  return (
    <>
      <form className={styles.categories}>
        <fieldset>
          <legend>Categorías</legend>
          {categoriesWorkingArray.map((category) => {
            return (
              <CategorySelection
                category={category}
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
              />
            );
          })}
          <div className={styles.search}>
            <input
              type="text"
              placeholder="Busca artículos por título..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="date">Ordenar por fecha</option>
            <option value="title">Ordenar por título</option>
          </select>
          <button
            onClick={(e) => {
              e.preventDefault();
              setSortOrder(sortOrder === "asc" ? "desc" : "asc");
            }}
          >
            Ordenar en orden:{" "}
            {sortOrder === "asc" ? "ascendente" : "descendente"}
          </button>
        </fieldset>
      </form>
    </>
  );
}
