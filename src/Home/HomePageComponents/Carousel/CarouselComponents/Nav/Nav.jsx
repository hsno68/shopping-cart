import styles from "./Nav.module.css";

export default function Nav({ carouselImages, navIndex, navigate }) {
  return (
    <div className={styles.container}>
      {carouselImages.map((image, index) => (
        <button
          key={index}
          type="button"
          className={`${styles.navButton} ${navIndex === index && styles.selected}`}
          onClick={() => navigate({ index })}
        ></button>
      ))}
    </div>
  );
}
