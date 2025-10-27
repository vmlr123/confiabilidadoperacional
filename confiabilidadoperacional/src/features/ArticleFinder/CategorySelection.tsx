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
  const [isChecked, setIsChecked] = useState<boolean>(
    selectedCategories.has(category)
  );

  useEffect(() => {
    setIsChecked(selectedCategories.has(category));
  }, [selectedCategories, category]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setIsChecked(checked);
    if (checked) {
      setSelectedCategories(new Set([...selectedCategories, category]));
    } else {
      const newSet = new Set(selectedCategories);
      newSet.delete(category);
      setSelectedCategories(newSet);
    }
  };

  return (
    <>
      <div>
        <input
          type="checkbox"
          id={category}
          name="category"
          value={category}
          checked={isChecked}
          onChange={handleChange}
        />
        <label htmlFor={category}>{category}</label>
        <br />
      </div>
    </>
  );
}
