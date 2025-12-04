import { useState } from "react";
import styles from "./Search.module.css";

export default function Search() {
  const [value, setValue] = useState("");

  function handleChange(e) {
    setValue(e.target.value);
  }

  return <input type="text" value={value} onChange={handleChange} className={styles.input}></input>;
}
