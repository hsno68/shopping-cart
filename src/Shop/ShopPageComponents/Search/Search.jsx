import { useState } from "react";
import styles from "./Search.module.css";

export default function Search() {
  const [value, setValue] = useState("");

  function handleChange() {}

  return (
    <div className={styles.container}>
      <input type="text" className={styles.input}></input>
    </div>
  );
}
