import layout from "./../../Home.module.css";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <div className={layout.container}>
      <h1>Discover Your Next Favorite Product</h1>
      <a href="#" className={styles.button}>
        Shop Now
      </a>
    </div>
  );
}
