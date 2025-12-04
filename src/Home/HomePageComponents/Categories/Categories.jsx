import styles from "./Categories.module.css";

export default function Categories() {
  return (
    <div className={styles.container}>
      <h2>Featured Categories</h2>
      <ul className={styles.gridContainer}>
        <li>
          <a href="#" className={styles.button}>
            Electronics
          </a>
        </li>
        <li>
          <a href="#" className={styles.button}>
            Apparel
          </a>
        </li>
        <li>
          <a href="#" className={styles.button}>
            Home
          </a>
        </li>
        <li>
          <a href="#" className={styles.button}>
            Beauty
          </a>
        </li>
      </ul>
    </div>
  );
}
