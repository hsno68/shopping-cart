import { useOutletContext } from "react-router-dom";
import styles from "./Tags.module.css";
import { formatCategory } from "../../../utilities.js";

export default function Tags() {
  const { filters, toggleSubcategoryFilter } = useOutletContext();

  const categories = Object.entries(filters.subCategories);

  return (
    <ul className={styles.flexContainer}>
      {categories.map(([mainCategory, subCategories]) =>
        subCategories.map((subCategory) => (
          <li key={subCategory} className={styles.tag}>
            {`${mainCategory} > ${formatCategory(subCategory)}`}
            <button
              type="button"
              aria-label="Remove category"
              className={styles.button}
              onClick={() => {
                toggleSubcategoryFilter({ mainCategory, subCategory });
              }}
            >
              <span aria-hidden="true" className="material-symbols-rounded">
                close
              </span>
            </button>
          </li>
        ))
      )}
    </ul>
  );
}
