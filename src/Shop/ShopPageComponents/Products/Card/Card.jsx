import styles from "./Card.module.css";

export default function Card({ title, thumbnail, price }) {
  return (
    <div className={styles.gridContainer}>
      <div className={styles.imageWrapper}>
        <img src={thumbnail} alt={title} className={styles.image} />
      </div>
      <p>{title}</p>
      <p>{`$${price}`}</p>
    </div>
  );
}
