import Items from "./CartPageComponents/Items/Items.jsx";
import styles from "./Cart.module.css";

export default function Cart() {
  return (
    <div className={styles.container}>
      <h1>Shopping Cart</h1>
      <Items />
    </div>
  );
}
