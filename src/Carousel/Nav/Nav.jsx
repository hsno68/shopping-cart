import styles from "./Nav.module.css";

export default function Nav({ images, navIndex }) {
  const indicators = [];

  for (let i = 0; i < images.length - 2; i++) {
    indicators.push(
      <button
        type="button"
        className={`${styles.indicator} ${navIndex === i && styles.selected}`}
      ></button>
    );
  }

  return <div className={styles.container}>{indicators}</div>;
}
