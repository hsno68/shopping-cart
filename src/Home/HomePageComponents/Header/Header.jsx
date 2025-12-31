import { Link } from "react-router-dom";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <div className={styles.container}>
      <h1>Discover Your Next Favorite Product</h1>
      <Link to="/shop" className={styles.button}>
        Shop Now
      </Link>
    </div>
  );
}
