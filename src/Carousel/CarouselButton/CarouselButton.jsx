import styles from "./CarouselButton.module.css";

export default function CarouselButton({ direction, navigate, icon }) {
  return (
    <button
      type="button"
      className={`${styles.carouselButton} ${styles[direction]}`}
      onClick={() => navigate(direction)}
    >
      <span className="material-symbols-rounded">{icon}</span>
    </button>
  );
}
