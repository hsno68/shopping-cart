import { useOutletContext } from "react-router-dom";
import styles from "./Sort.module.css";

export default function Sort() {
  const { sortValue, setSortValue } = useOutletContext();

  return (
    <select
      value={sortValue}
      onChange={(e) => setSortValue(e.target.value)}
      className={styles.select}
    >
      <option value="" disabled>
        Sort by
      </option>
      <option value="ratingDesc">Rating: High to Low</option>
      <option value="priceAsc">Price: Low to High</option>
      <option value="priceDesc">Price: High to Low</option>
      <option value="titleAsc">Name: A-Z</option>
      <option value="titleDesc">Name: Z-A</option>
    </select>
  );
}
