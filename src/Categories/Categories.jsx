import styles from "./Categories.module.css";

export default function Categories() {
  return (
    <div className={styles.outerContainer}>
      <h2>Featured Categories</h2>
      <div className={styles.innerContainer}>
        <a href="#" className={styles.button}>
          Electronics
        </a>
        <a href="#" className={styles.button}>
          Apparel
        </a>
        <a href="#" className={styles.button}>
          Home
        </a>
        <a href="#" className={styles.button}>
          Beauty
        </a>
      </div>
    </div>
  );
}
