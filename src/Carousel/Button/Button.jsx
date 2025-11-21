import styles from "./Button.module.css";

export default function Button({ direction, navigate, icon }) {
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
