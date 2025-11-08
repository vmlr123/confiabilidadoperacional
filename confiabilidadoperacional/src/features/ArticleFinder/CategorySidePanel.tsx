import styles from "./CategorySidePanel.module.css";
import CategorySelection from "./CategorySelection";

export default function CategorySidePanel({
  categoriesWorkingArray,
  searchTerm,
  setSearchTerm,
  selectedCategories,
  setSelectedCategories,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
}: {
  categoriesWorkingArray: string[];
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedCategories: Set<string>;
  setSelectedCategories: (value: Set<string>) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  sortOrder: string;
  setSortOrder: (value: string) => void;
}) {
  console.log(categoriesWorkingArray);

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
