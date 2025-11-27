import React, { useRef } from "react";
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
}): React.JSX.Element {
  const listItemRefs = useRef<Array<HTMLLIElement | null>>([]);

  const handleItemKeyDown = (e: React.KeyboardEvent, idx: number) => {
    const key = e.key;
    const nodes = listItemRefs.current;
    if (key === "ArrowDown") {
      e.preventDefault();
      const next = nodes[idx + 1] ?? nodes[0];
      next?.focus();
    } else if (key === "ArrowUp") {
      e.preventDefault();
      const prev = nodes[idx - 1] ?? nodes[nodes.length - 1];
      prev?.focus();
    } else if (key === "Home") {
      e.preventDefault();
      nodes[0]?.focus();
    } else if (key === "End") {
      e.preventDefault();
      nodes[nodes.length - 1]?.focus();
    } else if (key === " " || key === "Enter") {
      e.preventDefault();
      const li = nodes[idx];
      const input = li?.querySelector(
        'input[type="checkbox"]'
      ) as HTMLInputElement | null;
      if (input) input.click();
    }
  };
  return (
    <form className={styles.panel} aria-label="Panel de categorías">
      <div className={styles.legend}>Categorías</div>

      <div className={styles.controls}>
        <div className={styles.search}>
          <input
            type="text"
            placeholder="Busca artículos por título..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Buscar artículos"
          />
        </div>

        <div className={styles.select}>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            aria-label="Ordenar por"
          >
            <option value="date">Ordenar por fecha</option>
            <option value="title">Ordenar por título</option>
          </select>
        </div>
      </div>

      <button
        className={`${styles.toggleButton} button`}
        onClick={(e) => {
          e.preventDefault();
          setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        }}
        aria-pressed={sortOrder === "asc"}
      >
        Orden: {sortOrder === "asc" ? "Ascendente" : "Descendente"}
      </button>

      <ul
        className={styles.categoriesList}
        role="listbox"
        aria-multiselectable="true"
      >
        {categoriesWorkingArray.map((category, idx) => (
          <li
            key={category}
            role="option"
            aria-selected={selectedCategories.has(category)}
            tabIndex={0}
            ref={(el) => {
              // store refs for keyboard navigation
              if (!el) return;
              listItemRefs.current[idx] = el;
            }}
            onKeyDown={(e) => handleItemKeyDown(e, idx)}
          >
            <CategorySelection
              category={category}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
            />
          </li>
        ))}
      </ul>
    </form>
  );
}
