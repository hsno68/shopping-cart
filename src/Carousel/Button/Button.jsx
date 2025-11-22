import styles from "./Button.module.css";

export default function Button({ direction, navigate, icon }) {
  return (
    <button
      type="button"
      aria-label={direction === "left" ? "Previous slide" : "Next slide"}
      className={`${styles.carouselButton} ${styles[direction]}`}
      onClick={() => navigate(direction)}
    >
      <span className="material-symbols-rounded" aria-hidden="true">
        {icon}
      </span>
    </button>
  );
}
