import { useState, useEffect } from "react";
import styles from "./CategorySelection.module.css";

export default function CategorySelection({
  category,
  selectedCategories,
  setSelectedCategories,
}: {
  category: string;
  selectedCategories: Set<string>;
  setSelectedCategories: (value: Set<string>) => void;
}): React.JSX.Element {
  const [isChecked, setIsChecked] = useState<boolean>(
    selectedCategories.has(category)
  );

  useEffect(() => {
    setIsChecked(selectedCategories.has(category));
  }, [selectedCategories, category]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked: boolean = e.target.checked;
    setIsChecked(checked);
    if (checked) {
      setSelectedCategories(new Set([...selectedCategories, category]));
    } else {
      const newSet: Set<string> = new Set(selectedCategories);
      newSet.delete(category);
      setSelectedCategories(newSet);
    }
  };

  const pretty = category
    .replace(/-/g, " ")
    .replace(/category/g, "")
    .replace(/tag/g, "")
    .split(" ")
    .map((word) =>
      word ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() : ""
    )
    .join(" ")
    .trim();

  return (
    <div className={styles.item}>
      <span className={styles.checkbox} aria-hidden>
        <input
          type="checkbox"
          id={category}
          name="category"
          value={category}
          checked={isChecked}
          onChange={handleChange}
          aria-checked={isChecked}
        />
      </span>
      <label
        htmlFor={category}
        className={`${styles.labelText} ${isChecked ? styles.selected : ""}`}
      >
        {pretty}
      </label>
    </div>
  );
}
