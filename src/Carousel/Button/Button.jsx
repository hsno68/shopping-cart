import styles from "./Button.module.css";

export default function Button({ direction, navigate, icon }) {
  return (
    <button
      type="button"
      aria-label={direction === "left" ? "Previous slide" : "Next slide"}
      className={`${styles.carouselButton} ${styles[direction]}`}
      onClick={() => navigate({ direction })}
    >
      <span aria-hidden="true" className="material-symbols-rounded">
        {icon}
      </span>
    </button>
  );
}
