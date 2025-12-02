import Card from "./Card/Card.jsx";
import layout from "./../../Home.module.css";
import styles from "./Products.module.css";

export default function Products() {
  const cards = [];

  for (let i = 0; i < 4; i++) {
    cards.push(<Card key={i} index={i + 1} />);
  }

  return (
    <div className={layout.container}>
      <h2>Featured Products</h2>
      <ul className={styles.gridContainer}>{cards}</ul>
    </div>
  );
}
