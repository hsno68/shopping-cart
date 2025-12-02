import styles from "./Button.module.css";

export default function Button({ direction, icon, navigate }) {
  return (
    <button
      type="button"
      aria-label={direction === "left" ? "Previous slide" : "Next slide"}
      className={`${styles.navButton} ${styles[direction]}`}
      onClick={() => navigate({ direction })}
    >
      <span aria-hidden="true" className="material-symbols-rounded">
        {icon}
      </span>
    </button>
  );
}
