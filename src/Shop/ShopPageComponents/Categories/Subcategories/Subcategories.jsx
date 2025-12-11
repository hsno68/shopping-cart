import { useOutletContext } from "react-router-dom";

export default function Subcategories({ mainCategory, items }) {
  const { filters, toggleSubcategoryFilter } = useOutletContext();

  return (
    <ul>
      {items.map((subCategory) => (
        <li key={subCategory}>
          <input
            type="checkbox"
            id={subCategory}
            checked={filters.subCategories[mainCategory]?.includes(subCategory) || false}
            onChange={() => toggleSubcategoryFilter({ mainCategory, subCategory })}
          />
          <label htmlFor={subCategory}>{subCategory}</label>
        </li>
      ))}
    </ul>
  );
}
