import styles from "./Nav.module.css";

export default function Nav({ slideCount, navIndex }) {
  const indicators = [];

  for (let i = 0; i < slideCount; i++) {
    indicators.push(
      <button
        type="button"
        className={`${styles.indicator} ${navIndex === i && styles.selected}`}
      ></button>
    );
  }

  return <div className={styles.container}>{indicators}</div>;
}
