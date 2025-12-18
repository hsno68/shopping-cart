import { useOutletContext } from "react-router-dom";
import styles from "./Search.module.css";

export default function Search() {
  const { searchValue, setSearchValue } = useOutletContext();

  return (
    <input
      type="text"
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      className={styles.input}
    ></input>
  );
}
