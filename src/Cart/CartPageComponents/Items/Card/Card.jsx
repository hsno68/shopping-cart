import styles from "./Card.module.css";

export default function Card({ title, thumbnail, price, quantity }) {
  return (
    <li className={styles.gridContainer}>
      <div className={styles.imageWrapper}>
        <img src={thumbnail} alt={title} className={styles.image} />
      </div>
      <div className={styles.content}>
        <p className={styles.title}>{title}</p>
        <p className={styles.price}>{`$${price}`}</p>
        <p className={styles.quantity}>{`Qty: ${quantity}`}</p>
      </div>
      <p className={styles.total}>{`Total: $${(price * quantity).toFixed(2)}`}</p>
    </li>
  );
}

{
  /* <button type="button" aria-label="Delete cart item" className={styles.button}>
          <span aria-hidden="true" className="material-symbols-rounded">
            delete
          </span>
        </button> */
}
