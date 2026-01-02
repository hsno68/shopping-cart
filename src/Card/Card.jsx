import styles from "./Card.module.css";

export default function Card({ title, thumbnail, price, context }) {
  return (
    <li
      className={`${styles.gridContainer} ${context === "home" ? styles.homeCard : styles.shopCard}`}
    >
      <div className={styles.imageWrapper}>
        <img src={thumbnail} alt={title} className={styles.image} />
      </div>
      <p>{title}</p>
      <p>{`$${price}`}</p>
    </li>
  );
}
