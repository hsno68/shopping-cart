import styles from "./Card.module.css";

export default function Card({ index }) {
  return (
    <li>
      <a href="#" className={styles.container}>
        <div className={styles.imagePlaceholder}></div>
        <h2>Product {index}</h2>
        <p>$49.99</p>
      </a>
    </li>
  );
}
