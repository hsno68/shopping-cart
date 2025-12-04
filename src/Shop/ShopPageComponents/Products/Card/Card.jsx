import styles from "./Card.module.css";

export default function Card({ product }) {
  const { title, thumbnail, price } = product;
  return (
    <div className={styles.gridContainer}>
      <div className={styles.imageWrapper}>
        <img src={thumbnail} alt={title} className={styles.image} />
      </div>
      <p>{title}</p>
      <p>{price}</p>
    </div>
  );
}
