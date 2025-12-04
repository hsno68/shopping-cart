import { useState } from "react";
import styles from "./Filters.module.css";

export default function Filters() {
  const [value, setValue] = useState("");

  function handleChange(e) {
    setValue(e.target.value);
  }

  return (
    <select value={value} onChange={handleChange} className={styles.select}>
      <option value="" disabled>
        Filter & Sort
      </option>
      <option value="priceAsc">Price: Low to High</option>
      <option value="priceDesc">Price: High to Low</option>
      <option value="ratingDesc">Rating: High to Low</option>
    </select>
  );
}
