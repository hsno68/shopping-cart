import { useOutletContext } from "react-router-dom";
import { getSubtotal } from "../../../utilities.js";
import styles from "./Subtotal.module.css";

export default function Subtotal() {
  const { products, cart } = useOutletContext();

  if (Object.keys(cart).length === 0) {
    return null;
  }

  return (
    <div className={styles.container}>
      <h2>Summary</h2>
      <p>{`Subtotal: $${getSubtotal(cart, products).toFixed(2)}`}</p>
      <button type="button">Proceed to checkout</button>
    </div>
  );
}
