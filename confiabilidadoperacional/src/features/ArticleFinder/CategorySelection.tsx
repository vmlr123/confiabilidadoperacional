import { useState, useEffect } from "react";

export default function CategorySelection({
  category,
  selectedCategories,
  setSelectedCategories,
}: {
  category: string;
  selectedCategories: Set<string>;
  setSelectedCategories: (value: Set<string>) => void;
}) {
  const [isChecked, setIsChecked] = useState<boolean>(true);
  useEffect(() => {
    if (isChecked) {
      setSelectedCategories(new Set([...selectedCategories, category]));
      setIsChecked(false);
    }
  }, [isChecked, category, selectedCategories, setSelectedCategories]);
  return (
    <>
      <div>
        <input
          type="checkbox"
          id={category}
          name="category"
          value={category}
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
        />
        <label htmlFor={category}>{category}</label>
        <br />
      </div>
    </>
  );
}
