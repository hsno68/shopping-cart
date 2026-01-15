import Items from "./CartPageComponents/Items/Items.jsx";
import Subtotal from "./CartPageComponents/Subtotal/Subtotal.jsx";
import styles from "./Cart.module.css";

export default function Cart() {
  return (
    <div className={styles.gridContainer}>
      <h1>Shopping Cart</h1>
      <Items />
      <Subtotal />
    </div>
  );
}
