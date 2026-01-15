import { useOutletContext } from "react-router-dom";
import { formatCategory } from "../../../../utilities.js";
import styles from "./Subcategories.module.css";

export default function Subcategories({ mainCategory, items }) {
  const { filters, toggleSubcategoryFilter } = useOutletContext();

  return (
    <ul className={styles.container}>
      {items
        .slice()
        .sort((a, b) => a.localeCompare(b))
        .map((subCategory) => (
          <li key={subCategory}>
            <input
              type="checkbox"
              id={subCategory}
              checked={filters.subCategories[mainCategory]?.includes(subCategory) || false}
              onChange={() => toggleSubcategoryFilter({ mainCategory, subCategory })}
            />
            <label htmlFor={subCategory}>{formatCategory(subCategory)}</label>
          </li>
        ))}
    </ul>
  );
}
